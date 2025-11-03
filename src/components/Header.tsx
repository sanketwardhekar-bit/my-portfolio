"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Sun, Moon, FileDown } from "lucide-react";

// If you prefer, pass this in as a prop or import from your PROFILE file
const RESUME_URL = "/Sanket_Wardhekar.pdf";

function useTheme() {
    const [theme, setTheme] = useState<"light" | "dark">(() => {
        if (typeof window === "undefined") return "light";
        return (
            (localStorage.getItem("theme") as "light" | "dark") ||
            (window.matchMedia &&
                window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light")
        );
    });

    useEffect(() => {
        if (typeof document !== "undefined") {
            document.documentElement.classList.toggle("dark", theme === "dark");
            localStorage.setItem("theme", theme);
        }
    }, [theme]);

    return { theme, setTheme };
}

export default function Header() {
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();

    const NavItem = ({ href, label }: { href: string; label: string }) => (
        <Link
            href={href}
            className={`px-3 py-2 text-sm hover:opacity-80 ${pathname === href ? "font-semibold underline underline-offset-4" : "text-foreground/80"
                }`}
        >
            {label}
        </Link>
    );

    return (
        <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
            <div className="max-w-[90rem] mx-auto px-6 lg:px-8 h-14 flex items-center justify-between">
                {/* Brand */}
                <Link href="/" className="font-bold">Sanket Wardhekar</Link>

                {/* Main nav */}
                <nav className="flex items-center gap-1">
                    <NavItem href="/" label="Home" />
                    <NavItem href="/projects" label="Projects" />
                    <NavItem href="/publications" label="Publications" />
                </nav>

                {/* Actions: theme + resume */}
                <div className="flex items-center gap-2">
                    <button
                        aria-label="Toggle theme"
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="p-2 rounded hover:bg-muted"
                        title="Toggle theme"
                    >
                        {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                    </button>

                    <a
                        href={RESUME_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-sm px-3 py-1.5 rounded-md bg-primary text-primary-foreground hover:opacity-90"
                    >
                        <FileDown className="h-4 w-4" /> Resume
                    </a>
                </div>
            </div>
        </header>
    );
}
