import Image from "next/image";
import Link from "next/link";
import { IMAGES, type ImageKey } from "@/lib/constants";
import { BreadcrumbData } from "@/components/StructuredData";

interface PageHeaderProps {
  title: string;
  crumb: string;
  path: string;
  intro: string;
  image: ImageKey;
  /** Optional Malayalam line under the intro. */
  ml?: string;
  children?: React.ReactNode;
}

/** Top of every inner page: big title on the dark ground, a square-cropped photo beside it. */
export function PageHeader({ title, crumb, path, intro, image, ml, children }: PageHeaderProps) {
  return (
    <section className="bg-char text-paper">
      <BreadcrumbData name={crumb} path={path} />
      <div className="wrap grid gap-10 pb-16 pt-8 lg:grid-cols-12 lg:items-end lg:gap-8 lg:pb-24 lg:pt-12">
        <div className="lg:col-span-7">
          <nav aria-label="Breadcrumb" className="rise text-[0.875rem] text-fog">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="link hover:text-paper">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="font-semibold text-paper">
                {crumb}
              </li>
            </ol>
          </nav>
          <h1 style={{ "--d": "30ms" } as React.CSSProperties} className="rise display mt-8 text-[clamp(3.5rem,15vw,5.5rem)] lg:mt-12 lg:text-[clamp(5.5rem,7.6vw,7rem)]">
            {title}
          </h1>
          <p style={{ "--d": "70ms" } as React.CSSProperties} className="rise mt-6 max-w-[36rem] text-[1.125rem] leading-relaxed text-paper/85 sm:text-[1.25rem]">{intro}</p>
          {ml && (
            <p lang="ml" style={{ "--d": "100ms" } as React.CSSProperties} className="rise mt-4 text-[1.25rem] font-semibold sm:text-[1.375rem]">
              {ml}
            </p>
          )}
          {children}
        </div>
        <div style={{ "--d": "60ms" } as React.CSSProperties} className="rise relative aspect-[16/10] overflow-hidden lg:col-span-5 lg:aspect-square">
          <Image
            src={IMAGES[image].src} placeholder="blur"
            alt={IMAGES[image].alt}
            fill
            preload
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
