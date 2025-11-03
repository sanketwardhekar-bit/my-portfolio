"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function BlogSlideOver() {
    const router = useRouter();
    const pathname = usePathname();
    const search = useSearchParams();
    const openId = search.get("post"); // ?post=<slug>

    const panelRef = useRef<HTMLDivElement>(null);
    const [title, setTitle] = useState<string>("");

    const onClose = () => {
        const params = new URLSearchParams(search?.toString());
        params.delete("post");
        router.push(params.size ? `${pathname}?${params}` : pathname, { scroll: false });
    };

    // ESC to close + body scroll lock
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && openId && onClose();
        window.addEventListener("keydown", onKey);
        document.body.style.overflow = openId ? "hidden" : "";
        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
        };
    }, [openId]);

    // Inject HTML content by cloning hidden node
    useEffect(() => {
        const target = panelRef.current?.querySelector<HTMLDivElement>("[data-slot='content']");
        if (!target) return;

        target.innerHTML = "";

        if (!openId) {
            setTitle("");
            return;
        }

        const source = document.getElementById(`post-${openId}`);
        if (!source) return;

        setTitle(source.getAttribute("data-title") || "");

        const frag = document.createDocumentFragment();
        Array.from(source.childNodes).forEach((n) => frag.appendChild(n.cloneNode(true)));
        target.appendChild(frag);
    }, [openId]);

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 z-40 transition ${openId ? "opacity-100 backdrop-blur-sm bg-black/25" : "opacity-0 pointer-events-none"
                    }`}
                onClick={onClose}
                aria-hidden={openId ? "false" : "true"}
            />

            {/* Panel */}
            <div
                role="dialog"
                aria-modal="true"
                tabIndex={-1}
                ref={panelRef}
                className={`fixed right-0 top-0 bottom-0 z-50 w-full sm:w-[85%] md:w-[80%] lg:w-[75%] max-w-[100rem]
                    border-l bg-background shadow-2xl outline-none
                    transition-transform duration-300 ${openId ? "translate-x-0" : "translate-x-full"}`}
            >
                <div className="flex items-center justify-between gap-3 p-4 border-b">
                    <h3 className="text-lg md:text-xl font-semibold leading-snug truncate">
                        {title || "Article"}
                    </h3>
                    <button onClick={onClose} className="rounded-md px-2 py-1 text-sm hover:bg-muted">
                        Close ✕
                    </button>
                </div>

                <div className="h-full overflow-y-auto p-4">
                    <div data-slot="content" />
                </div>
            </div>
        </>
    );
}
