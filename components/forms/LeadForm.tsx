"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

/**
 * LeadForm — the single lead-generation form used across the whole site.
 *
 * All five fields are mandatory (name, work email, phone/WhatsApp, project
 * type, message) plus a required consent checkbox. A hidden honeypot blocks
 * basic spam bots.
 *
 * Delivery: submissions are emailed via Web3Forms (https://web3forms.com) —
 * no backend required. Set NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY to the free key
 * generated for arun2001.gkp@gmail.com and every submission lands in that inbox.
 */

interface LeadFormData {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
  consent: boolean;
}

const defaultData: LeadFormData = {
  name: "",
  email: "",
  phone: "",
  projectType: "",
  message: "",
  consent: false,
};

const PROJECT_TYPES = [
  "Website",
  "Mobile / Web App",
  "Game",
  "ERP",
  "AI / ML",
  "Other",
] as const;

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const WEB3FORMS_ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "YOUR_WEB3FORMS_ACCESS_KEY";

const inputBaseStyles = cn(
  "w-full text-body border border-border-light rounded-md p-md",
  "bg-surface text-text placeholder:text-text-muted",
  "focus-visible:outline-none focus-visible:border-accent focus-visible:ring-1 focus-visible:ring-accent",
  "transition-colors duration-fast"
);

const labelStyles = "text-body-sm font-medium block mb-sm text-left";

export function LeadForm({ className }: { className?: string }) {
  const uid = useId();
  const fid = (name: string) => `${uid}-${name}`;

  const [data, setData] = useState<LeadFormData>(defaultData);
  const [errors, setErrors] = useState<Partial<Record<keyof LeadFormData, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  function validate(d: LeadFormData): Partial<Record<keyof LeadFormData, string>> {
    const e: Partial<Record<keyof LeadFormData, string>> = {};
    if (!d.name || d.name.trim().length < 2) e.name = "Please enter your name.";
    if (!d.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email))
      e.email = "A valid email is required.";
    if (!d.phone || d.phone.replace(/\D/g, "").length < 7)
      e.phone = "A valid phone / WhatsApp number is required.";
    if (!d.projectType) e.projectType = "Please choose what you need built.";
    if (!d.message || d.message.trim().length < 10)
      e.message = "Please tell us a little about your project (min 10 characters).";
    if (!d.consent) e.consent = "Please agree to be contacted.";
    return e;
  }

  function handleChange(
    ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value, type } = ev.target;
    const next =
      type === "checkbox" ? (ev.target as HTMLInputElement).checked : value;
    setData((prev) => ({ ...prev, [name]: next }));
    // Clear a field's error as soon as the user edits it.
    setErrors((prev) => (prev[name as keyof LeadFormData] ? { ...prev, [name]: undefined } : prev));
  }

  async function handleSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();

    // Honeypot — if filled, silently drop (bot).
    const hp = (ev.currentTarget.elements.namedItem("botcheck") as HTMLInputElement)?.checked;
    if (hp) return;

    const validationErrors = validate(data);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).some((k) => validationErrors[k as keyof LeadFormData])) {
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    const payload = {
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: `New lead: ${data.projectType} — ${data.name}`,
      from_name: "Softiques Website",
      replyto: data.email.trim(),
      name: data.name.trim(),
      email: data.email.trim(),
      phone: data.phone.trim(),
      project_type: data.projectType,
      message: data.message.trim(),
    };

    try {
      if (WEB3FORMS_ACCESS_KEY === "YOUR_WEB3FORMS_ACCESS_KEY") {
        throw new Error("missing-key");
      }
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as { success?: boolean };
      if (!res.ok || !json.success) throw new Error("send-failed");
      setSubmitted(true);
      setData(defaultData);
    } catch {
      setSubmitError(
        "Something went wrong sending your message. Please try again, or email us directly at arun2001.gkp@gmail.com."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className={cn("mx-auto max-w-[640px] py-2xl text-center", className)}>
        <p className="text-body text-accent">
          Thank you — we&apos;ve received your details and will be in touch shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={cn("mx-auto w-full max-w-[640px] space-y-lg text-left", className)}
    >
      {/* Honeypot — visually hidden, not announced to AT */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="sr-only"
      />

      {/* Name + Phone */}
      <div className="grid grid-cols-1 gap-lg sm:grid-cols-2">
        <div>
          <label htmlFor={fid("name")} className={labelStyles}>
            Name
          </label>
          <input
            id={fid("name")}
            name="name"
            type="text"
            required
            aria-required="true"
            value={data.name}
            onChange={handleChange}
            placeholder="Your full name"
            className={cn(inputBaseStyles, errors.name && "border-accent")}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? fid("name-error") : undefined}
          />
          {errors.name && (
            <p id={fid("name-error")} className="mt-xs text-body-sm text-accent" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={fid("phone")} className={labelStyles}>
            Phone / WhatsApp
          </label>
          <input
            id={fid("phone")}
            name="phone"
            type="tel"
            required
            aria-required="true"
            value={data.phone}
            onChange={handleChange}
            placeholder="+91 98765 43210"
            className={cn(inputBaseStyles, errors.phone && "border-accent")}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? fid("phone-error") : undefined}
          />
          {errors.phone && (
            <p id={fid("phone-error")} className="mt-xs text-body-sm text-accent" role="alert">
              {errors.phone}
            </p>
          )}
        </div>
      </div>

      {/* Email + Project type */}
      <div className="grid grid-cols-1 gap-lg sm:grid-cols-2">
        <div>
          <label htmlFor={fid("email")} className={labelStyles}>
            Work email
          </label>
          <input
            id={fid("email")}
            name="email"
            type="email"
            required
            aria-required="true"
            value={data.email}
            onChange={handleChange}
            placeholder="you@company.com"
            className={cn(inputBaseStyles, errors.email && "border-accent")}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? fid("email-error") : undefined}
          />
          {errors.email && (
            <p id={fid("email-error")} className="mt-xs text-body-sm text-accent" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={fid("projectType")} className={labelStyles}>
            What do you need built?
          </label>
          <select
            id={fid("projectType")}
            name="projectType"
            required
            aria-required="true"
            value={data.projectType}
            onChange={handleChange}
            className={cn(inputBaseStyles, "cursor-pointer", errors.projectType && "border-accent")}
            aria-invalid={!!errors.projectType}
            aria-describedby={errors.projectType ? fid("projectType-error") : undefined}
          >
            <option value="">Select a project type</option>
            {PROJECT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          {errors.projectType && (
            <p id={fid("projectType-error")} className="mt-xs text-body-sm text-accent" role="alert">
              {errors.projectType}
            </p>
          )}
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor={fid("message")} className={labelStyles}>
          Tell us about your project
        </label>
        <textarea
          id={fid("message")}
          name="message"
          required
          aria-required="true"
          rows={4}
          value={data.message}
          onChange={handleChange}
          placeholder="What you're building, what's working today, and what you need from us."
          className={cn(inputBaseStyles, "resize-y", errors.message && "border-accent")}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? fid("message-error") : undefined}
        />
        {errors.message && (
          <p id={fid("message-error")} className="mt-xs text-body-sm text-accent" role="alert">
            {errors.message}
          </p>
        )}
      </div>

      {/* Consent */}
      <div>
        <label htmlFor={fid("consent")} className="flex items-start gap-sm text-left">
          <input
            id={fid("consent")}
            name="consent"
            type="checkbox"
            required
            aria-required="true"
            checked={data.consent}
            onChange={handleChange}
            className="mt-[3px] h-[18px] w-[18px] accent-accent"
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? fid("consent-error") : undefined}
          />
          <span className="text-body-sm text-text-muted">
            I agree to be contacted by Softiques about my enquiry.
          </span>
        </label>
        {errors.consent && (
          <p id={fid("consent-error")} className="mt-xs text-body-sm text-accent" role="alert">
            {errors.consent}
          </p>
        )}
      </div>

      {submitError && (
        <p className="text-body-sm text-accent" role="alert" aria-live="assertive">
          {submitError}
        </p>
      )}

      <div className="pt-sm">
        <Button
          type="submit"
          variant="primary"
          className="w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          disabled={submitting}
        >
          {submitting ? "Sending…" : "Book Free Consultation"}
        </Button>
      </div>
    </form>
  );
}
