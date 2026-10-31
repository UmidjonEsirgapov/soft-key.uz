import { Breadcrumbs, type BreadcrumbItem } from "./Breadcrumbs";

interface PageHeaderProps {
  title: string;
  eyebrow?: string;
  description?: string;
  breadcrumbs: BreadcrumbItem[];
  color?: string;
  children?: React.ReactNode;
}

export function PageHeader({ title, eyebrow, description, breadcrumbs, color, children }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      {color && (
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-70 blur-3xl"
          style={{ background: color }}
          aria-hidden
        />
      )}
      <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <Breadcrumbs items={breadcrumbs} />
        {eyebrow && (
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-ink-3">{eyebrow}</p>
        )}
        <h1 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-5xl">{title}</h1>
        {description && (
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-2">{description}</p>
        )}
        {children}
      </div>
    </section>
  );
}
