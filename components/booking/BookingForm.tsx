"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, Phone } from "lucide-react";
import { ACCESSORY_NEEDS, BRANDS, BUSINESS, PRIMARY_PHONE, PROBLEMS, TIME_SLOTS } from "@/lib/constants";
import { buildBookingMessage, getBookingWhatsAppUrl, telLink, type BookingDetails } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/Icons";
import { WaText } from "@/components/WaText";

/* ─── Options ──────────────────────────────────────────────────────────────── */

const SERVICES = [
  { value: "Repair", title: "Repair", text: "Something's wrong with my phone" },
  { value: "New phone", title: "New phone", text: "I want to buy a phone" },
  { value: "Accessories", title: "Accessories", text: "Case, glass, charger, earphones…" },
] as const;

type Service = (typeof SERVICES)[number]["value"];

const STEP_NAMES = ["Service", "Phone", "Visit", "You"] as const;

/* ─── Dates (computed in the browser only, to avoid hydration mismatches) ─── */

const subscribeNoop = () => () => {};
const getTodayKey = () => new Date().toDateString();
const getServerTodayKey = () => "";

const chipFmt = new Intl.DateTimeFormat("en-IN", { weekday: "short", day: "numeric", month: "short" });
const longParts = new Intl.DateTimeFormat("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
/** "Fri, 20 Nov 2026" */
const longFmt = {
  format(d: Date) {
    const part = (type: Intl.DateTimeFormatPartTypes) => longParts.formatToParts(d).find((p) => p.type === type)?.value ?? "";
    return `${part("weekday")}, ${part("day")} ${part("month")} ${part("year")}`;
  },
};

function toIso(d: Date) {
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

function nextDays(todayKey: string, count = 7) {
  if (!todayKey) return [];
  const start = new Date(todayKey);
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const label = i === 0 ? "Today" : i === 1 ? "Tomorrow" : chipFmt.format(d);
    return { iso: toIso(d), label, long: longFmt.format(d) };
  });
}

function formatIso(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return longFmt.format(new Date(y, m - 1, d));
}

/* ─── Form ─────────────────────────────────────────────────────────────────── */

export interface BookingInitial {
  service?: Service;
  brand?: string;
  needs?: string[];
}

interface FormState {
  service: Service | "";
  brand: string;
  model: string;
  needs: string[];
  date: string; // ISO yyyy-mm-dd
  otherDate: boolean;
  time: string;
  name: string;
  phone: string;
  notes: string;
}

type Errors = Partial<Record<"service" | "brand" | "needs" | "date" | "time" | "name" | "phone", string>>;

function validate(step: number, f: FormState): Errors {
  const e: Errors = {};
  if (step === 0 && !f.service) e.service = "Choose what you need.";
  if (step === 1) {
    if (f.service !== "New phone" && !f.brand) e.brand = "Choose your phone's brand.";
    if (f.service === "Repair" && f.needs.length === 0) e.needs = "Choose at least one problem, or “Not sure”.";
    if (f.service === "Accessories" && f.needs.length === 0) e.needs = "Choose at least one item.";
  }
  if (step === 2) {
    if (!f.date) e.date = "Choose a day to visit.";
    if (!f.time) e.time = "Choose a time of day.";
  }
  if (step === 3) {
    if (!f.name.trim()) e.name = "Enter your name.";
    const digits = f.phone.replace(/\D/g, "");
    if (!digits) e.phone = "Enter your phone number.";
    else if (digits.length < 10 || digits.length > 13) e.phone = "Enter a 10-digit mobile number.";
  }
  return e;
}

const FIELD_ORDER: (keyof Errors)[] = ["service", "brand", "needs", "date", "time", "name", "phone"];

const inputClass =
  "w-full bg-paper-2 px-4 py-3.5 text-base text-ink placeholder:text-muted/80 transition-colors hover:bg-paper-3 focus:bg-white focus:outline-3 focus:outline-offset-0 focus:outline-brand aria-[invalid=true]:bg-[#fbe4df]";

export function BookingForm({ initial }: { initial?: BookingInitial }) {
  const uid = useId();
  const fid = (name: string) => `${uid}-${name}`;
  const todayKey = useSyncExternalStore(subscribeNoop, getTodayKey, getServerTodayKey);
  const days = nextDays(todayKey);

  const [step, setStep] = useState(() => (initial?.service ? 1 : 0));
  const [form, setForm] = useState<FormState>(() => ({
    service: initial?.service ?? "",
    brand: initial?.brand ?? "",
    model: "",
    needs: initial?.needs ?? [],
    date: "",
    otherDate: false,
    time: "",
    name: "",
    phone: "",
    notes: "",
  }));
  const [errors, setErrors] = useState<Errors>({});
  const [sentUrl, setSentUrl] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const stepHeading = useRef<HTMLHeadingElement>(null);
  const movedStep = useRef(false);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setSentUrl(null);
    if (key in errors) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const toggleNeed = (value: string) => {
    const has = form.needs.includes(value);
    // "Not sure" is exclusive with the specific problems.
    let next = has ? form.needs.filter((n) => n !== value) : [...form.needs, value];
    if (!has && value === "Not sure") next = ["Not sure"];
    else if (!has) next = next.filter((n) => n !== "Not sure");
    set("needs", next);
  };

  // Move focus to the step's heading after Next/Back so keyboard and screen-reader users follow along.
  useEffect(() => {
    if (movedStep.current) stepHeading.current?.focus();
  }, [step]);

  const dateLabel = form.date ? (days.find((d) => d.iso === form.date)?.long ?? formatIso(form.date)) : "";

  const details: BookingDetails = {
    service: form.service,
    brand: form.brand,
    model: form.model,
    needs: form.needs,
    date: dateLabel,
    time: form.time,
    name: form.name,
    phone: form.phone,
    notes: form.notes,
  };
  const message = buildBookingMessage(details);

  const focusFirstError = (e: Errors) => {
    const first = FIELD_ORDER.find((k) => e[k]);
    if (!first) return;
    const el = formRef.current?.querySelector<HTMLElement>(`[data-field="${first}"]`);
    el?.focus();
  };

  const goTo = (next: number) => {
    movedStep.current = true;
    setStep(next);
    window.scrollTo({ top: (formRef.current?.getBoundingClientRect().top ?? 0) + window.scrollY - 96, behavior: "smooth" });
  };

  const onNext = () => {
    const e = validate(step, form);
    setErrors(e);
    if (Object.keys(e).length) return focusFirstError(e);
    goTo(step + 1);
  };

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (step < STEP_NAMES.length - 1) return onNext();
    // Re-check every step before sending.
    for (let s = 0; s < STEP_NAMES.length; s++) {
      const e = validate(s, form);
      if (Object.keys(e).length) {
        setErrors(e);
        if (s !== step) goTo(s);
        else focusFirstError(e);
        return;
      }
    }
    const url = getBookingWhatsAppUrl({ ...details, name: form.name.trim(), phone: form.phone.trim() });
    window.open(url, "_blank", "noopener,noreferrer");
    setSentUrl(url);
  };

  const errorText = (key: keyof Errors) =>
    errors[key] ? (
      <p id={fid(`${key}-err`)} className="mt-2 text-[0.9375rem] font-semibold text-[#b42318]">
        {errors[key]}
      </p>
    ) : null;

  const needOptions: readonly string[] =
    form.service === "Repair" ? [...PROBLEMS.map((p) => p.title), "Not sure"] : form.service === "Accessories" ? ACCESSORY_NEEDS : [];

  const legendClass = "text-[1.125rem] font-bold";

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
      <form ref={formRef} onSubmit={onSubmit} noValidate className="lg:col-span-7" aria-labelledby={fid("title")}>
        <h2 id={fid("title")} className="sr-only">
          Booking form
        </h2>

        {/* Progress */}
        <ol className="grid grid-cols-4 gap-1.5" aria-label="Booking steps">
          {STEP_NAMES.map((name, i) => {
            const done = i < step;
            const current = i === step;
            return (
              <li key={name}>
                <button
                  type="button"
                  disabled={!done}
                  onClick={() => goTo(i)}
                  aria-current={current ? "step" : undefined}
                  className="group block w-full text-left disabled:cursor-default"
                >
                  <span
                    className={`block h-2 transition-colors duration-300 ${
                      current ? "bg-brand" : done ? "bg-char group-hover:bg-char-3" : "bg-paper-3"
                    }`}
                  />
                  <span className={`mt-2 block text-[0.875rem] font-semibold ${current || done ? "text-ink" : "text-muted"}`}>
                    {name}
                    {done && <span className="sr-only"> (done, go back)</span>}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        <div className="mt-10">
          {/* Step 1: service */}
          {step === 0 && (
            <fieldset aria-describedby={errors.service ? fid("service-err") : undefined}>
              <legend className="contents">
                <h3 ref={stepHeading} tabIndex={-1} className="display text-[2.75rem] outline-none sm:text-[3.25rem]">
                  What do you need?
                </h3>
              </legend>
              <div className="mt-6 grid gap-1.5 sm:grid-cols-3">
                {SERVICES.map((s, i) => (
                  <label
                    key={s.value}
                    className="group flex min-h-24 cursor-pointer sm:min-h-32 flex-col justify-between gap-4 bg-paper-2 p-5 transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-paper-3 has-[:checked]:bg-char has-[:checked]:text-paper has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand"
                  >
                    <input
                      type="radio"
                      name="service"
                      value={s.value}
                      checked={form.service === s.value}
                      onChange={() => {
                        set("service", s.value);
                        set("needs", s.value === initial?.service ? (initial?.needs ?? []) : []);
                      }}
                      className="sr-only"
                      data-field={i === 0 ? "service" : undefined}
                    />
                    <span className="text-[1.375rem] font-bold leading-tight">{s.title}</span>
                    <span className="text-[0.9375rem] leading-snug opacity-80">{s.text}</span>
                  </label>
                ))}
              </div>
              {errorText("service")}
            </fieldset>
          )}

          {/* Step 2: phone */}
          {step === 1 && (
            <div>
              <h3 ref={stepHeading} tabIndex={-1} className="display text-[2.75rem] outline-none sm:text-[3.25rem]">
                {form.service === "New phone" ? "What are you looking for?" : "Tell us about the phone"}
              </h3>

              <fieldset className="mt-6" aria-describedby={errors.brand ? fid("brand-err") : undefined}>
                <legend className={legendClass}>
                  {form.service === "New phone" ? "Brand you like (optional)" : "Brand"}
                </legend>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {BRANDS.map((b, i) => (
                    <label key={b} className="chip">
                      <input
                        type="radio"
                        name="brand"
                        value={b}
                        checked={form.brand === b}
                        onChange={() => set("brand", b)}
                        className="sr-only"
                        data-field={i === 0 ? "brand" : undefined}
                      />
                      <span translate={b === "Other" ? undefined : "no"}>{b}</span>
                    </label>
                  ))}
                </div>
                {errorText("brand")}
              </fieldset>

              <div className="mt-7">
                <label htmlFor={fid("model")} className={legendClass}>
                  {form.service === "New phone" ? "Any model in mind?" : "Model"}{" "}
                  <span className="font-normal text-muted">(optional)</span>
                </label>
                <input
                  id={fid("model")}
                  name="model"
                  value={form.model}
                  onChange={(e) => set("model", e.target.value)}
                  placeholder="e.g. Galaxy A55, iPhone 13, Redmi Note 13…"
                  autoComplete="off"
                  spellCheck={false}
                  className={`${inputClass} mt-3`}
                />
              </div>

              {needOptions.length > 0 && (
                <fieldset className="mt-7" aria-describedby={errors.needs ? fid("needs-err") : undefined}>
                  <legend className={legendClass}>
                    {form.service === "Repair" ? "What's wrong? Choose all that apply" : "What do you need?"}
                  </legend>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {needOptions.map((n, i) => (
                      <label key={n} className="chip">
                        <input
                          type="checkbox"
                          name="needs"
                          value={n}
                          checked={form.needs.includes(n)}
                          onChange={() => toggleNeed(n)}
                          className="sr-only"
                          data-field={i === 0 ? "needs" : undefined}
                          aria-invalid={errors.needs ? true : undefined}
                        />
                        {n}
                      </label>
                    ))}
                  </div>
                  {errorText("needs")}
                </fieldset>
              )}
            </div>
          )}

          {/* Step 3: visit */}
          {step === 2 && (
            <div>
              <h3 ref={stepHeading} tabIndex={-1} className="display text-[2.75rem] outline-none sm:text-[3.25rem]">
                When can you come in?
              </h3>

              <fieldset className="mt-6" aria-describedby={errors.date ? fid("date-err") : undefined}>
                <legend className={legendClass}>Day</legend>
                <div className="mt-3 grid grid-cols-2 gap-1.5 sm:grid-cols-4">
                  {days.length === 0
                    ? Array.from({ length: 8 }, (_, i) => <span key={i} className="block min-h-[3.25rem] bg-paper-2" />)
                    : days.map((d, i) => (
                        <label key={d.iso} className="chip min-h-[3.25rem] justify-center">
                          <input
                            type="radio"
                            name="date"
                            value={d.iso}
                            checked={!form.otherDate && form.date === d.iso}
                            onChange={() => {
                              set("otherDate", false);
                              set("date", d.iso);
                            }}
                            className="sr-only"
                            data-field={i === 0 ? "date" : undefined}
                          />
                          {d.label}
                        </label>
                      ))}
                  {days.length > 0 && (
                    <label className="chip min-h-[3.25rem] justify-center">
                      <input
                        type="radio"
                        name="date"
                        value="other"
                        checked={form.otherDate}
                        onChange={() => {
                          set("otherDate", true);
                          set("date", "");
                        }}
                        className="sr-only"
                      />
                      Another day…
                    </label>
                  )}
                </div>
                {form.otherDate && (
                  <div className="mt-4 max-w-xs">
                    <label htmlFor={fid("other-date")} className="text-[0.9375rem] font-semibold">
                      Pick a date
                    </label>
                    <input
                      id={fid("other-date")}
                      type="date"
                      min={days[0]?.iso}
                      value={form.date}
                      onChange={(e) => set("date", e.target.value)}
                      className={`${inputClass} mt-2`}
                      aria-invalid={errors.date ? true : undefined}
                      aria-describedby={errors.date ? fid("date-err") : undefined}
                    />
                  </div>
                )}
                {errorText("date")}
              </fieldset>

              <fieldset className="mt-7" aria-describedby={errors.time ? fid("time-err") : undefined}>
                <legend className={legendClass}>Time of day</legend>
                <div className="mt-3 grid grid-cols-2 gap-1.5 sm:grid-cols-4">
                  {TIME_SLOTS.map((t, i) => (
                    <label key={t} className="chip min-h-[3.25rem] justify-center">
                      <input
                        type="radio"
                        name="time"
                        value={t}
                        checked={form.time === t}
                        onChange={() => set("time", t)}
                        className="sr-only"
                        data-field={i === 0 ? "time" : undefined}
                      />
                      {t}
                    </label>
                  ))}
                </div>
                {errorText("time")}
                <p className="mt-3 text-[0.9375rem] text-muted">We&rsquo;ll confirm the exact time on WhatsApp.</p>
              </fieldset>
            </div>
          )}

          {/* Step 4: contact */}
          {step === 3 && (
            <div>
              <h3 ref={stepHeading} tabIndex={-1} className="display text-[2.75rem] outline-none sm:text-[3.25rem]">
                Your details
              </h3>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor={fid("name")} className={legendClass}>
                    Name
                  </label>
                  <input
                    id={fid("name")}
                    name="name"
                    autoComplete="name"
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    placeholder="Your name…"
                    data-field="name"
                    aria-invalid={errors.name ? true : undefined}
                    aria-describedby={errors.name ? fid("name-err") : undefined}
                    className={`${inputClass} mt-3`}
                  />
                  {errorText("name")}
                </div>
                <div>
                  <label htmlFor={fid("phone")} className={legendClass}>
                    Phone number
                  </label>
                  <input
                    id={fid("phone")}
                    name="tel"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    placeholder="98765 43210…"
                    data-field="phone"
                    aria-invalid={errors.phone ? true : undefined}
                    aria-describedby={errors.phone ? fid("phone-err") : undefined}
                    className={`${inputClass} mt-3 tabular-nums`}
                  />
                  {errorText("phone")}
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor={fid("notes")} className={legendClass}>
                    Anything else? <span className="font-normal text-muted">(optional)</span>
                  </label>
                  <textarea
                    id={fid("notes")}
                    name="notes"
                    rows={3}
                    value={form.notes}
                    onChange={(e) => set("notes", e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) formRef.current?.requestSubmit();
                    }}
                    placeholder="When it happened, what you've tried, your budget for a new phone…"
                    className={`${inputClass} mt-3 resize-y`}
                  />
                </div>
              </div>

              {/* Message preview on small screens (desktop shows it in the side column). */}
              <div className="mt-8 lg:hidden">
                <p className="text-[0.9375rem] font-semibold text-muted">Your WhatsApp message</p>
                <MessagePreview message={message} />
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="mt-10 flex flex-wrap items-center gap-2">
          {step > 0 && (
            <button type="button" onClick={() => goTo(step - 1)} className="btn btn-paper">
              <ArrowLeft aria-hidden /> Back
            </button>
          )}
          {step < STEP_NAMES.length - 1 ? (
            <button type="submit" className="btn btn-char flex-1 sm:flex-none sm:px-8">
              Next: {STEP_NAMES[step + 1]} <ArrowRight aria-hidden />
            </button>
          ) : (
            <button type="submit" className="btn btn-whatsapp flex-1 text-[1.0625rem] sm:flex-none sm:px-8">
              <WhatsAppIcon /> Send booking on WhatsApp
            </button>
          )}
        </div>

        <div aria-live="polite">
          {sentUrl && (
            <div role="status" className="mt-6 flex gap-3 bg-[#dff3e6] p-5 text-[1rem] text-ink">
              <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-[#14703b]" aria-hidden />
              <p>
                <strong className="block">WhatsApp opened with your booking. Just press send.</strong>
                Didn&rsquo;t open?{" "}
                <a href={sentUrl} target="_blank" rel="noopener noreferrer" className="link font-bold">
                  Open WhatsApp
                </a>{" "}
                or call{" "}
                <a href={telLink(PRIMARY_PHONE.e164)} className="link font-bold tabular-nums">
                  {PRIMARY_PHONE.display}
                </a>
                .
              </p>
            </div>
          )}
        </div>
      </form>

      {/* Side column: live preview + other ways in */}
      <aside className="lg:col-span-4 lg:col-start-9" aria-label="Message preview and contact">
        <div className="lg:sticky lg:top-28">
          <div className="hidden lg:block">
            <p className="text-[0.9375rem] font-semibold text-muted">Your WhatsApp message</p>
            <MessagePreview message={message} />
            <p className="mt-3 text-[0.875rem] text-muted">
              Goes to <span className="tabular-nums">{PRIMARY_PHONE.display}</span>. Nothing is sent until you press send
              in WhatsApp.
            </p>
          </div>

          <div className="bg-char p-6 text-paper lg:mt-8">
            <p className="text-[1.125rem] font-bold">Rather talk?</p>
            <p className="mt-1 text-[0.9375rem] text-fog">{BUSINESS.address.full}</p>
            <div className="mt-5 grid gap-1.5">
              {BUSINESS.phones.map((p) => (
                <a key={p.e164} href={telLink(p.e164)} className="btn btn-smoke justify-between">
                  <span className="tabular-nums">{p.display}</span> <Phone aria-hidden />
                </a>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

function MessagePreview({ message }: { message: string }) {
  return (
    <div className="mt-2 bg-[#dcf2d4] px-4 py-3.5 text-[0.9375rem] leading-snug text-ink">
      <WaText text={message} />
    </div>
  );
}
