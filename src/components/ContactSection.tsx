"use client";

import { FormEvent, useState } from "react";
import emailjs from "@emailjs/browser";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.message.trim().length < 10) {
      setStatus("error");
      return;
    }

    setStatus("loading");

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          reply_to: formData.email,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      setStatus("success");

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("EmailJS error:", error);
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen overflow-hidden bg-[#0b0b0b] px-6 py-24 text-[#f2eee5] md:px-10 lg:px-16"
    >
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute left-[-10%] top-[20%] h-[400px] w-[400px] rounded-full bg-[#cba84a]/5 blur-[120px]" />

      <div className="relative mx-auto max-w-[1400px]">
        {/* Header */}
        <div className="max-w-3xl">
          <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.45em] text-[#cba84a]">
            Get in touch
          </p>

          <h2 className="font-black uppercase leading-[0.82] tracking-[-0.04em]">
            <span className="block text-[clamp(4rem,9vw,8rem)] text-[#f2eee5]">
              Let&apos;s Work
            </span>

            <span className="block text-[clamp(4rem,9vw,8rem)] text-[#cba84a]">
              Together
            </span>
          </h2>

          <p className="mt-8 max-w-[620px] text-[15px] leading-7 text-[#b8b3aa] md:text-[17px]">
            Have a project in mind, or just want to say hi? Drop your
            details below and I&apos;ll get back to you as soon as I can.
          </p>
        </div>

        {/* Main content */}
        <div className="mt-16 grid gap-14 lg:grid-cols-[minmax(0,1.5fr)_minmax(280px,0.7fr)] lg:gap-24">
          {/* FORM */}
          <form onSubmit={handleSubmit} className="max-w-[850px]">
            <div className="grid gap-8 md:grid-cols-2">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-3 block text-[11px] font-medium uppercase tracking-[0.28em] text-[#d5b65b]"
                >
                  Full Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full border border-[#3a3529] bg-[#161616] px-5 py-4 text-[15px] text-[#f2eee5] outline-none transition placeholder:text-[#77736c] focus:border-[#cba84a] focus:bg-[#1a1a1a]"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-3 block text-[11px] font-medium uppercase tracking-[0.28em] text-[#d5b65b]"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full border border-[#3a3529] bg-[#161616] px-5 py-4 text-[15px] text-[#f2eee5] outline-none transition placeholder:text-[#77736c] focus:border-[#cba84a] focus:bg-[#1a1a1a]"
                />
              </div>
            </div>

            {/* Message */}
            <div className="mt-8">
              <label
                htmlFor="message"
                className="mb-3 block text-[11px] font-medium uppercase tracking-[0.28em] text-[#d5b65b]"
              >
                Your Message
              </label>

              <textarea
                id="message"
                name="message"
                required
                minLength={10}
                rows={8}
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about your project..."
                className="w-full resize-none border border-[#3a3529] bg-[#161616] px-5 py-4 text-[15px] leading-7 text-[#f2eee5] outline-none transition placeholder:text-[#77736c] focus:border-[#cba84a] focus:bg-[#1a1a1a]"
              />
            </div>

            {/* Privacy */}
            <p className="mt-5 text-[12px] text-[#817d75]">
              I&apos;ll never share your information with anyone else.
            </p>

            {/* Status */}
            {status === "success" && (
              <div className="mt-5 border border-[#4d6b45] bg-[#152014] px-4 py-3 text-sm text-[#b9d5ad]">
                Message sent successfully. I&apos;ll get back to you soon.
              </div>
            )}

            {status === "error" && (
              <div className="mt-5 border border-[#633f3f] bg-[#211515] px-4 py-3 text-sm text-[#e0aaa0]">
                Something went wrong. Please check your message and try again.
              </div>
            )}

            {/* Button */}
            <button
              type="submit"
              disabled={status === "loading"}
              className="mt-8 inline-flex min-w-[190px] items-center justify-center rounded-full bg-[#cba84a] px-8 py-4 text-[11px] font-bold uppercase tracking-[0.32em] text-[#0b0b0b] transition duration-300 hover:bg-[#dfc16a] hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
            >
              {status === "loading" ? "Sending..." : "Send Message"}
            </button>
          </form>

          {/* CONTACT INFO */}
          <aside className="border-t border-[#302d27] pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <div className="space-y-10">
              <div>
                <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-[#cba84a]">
                  Available For
                </p>

                <p className="text-[17px] leading-7 text-[#ded9cf]">
                  Freelance projects
                  <br />
                  Creative development
                  <br />
                  Full-time opportunities
                </p>
              </div>

              <div>
                <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-[#cba84a]">
                  Email
                </p>

                <a
                  href="mailto:your@email.com"
                  className="break-all text-[16px] text-[#ded9cf] transition hover:text-[#cba84a]"
                >
                  your@email.com
                </a>
              </div>

              <div>
                <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-[#cba84a]">
                  Location
                </p>

                <p className="text-[16px] text-[#ded9cf]">
                  India
                </p>
              </div>

              <div>
                <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-[#cba84a]">
                  Socials
                </p>

                <div className="flex gap-5 text-sm text-[#ded9cf]">
                  <a
                    href="#"
                    className="transition hover:text-[#cba84a]"
                  >
                    GitHub
                  </a>

                  <a
                    href="#"
                    className="transition hover:text-[#cba84a]"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Bottom */}
        <div className="mt-24 border-t border-[#24221e] pt-6">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#625e57]">
            Let&apos;s build something worth remembering.
          </p>
        </div>
      </div>
    </section>
  );
}