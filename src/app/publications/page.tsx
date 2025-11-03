export const metadata = {
    title: "Publications — Sanket Wardhekar",
    description: "Papers, preprints, and talks.",
};

type Link = { label: string; href: string };
type Pub = {
    year: number;
    title: string;
    authors: string;
    venue: string;      // journal / conference name (and status if needed)
    link?: Link;        // optional: published paper / preprint
};

const pubs: Pub[] = [
    {
        year: 2025,
        title: "Size Effect Characterization of Epoxy Resin and Microplane Model Validation",
        authors: "S. Wardhekar, K. Kirane",
        venue: "Elsevier Journal Extreme Mechanics Letter (Manuscript Submitted)",
    },
    {
        year: 2025,
        title: "Microplane Constitutive Model for Tension–Compression Asymmetry and Pressure-Sensitive Damage in Polymers",
        authors: "S. Wardhekar, K. Kirane",
        venue: "Journal of Applied Mechanics",
        link: { label: "Paper Link", href: "https://asmedigitalcollection.asme.org/appliedmechanics/article/92/3/031002/1211137/Microplane-Constitutive-Model-for-Tension" },
    },
    {
        year: 2024,
        title: "Adaptation of the Microplane Constitutive Model for Brittle-Plastic Glassy Polymers",
        authors: "S. Wardhekar, G. Smith, K. Kirane",
        venue: "American Society of Composites",
        link: { label: "Paper Link", href: "https://www.dpi-proceedings.com/index.php/asc38/article/view/36598" },
    },
];

export default function PublicationsPage() {
    return (
        <main className="max-w-[80rem] mx-auto px-6 lg:px-8 py-12">
            <div className="mt-8 divide-y">
                {pubs.map((p) => (
                    <article key={p.title} className="py-4">
                        <h2 className="text-lg md:text-xl font-semibold leading-snug">
                            {p.title}
                        </h2>
                        <p className="text-sm text-muted-foreground mt-1">
                            {p.authors}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            {p.venue} · {p.year}
                        </p>
                        {p.link ? (
                            <p className="mt-2">
                                <a
                                    href={p.link.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-sm underline underline-offset-4"
                                >
                                    {p.link.label}
                                </a>
                            </p>
                        ) : null}
                    </article>
                ))}
            </div>
        </main>
    );
}
