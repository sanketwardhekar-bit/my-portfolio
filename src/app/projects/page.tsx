import Image from "next/image";
import CodeDialog from "@/components/CodeDialog";
import ProjectSlideOver from "@/components/ProjectSlideOver";
import { Suspense } from "react";

export const metadata = {
    title: "Work & Projects — Sanket Wardhekar",
    description: "Combined experience and projects with expandable, structured details.",
};

/* =========================
   Types
   ========================= */
type Metric = { label: string; value: string };

type ContentBlock =
    | ({ type: "h3"; text: string } & { fullWidth?: boolean; rightCol?: boolean })
    | ({ type: "p"; text: string } & { fullWidth?: boolean; rightCol?: boolean })
    | ({ type: "ul"; items: string[] } & { fullWidth?: boolean; rightCol?: boolean })
    | ({
        type: "img";
        src: string;
        alt: string;
        rightCol?: boolean;
        caption?: string;
        className?: string;
    } & { fullWidth?: boolean })
    | ({ type: "codeModal"; label?: string; file: string; height?: number } & {
        fullWidth?: boolean;
        rightCol?: boolean;
    })
    | ({
        type: "table";
        headers: string[];
        rows: string[][];
        caption?: string;
        dense?: boolean;
        fullWidth?: boolean;
        rightCol?: boolean;
    })
    | ({ type: "cutter"; before: string; after: string; label?: string } & { fullWidth?: boolean; rightCol?: boolean })
    | ({
        type: "codeFrame";
        src: string;        // e.g. "/Kriging.html" (must be in /public)
        height?: number;    // px, default 720
        title?: string;     // optional heading text above frame
        fullWidth?: boolean;
        rightCol?: boolean;
    })
    | ({
        type: "grid5";
        cards: Array<{
            title: string;
            desc: string;
            image: string;
            span2?: boolean;
            imageClass?: string;
        }>;
        fullWidth?: boolean;
        rightCol?: boolean;
    });

type BaseItem = {
    id: string;
    kind: "work" | "project";
    title: string;
    summary: string;
    tags?: string[];
    outcomes?: Metric[];
    content: ContentBlock[];
    links?: { label: string; href: string }[];
    logo?: string;
    logoAlt?: string;
};

type WorkItem = BaseItem & {
    kind: "work";
    company: string;
    location?: string;
    period: string;
};

type ProjectItem = BaseItem & {
    kind: "project";
    year?: string;
    role?: string;
    tools?: string[];
};

type Item = WorkItem | ProjectItem;

/* =========================
   Data
   ========================= */
const items: Item[] = [
    {
        id: "ping-fea-intern-2025",
        kind: "work",
        title: "Finite Element Analysis Intern at PING",
        company: "PING (Golf Science)",
        location: "Phoenix, AZ",
        period: "May–Aug 2025",
        summary:
            "Developed and validated anisotropic material modeling and impact FEA for metal faceplates and a pre-launch product, delivering a reusable workflow, data-backed design guidance, and measurable performance gains.",
        tags: ["LS-DYNA", "Hypermesh", "PTC Creo", "Impact FEA", "Material Modeling"],
        logo: "/ping.png",
        logoAlt: "PING logo",
        content: [
            { type: "h3", text: "Project 1 — Titaniunm Alloy Material Model for Golf Driver Faceplate" },
            {
                type: "ul",
                items: [
                    "Replaced the isotropic assumption with an anisotropic elastic–plastic model to better capture directional behavior of the faceplate.",
                    "Calibrated and validated the model with ball-impact simulations, matching measured response trends (deflection, stress distribution, and rebound behavior).",
                    "Reviewed &#963;<sub>x</sub>, &#963;<sub>y</sub>, &#964;<sub>xy</sub>, and &#963;<sub>vm</sub> (von Mises) to locate weak links and select properties.",
                ],
            },
            { type: "p", text: "Impact: Durability ↑ ~17% · Performance ↑ ~4%." },
            {
                type: "img",
                src: "/plate-impact.gif",
                alt: "Ball impact on metallic plate (representative GIF)",
                caption: "Impact simulations demonstration (NDA safe) of golf ball on driver faceplate.",
                className: "w-3/4 mx-auto",
            },
            {
                type: "img",
                src: "/von_mises.png",
                alt: "von Mises fringe comparison for two setups",
                caption:
                    "The von Mises fringe plots sharply separate the two setups, yet they report only the combined load state. Therefore, the individual stress components are assessed below alongside von Mises to pinpoint the true weak link for it.",
                className: "w-3/4 mx-auto",
            },
            { type: "h3", text: "Project 2 — FEA Framework for Pre-Launced Product" },
            {
                type: "ul",
                items: [
                    "Lead to build a full impact simulation stack from scratch: CAD in PTC Creo, meshing in Hypermesh, and LS-DYNA model.",
                    "Validated with impact test data (force–time, acceleration, deformation modes).",
                    "Delivered design change recommendations that increased modeled performance by 12.6% while staying within constraints.",
                ],
            },
            { type: "p", text: "Impact: Performance ↑ ~12.6%." },
        ],
    },

    {
        id: "microplane-polymer",
        kind: "project",
        title: "Microplane Constitutive Model for Polymers",
        summary:
            "Microplane based constitutive model which captures various mechanical behavior of polymers, formulated with proper calibration procedure. Model validated with uni-/triaxial loading data and outperformed traditional models.",
        tags: ["Abaqus", "Python", "FORTRAN", "Damage Mechanics", "MATLAB"],
        year: "2025",
        role: "Modeling & Implementation",
        tools: ["Abaqus/Explicit", "Fortran (VUMAT)", "Python", "MATLAB"],
        logoAlt: "ASME",
        content: [
            { type: "h3", text: "Model Overview" },
            {
                type: "p",
                text:
                    "The way brittle polymers break and deform under different kinds of forces is quite complicated. They behave very differently in tension compared to compression, and their strength changes with pressure. Traditional mathematical models often struggle to capture these effects accurately. This work introduces a new version of the microplane model that explains these behaviors by looking at what happens inside the material i.e., how tiny cracks and slips develop at the microscopic level.",
            },

            { type: "h3", text: "Key Innovations and Model Capabilities" },
            {
                type: "ul",
                items: [
                    "Each segment of the stress–strain curve is controlled by distinct damage mechanisms in the model. This separation allows direct micromechanical interpretation of how the material responds under different loading conditions.",
                    "A volumetric–deviatoric split of the normal microplane component enables the model to reproduce Poisson’s ratios greater than 0.25, a characteristic behavior unique to polymers that conventional models fail to capture.",
                    "The model successfully predicted both uniaxial tension and triaxial compression behavior using only compression-based calibration. With full calibration, it accurately reproduced complex multiaxial responses, including size-dependent three-point bending, while matching the target fracture energy.",
                ],
            },

            {
                type: "img",
                src: "/MM_2.jpg",
                alt: "Illustration of microplane modeling for polymer",
                caption: "Illustration of microplane modeling for polymer.",
                className: "w-3/4 mx-auto",
            },

            { type: "h3", text: "Tools and Computational Framework" },
            {
                type: "ul",
                items: [
                    "<strong>Material coding:</strong> Fortran implementation as a user-defined material (VUMAT) in Abaqus/Explicit.",
                    "<strong>Model setup:</strong> 3D geometry creation/import, assembly of test fixture, realistic boundary conditions, and contact definitions.",
                    "<strong>Meshing:</strong> Structured/unstructured meshes applied across all assembly components with convergence-aware sizing.",
                    "<strong>Simulation runs:</strong> Explicit finite element analyses to evaluate multiaxial response and damage evolution.",
                    "<strong>Post-processing:</strong> Custom Python scripts for data extraction, visualization, and comparative analysis.",
                ],
            },

            {
                type: "img",
                src: "/mm_3.png",
                alt: "Uniaxial tension and compression behavior calibration for the epoxy resin",
                caption:
                    "(a) Uniaxial tension and (b) uniaxial compression stress–strain curves used for model calibration. The experimental data are compared with simulation results, showing accurate reproduction of material behavior.",
                className: "w-3/4 mx-auto",
            },
        ],
    },

    {
        id: "material-characterization-epoxy",
        kind: "project",
        title: "Material Characterization of Cured Epoxy Resin",
        summary:
            "Comprehensive experimental study capturing tensile, compressive, flexural, and viscoelastic behavior of lab-cured epoxy resin. Data provided a complete benchmark for constitutive and fracture model validation, linking microstructural damage to macroscopic response.",
        tags: ["Instron Testing", "Tension", "Compression", "3-Point Bending", "SEM", "DMA", "Fracture Mechanics"],
        content: [
            {
                type: "grid5",
                fullWidth: true,
                cards: [
                    {
                        title: "1) Uniaxial Tension",
                        desc:
                            "Dog-bone epoxy specimens tested under displacement control. Full stress–strain curve captured, revealing linear elasticity followed by brittle fracture and post-peak softening. Strain gauges recorded both longitudinal and transverse strain for Poisson’s ratio estimation.",
                        image: "/ten_spec.png",
                    },
                    {
                        title: "2) Uniaxial Compression",
                        desc:
                            "Cylindrical epoxy specimens tested between lubricated platens. Exhibited ductile yielding with pressure sensitivity and mild strain hardening. Results characterized compressive strength and volumetric behavior for calibration of plastic and damage laws.",
                        image: "/comp_spec.png",
                    },
                    {
                        title: "3) Three-Point Bending",
                        desc:
                            "Notched epoxy beams in 1:2:4 geometry ratios tested under quasi-static loading to evaluate size effect and fracture energy. Stable notch propagation confirmed SEL calibration and consistency across specimen sizes.",
                        image: "/se_spec.png",
                    },
                    {
                        title: "4) DMA",
                        desc:
                            "Dynamic Mechanical Analysis performed over a temperature sweep to measure storage (E′) and loss (E″) moduli. Glass transition temperature (Tg) identified from tanδ peak, showing modulus drop across the transition region and confirming viscoelastic behavior.",
                        image: "/dma_spec.png",
                    },
                ],
            },
        ],
    },

    {
        id: "mohr-coulomb-regression",
        kind: "project",
        title: "Determination of Material Model Parameters using Regression-Based Architecture",
        summary:
            "A Python–Abaqus pipeline that learns the mapping from Mohr–Coulomb features to stress responses at target strains, enabling rapid parameter inference and design insight without exhaustive testing.",
        tags: ["Regression", "DOE", "Feature Extraction", "Mohr–Coulomb"],
        content: [
            { type: "h3", text: "Model Overview" },
            {
                type: "p",
                text:
                    "Plasticity models like Mohr–Coulomb require multiple parameters that are costly to obtain from physical testing. This work replaces most of that effort with a simulation-driven, regression-based architecture. We generate synthetic data with Abaqus, then train regressors that predict stress at target strains from model parameters, enabling quick parameter studies and sensitivity insight.",
            },

            { type: "h3", text: "Key Capabilities & Findings" },
            {
                type: "ul",
                items: [
                    "Each response i.e.,stress at multiple strain values, is modeled explicitly, giving clear interpretability across the stress–strain curve.",
                    "Latin Hypercube Sampling (LHS) delivers superior space filling (lower discrepancy) than random sampling.",
                    "PCA/correlation show angle of friction dominates variability and influences all stress targets.",
                    "Polynomial regression consistently outperforms linear baselines while remaining lightweight and fast to evaluate.",
                ],
            },
            {
                type: "codeFrame",
                src: "/ML_Model.html",
                height: 720,
                title: "Regression Notebook (HTML)",
            },

            {
                type: "img",
                src: "/architecture.png",
                alt: "Architecture: DOE → Abaqus → extraction → regression",
                caption: "Automated pipeline from sampling to train regression model.",
            },
            {
                type: "table",
                rightCol: true,
                caption: "Goodness-of-fit comparison for Linear vs Polynomial regression.",
                headers: ["Metric", "Linear Regression", "Polynomial Regression"],
                rows: [
                    ["MAE", "37.549", "30.528"],
                    ["MSE", "2401.032", "3121.485"],
                    ["RMSE", "49", "49"],
                    ["R² (Training)", "0.690", "0.912"],
                    ["R² (Test)", "0.701", "0.837"],
                ],
                dense: false,
            },
        ],
    },

    {
        id: "robotic-cutting",
        kind: "project",
        title: "Cohesive Zone Model for Robotic Cutting",
        summary:
            "Developed a finite element model using cohesive elements to simulate robotic knife cutting. The model captures crack initiation, propagation, and cutting forces, enabling pre-cut material property prediction.",
        tags: ["Cohesive Zone Model", "Robotics", "Surgical Simulation", "Soft Tissue"],
        content: [
            { type: "h3", text: "Model Overview" },
            {
                type: "p",
                text:
                    "The study investigates the mechanics of robotic cutting using finite element simulations based on cohesive zone modeling. By defining realistic cohesive laws for the material–blade interface, the model replicates crack initiation and progression observed during knife penetration. The objective is to predict the mechanical behavior and cutting resistance of the workpiece prior to actual cutting.",
            },
            {
                type: "img",
                src: "/cutting1.png",
                alt: "Experimental setup of robotic cutting and reaction force measurement",
                caption: "Reference cutting experiment showing incision stages and reaction force profile [Mu et al., ICRA 2019].",
                rightCol: true,
                className: "w-3/4 mx-auto",
            },
            { type: "h3", text: "Key Innovations and Model Capabilities" },
            {
                type: "ul",
                items: [
                    "Implemented a traction–separation cohesive law to simulate crack opening and shear sliding during knife–material interaction.",
                    "Introduced a mixed-mode fracture criterion to capture both normal and tangential failure mechanisms.",
                    "Validated simulation cutting forces against experimental data from the reference study.",
                    "Enabled parametric variation of material fracture energy and stiffness to predict cutting resistance across different specimens.",
                ],
            },
            {
                type: "img",
                src: "/cutting2.gif",
                alt: "Cohesive zone finite element simulation of cutting",
                caption: "Abaqus simulation showing stress evolution and crack advance during knife penetration.",
                rightCol: true,
                className: "w-3/4 mx-auto",
            },
            { type: "h3", text: "Tools & Computational Framework" },
            {
                type: "ul",
                items: [
                    "<strong>Software:</strong> Abaqus/Explicit for cohesive zone simulation.",
                    "<strong>Material Modeling:</strong> Traction–separation law for damage initiation and evolution (mixed-mode).",
                    "<strong>Geometry:</strong> Knife and sample modeled in 3D; symmetry used to reduce computation cost.",
                    "<strong>Meshing:</strong> Fine cohesive mesh near contact zone for accurate crack propagation.",
                    "<strong>Post-processing:</strong> Cutting force and crack length evolution extracted via Python scripting.",
                ],
            },
        ],
    },

    {
        id: "trddc",
        kind: "work",
        title: "Surrogate-Based Genetic Optimization for an Airplane Wing Box",
        company: "Tata Research Development and Design Centre (TRDDC)",
        location: "Pune, India",
        period: "Aug 2020 – Jun 2021",
        logo: "/trddclogo.png",
        tags: ["Machine Learning", "Optimization", "Uncertainty Quantification"],
        summary:
            "Developed and demonstrated a surrogate-based genetic optimization framework for designing an airplane wing box that remains reliable under uncertainty.",
        content: [
            { type: "h3", text: "Project Overview" },
            {
                type: "p",
                text:
                    "The project focuses on developing a robust optimization framework for the design of an airplane wing box under system and material uncertainties. The objective is to identify design configurations that achieve an optimal balance between lightweight structure and high structural reliability. Using a surrogate-based genetic optimization approach, the framework integrates DOE, finite element simulations, Kriging surrogate modeling, and multi-objective genetic algorithms.",
            },
            { type: "h3", text: "Key Innovations and Capabilities" },
            {
                type: "ul",
                items: [
                    "Combined Latin Hypercube Sampling, Kriging surrogate modeling, and multi-objective Genetic Algorithms into a single framework for robust structural design.",
                    "Incorporated system and material uncertainties directly into the optimization process to obtain robust rather than purely optimal solutions.",
                    "Used surrogate modeling to replace repeated finite element simulations, cutting down optimization time while maintaining high prediction accuracy.",
                    "Simultaneously minimized total volume and Tsai-Wu failure index, yielding a Pareto front that visualizes trade-offs between lightweight and structural safety.",
                    "Applicable beyond the wing box case study to other aerospace or mechanical components requiring robust, multi-objective optimization under uncertainty.",
                ],
            },
            {
                type: "img",
                src: "/trddc_1.png",
                alt: "Sensitivity map of variables affecting volume and Tsai-Wu index",
                caption:
                    "Sensitivity map showing how material and geometric variables influence Total Volume and Tsai-Wu Index in the wing box design.",
                className: "w-3/4 mx-auto",
            },
            {
                type: "codeFrame",
                src: "/Kriging.html",
                height: 720,
                title: "Kriging Surrogate (HTML)",
            },
            {
                type: "img",
                src: "/trddc_2.png",
                alt: "Runtime comparison: Kriging surrogate vs full FEA",
                caption: "Comparison of computation time showing Kriging surrogate runs significantly faster than full FEA simulations.",
                className: "w-3/4 mx-auto",
            },
        ],
    }

];

/* =========================
   Helpers
   ========================= */
function TypeBadge({ kind }: { kind: Item["kind"] }) {
    return (
        <span
            className={`px-2 py-0.5 rounded-full text-[11px] tracking-wide ${kind === "work"
                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200"
                    : "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-200"
                }`}
        >
            {kind === "work" ? "Work" : "Project"}
        </span>
    );
}

function InlineTags({ items }: { items?: string[] }) {
    if (!items?.length) return null;
    return (
        <div className="mt-1 md:mt-0 flex flex-wrap items-center gap-1.5 md:gap-2 md:justify-end md:min-w-[260px]">
            {items.map((t) => (
                <span
                    key={t}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-gradient-to-b from-muted/70 to-muted/40 border border-black/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] text-foreground/80 backdrop-blur-sm"
                    title={t}
                >
                    <span className="h-1.5 w-1.5 rounded-full bg-primary/70 ring-1 ring-primary/25" />
                    <span className="tracking-wide">{t}</span>
                </span>
            ))}
        </div>
    );
}

function OutcomeTiles({ items }: { items?: Metric[] }) {
    if (!items?.length) return null;
    return (
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((m) => (
                <div key={m.label} className="rounded-2xl border p-4 bg-card">
                    <div className="text-xs uppercase text-muted-foreground">{m.label}</div>
                    <div className="text-lg font-semibold mt-0.5">{m.value}</div>
                </div>
            ))}
        </div>
    );
}

/** Render a single content block */
function RenderBlock(b: ContentBlock, key: number) {
    if (b.type === "h3") {
        return (
            <h3 key={key} className="text-lg font-semibold tracking-tight mt-3 first:mt-0">
                {b.text}
            </h3>
        );
    }

    if (b.type === "p") {
        const raw: string = b.text; // already narrowed
        const plain = raw.replace(/<[^>]*>/g, "").trim();

        if (/^impact\s*:/i.test(plain)) {
            const body = plain.replace(/^impact\s*:\s*/i, "");
            const parts: string[] = body
                .split(/[·|,]/)
                .map((s: string) => s.trim())
                .filter((v): v is string => v.length > 0);

            type Stat = { label: string; value: number; dir: "up" | "down" | "flat" };
            const re = /^(.+?)\s*(?:[↑↗⇧]|\bup\b|[↓↘⇩]|\bdown\b)?\s*~?\s*([+-]?\d+(?:\.\d+)?)\s*%/i;

            const stats: Stat[] = [];
            parts.forEach((p: string) => {
                const m = p.match(re);
                if (m) {
                    const label = m[1].trim().replace(/\s+/g, " ");
                    const n = parseFloat(m[2]);
                    const dir: Stat["dir"] = n > 0 ? "up" : n < 0 ? "down" : "flat";
                    stats.push({ label, value: n, dir });
                }
            });

            return (
                <div
                    key={key}
                    className="mt-4 rounded-2xl border border-emerald-300/50 bg-emerald-50/80 dark:bg-emerald-900/20 px-4 py-3"
                >
                    <div className="flex flex-wrap items-center gap-2 lg:flex-nowrap">
                        <span className="text-[0.95rem] font-semibold text-emerald-900 dark:text-emerald-100">
                            Impact:
                        </span>

                        {stats.length ? (
                            <div className="flex flex-wrap items-center gap-2">
                                {stats.map((s: Stat, i: number) => {
                                    const up = s.dir === "up";
                                    const down = s.dir === "down";
                                    const color = up ? "bg-emerald-600" : down ? "bg-rose-600" : "bg-slate-500";
                                    const tint = up ? "text-emerald-700" : down ? "text-rose-700" : "text-slate-700";

                                    return (
                                        <span
                                            key={i}
                                            className={`inline-flex items-center gap-2 rounded-full border bg-white/80 px-3 py-1 text-sm ${tint} border-black/10 dark:bg-white/10 dark:text-white`}
                                        >
                                            <span
                                                className={`inline-flex h-4 w-4 items-center justify-center rounded-full ${color} text-white text-[10px]`}
                                            >
                                                {up ? "↑" : down ? "↓" : "•"}
                                            </span>
                                            <span className="font-medium">{s.label}</span>
                                            <span className="font-semibold">{Math.abs(s.value)}%</span>
                                        </span>
                                    );
                                })}
                            </div>
                        ) : (
                            <span
                                className="text-[0.975rem] leading-7 text-emerald-900/90 dark:text-emerald-100"
                                dangerouslySetInnerHTML={{
                                    __html: raw.replace(/^Impact:\s*/i, "<strong>Impact:</strong> "),
                                }}
                            />
                        )}
                    </div>
                </div>
            );
        }

        return (
            <p
                key={key}
                className="text-[0.975rem] leading-7 text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: raw }}
            />
        );
    }

    if (b.type === "ul") {
        return (
            <ul
                key={key}
                className="list-disc pl-5 space-y-1 text-[0.975rem] leading-7 text-muted-foreground"
            >
                {b.items.map((it: string, j: number) => (
                    <li key={j} dangerouslySetInnerHTML={{ __html: it }} />
                ))}
            </ul>
        );
    }

    if (b.type === "img") {
        return (
            <figure
                key={key}
                className={`rounded-2xl overflow-hidden border bg-muted ${b.className ?? ""}`}
            >
                <img src={b.src} alt={b.alt} className="w-full h-auto object-cover" />
                {b.caption ? (
                    <figcaption
                        className="px-4 py-2 text-sm md:text-base leading-6 text-muted-foreground/90"
                        style={{ textAlign: "justify", textJustify: "inter-word" }}
                    >
                        {b.caption}
                    </figcaption>
                ) : null}
            </figure>
        );
    }

    if (b.type === "grid5") {
        return (
            <div key={key} className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                {b.cards.map(
                    (
                        c: {
                            title: string;
                            desc: string;
                            image: string;
                            span2?: boolean;
                            imageClass?: string;
                        },
                        i: number
                    ) => (
                        <div
                            key={i}
                            className={`flex flex-col rounded-2xl border bg-card p-3 sm:p-4 ${c.span2 ? "sm:col-span-2" : ""
                                }`}
                        >
                            <div className="text-base sm:text-lg md:text-xl font-semibold tracking-tight">
                                {c.title}
                            </div>
                            <p className="mt-1 text-sm text-muted-foreground leading-snug whitespace-normal break-words">
                                {c.desc}
                            </p>

                            <div className="-mx-3 sm:-mx-4 mt-2">
                                <img
                                    src={c.image}
                                    alt={c.title}
                                    className={
                                        "block w-full rounded-xl object-contain h-[180px] sm:h-[220px] lg:h-[260px] " +
                                        (c.imageClass ?? "")
                                    }
                                />
                            </div>
                        </div>
                    )
                )}
            </div>
        );
    }

    if (b.type === "codeModal") {
        return (
            <div key={key} className="mt-3">
                <CodeDialog label={b.label} file={b.file} height={b.height ?? 720} />
            </div>
        );
    }

    if (b.type === "codeFrame") {
        const h = Math.max(360, b.height ?? 720);

        return (
            <details key={key} className="group rounded-2xl overflow-hidden border bg-card">
                {/* clickable header */}
                <summary className="flex items-center justify-between px-4 pt-3 pb-2 text-sm text-muted-foreground cursor-pointer list-none">
                    <span className="truncate">{b.title ?? "Code"}</span>

                    <div className="flex items-center gap-3">
                        {/* state hint, changes automatically when open */}
                        <span className="px-2 py-1 rounded bg-black/5 group-open:hidden">Show code</span>
                        <span className="px-2 py-1 rounded bg-black/5 hidden group-open:inline">Hide code</span>

                        {/* always works: plain link */}
                        <a
                            href={b.src}
                            target="_blank"
                            rel="noreferrer"
                            className="px-2 py-1 rounded bg-black/5 hover:bg-black/10"
                            title="Open in new tab"
                        >
                            Open in new tab
                        </a>
                    </div>
                </summary>

                {/* collapsible body */}
                <div className="
          max-h-0 overflow-hidden transition-[max-height] duration-300 ease-out
          group-open:max-h-[90vh] border-t border-black/5
        ">
                    {/* user can also drag to resize when open */}
                    <div className="resize-y overflow-auto" style={{ height: h }}>
                        <iframe
                            src={b.src}
                            title={b.title ?? "Code"}
                            className="w-full h-full border-0"
                        />
                    </div>
                </div>
            </details>
        );
    }


    if (b.type === "table") {
        const dense: boolean = b.dense ?? false;
        return (
            <figure key={key} className="rounded-2xl overflow-hidden border bg-card">
                <div className="overflow-x-auto">
                    <table className={`w-full text-left ${dense ? "text-sm" : "text-base"}`}>
                        <thead className="bg-muted/70">
                            <tr>
                                {b.headers.map((h: string, i: number) => (
                                    <th key={i} className={`px-4 py-3 font-semibold ${i === 0 ? "w-1/3" : ""}`}>
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {b.rows.map((r: string[], i: number) => (
                                <tr key={i} className={i % 2 ? "bg-muted/30" : ""}>
                                    {r.map((c: string, j: number) => (
                                        <td key={j} className="px-4 py-3 align-middle">
                                            {c}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {b.caption ? (
                    <figcaption className="px-4 py-2 text-sm text-muted-foreground">{b.caption}</figcaption>
                ) : null}
            </figure>
        );
    }

    return null;
}

/** Two-column layout (text left, media right) */
function SplitRichContent({ blocks }: { blocks: ContentBlock[] }) {
    const isFull = (b: ContentBlock) => b.fullWidth === true;
    const toRight = (b: ContentBlock) => b.rightCol === true || b.type === "img";

    const left = blocks.filter((blk: ContentBlock) => !isFull(blk) && !toRight(blk));
    const right = blocks.filter((blk: ContentBlock) => !isFull(blk) && toRight(blk));
    const full = blocks.filter((blk: ContentBlock) => isFull(blk));

    return (
        <div className="mt-3 grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-7 space-y-3">{left.map((blk, i) => RenderBlock(blk, i))}</div>
            <aside className="lg:col-span-5 space-y-3 lg:sticky lg:top-24 h-fit">
                {right.map((blk, i) => RenderBlock(blk, i))}
            </aside>
            {full.length > 0 && (
                <div className="lg:col-span-12 space-y-3">{full.map((blk, i) => RenderBlock(blk, i))}</div>
            )}
        </div>
    );
}

function RichContent({ blocks }: { blocks: ContentBlock[] }) {
    return <div className="mt-6 space-y-3">{blocks.map((blk, i) => RenderBlock(blk, i))}</div>;
}

/* =========================
   Page
   ========================= */
export default function Page() {
    return (
        <main className="max-w-[100rem] mx-auto px-6 lg:px-8 py-12">
            <section className="space-y-6">
                {items.map((it) => (
                    <div key={it.id} className="rounded-3xl border bg-card/70 shadow-sm overflow-hidden hover:shadow-lg transition">
                        {/* Card header row (click opens slide-over via query param) */}
                        <a href={`?project=${it.id}`} className="block p-5 pb-4">
                            <div className="grid items-start gap-2 md:grid-cols-[1fr_auto]">
                                <div className="min-w-0">
                                    <div className="flex items-center gap-3 sm:gap-4">
                                        {it.logo ? (
                                            <div className="shrink-0 grid place-items-center rounded-lg bg-neutral-100 ring-1 ring-black/5 dark:bg-neutral-800 h-10 w-10 sm:h-12 sm:w-12">
                                                <Image
                                                    src={it.logo}
                                                    alt={it.logoAlt ?? `${it.title} logo`}
                                                    width={96}
                                                    height={96}
                                                    className="object-contain h-8 w-8 sm:h-10 sm:w-10"
                                                    priority={false}
                                                />
                                            </div>
                                        ) : null}

                                        <TypeBadge kind={it.kind} />
                                        <h2 className="text-xl md:text-2xl font-semibold leading-tight line-clamp-2 md:line-clamp-1">{it.title}</h2>
                                    </div>
                                </div>

                                <div className="flex-shrink-0">
                                    <InlineTags items={it.tags} />
                                </div>

                                <div className="md:col-span-2">
                                    <p
                                        className="mt-1 text-sm text-muted-foreground leading-snug whitespace-nowrap overflow-x-auto overflow-y-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                                        title={it.summary}
                                    >
                                        {it.summary}
                                    </p>
                                </div>
                            </div>
                        </a>

                        {/* Hidden, server-rendered full content used by the slide-over */}
                        <div id={`proj-${it.id}`} className="hidden" data-title={it.title}>
                            <div className="px-5 pb-5 pt-2">
                                <OutcomeTiles items={it.outcomes} />
                                {it.id === "ping-fea-intern-2025" ||
                                    it.id === "microplane-polymer" ||
                                    it.id === "material-characterization-epoxy" ||
                                    it.id === "mohr-coulomb-regression" ||
                                    it.id === "robotic-cutting" ||
                                    it.id === "trddc" ? (
                                    <SplitRichContent blocks={it.content} />
                                ) : (
                                    <RichContent blocks={it.content} />
                                )}
                                {it.links?.length ? (
                                    <div className="mt-6 flex flex-wrap gap-3">
                                        {it.links.map((l) => (
                                            <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="text-sm underline underline-offset-4">
                                                {l.label}
                                            </a>
                                        ))}
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </div>
                ))}
            </section>

            {/* Slide-over controller (once per page) */}
            <Suspense fallback={null}>
                <ProjectSlideOver />
            </Suspense>
        </main>
    );
}
