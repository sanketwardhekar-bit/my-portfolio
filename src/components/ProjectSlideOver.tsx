"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function ProjectSlideOver() {
    const router = useRouter();
    const pathname = usePathname();
    const sp = useSearchParams();

    const [hydrated, setHydrated] = useState(false);
    useEffect(() => setHydrated(true), []);

    const projectId = hydrated ? sp.get("project") : null;
    const open = Boolean(projectId);

    // Read server-rendered hidden HTML
    const html = useMemo(() => {
        if (!open || !projectId || typeof window === "undefined") return null;
        const el = document.getElementById(`proj-${projectId}`);
        return el ? el.innerHTML : null;
    }, [open, projectId]);

    // ESC to close
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") router.push(pathname);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, pathname, router]);

    return (
        <>
            {/* Backdrop */}
            <div
                aria-hidden="true"
                onClick={() => router.push(pathname)}
                className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ease-out
          ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
            />

            {/* Panel */}
            <aside
                className={`fixed right-0 top-0 z-50 h-dvh w-full sm:w-[90vw] md:w-[75vw] max-w-[1400px]
          bg-background shadow-2xl border-l transition-transform duration-300 ease-out will-change-transform
          ${open ? "translate-x-0" : "translate-x-full"}`}
                role="dialog"
                aria-modal="true"
            >
                <div className="flex items-center justify-between px-4 py-3 border-b">
                    <div className="font-semibold truncate pr-2">
                        {projectId ?? "Details"}
                    </div>
                    <button
                        onClick={() => router.push(pathname)}
                        className="rounded-md border bg-card px-3 py-1.5 text-sm hover:bg-accent"
                    >
                        Close
                    </button>
                </div>

                <div className="overflow-y-auto h-[calc(100dvh-3.25rem)]">
                    {open && html ? (
                        <div className="px-5 pb-8 pt-4" dangerouslySetInnerHTML={{ __html: html }} />
                    ) : (
                        <div className="px-5 py-8 text-sm text-muted-foreground"> </div>
                    )}
                </div>
            </aside>
        </>
    );
}
