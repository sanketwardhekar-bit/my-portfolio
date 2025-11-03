"use client";

import { useState, useEffect, useRef } from "react";

type Props = {
    label?: string;
    file: string;     // URL to an HTML-exported notebook (put in /public)
    height?: number;  // px
};

export default function CodeModal({ label = "Code", file, height = 720 }: Props) {
    const [open, setOpen] = useState(false);
    const closeOnEsc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (open) document.addEventListener("keydown", closeOnEsc);
        return () => document.removeEventListener("keydown", closeOnEsc);
    }, [open]);

    return (
        <>
            {/* The trigger looks like a button */}
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition"
            >
                {label} <span className="text-white/90">▾</span>
            </button>

            {/* Modal */}
            {open && (
                <div
                    ref={overlayRef}
                    className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
                    onClick={(e) => {
                        // close when clicking the overlay (but not the dialog)
                        if (e.target === overlayRef.current) setOpen(false);
                    }}
                >
                    <div className="relative w-full max-w-5xl rounded-2xl overflow-hidden bg-neutral-900 shadow-2xl ring-1 ring-white/10">
                        {/* Header */}
                        <div className="flex items-center justify-between px-4 py-2 bg-neutral-800 text-neutral-100">
                            <div className="font-semibold">Notebook</div>
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="rounded-md px-3 py-1 text-sm bg-neutral-700 hover:bg-neutral-600"
                                aria-label="Close"
                            >
                                Close ✕
                            </button>
                        </div>

                        {/* Body */}
                        <iframe
                            src={file}
                            title="Notebook"
                            className="w-full"
                            style={{ height }}
                        />
                    </div>
                </div>
            )}
        </>
    );
}
