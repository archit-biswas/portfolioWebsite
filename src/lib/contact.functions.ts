import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email address").max(255),
  subject: z.string().trim().max(150).optional().default(""),
  message: z.string().trim().min(1, "Message is required").max(2000),
  // honeypot — must stay empty
  company: z.string().max(0).optional().default(""),
});

export const sendContactMessage = createServerFn({ method: "POST" })
  .validator((data: unknown) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    if (data.company) return { ok: true as const };

    const resendApiKey = process.env["RESEND_API_KEY"];
    const contactEmailTo = process.env["CONTACT_EMAIL_TO"];
    const contactEmailFrom = process.env["CONTACT_EMAIL_FROM"];

    if (!resendApiKey || !contactEmailTo || !contactEmailFrom) {
      throw new Error(
        "Contact email delivery is not configured. Set RESEND_API_KEY, CONTACT_EMAIL_TO, and CONTACT_EMAIL_FROM.",
      );
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { error } = await supabaseAdmin.from("contact_messages").insert({
      name: data.name,
      email: data.email,
      subject: data.subject || null,
      message: data.message,
    });

    if (error) throw new Error("Could not send your message. Please try again.");

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: contactEmailFrom,
        to: [contactEmailTo],
        reply_to: data.email,
        subject: data.subject
          ? `Portfolio contact: ${data.subject}`
          : `Portfolio contact from ${data.name}`,
        text: [
          `Name: ${data.name}`,
          `Email: ${data.email}`,
          `Subject: ${data.subject || "(none)"}`,
          "",
          data.message,
        ].join("\n"),
      }),
    });

    if (!emailResponse.ok) {
      const details = await emailResponse.text();
      console.error("Contact email delivery failed", {
        status: emailResponse.status,
        details,
      });
      throw new Error("Your message was saved, but email delivery failed. Please try again later.");
    }

    return { ok: true as const };
  });
