"use client";

import Image from "next/image";
import { FormEvent, ReactNode, useState } from "react";
import {
  PRODUCT_INTEREST_OPTIONS,
  buildWhatsAppQuoteUrl,
  submitEnquiryToSheet,
} from "@/lib/enquiry-api";

const SUCCESS_MSG = "Thank you! We will contact you within 24 hours.";
const ERROR_MSG = "Something went wrong. Please WhatsApp us directly.";

type EnquiryFormProps = {
  source: string;
  className?: string;
  /** e.g. Cancel/Close beside submit (quote modal) */
  leadingActions?: ReactNode;
};

export function EnquiryForm({ source, className, leadingActions }: EnquiryFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [productInterest, setProductInterest] = useState<string>(PRODUCT_INTEREST_OPTIONS[0]);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setFeedback("");

    const payload = {
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      message: message.trim(),
      productInterest,
      source,
    };

    const ok = await submitEnquiryToSheet(payload);

    if (ok) {
      setStatus("success");
      setFeedback(SUCCESS_MSG);
      window.open(
        buildWhatsAppQuoteUrl(payload.name, payload.phone, payload.email, payload.message),
        "_blank",
        "noopener,noreferrer",
      );
      setName("");
      setPhone("");
      setEmail("");
      setMessage("");
      setProductInterest(PRODUCT_INTEREST_OPTIONS[0]);
    } else {
      setStatus("error");
      setFeedback(ERROR_MSG);
    }
  };

  const fieldClass =
    "rounded-xl border border-[var(--primary-blue)]/25 bg-white px-4 py-3 text-zinc-900 placeholder:text-zinc-400 focus:border-[var(--primary-blue)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)]/20";

  return (
    <form className={className} onSubmit={onSubmit}>
      <div className="mb-6 text-center">
        <Image
          src="/Logo.png"
          alt="Sree Arumuga Steel Trading Private Limited Logo"
          width={72}
          height={72}
          className="mx-auto h-16 w-16 object-contain"
        />
        <p className="mt-3 text-base font-bold text-[#1a3a8f]">
          Sree Arumuga Steel Trading Private Limited
        </p>
        <p className="mt-1 text-sm font-medium text-[#1a3a8f]">GST No: 33AAICP9456C1ZC</p>
      </div>
      <div className="grid gap-3">
        <div>
          <label htmlFor={`${source}-name`} className="sr-only">
            Name
          </label>
          <input
            id={`${source}-name`}
            name="name"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor={`${source}-phone`} className="sr-only">
            Phone
          </label>
          <input
            id={`${source}-phone`}
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor={`${source}-email`} className="sr-only">
            Email
          </label>
          <input
            id={`${source}-email`}
            name="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor={`${source}-product`} className="mb-1 block text-sm font-medium text-zinc-600">
            Product interest
          </label>
          <select
            id={`${source}-product`}
            name="productInterest"
            required
            value={productInterest}
            onChange={(e) => setProductInterest(e.target.value)}
            className={fieldClass}
          >
            {PRODUCT_INTEREST_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={`${source}-message`} className="sr-only">
            Message or quote requirement
          </label>
          <textarea
            id={`${source}-message`}
            name="message"
            required
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message / Quote requirement"
            className={fieldClass}
          />
        </div>
      </div>
      {feedback ? (
        <p
          role="status"
          className={`mt-3 text-sm font-medium ${status === "success" ? "text-emerald-700" : "text-red-600"}`}
        >
          {feedback}
        </p>
      ) : null}
      <div className="mt-5 flex flex-wrap items-center gap-3">
        {leadingActions}
        <button
          type="submit"
          disabled={status === "submitting"}
          className="rounded-full bg-[var(--primary-blue)] px-5 py-3 font-semibold text-white transition hover:bg-[var(--primary-red)] active:bg-[var(--primary-red)] disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Submit"}
        </button>
      </div>
    </form>
  );
}
