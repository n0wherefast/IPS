"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

type Canape = {
  id: string;
  name: string;
  description: string;
  category: "Traditional" | "Premium";
};

const packageOptions = [
  {
    id: "classic",
    name: "Classic",
    description: "A familiar selection of five traditional canapés.",
    selection: "5 traditional canapés",
    style: "border-amber-300 bg-amber-50",
    badge: "bg-amber-700",
  },
  {
    id: "gourmet",
    name: "Gourmet",
    description: "A balanced mix, combining traditional favourites and premium bites.",
    selection: "3 traditional + 2 premium",
    style: "border-emerald-300 bg-emerald-50",
    badge: "bg-emerald-800",
  },
  {
    id: "lusso",
    name: "Lusso",
    description: "Build your own refined selection from the entire canapés menu.",
    selection: "Any 5 canapés",
    style: "border-yellow-400 bg-yellow-50",
    badge: "bg-yellow-700",
  },
] as const;

type PackageId = (typeof packageOptions)[number]["id"];

const requirements: Record<PackageId, { traditional: number; premium: number }> = {
  classic: { traditional: 5, premium: 0 },
  gourmet: { traditional: 3, premium: 2 },
  lusso: { traditional: 5, premium: 5 },
};

export default function CanapeExperience() {
  const menuSectionRef = useRef<HTMLElement | null>(null);
  const formSectionRef = useRef<HTMLElement | null>(null);
  const [canapes, setCanapes] = useState<Canape[]>([]);
  const [packageId, setPackageId] = useState<PackageId | "">("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState<{ type: "error" | "success"; text: string } | null>(null);

  useEffect(() => {
    let active = true;

    fetch("/api/canapes")
      .then(async (response) => {
        if (!response.ok) throw new Error("The canapés menu could not be loaded.");
        return (await response.json()) as Canape[];
      })
      .then((items) => {
        if (active) setCanapes(items);
      })
      .catch(() => {
        if (active) setNotice({ type: "error", text: "The menu is temporarily unavailable. Please try again later." });
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const selectedCounts = useMemo(
    () =>
      selectedIds.reduce(
        (counts, id) => {
          const item = canapes.find((canape) => canape.id === id);
          if (item) counts[item.category === "Traditional" ? "traditional" : "premium"] += 1;
          return counts;
        },
        { traditional: 0, premium: 0 },
      ),
    [canapes, selectedIds],
  );

  const selectedPackage = packageOptions.find((option) => option.id === packageId);
  const selectionComplete = selectedIds.length === 5;

  useEffect(() => {
    if (packageId) {
      menuSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [packageId]);

  useEffect(() => {
    if (selectionComplete) {
      formSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selectionComplete]);

  const toggleCanape = (canape: Canape) => {
    setNotice(null);
    setSelectedIds((current) => {
      if (current.includes(canape.id)) return current.filter((id) => id !== canape.id);
      if (!packageId || current.length >= 5) return current;

      const limits = requirements[packageId];
      const categoryCount = current.filter((id) => {
        const item = canapes.find((entry) => entry.id === id);
        return item?.category === canape.category;
      }).length;
      const categoryLimit = canape.category === "Traditional" ? limits.traditional : limits.premium;
      if (categoryCount >= categoryLimit) return current;
      return [...current, canape.id];
    });
  };

  const canSelect = (canape: Canape) => {
    if (!packageId) return false;
    const alreadySelected = selectedIds.includes(canape.id);
    if (alreadySelected) return true;
    if (selectedIds.length >= 5) return false;
    const limits = requirements[packageId];
    const categoryCount = selectedCounts[canape.category === "Traditional" ? "traditional" : "premium"];
    const categoryLimit = canape.category === "Traditional" ? limits.traditional : limits.premium;
    return categoryCount < categoryLimit;
  };

  const submitEnquiry = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!packageId || !selectionComplete) {
      setNotice({ type: "error", text: "Choose a package and select exactly five canapés." });
      return;
    }

    setSubmitting(true);
    setNotice(null);
    const form = event.currentTarget;
    const values = new FormData(form);

    try {
      const response = await fetch("/api/canapes/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.get("name"),
          email: values.get("email"),
          phone: values.get("phone"),
          date: values.get("date"),
          time: values.get("time"),
          address: values.get("address"),
          guestCount: values.get("guestCount"),
          packageId,
          canapeIds: selectedIds,
          message: values.get("message"),
          terms: values.get("terms") === "on",
        }),
      });
      const result = (await response.json()) as { success?: boolean; error?: string };

      if (!response.ok || !result.success) {
        setNotice({ type: "error", text: result.error ?? "We could not send your enquiry. Please try again." });
        return;
      }

      form.reset();
      setPackageId("");
      setSelectedIds([]);
      setNotice({ type: "success", text: "Thank you! Your canapé catering enquiry has been sent." });
    } catch {
      setNotice({ type: "error", text: "We could not connect to the enquiry service. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  const canapesByCategory = ["Traditional", "Premium"] as const;

  return (
    <div className="space-y-14">
      <section
        aria-labelledby="canape-packages-title"
        className={`scroll-mt-24 rounded-3xl border-2 p-4 transition-all duration-500 sm:p-6 ${
          packageId
            ? "border-transparent bg-transparent"
            : "border-amber-300 bg-amber-50/70 shadow-xl shadow-amber-900/10 ring-4 ring-amber-100"
        }`}
      >
        <div className="mb-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-800">Choose your experience</p>
          <h2 id="canape-packages-title" className="mt-2 font-serif text-3xl text-stone-900 sm:text-4xl">Three ways to entertain</h2>
          <p className="mx-auto mt-3 max-w-2xl text-stone-600">Every package includes five handmade canapés per guest. Choose the style that suits your event.</p>
          {!packageId ? (
            <p className="mx-auto mt-4 inline-flex items-center gap-2 rounded-full bg-amber-800 px-4 py-2 text-sm font-semibold text-white shadow-md" role="status">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs text-amber-900">1</span>
              Step 1 — Choose your package
            </p>
          ) : null}
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {packageOptions.map((option) => (
            <label
              key={option.id}
              className={`relative cursor-pointer rounded-2xl border-2 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md ${option.style} ${packageId === option.id ? "ring-2 ring-stone-800 ring-offset-2" : ""}`}
            >
              <input
                type="radio"
                name="packageChoice"
                value={option.id}
                checked={packageId === option.id}
                onChange={() => {
                  setPackageId(option.id);
                  setSelectedIds([]);
                  setNotice(null);
                }}
                className="sr-only"
              />
              <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider text-white ${option.badge}`}>{option.selection}</span>
              <h3 className="mt-4 font-serif text-2xl text-stone-900">{option.name}</h3>
              <p className="mt-2 text-sm leading-6 text-stone-700">{option.description}</p>
              <span className="mt-5 inline-block text-sm font-semibold text-stone-800">
                {packageId === option.id ? "Selected" : "Choose this package"}
              </span>
            </label>
          ))}
        </div>
      </section>

      <section
        ref={menuSectionRef}
        aria-labelledby="canape-menu-title"
        className={`scroll-mt-24 rounded-3xl transition-all duration-500 ${
          packageId
            ? "border-2 border-amber-400 bg-amber-50/70 p-4 shadow-xl shadow-amber-900/10 ring-4 ring-amber-100 sm:p-6"
            : "border-2 border-transparent"
        }`}
      >
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-800">Made for sharing</p>
            <h2 id="canape-menu-title" className="mt-2 font-serif text-3xl text-stone-900 sm:text-4xl">The canapé menu</h2>
            {packageId ? (
              <div className="mt-2 flex flex-wrap items-center gap-2" aria-live="polite">
                <p className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-950">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-800 text-xs text-white">2</span>
                  Step 2 — Select your 5 canapés
                </p>
                {selectedPackage ? (
                  <p className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-white px-3 py-1 text-sm text-stone-700">
                    <span className="font-semibold text-stone-900">Package:</span>
                    <span>{selectedPackage.name}</span>
                    <span aria-hidden="true" className="text-stone-400">·</span>
                    <span>{selectedPackage.selection}</span>
                  </p>
                ) : null}
              </div>
            ) : null}
          </div>
          {packageId ? (
            <div className="min-w-52 rounded-xl bg-white/80 p-3" aria-live="polite">
              <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                <span className="font-semibold text-stone-800">
                  {selectedIds.length === 5 ? "Selection complete!" : `${5 - selectedIds.length} left to choose`}
                </span>
                <span className="font-bold tabular-nums text-amber-900">{selectedIds.length}/5</span>
              </div>
              <div className="flex gap-1.5" role="progressbar" aria-label="Canapés selected" aria-valuemin={0} aria-valuemax={5} aria-valuenow={selectedIds.length}>
                {Array.from({ length: 5 }, (_, index) => (
                  <span
                    key={index}
                    className={`h-2.5 flex-1 rounded-full transition-colors duration-300 ${
                      index < selectedIds.length ? "bg-emerald-600" : "bg-stone-200"
                    }`}
                  />
                ))}
              </div>
            </div>
          ) : (
            <p className="text-sm text-stone-600">Choose a package to select your five canapés.</p>
          )}
        </div>

        {selectionComplete ? (
          <p role="status" className="mb-5 flex items-center gap-2 rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-3 font-semibold text-emerald-900 shadow-sm">
            <span aria-hidden="true" className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-700 text-white">✓</span>
            All five selected — continue to the enquiry form below.
          </p>
        ) : null}

        {loading ? <p className="rounded-xl bg-white p-5 text-stone-600">Loading the canapés menu…</p> : null}
        {!loading && canapes.length > 0 ? (
          <div className="grid gap-8 lg:grid-cols-2">
            {canapesByCategory.map((category) => (
              <div key={category} className={`overflow-hidden rounded-2xl border ${category === "Premium" ? "border-emerald-200" : "border-amber-200"} bg-white shadow-sm`}>
                <h3 className={`px-5 py-4 font-serif text-2xl ${category === "Premium" ? "bg-emerald-800 text-white" : "bg-amber-800 text-white"}`}>
                  {category} canapés
                </h3>
                <ul className="divide-y divide-stone-100">
                  {canapes.filter((canape) => canape.category === category).map((canape) => {
                    const checked = selectedIds.includes(canape.id);
                    return (
                      <li key={canape.id}>
                        <label className={`flex min-h-24 gap-4 p-4 transition ${canSelect(canape) ? "cursor-pointer hover:bg-amber-50" : "cursor-not-allowed opacity-60"} ${checked ? "bg-amber-50" : ""}`}>
                          <input
                            type="checkbox"
                            checked={checked}
                            disabled={!canSelect(canape)}
                            onChange={() => toggleCanape(canape)}
                            className="mt-1 h-5 w-5 shrink-0 accent-amber-700"
                          />
                          <span>
                            <span className="block font-semibold text-stone-900">{canape.name}</span>
                            <span className="mt-1 block text-sm leading-5 text-stone-600">{canape.description}</span>
                          </span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        ) : null}
        {!loading && canapes.length === 0 && !notice ? <p className="rounded-xl bg-white p-5 text-stone-600">No canapés are available right now.</p> : null}
      </section>

      <section
        ref={formSectionRef}
        id="canape-form"
        className={`scroll-mt-24 rounded-3xl transition-all duration-500 ${
          selectionComplete ? "bg-emerald-50 p-3 ring-4 ring-emerald-200 sm:p-5" : ""
        }`}
      >
        <div className={`mx-auto max-w-3xl rounded-2xl border bg-white p-6 shadow-sm transition-all duration-500 sm:p-8 ${
          selectionComplete ? "border-emerald-400 shadow-xl shadow-emerald-900/10" : "border-stone-200"
        }`}>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-800">Plan your event</p>
          <h2 className="mt-2 font-serif text-3xl text-stone-900">Request a canapé quote</h2>
          <p className="mt-2 text-stone-600">Share a few details and our team will be in touch to help make your event special.</p>
          {selectionComplete ? (
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <p className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1.5 text-sm font-semibold text-emerald-900" role="status">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-700 text-xs text-white">3</span>
                Step 3 — Tell us about your event
              </p>
              <a
                href="#canape-packages-title"
                onClick={(event) => {
                  event.preventDefault();
                  document.getElementById("canape-packages-title")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }}
                className="inline-flex items-center rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-semibold text-stone-700 transition-colors hover:border-amber-500 hover:bg-amber-50 hover:text-amber-900"
              >
                or modify your package
              </a>
            </div>
          ) : null}
          <form onSubmit={submitEnquiry} className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="grid gap-1 text-sm font-medium text-stone-700">
              Name
              <input name="name" type="text" autoComplete="name" maxLength={120} required className="rounded-xl border border-stone-300 px-3 py-2 outline-none focus:ring-2 focus:ring-amber-600" />
            </label>
            <label className="grid gap-1 text-sm font-medium text-stone-700">
              Email
              <input name="email" type="email" autoComplete="email" maxLength={254} required className="rounded-xl border border-stone-300 px-3 py-2 outline-none focus:ring-2 focus:ring-amber-600" />
            </label>
            <label className="grid gap-1 text-sm font-medium text-stone-700">
              Phone
              <input name="phone" type="tel" autoComplete="tel" minLength={6} maxLength={40} required className="rounded-xl border border-stone-300 px-3 py-2 outline-none focus:ring-2 focus:ring-amber-600" />
            </label>
            <label className="grid gap-1 text-sm font-medium text-stone-700">
              Event date
              <input name="date" type="date" required className="rounded-xl border border-stone-300 px-3 py-2 outline-none focus:ring-2 focus:ring-amber-600" />
            </label>
            <label className="grid gap-1 text-sm font-medium text-stone-700">
              Event time
              <input name="time" type="time" className="rounded-xl border border-stone-300 px-3 py-2 outline-none focus:ring-2 focus:ring-amber-600" />
            </label>
            <label className="grid gap-1 text-sm font-medium text-stone-700">
              Number of guests
              <input name="guestCount" type="number" min={1} step={1} required className="rounded-xl border border-stone-300 px-3 py-2 outline-none focus:ring-2 focus:ring-amber-600" />
            </label>
            <label className="grid gap-1 text-sm font-medium text-stone-700 sm:col-span-2">
              Event address
              <input name="address" type="text" autoComplete="street-address" maxLength={300} required className="rounded-xl border border-stone-300 px-3 py-2 outline-none focus:ring-2 focus:ring-amber-600" />
            </label>
            <label className="grid gap-1 text-sm font-medium text-stone-700 sm:col-span-2">
              Message or dietary requirements
              <textarea name="message" rows={4} maxLength={3000} className="rounded-xl border border-stone-300 px-3 py-2 outline-none focus:ring-2 focus:ring-amber-600" />
            </label>
            <div className="sm:col-span-2 rounded-xl bg-stone-50 p-4 text-sm text-stone-700">
              <p className="font-semibold">Your selection</p>
              <p className="mt-1">{selectedPackage ? `${selectedPackage.name} — ${selectedPackage.selection}` : "Choose a package above."}</p>
              <p className="mt-1">{selectedIds.length ? canapes.filter((canape) => selectedIds.includes(canape.id)).map((canape) => canape.name).join(", ") : "No canapés selected yet."}</p>
            </div>
            <label className="flex items-start gap-3 text-sm text-stone-700 sm:col-span-2">
              <input name="terms" type="checkbox" required className="mt-1 h-4 w-4 accent-amber-700" />
              <span>I have read and I consent.</span>
            </label>
            {notice ? (
              <p role="status" className={`sm:col-span-2 rounded-lg px-4 py-3 text-sm ${notice.type === "success" ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-800"}`}>
                {notice.text}
              </p>
            ) : null}
            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={submitting || loading || canapes.length === 0}
                className="w-full rounded-xl bg-amber-800 px-6 py-3 font-semibold text-white transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {submitting ? "Sending…" : "Send canapé enquiry"}
              </button>
              {packageId && !selectionComplete ? <p className="mt-2 text-sm text-stone-500">Select {5 - selectedIds.length} more canapé{selectedIds.length === 4 ? "" : "s"} to continue.</p> : null}
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
