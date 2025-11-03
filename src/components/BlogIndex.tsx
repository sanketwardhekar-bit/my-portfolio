"use client";

import { useEffect, useMemo, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Post = {
    slug: string;
    title: string;
    date: string;
    summary: string;
    tags?: string[];
    content?: string;
};

export default function BlogIndex({ posts }: { posts: Post[] }) {
    const router = useRouter();
    const pathname = usePathname();
    const search = useSearchParams();

    const openSlug = search.get("post") || null;
    const openPost = useMemo(
        () => posts.find((p) => p.slug === openSlug) || null,
        [openSlug, posts]
    );

    const onOpen = (slug: string) => {
        const params = new URLSearchParams(search?.toString());
        params.set("post", slug);
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const onClose = () => {
        const params = new URLSearchParams(search?.toString());
        params.delete("post");
        const qs = params.toString();
        router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    };

    // Close on ESC
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape" && openPost) onClose();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [openPost]);

    // Focus the panel when it opens
    const panelRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (openPost && panelRef.current) {
            panelRef.current.focus();
        }
    }, [openPost]);

    return (
        <>
            {/* List */}
            <div className="divide-y">
                {posts
                    .slice()
                    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
                    .map((p) => (
                        <article key={p.slug} className="py-4">
                            <button
                                onClick={() => onOpen(p.slug)}
                                className="group w-full text-left rounded-xl border bg-card p-4 hover:shadow-sm transition"
                            >
                                <div className="text-xs text-muted-foreground">
                                    {new Date(p.date).toLocaleDateString(undefined, {
                                        year: "numeric",
                                        month: "short",
                                        day: "2-digit",
                                    })}
                                </div>
                                <h2 className="mt-0.5 text-lg md:text-xl font-semibold leading-snug group-hover:underline underline-offset-4">
                                    {p.title}
                                </h2>
                                <p className="mt-1 text-sm text-muted-foreground">{p.summary}</p>
                                {p.tags?.length ? (
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {p.tags.map((t) => (
                                            <span key={t} className="px-2 py-0.5 rounded-full text-[11px] bg-muted">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                ) : null}
                            </button>
                        </article>
                    ))}
            </div>

            {/* Backdrop (hidden until a post is open) */}
            <div
                className={`fixed inset-0 z-40 transition ${openPost
                        ? "backdrop-blur-sm bg-black/20 opacity-100"
                        : "pointer-events-none opacity-0"
                    }`}
                onClick={onClose}
                aria-hidden={openPost ? "false" : "true"}
            />

            {/* Slide-over panel */}
            <div
                role="dialog"
                aria-modal="true"
                aria-label={openPost ? openPost.title : "Article"}
                tabIndex={-1}
                ref={panelRef}
                className={`fixed right-0 top-0 bottom-0 z-50 w-full sm:max-w-xl md:max-w-2xl border-l bg-background shadow-2xl outline-none transition-transform duration-300 ${openPost ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Header */}
                <div className="flex items-start justify-between gap-3 p-4 border-b">
                    <div>
                        <div className="text-xs text-muted-foreground">
                            {openPost
                                ? new Date(openPost.date).toLocaleDateString(undefined, {
                                    year: "numeric",
                                    month: "short",
                                    day: "2-digit",
                                })
                                : ""}
                        </div>
                        <h3 className="text-lg md:text-xl font-semibold leading-snug">
                            {openPost?.title ?? ""}
                        </h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="rounded-md px-2 py-1 text-sm hover:bg-muted"
                        aria-label="Close"
                    >
                        Close ✕
                    </button>
                </div>

                {/* Body */}
                <div className="h-full overflow-y-auto p-4">
                    {openPost ? (
                        <>
                            <p className="text-sm text-muted-foreground">{openPost.summary}</p>
                            <div className="prose prose-sm dark:prose-invert mt-4 max-w-none">
                                <p>{openPost.content ?? "…"}</p>
                                {/* Replace with your MDX renderer if desired */}
                            </div>
                        </>
                    ) : null}
                </div>
            </div>
        </>
    );
}
