"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function CodeModal({
    label = "View Code",
    file,
    height = 720,
}: {
    label?: string;
    file: string;   // e.g. "/Kriging.html" in /public
    height?: number;
}) {
    const [open, setOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    const ModalUI = (
        <div
            className="fixed inset-0 z-[1000] flex items-center justify-center"
            onClick={() => setOpen(false)}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/55 backdrop-blur-sm" />

            {/* Dialog */}
            <div
                className="relative bg-neutral-900 text-neutral-100 w-[96vw] max-w-6xl rounded-2xl overflow-hidden shadow-2xl border border-white/10"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
                    <div className="text-sm opacity-80 truncate">{file}</div>
                    <button
                        onClick={() => setOpen(false)}
                        className="text-sm px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20"
                    >
                        Close
                    </button>
                </div>
                <iframe
                    src={file}                 // must exist under /public
                    title="Code Preview"
                    className="w-full border-0"
                    style={{ height: Math.max(360, height) }}
                />
            </div>
        </div>
    );

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition"
            >
                {label}
            </button>

            {mounted && open && createPortal(ModalUI, document.body)}
        </>
    );
}
