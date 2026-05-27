"use client";

import { FormEvent, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type BookingFormData = {
  name: string;
  email: string;
  phone: string;
  service: string;
  preferredDate: string;
  message: string;
};

const initialFormData: BookingFormData = {
  name: "",
  email: "",
  phone: "",
  service: "",
  preferredDate: "",
  message: "",
};

export default function BookingForm() {
  const [formData, setFormData] = useState<BookingFormData>(initialFormData);
  const [submittedData, setSubmittedData] = useState<BookingFormData | null>(
    null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function updateField(field: keyof BookingFormData, value: string) {
    setFormData((currentData) => ({
      ...currentData,
      [field]: value,
    }));
  }

  function generateAiReply(data: BookingFormData) {
    return `Hi ${data.name}, thanks for your booking request for ${data.service}. We received your preferred schedule and will confirm availability shortly.`;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    const aiReply = generateAiReply(formData);

    const { error } = await supabase.from("booking_requests").insert({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      service: formData.service,
      preferred_date: formData.preferredDate,
      message: formData.message,
      status: "New Request",
      ai_reply: aiReply,
    });

    setIsSubmitting(false);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    setSubmittedData(formData);
    setSuccessMessage("Booking request submitted successfully.");
    setFormData(initialFormData);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
      <form
        onSubmit={handleSubmit}
        className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 md:p-8"
      >
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
            Booking Form
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">
            Submit a new booking request.
          </h2>
          <p className="mt-3 leading-7 text-slate-400">
            This form now saves customer booking requests into Supabase.
          </p>
        </div>

        <div className="mt-8 grid gap-5">
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-slate-300">
                Full Name
              </label>
              <input
                value={formData.name}
                onChange={(event) => updateField("name", event.target.value)}
                required
                placeholder="Sarah Johnson"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/60"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-300">
                Email Address
              </label>
              <input
                value={formData.email}
                onChange={(event) => updateField("email", event.target.value)}
                required
                type="email"
                placeholder="sarah@example.com"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/60"
              />
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-slate-300">
                Phone Number
              </label>
              <input
                value={formData.phone}
                onChange={(event) => updateField("phone", event.target.value)}
                placeholder="+1 555 0123"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/60"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-300">
                Service Type
              </label>
              <select
                value={formData.service}
                onChange={(event) => updateField("service", event.target.value)}
                required
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-300/60"
              >
                <option value="">Select a service</option>
                <option value="Hair Styling">Hair Styling</option>
                <option value="Dental Consultation">
                  Dental Consultation
                </option>
                <option value="Fitness Coaching">Fitness Coaching</option>
                <option value="Business Consultation">
                  Business Consultation
                </option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-300">
              Preferred Date
            </label>
            <input
              value={formData.preferredDate}
              onChange={(event) =>
                updateField("preferredDate", event.target.value)
              }
              required
              type="date"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-300/60"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-300">
              Additional Message
            </label>
            <textarea
              value={formData.message}
              onChange={(event) => updateField("message", event.target.value)}
              rows={5}
              placeholder="I would like to book an appointment this week..."
              className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/60"
            />
          </div>

          {successMessage && (
            <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm text-emerald-300">
              {successMessage}
            </div>
          )}

          {errorMessage && (
            <div className="rounded-2xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-300">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-full bg-cyan-300 px-7 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Submitting..." : "Submit Booking Request"}
          </button>
        </div>
      </form>

      <div className="rounded-[2rem] border border-white/10 bg-slate-950 p-6 md:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
          Live Preview
        </p>
        <h3 className="mt-4 text-3xl font-semibold text-white">
          Request Summary
        </h3>

        {submittedData ? (
          <div className="mt-8 space-y-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-sm text-slate-500">Customer</p>
              <p className="mt-1 font-semibold text-white">
                {submittedData.name}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-sm text-slate-500">Service</p>
              <p className="mt-1 font-semibold text-white">
                {submittedData.service}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-sm text-slate-500">Preferred Date</p>
              <p className="mt-1 font-semibold text-white">
                {submittedData.preferredDate}
              </p>
            </div>

            <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4">
              <p className="text-sm font-semibold text-cyan-200">
                AI Reply Draft
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                {generateAiReply(submittedData)}
              </p>
            </div>
          </div>
        ) : (
          <p className="mt-8 leading-7 text-slate-400">
            Submit the form to preview how a booking request will appear inside
            the system.
          </p>
        )}
      </div>
    </div>
  );
}