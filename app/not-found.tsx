import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <div className="flex gap-2" aria-hidden>
        {["4", "0", "4"].map((d, i) => (
          <span
            key={i}
            className="keycap inline-flex h-20 w-20 items-center justify-center rounded-2xl font-display text-4xl font-bold text-ink"
          >
            {d}
          </span>
        ))}
      </div>
      <h1 className="mt-10 font-display text-3xl font-bold tracking-tight text-ink">
        Bu sahifa topilmadi
      </h1>
      <p className="mt-3 text-ink-2">
        Havola eskirgan yoki manzil xato yozilgan bo&apos;lishi mumkin.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="keycap keycap-accent inline-flex h-12 items-center rounded-xl px-6 font-semibold">
          Bosh sahifa
        </Link>
        <Link href="/qidiruv" className="keycap inline-flex h-12 items-center rounded-xl px-6 font-semibold text-ink">
          Qidiruv
        </Link>
      </div>
    </div>
  );
}
