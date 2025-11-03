"use client";

import React, { useEffect, useMemo, useState, useRef } from "react";
import {
  Mail, Phone, Linkedin, ArrowUp, Sun, Moon, Tag, FileDown, Wrench, GraduationCap, FlaskConical,
  PhoneCall, ChevronLeft, ChevronRight, Sparkles, MapPin
} from "lucide-react";

/* ========= YOUR DATA ========= */
const PROFILE = {
  name: "Sanket Wardhekar",
  role: "PhD Candidate",
  tagline: "Computational Mechanics · Finite Element Analysis · Fracture Mechanics",
  location: "Stony Brook, NY, USA",
  email: "sanketvinod.wardhekar@stonybrook.edu",
  phone: "+1 (631) 710-9474",
  headshotUrl: "/sanket_headshot.jpg",
  resumeUrl: "/Sanket_Wardhekar.pdf",
  socials: {
    linkedin: "https://www.linkedin.com/in/sanket-wardhekar/",
    scholar: "https://scholar.google.com/citations?user=8cZoPWcAAAAJ&hl=en",
  },
};

type Highlight = {
  image: string;
  alt: string;
  title: string;
  subtitle?: string;
  description: string;
  tags?: string[];
  linkLabel?: string;
  linkHref?: string;
};


const HIGHLIGHT_SLIDES: Highlight[] = [
  {
    image: "/ping.jpg",
    alt: "Summer Interns at PING",
    title: "Internship at PING - Summer' 25",
    subtitle: "May-Aug 2025 · Phoenix, AZ",
    description:
      "Contributed to Golf Science department as an Finite Element Analysis Intern under Dr. Erik Henrikson. Got accolade from the President John K. Solheim for the contribution.",
    tags: ["FEA", "Internship", "Golf"]
  },
  {
    image: "/ssdmc.png",
    alt: "SSDM 2025",
    title: "Technical Presentation at ASME SSDM Conference 2025",
    subtitle: "May 2025 · Houston, TX",
    description:
      "Delivered a technical presentation on polymer fracture and constitutive modeling, engaged with leading experts in the field, and strengthened professional networks within the mechanics and materials community.",
    tags: ["Conference", "Presentation", "ASME"],
  },
  {
    image: "/ra_ow.jpg",
    alt: "Recieving Award for the Initiative as a RA",
    title: "Outstanding Wellness Initiative as Resident Assistant",
    subtitle: "May 2025 · Stony Brook, NY",
    description:
      "Recognized with the Outstanding Wellness Initiative Award for creating and leading impactful programs that promoted student well-being, and supported a positive residential experience at Stony Brook University.",
    tags: ["Resident Assistant", "SBU", "Award"]
  },
];

/* ========= UTILITIES ========= */

// simple dark mode toggle (no animations)
function useTheme() {
    const [theme, setTheme] = useState<"light" | "dark">(() => {
        if (typeof window === "undefined") return "light";
        const stored = localStorage.getItem("theme") as "light" | "dark" | null;
        return stored === "dark" ? "dark" : "light";
    });
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", theme === "dark");
      localStorage.setItem("theme", theme);
    }
  }, [theme]);
  return { theme, setTheme };
}

const SECTION_IDS = ["home", "highlights", "about", "contact"] as const;
type Section = (typeof SECTION_IDS)[number];

function useActiveSection() {
  const [active, setActive] = useState<Section>("home");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const id = e.target.getAttribute("id") as Section | null;
            if (id) setActive(id);
          }
        });
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return active;
}

// scroll-up button (no animation)
function ScrollUp() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 rounded-full p-3 shadow bg-primary text-primary-foreground hover:opacity-90"
      aria-label="Scroll to top"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}

/* ========= SECTIONS ========= */

function Header() {
  const active = useActiveSection();
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/60 bg-background/80 border-b">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 h-14 flex items-center justify-between">
        <a href="#home" className="font-semibold tracking-tight">
          {PROFILE.name.split(" ")[0]}
          <span className="text-primary">.</span>
        </a>

        <nav className="hidden md:flex gap-6 text-sm">
          {SECTION_IDS.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className={`uppercase tracking-wide hover:text-primary transition ${
                active === id ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {id}
            </a>
          ))}
        </nav>

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
                      href="/Sanket_Wardhekar.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hidden sm:inline-flex items-center gap-1 text-sm px-3 py-1.5 rounded-md bg-primary text-primary-foreground hover:opacity-90 relative z-[60] pointer-events-auto"
                  >
                      Resume
                  </a>
        </div>
      </div>
    </header>
  );
}

function SectionShell({
  id,
  title,
  subtitle,
  children,
}: {
  id: Section;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-16">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
          {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}

function HomeSection() {
  const KEYWORDS = [
    "Computational Modeling",
    "Finite Element Analysis",
    "Fracture Mechanics",
    "Composite Materials",
  ];

  const universityName = "Stony Brook University";
  const universityUrl = "https://www.stonybrook.edu/";
  const universityLogo = "/sbu-logo.png";

  const telHref = `tel:${PROFILE.phone.replace(/[^\d+]/g, "")}`;

  return (
    <section id="home" className="scroll-mt-16">
      {/* Wider container + tighter vertical spacing (no huge min-height) */}
      <div className="max-w-[90rem] mx-auto px-6 lg:px-8 pt-10 pb-6">
        {/* PHOTO LEFT, TEXT RIGHT */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
          {/* Left: Photo (slightly larger on wide screens) */}
          <img
            src={PROFILE.headshotUrl}
            alt={`${PROFILE.name} headshot`}
            className="w-44 h-44 sm:w-52 sm:h-52 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-2xl object-cover object-top shadow border"
            loading="eager"
            fetchPriority="high"
          />

          {/* Right: Text */}
          <div className="flex-1">
            {/* BIG name */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
              {PROFILE.name}
            </h1>

            {/* Role + university with logo (force black/white) */}
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="text-2xl sm:text-3xl md:text-4xl font-semibold !text-black dark:!text-white leading-tight">
                PhD Researcher ({universityName})
              </span>
              <a
                href={universityUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center"
                title="Stony Brook University"
              >
                <img src={universityLogo} alt="Stony Brook University" className="h-8 w-auto rounded-sm" />
              </a>
            </div>

            {/* Keywords */}
            <div className="mt-3 flex flex-wrap gap-2">
              {KEYWORDS.map((k) => (
                <span
                  key={k}
                  className="px-3 py-1.5 rounded-full font-medium bg-muted/80 text-foreground/90 border text-sm sm:text-base"
                >
                  {k}
                </span>
              ))}
            </div>

            {/* Buttons (slightly tighter top margin) */}
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href={`mailto:${PROFILE.email}`}
                className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 inline-flex items-center gap-2"
              >
                <Mail className="h-4 w-4" /> Email me
              </a>
              <a
                href={PROFILE.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-md border text-sm font-medium hover:bg-muted inline-flex items-center gap-2"
              >
                <Linkedin className="h-4 w-4" /> Connect on LinkedIn
              </a>
              <a
                href={PROFILE.socials.scholar}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-md border text-sm font-medium hover:bg-muted inline-flex items-center gap-2"
              >
                <GraduationCap className="h-4 w-4" /> Google Scholar
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function RecentHighlights() {
  const [i, setI] = useState(0);
  const len = HIGHLIGHT_SLIDES.length;
  const prev = () => setI((v) => (v - 1 + len) % len);
  const next = () => setI((v) => (v + 1) % len);

  // touch swipe
  const touchX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => (touchX.current = e.touches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 40) (dx > 0 ? prev() : next());
    touchX.current = null;
  };

  const s = HIGHLIGHT_SLIDES[i];
  const progressPct = ((i + 1) / len) * 100;

  return (
    // pulled up slightly to reduce white space from previous section
    <section id="highlights" className="scroll-mt-16 pt-6 pb-12 -mt-2">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-8">
        {/* Trendy header */}
        <div className="mb-4">
          <h2 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight">
            RECENT HIGHLIGHTS
          </h2>

          {/* progress bar instead of 1/3 text */}
          <div className="mt-3 h-1.5 w-full rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-primary transition-[width] duration-300"
              style={{ width: `${progressPct}%` }}
              aria-label="Highlights progress"
            />
          </div>
        </div>

        {/* One cohesive hero-card with gradient border + glass overlay */}
        <div
          className="relative rounded-3xl p-[2px] bg-gradient-to-r from-primary/40 via-primary/10 to-transparent shadow-lg"
        >
          <div
            className="relative rounded-3xl overflow-hidden border bg-black/5 h-[380px] sm:h-[420px] md:h-[480px]"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            tabIndex={0}
            role="region"
            aria-label="Recent highlights carousel"
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") prev();
              if (e.key === "ArrowRight") next();
            }}
          >
            {/* Background crossfade */}
            {HIGHLIGHT_SLIDES.map((slide, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 transition-opacity duration-500 ease-out ${
                  idx === i ? "opacity-100" : "opacity-0"
                }`}
                aria-hidden={idx !== i}
              >
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className="h-full w-full object-cover"
                  draggable={false}
                />
                {/* subtle veil for legibility */}
                <div className="absolute inset-0 bg-black/30" />
              </div>
            ))}

            {/* Overlay content: bottom on mobile, right on md+ */}
            <div className="absolute inset-0">
              <div className="h-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="h-full flex items-end md:items-center">
                  <div className="w-full md:w-auto md:ml-auto md:max-w-[48ch]">
                    <div className="backdrop-blur-md bg-black/25 md:bg-black/20 text-white rounded-2xl p-4 sm:p-6 md:p-7 shadow-xl">
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight">
                        {s.title}
                      </h3>
                      {s.subtitle && (
                        <p className="text-xs sm:text-sm text-white/85 mt-1">{s.subtitle}</p>
                      )}
                      <p className="mt-3 text-sm sm:text-base leading-relaxed text-white/95">
                        {s.description}
                      </p>
                      {s.tags?.length ? (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {s.tags.map((t) => (
                            <span key={t} className="px-2 py-0.5 rounded-full text-[11px] sm:text-xs bg-white/20">
                              {t}
                            </span>
                          ))}
                        </div>
                      ) : null}
                      {s.linkHref && (
                        <div className="mt-4">
                          <a
                            href={s.linkHref}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-md border border-white/30 px-3 py-2 text-sm hover:bg-white/10"
                          >
                            <GraduationCap className="h-4 w-4" />
                            {s.linkLabel ?? "Learn more"}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Compact in-card arrows */}
            <button
              onClick={prev}
              aria-label="Previous"
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/15 hover:bg-white/25 text-white border border-white/30"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={next}
              aria-label="Next"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/15 hover:bg-white/25 text-white border border-white/30"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function AboutMeSection() {
  const ABOUT_TEXT = `
I’m currently pursuing my PhD in Mechanical Engineering at Stony Brook University, where I study how materials fracture and deform under stress. Beyond research, I’m passionate about translating that understanding into purposeful design, creating materials and simulations that make engineering decisions smarter, faster, and more reliable. My goal is to keep bridging theory and application to solve real world mechanical challenges.  `.trim();

  return (
    <section id="about" className="scroll-mt-16">
      {/* Background image */}
      <div
        className="relative w-full overflow-hidden bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/about-bg.jpg')", backgroundSize: "cover" }}
      >
        {/* Top & bottom fades + subtle veil */}
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-t from-transparent to-background" />
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-transparent to-background" />
        <div className="absolute inset-0 bg-black/25" />

        {/* Centered content */}
        <div className="relative z-10 max-w-[90rem] mx-auto px-6 lg:px-8 py-16 sm:py-20 md:py-24">
          {/* Gradient rim wrapper */}
          <div className="mx-auto w-full max-w-6xl rounded-[28px] p-[2px] bg-gradient-to-br from-white/25 via-white/10 to-white/5 shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
            {/* Frosted glass card */}
            <div className="rounded-[26px] border border-white/25 bg-white/12 backdrop-blur-xl">
              <div className="px-8 sm:px-12 md:px-16 lg:px-20 py-10 sm:py-12 md:py-16">
                <h2 className="text-center text-white font-bold tracking-tight
                                text-4xl sm:text-5xl md:text-6xl">
                  About Me
                </h2>

                <p className="mt-7 mx-auto text-center text-white/95 whitespace-pre-line
                               max-w-5xl
                               text-xl sm:text-2xl md:text-[1.6rem]
                               leading-8 sm:leading-10 md:leading-[2.2rem]">
                  {ABOUT_TEXT}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ContactSection() {
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/xdkwwjeb"; // <-- replace with yours

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      // send as multipart/form-data so Formspree parses it easily
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("email", form.email);
      fd.append("message", form.message);
      // (optional) set a subject visible in Formspree/email
      fd.append("_subject", `Website contact from ${form.name}`);

      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: fd,
        headers: { Accept: "application/json" },
      });

      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
      formRef.current?.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="scroll-mt-16 pt-10 pb-16">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Leave Me A Message!</h2>

        <form ref={formRef} onSubmit={handleSubmit} className="mt-6 rounded-2xl border p-5 bg-card shadow-sm">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Your name</label>
              <input
                required
                name="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 ring-primary/30"
                placeholder="Jane Doe"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Email</label>
              <input
                required
                type="email"
                name="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 ring-primary/30"
                placeholder="jane@example.com"
              />
            </div>
            <div className="sm:col-span-2 space-y-1.5">
              <label className="text-sm font-medium">Message</label>
              <textarea
                required
                rows={5}
                name="message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 ring-primary/30"
                placeholder="How can I help?"
              />
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90 disabled:opacity-60"
            >
              <Mail className="h-4 w-4" />
              {status === "sending" ? "Sending…" : "Send message"}
            </button>

            {status === "success" && (
              <span className="text-sm text-green-600">Thanks! I’ll get back to you soon.</span>
            )}
            {status === "error" && (
              <span className="text-sm text-red-600">Something went wrong. Please try again.</span>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-6 text-sm text-muted-foreground flex items-center justify-between">
        <p>© {new Date().getFullYear()} {PROFILE.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}

/* ========= PAGE ========= */

export default function SanketPortfolio() {
  return (
    <div className="bg-background text-foreground">
      <HomeSection />
      <RecentHighlights />
      <AboutMeSection />
      <ContactSection />
      <Footer />
      <ScrollUp />
    </div>
  );
}
