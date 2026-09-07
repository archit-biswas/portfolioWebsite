import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";

/** Repeating CONTACT banner; pauses on hover, frozen for reduced motion. */
export function ContactBanner() {
  return (
    <div
      aria-hidden="true"
      className="group mb-10 overflow-hidden border-y border-border/60 py-3"
    >
      <div className="marquee-track flex w-max gap-6 group-hover:[animation-play-state:paused]">
        {Array.from({ length: 2 }).map((_, block) => (
          <div key={block} className="flex shrink-0 gap-6">
            {Array.from({ length: 8 }).map((__, i) => (
              <span
                key={i}
                className="font-display text-2xl font-bold uppercase tracking-tight text-muted-foreground sm:text-4xl"
              >
                Contact <span className="text-rose">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Large email line that copies to the clipboard on click. */
export function EmailCopy({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      toast.success("Email address copied");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Couldn't copy — please select the address manually");
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="group flex w-fit max-w-full items-center gap-3 text-left"
    >
      <span className="truncate font-display text-[clamp(1.25rem,3.5vw,2.5rem)] font-bold tracking-tight text-foreground transition-colors group-hover:text-rose">
        {email}
      </span>
      {copied ? (
        <Check aria-hidden="true" className="size-5 shrink-0 text-rose" />
      ) : (
        <Copy aria-hidden="true" className="size-5 shrink-0 text-muted-foreground" />
      )}
      <span className="sr-only">Copy email address</span>
    </button>
  );
}
