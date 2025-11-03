"use client";

import { useMemo, useRef, useState } from "react";

type Props = {
    before: string;   // uncut / photo
    after: string;    // cut / stress field / CZM frame
    label?: string;
    className?: string;
};

export default function CutterPlayground({ before, after, label, className }: Props) {
    const [x, setX] = useState(55); // slider percent
    const wrapRef = useRef<HTMLDivElement>(null);

    // keep slider between 0–100
    const clamp = (v: number) => Math.max(0, Math.min(100, v));

    // handle drag on the whole canvas
    const onPointer = (e: React.PointerEvent) => {
        const r = wrapRef.current?.getBoundingClientRect();
        if (!r) return;
        const pct = ((e.clientX - r.left) / r.width) * 100;
        setX(clamp(pct));
    };

    const knife = useMemo(
        () => (
            <svg
                width="44" height="44" viewBox="0 0 44 44" className="drop-shadow"
                aria-hidden
            >
                <path d="M3 22 L28 22" stroke="currentColor" strokeWidth="3" />
                <path d="M28 22 L41 16 L37 28 Z" fill="currentColor" />
            </svg>
        ),
        []
    );

    return (
        <div className={`rounded-2xl border bg-card p-3 ${className || ""}`}>
            {label ? <div className="text-sm font-medium mb-2">{label}</div> : null}

            <div
                ref={wrapRef}
                className="relative w-full overflow-hidden rounded-xl select-none"
                onPointerDown={(e) => { (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); onPointer(e); }}
                onPointerMove={onPointer}
                role="group"
                aria-label={label ?? "Cutting demo"}
            >
                {/* base (before) */}
                <img src={before} alt="" className="block w-full h-auto" />

                {/* reveal (after) with clip */}
                <img
                    src={after}
                    alt=""
                    className="pointer-events-none absolute inset-0 w-full h-full object-cover"
                    style={{ clipPath: `inset(0 ${100 - x}% 0 0)` }}
                />

                {/* slider rail */}
                <div
                    className="absolute inset-y-0"
                    style={{ left: `${x}%`, transform: "translateX(-50%)" }}
                >
                    <div className="h-full w-px bg-white/80" />
                    <div className="absolute -top-7 -translate-x-1/2 text-white">{knife}</div>
                </div>

                {/* input for keyboard users */}
                <input
                    type="range"
                    min={0}
                    max={100}
                    value={Math.round(x)}
                    onChange={(e) => setX(clamp(Number(e.target.value)))}
                    className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[70%] accent-current"
                    aria-label="Slide knife to cut"
                />
            </div>

            <div className="mt-2 text-xs text-muted-foreground">
                Drag the knife or use the slider to “cut” and reveal the FE result.
            </div>
        </div>
    );
}
