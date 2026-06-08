"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface FormData {
  name: string;
  email: string;
  company: string;
  role: string;
  sector: string;
  description: string;
  timeline: string;
  budget: string;
}

const defaultFormData: FormData = {
  name: "",
  email: "",
  company: "",
  role: "",
  sector: "",
  description: "",
  timeline: "",
  budget: "",
};

const inputBaseStyles = cn(
  "w-full text-body border border-border-light rounded-md p-md",
  "bg-surface text-text placeholder:text-text-muted",
  // Use focus-visible for keyboard users; suppress default outline and provide accent ring
  "focus-visible:outline-none focus-visible:border-accent focus-visible:ring-1 focus-visible:ring-accent",
  "transition-colors duration-fast"
);

const labelStyles = "text-body-sm font-medium block mb-sm";

// DigitalCrew CMS endpoint that receives contact submissions.
// Override per-environment with NEXT_PUBLIC_CONTACT_API_URL if needed.
const CONTACT_ENDPOINT =
  process.env.NEXT_PUBLIC_CONTACT_API_URL ||
  "https://api.digitalcrew.co.in/api/v1/public/submit-contact-us";

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Field order used to focus the first invalid input on submit.
  const fieldOrder: (keyof FormData)[] = ["name", "email", "company", "description"];

  function validate(): Partial<Record<keyof FormData, string>> {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.name || formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "A valid work email is required.";
    }
    if (!formData.company || formData.company.trim().length < 2) {
      newErrors.company = "Company name must be at least 2 characters.";
    }
    if (!formData.description || formData.description.trim().length < 20) {
      newErrors.description = "Please provide at least 20 characters describing what you're building.";
    }

    setErrors(newErrors);
    return newErrors;
  }

  function handleBlur(field: keyof FormData) {
    // Validate individual field on blur
    const newErrors = { ...errors };

    if (field === "name") {
      if (!formData.name || formData.name.trim().length < 2) {
        newErrors.name = "Name must be at least 2 characters.";
      } else {
        delete newErrors.name;
      }
    }
    if (field === "email") {
      if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "A valid work email is required.";
      } else {
        delete newErrors.email;
      }
    }
    if (field === "company") {
      if (!formData.company || formData.company.trim().length < 2) {
        newErrors.company = "Company name must be at least 2 characters.";
      } else {
        delete newErrors.company;
      }
    }
    if (field === "description") {
      if (!formData.description || formData.description.trim().length < 20) {
        newErrors.description = "Please provide at least 20 characters describing what you're building.";
      } else {
        delete newErrors.description;
      }
    }

    setErrors(newErrors);
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      // Make the blocked submit obvious: jump to the first invalid field.
      const firstInvalid = fieldOrder.find((k) => validationErrors[k]);
      if (firstInvalid && typeof document !== "undefined") {
        const el = document.getElementById(firstInvalid);
        el?.focus();
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    // Map the form's `description` textarea to the API's `message` field.
    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      company: formData.company.trim(),
      role: formData.role,
      sector: formData.sector,
      message: formData.description.trim(),
      timeline: formData.timeline.trim(),
      budget: formData.budget.trim(),
    };

    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      setSubmitted(true);
    } catch {
      setSubmitError(
        "Something went wrong sending your message. Please try again, or email us directly at hello@softwires.in."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-[640px] mx-auto text-center py-2xl">
        <p className="text-body text-accent">
          Thank you — your message has been sent. We&apos;ll respond within two
          business days.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="max-w-[640px] mx-auto space-y-xl"
    >
      {/* Name */}
      <div>
        <label htmlFor="name" className={labelStyles}>
          Name
        </label>
        <input
          id="name"
          type="text"
          name="name"
          required
          aria-required="true"
          value={formData.name}
          onChange={handleChange}
          onBlur={() => handleBlur("name")}
          className={cn(inputBaseStyles, errors.name && "border-accent")}
          placeholder="Your full name"
          aria-describedby={errors.name ? "name-error" : undefined}
          aria-invalid={!!errors.name}
        />
        {errors.name && (
          <p
            id="name-error"
            className="text-body-sm text-accent mt-xs"
            role="alert"
            aria-live="polite"
          >
            {errors.name}
          </p>
        )}
      </div>

      {/* Work email */}
      <div>
        <label htmlFor="email" className={labelStyles}>
          Work email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          required
          aria-required="true"
          value={formData.email}
          onChange={handleChange}
          onBlur={() => handleBlur("email")}
          className={cn(inputBaseStyles, errors.email && "border-accent")}
          placeholder="you@company.com"
          aria-describedby={errors.email ? "email-error" : undefined}
          aria-invalid={!!errors.email}
        />
        {errors.email && (
          <p
            id="email-error"
            className="text-body-sm text-accent mt-xs"
            role="alert"
            aria-live="polite"
          >
            {errors.email}
          </p>
        )}
      </div>

      {/* Company */}
      <div>
        <label htmlFor="company" className={labelStyles}>
          Company
        </label>
        <input
          id="company"
          type="text"
          name="company"
          required
          aria-required="true"
          value={formData.company}
          onChange={handleChange}
          onBlur={() => handleBlur("company")}
          className={cn(inputBaseStyles, errors.company && "border-accent")}
          placeholder="Your organisation"
          aria-describedby={errors.company ? "company-error" : undefined}
          aria-invalid={!!errors.company}
        />
        {errors.company && (
          <p
            id="company-error"
            className="text-body-sm text-accent mt-xs"
            role="alert"
            aria-live="polite"
          >
            {errors.company}
          </p>
        )}
      </div>

      {/* Role */}
      <div>
        <label htmlFor="role" className={labelStyles}>
          Role
        </label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          className={cn(inputBaseStyles, "cursor-pointer")}
        >
          <option value="">Select your role</option>
          <option value="Founder / CEO">Founder / CEO</option>
          <option value="CTO / Head of Engineering">CTO / Head of Engineering</option>
          <option value="Product">Product</option>
          <option value="Operations">Operations</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Sector */}
      <div>
        <label htmlFor="sector" className={labelStyles}>
          Sector
        </label>
        <select
          id="sector"
          name="sector"
          value={formData.sector}
          onChange={handleChange}
          className={cn(inputBaseStyles, "cursor-pointer")}
        >
          <option value="">Select your sector</option>
          <option value="Energy">Energy</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Infrastructure">Infrastructure</option>
          <option value="Insurance">Insurance</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className={labelStyles}>
          What are you building?
        </label>
        <textarea
          id="description"
          name="description"
          required
          aria-required="true"
          rows={4}
          value={formData.description}
          onChange={handleChange}
          onBlur={() => handleBlur("description")}
          className={cn(inputBaseStyles, "resize-y", errors.description && "border-accent")}
          placeholder="A brief technical description. What runs today, what needs to change."
          aria-describedby={errors.description ? "description-error" : undefined}
          aria-invalid={!!errors.description}
        />
        {errors.description && (
          <p
            id="description-error"
            className="text-body-sm text-accent mt-xs"
            role="alert"
            aria-live="polite"
          >
            {errors.description}
          </p>
        )}
      </div>

      {/* Timeline (optional) */}
      <div>
        <label htmlFor="timeline" className={labelStyles}>
          Timeline <span className="font-normal text-text-muted">(optional)</span>
        </label>
        <input
          id="timeline"
          type="text"
          name="timeline"
          value={formData.timeline}
          onChange={handleChange}
          className={inputBaseStyles}
          placeholder="e.g., Q3 2026"
        />
      </div>

      {/* Budget range (optional) */}
      <div>
        <label htmlFor="budget" className={labelStyles}>
          Budget range <span className="font-normal text-text-muted">(optional)</span>
        </label>
        <input
          id="budget"
          type="text"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          className={inputBaseStyles}
          placeholder="e.g., $50K-100K"
        />
      </div>

      {/* Submit-level error */}
      {submitError && (
        <p
          className="text-body-sm text-accent"
          role="alert"
          aria-live="assertive"
        >
          {submitError}
        </p>
      )}

      {/* Submit */}
      <div className="pt-sm">
        <Button
          type="submit"
          variant="primary"
          className="w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={submitting}
        >
          {submitting ? "Sending…" : "Send message"}
        </Button>
      </div>

      {/* Direct email link */}
      <p className="text-mono-sm text-text-muted mt-xl text-center">
        or write directly:{" "}
        <a
          href="mailto:hello@softwires.in"
          className="text-accent hover:text-accent-hover transition-colors duration-fast"
        >
          hello@softwires.in
        </a>
      </p>
    </form>
  );
}
