"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function ProjectSlideOver() {
    const router = useRouter();
    const pathname = usePathname();
    const search = useSearchParams();

    const openId = search.get("project");
    const panelRef = useRef<HTMLDivElement>(null);
    const [title, setTitle] = useState<string>("");

    const onClose = () => {
        const params = new URLSearchParams(search?.toString());
        params.delete("project");
        const qs = params.toString();
        router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    };

    // Close on ESC
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape" && openId) onClose();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [openId]);

    // Focus + body scroll lock
    useEffect(() => {
        if (openId && panelRef.current) panelRef.current.focus();
        const prev = document.body.style.overflow;
        document.body.style.overflow = openId ? "hidden" : prev || "";
        return () => {
            document.body.style.overflow = prev || "";
        };
    }, [openId]);

    // Read project title from hidden source block
    useEffect(() => {
        if (!openId) {
            setTitle("");
            return;
        }
        const src = document.getElementById(`proj-${openId}`);
        const t = src?.getAttribute("data-title") || "";
        setTitle(t);
    }, [openId]);

    // Inject content + wire [data-code-file] buttons
    useEffect(() => {
        const target = panelRef.current?.querySelector<HTMLDivElement>("[data-slot='content']");
        if (!target) return;

        target.innerHTML = "";
        if (!openId) return;

        const source = document.getElementById(`proj-${openId}`);
        if (source) {
            const frag = document.createDocumentFragment();
            Array.from(source.childNodes).forEach((n: Node) => {
                frag.appendChild(n.cloneNode(true));
            });
            target.appendChild(frag);
        }

        const disposers: Array<() => void> = [];
        const buttons = Array.from(target.querySelectorAll<HTMLElement>("[data-code-file]"));

        buttons.forEach((btn: HTMLElement) => {
            const handler = () => {
                const file = btn.getAttribute("data-code-file");
                if (!file) return;

                const modal = document.createElement("div");
                modal.setAttribute("data-code-modal", "true"); // tag for cleanup
                modal.className =
                    "fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center p-4 transition-opacity duration-200";

                // simple modal with iframe
                modal.innerHTML = `
          <div class="bg-neutral-900 text-neutral-100 rounded-xl w-full max-w-5xl h-[80vh] overflow-hidden shadow-2xl">
            <div class="flex justify-between items-center border-b border-neutral-700 p-3">
              <span class="text-sm font-medium">Code Preview: ${file}</span>
              <button class="text-xs text-white/70 hover:text-white" id="closeCode">✕</button>
            </div>
            <iframe src="${file}" class="w-full h-full border-0" title="Code Preview"></iframe>
          </div>
        `;

                const close = () => modal.remove();
                // close on backdrop click
                modal.addEventListener("click", (e: MouseEvent) => {
                    if (e.target === modal) close();
                });
                // close on button
                const closeBtn = modal.querySelector<HTMLButtonElement>("#closeCode");
                closeBtn?.addEventListener("click", close);

                document.body.appendChild(modal);

                // disposer for this button handler (not the modal)
            };

            btn.addEventListener("click", handler);
            disposers.push(() => btn.removeEventListener("click", handler));
        });

        // cleanup: remove handlers + any leftover modals
        return () => {
            disposers.forEach((fn) => fn());
            document.querySelectorAll<HTMLElement>('[data-code-modal="true"]').forEach((el) => {
                if (el.parentElement === document.body) el.remove();
            });
        };
    }, [openId]);

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 z-40 transition-opacity duration-300 ${openId ? "opacity-100 backdrop-blur-sm bg-black/25" : "opacity-0 pointer-events-none"
                    }`}
                onClick={onClose}
                aria-hidden={openId ? "false" : "true"}
            />

            {/* Slide-over panel */}
            <div
                role="dialog"
                aria-modal="true"
                tabIndex={-1}
                ref={panelRef}
                className={`fixed right-0 top-0 bottom-0 z-50 w-full sm:w-[85%] md:w-[80%] lg:w-[75%] max-w-[100rem]
          border-l bg-background shadow-2xl outline-none
          transition-transform duration-300 ease-out will-change-transform
          ${openId ? "translate-x-0" : "translate-x-full"}`}
            >
                <div className="flex items-center justify-between gap-3 p-4 border-b">
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold leading-snug line-clamp-2">
                        {title || "Project"}
                    </h3>
                    <button
                        onClick={onClose}
                        className="rounded-md px-2 py-1 text-sm hover:bg-muted"
                        aria-label="Close"
                    >
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
