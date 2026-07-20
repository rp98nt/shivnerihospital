export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <p className="text-lg font-semibold tracking-tight">
            Shivneri Hospital
          </p>
          <a
            href="tel:+910000000000"
            className="text-sm font-medium text-red-600"
          >
            24/7 Emergency
          </a>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-6 py-16">
        <p className="mb-3 text-sm font-medium uppercase tracking-wider text-teal-700">
          Coming soon
        </p>
        <h1 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
          Trusted care, every day.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
          Website under development. Full hospital site with departments, doctor
          directory, appointments, and WhatsApp support will launch here soon.
        </p>
      </main>

      <footer className="border-t border-slate-200 bg-white px-6 py-6 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Shivneri Hospital. All rights reserved.
      </footer>
    </div>
  );
}
