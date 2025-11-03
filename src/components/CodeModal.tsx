"use client";
import { useState } from "react";

export default function CodeModal({
    label = "View Code",
    file,
    height = 720,
}: { label?: string; file: string; height?: number }) {
    const [open, setOpen] = useState(false);
    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition"
            >
                {label}
            </button>

            {open && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50"
                    onClick={() => setOpen(false)}
                >
                    <div
                        className="bg-neutral-900 text-neutral-100 w-[95vw] max-w-5xl rounded-xl overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
                            <div className="text-sm opacity-80">{file}</div>
                            <button onClick={() => setOpen(false)} className="text-sm px-2 py-1 rounded bg-white/10 hover:bg-white/20">
                                Close
                            </button>
                        </div>
                        <iframe
                            src={file}                // IMPORTANT: the html file must be in /public (e.g., /Kriging.html)
                            className="w-full border-0"
                            style={{ height }}
                            title="Code Preview"
                        />
                    </div>
                </div>
            )}
        </>
    );
}