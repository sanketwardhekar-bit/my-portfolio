"use client";

import { useRef } from "react";

export default function CodeDialog({
    label = "View Code",
    file,
    height = 720,
}: {
    label?: string;
    file: string;   // e.g. "/Kriging.html" (must be in /public)
    height?: number;
}) {
    const ref = useRef<HTMLDialogElement | null>(null);

    const open = () => ref.current?.showModal();
    const close = () => ref.current?.close();

    return (
        <>
            <button
                type="button"
                onClick={open}
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition"
            >
                {label}
            </button>

            <dialog
                ref={ref}
                className="rounded-2xl w-[96vw] max-w-6xl border bg-neutral-900 text-neutral-100 p-0 shadow-2xl"
            >
                {/* Title bar */}
                <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
                    <div className="text-sm opacity-80 truncate">{file}</div>
                    <div className="flex items-center gap-2">
                        <a
                            href={file}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs px-2 py-1 rounded bg-white/10 hover:bg-white/20"
                            title="Open in new tab"
                        >
                            Open tab
                        </a>
                        <button
                            onClick={close}
                            className="text-sm px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20"
                        >
                            Close
                        </button>
                    </div>
                </div>

                {/* Code iframe */}
                <iframe
                    src={file}
                    title="Code Preview"
                    className="w-full border-0"
                    style={{ height: Math.max(360, height) }}
                />

                {/* Click outside to close (native) is already handled by <dialog> backdrop if desired */}
            </dialog>
        </>
    );
}
