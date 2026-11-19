import { Eye, Lock, Smartphone } from "lucide-react";
import { ML } from "@/lib/constants";
import { AutoVideo } from "@/components/AutoVideo";

const POINTS = [
  { icon: Eye, title: "You watch every step", text: "Take a seat at the counter. We open and repair your phone right in front of you." },
  { icon: Smartphone, title: "It never leaves your sight", text: "From start to finish, your phone stays on the counter in front of you." },
  { icon: Lock, title: "Your privacy stays yours", text: "Your photos, chats and accounts stay with you, because your phone does." },
];

/** The shop's main promise: open service, repaired in front of you, privacy kept. */
export function OpenService() {
  return (
    <section aria-labelledby="open-h" className="bg-char py-24 text-paper lg:py-36">
      <div className="wrap grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <h2 id="open-h" className="display text-[clamp(3.5rem,15vw,5rem)] lg:text-[clamp(5rem,7.4vw,7.5rem)]" data-reveal>
            Fixed in front of you
          </h2>
          <p lang="ml" className="mt-8 text-[1.5rem] font-semibold leading-snug text-brand sm:text-[1.875rem]" data-reveal>
            {ML.open}
          </p>
          <p lang="ml" className="mt-2 text-[1.25rem] font-semibold leading-snug sm:text-[1.5rem]" data-reveal>
            {ML.privacy}
          </p>
          <p className="mt-6 max-w-[36rem] text-[1.125rem] leading-relaxed text-paper/85" data-reveal>
            Live Mobile is open service. Your phone is repaired right in front of you, so it never leaves your sight and
            your privacy stays with you.
          </p>

          <ul className="mt-10 grid gap-1.5">
            {POINTS.map((p, i) => (
              <li
                key={p.title}
                data-reveal
                style={{ "--d": `${i * 80}ms` } as React.CSSProperties}
                className="flex items-start gap-4 bg-char-2 p-5"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-brand text-ink">
                  <p.icon className="h-5 w-5" aria-hidden />
                </span>
                <span>
                  <span className="block text-[1.1875rem] font-bold">{p.title}</span>
                  <span className="mt-1 block text-[0.9375rem] leading-snug text-fog">{p.text}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <figure className="mx-auto w-full max-w-[22rem] lg:col-span-4 lg:col-start-9 lg:max-w-none" data-reveal>
          <div className="relative aspect-[9/16] overflow-hidden bg-char-2">
            <AutoVideo
              src="/reels/Video-16218.mp4"
              poster="/reels/Video-16218.webp"
              label="Inside the shop: a technician repairs a phone at the counter while the customer watches"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <figcaption className="mt-3 text-[0.9375rem] text-fog">Inside the shop, at the counter.</figcaption>
        </figure>
      </div>
    </section>
  );
}
