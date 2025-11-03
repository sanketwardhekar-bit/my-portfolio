"use client";
import { useState } from "react";

export default function CopyBibButton({ bibtex }: { bibtex?: string }) {
    const [copied, setCopied] = useState(false);
    if (!bibtex) return null;

    const onCopy = async () => {
        try {
            await navigator.clipboard.writeText(bibtex);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch { }
    };

    return (
        <button
            type="button"
            onClick={onCopy}
            className="text-sm underline underline-offset-4"
            aria-live="polite"
        >
            {copied ? "Copied!" : "Copy BibTeX"}
        </button>
    );
}
