import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/inquiry")({
  head: () => ({
    meta: [
      { title: "Concierge — Aetheris" },
      {
        name: "description",
        content:
          "Request a private dossier. Inquiries are reviewed by the concierge and answered within seven days.",
      },
      { property: "og:title", content: "Concierge — Aetheris" },
      {
        property: "og:description",
        content:
          "Request a private dossier. Inquiries are reviewed by the concierge and answered within seven days.",
      },
    ],
  }),
  component: InquiryPage,
});

function InquiryPage() {
  return (
    <div className="bg-pearl text-obsidian min-h-screen">
      <main className="pt-40 pb-32 px-6 md:px-12 max-w-3xl mx-auto">
        <p className="text-[10px] uppercase tracking-[0.5em] text-champagne mb-6">
          Concierge
        </p>
        <h1 className="font-serif text-5xl md:text-7xl italic leading-[0.95] mb-10">
          Request a dossier.
        </h1>
        <p className="text-lg text-obsidian/70 leading-relaxed mb-16 max-w-xl">
          Each inquiry is reviewed personally by the concierge. We respond within
          seven days. Discretion is the first courtesy we extend.
        </p>

        <form
          className="space-y-10"
          onSubmit={(e) => {
            e.preventDefault();
            const f = e.currentTarget as HTMLFormElement;
            f.reset();
            alert("Thank you. Your inquiry has been received.");
          }}
        >
          <Field label="Full name" name="name" required />
          <Field label="Email" name="email" type="email" required />
          <Field label="Residence of interest" name="residence" />
          <Field label="Message" name="message" textarea />
          <button
            type="submit"
            className="px-12 py-5 bg-champagne text-[color:var(--noir-deep)] text-[10px] uppercase tracking-[0.4em] hover:bg-[color:var(--obsidian)] transition-colors duration-500"
          >
            Submit privately
          </button>
        </form>
      </main>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  textarea,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  textarea?: boolean;
  required?: boolean;
}) {
  const cls =
    "w-full bg-transparent border-b border-obsidian/20 py-3 text-lg font-serif focus:outline-none focus:border-champagne transition-colors";
  return (
    <label className="block">
      <span className="block text-[10px] uppercase tracking-[0.3em] text-obsidian/50 mb-2">
        {label}
      </span>
      {textarea ? (
        <textarea name={name} rows={4} required={required} className={cls} />
      ) : (
        <input name={name} type={type} required={required} className={cls} />
      )}
    </label>
  );
}