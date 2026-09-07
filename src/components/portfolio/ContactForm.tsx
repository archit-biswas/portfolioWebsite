import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import { sendContactMessage } from "@/lib/contact.functions";

type Errors = Partial<Record<"name" | "email" | "message", string>>;
type Status = "idle" | "sending" | "sent" | "error";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const fieldClass =
  "min-h-11 w-full rounded-xl border border-border bg-card px-4 py-2.5 text-[0.9375rem] text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus-visible:border-violet/60 focus-visible:ring-2 focus-visible:ring-violet/30";

export function ContactForm() {
  const send = useServerFn(sendContactMessage);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [values, setValues] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    company: "",
  });

  const set = (key: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [key]: e.target.value }));

  const validate = () => {
    const next: Errors = {};
    if (!values.name.trim()) next.name = "Please enter your name.";
    if (!values.email.trim()) next.email = "Please enter your email address.";
    else if (!emailPattern.test(values.email.trim())) next.email = "That doesn't look like a valid email address.";
    if (!values.message.trim()) next.message = "Please write a message.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("sending");
    try {
      await send({ data: { ...values } });
      setStatus("sent");
      toast.success("Message sent — I'll get back to you soon.");
      setValues({ name: "", email: "", subject: "", message: "", company: "" });
    } catch {
      setStatus("error");
      toast.error("Message didn't send. Please try again or email me directly.");
    }
  };

  return (
    <form onSubmit={onSubmit} noValidate className="mt-10 grid max-w-2xl gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-foreground">
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            value={values.name}
            onChange={set("name")}
            maxLength={100}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            className={fieldClass}
            placeholder="Your name"
          />
          {errors.name && (
            <p id="contact-name-error" className="mt-1.5 text-sm text-destructive">
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-foreground">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            value={values.email}
            onChange={set("email")}
            maxLength={255}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            className={fieldClass}
            placeholder="you@example.com"
          />
          {errors.email && (
            <p id="contact-email-error" className="mt-1.5 text-sm text-destructive">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="contact-subject" className="mb-1.5 block text-sm font-medium text-foreground">
          Subject <span className="text-muted-foreground">(optional)</span>
        </label>
        <input
          id="contact-subject"
          name="subject"
          value={values.subject}
          onChange={set("subject")}
          maxLength={150}
          className={fieldClass}
          placeholder="What is this about?"
        />
      </div>

      <div>
        <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-foreground">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={values.message}
          onChange={set("message")}
          maxLength={2000}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className={`${fieldClass} min-h-32 resize-y`}
          placeholder="Tell me a bit about the role or project."
        />
        {errors.message && (
          <p id="contact-message-error" className="mt-1.5 text-sm text-destructive">
            {errors.message}
          </p>
        )}
      </div>

      {/* honeypot */}
      <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
        <label htmlFor="contact-company">Company</label>
        <input
          id="contact-company"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          value={values.company}
          onChange={set("company")}
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="group relative inline-flex w-fit transition-transform duration-200 ease-in-out hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-xl border-2 border-violet/60 transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1"
          />
          <span className="relative inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-rose px-5 text-[0.9375rem] font-semibold tracking-[0.01em] text-background shadow-lg shadow-rose/30 transition-colors duration-200 ease-in-out group-hover:bg-rose/85">
            {status === "sending" ? (
              <Loader2 aria-hidden="true" className="size-4 animate-spin" />
            ) : (
              <Send aria-hidden="true" className="size-4" />
            )}
            {status === "sending" ? "Sending…" : "Send message"}
          </span>
        </button>

        <p aria-live="polite" className="text-sm">
          {status === "sent" && (
            <span className="text-success">Thanks, I'll get back to you soon.</span>
          )}
          {status === "error" && (
            <span className="text-destructive">
              Something went wrong. Please try again, or email me directly.
            </span>
          )}
        </p>
      </div>
    </form>
  );
}
