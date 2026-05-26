const features = [
  {
    title: "AI Reply Generator",
    description:
      "Generate polished booking replies for new customer requests in seconds.",
  },
  {
    title: "Booking Request Dashboard",
    description:
      "Track appointment requests, customer details, service type, and booking status.",
  },
  {
    title: "Automation Ready",
    description:
      "Designed to connect with tools like n8n, email, WhatsApp, CRM, and calendar workflows.",
  },
];

const workflow = [
  "Customer submits a booking request",
  "The request is saved into the dashboard",
  "AI generates a professional response",
  "Automation sends updates to the business owner",
];

const bookingRequests = [
  {
    name: "Sarah Johnson",
    service: "Hair Styling",
    status: "New Request",
    time: "Today, 10:30 AM",
  },
  {
    name: "Michael Chen",
    service: "Dental Consultation",
    status: "AI Reply Ready",
    time: "Today, 11:15 AM",
  },
  {
    name: "Amelia Carter",
    service: "Fitness Coaching",
    status: "Confirmed",
    time: "Tomorrow, 09:00 AM",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
      <section className="relative">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.22),_transparent_35%),radial-gradient(circle_at_top_right,_rgba(168,85,247,0.2),_transparent_30%),linear-gradient(180deg,_#050816_0%,_#0f172a_100%)]" />

        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-400/10 text-sm font-bold text-cyan-300">
              AI
            </div>
            <span className="text-sm font-semibold tracking-wide text-slate-200">
              AI Booking Assistant
            </span>
          </div>

          <a
            href="#demo"
            className="rounded-full border border-white/10 px-5 py-2 text-sm font-medium text-slate-200 transition hover:border-cyan-300/50 hover:text-cyan-200"
          >
            View Demo
          </a>
        </nav>

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 pb-24 pt-12 lg:grid-cols-[1.05fr_0.95fr] lg:pt-20">
          <div>
            <div className="mb-6 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">
              AI-powered booking workflow for service businesses
            </div>

            <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
              Capture bookings, generate replies, and manage requests faster.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              A modern AI booking assistant concept built for salons, clinics,
              coaches, consultants, and local service businesses that want to
              respond faster and reduce manual admin work.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a
                href="#demo"
                className="rounded-full bg-cyan-300 px-7 py-3 text-center text-sm font-bold text-slate-950 transition hover:bg-cyan-200"
              >
                Explore Dashboard
              </a>
              <a
                href="#workflow"
                className="rounded-full border border-white/10 px-7 py-3 text-center text-sm font-semibold text-slate-200 transition hover:border-white/30"
              >
                See Workflow
              </a>
            </div>

            <div className="mt-10 grid max-w-xl grid-cols-3 gap-4">
              <div>
                <p className="text-3xl font-bold text-white">24/7</p>
                <p className="mt-1 text-sm text-slate-400">Request capture</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">AI</p>
                <p className="mt-1 text-sm text-slate-400">Reply assistant</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">n8n</p>
                <p className="mt-1 text-sm text-slate-400">Automation ready</p>
              </div>
            </div>
          </div>

          <div
            id="demo"
            className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-4 shadow-2xl shadow-cyan-950/40 backdrop-blur"
          >
            <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/90 p-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div>
                  <p className="text-sm text-slate-400">Admin Dashboard</p>
                  <h2 className="mt-1 text-xl font-semibold text-white">
                    Booking Requests
                  </h2>
                </div>
                <div className="rounded-full bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-300">
                  Live Preview
                </div>
              </div>

              <div className="mt-5 space-y-4">
                {bookingRequests.map((request) => (
                  <div
                    key={request.name}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-white">
                          {request.name}
                        </h3>
                        <p className="mt-1 text-sm text-slate-400">
                          {request.service}
                        </p>
                      </div>
                      <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-200">
                        {request.status}
                      </span>
                    </div>
                    <p className="mt-4 text-sm text-slate-500">
                      {request.time}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4">
                <p className="text-sm font-semibold text-cyan-200">
                  AI Suggested Reply
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Hi Sarah, thanks for your booking request. We received your
                  preferred schedule and will confirm availability shortly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
            Core Features
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white">
            Built to show real product thinking, not just visual design.
          </h2>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
            >
              <h3 className="text-xl font-semibold text-white">
                {feature.title}
              </h3>
              <p className="mt-4 leading-7 text-slate-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="workflow"
        className="mx-auto max-w-7xl px-6 py-20"
      >
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
              Workflow
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white">
              From booking request to AI-generated response.
            </h2>
            <p className="mt-5 leading-8 text-slate-400">
              This project will grow into a full-stack AI automation system with
              database, dashboard, AI response generation, and workflow
              automation.
            </p>
          </div>

          <div className="space-y-4">
            {workflow.map((item, index) => (
              <div
                key={item}
                className="flex gap-4 rounded-3xl border border-white/10 bg-white/[0.04] p-5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-300 text-sm font-bold text-slate-950">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-white">{item}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Designed for async teams, service businesses, and automation
                    workflows.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-8 md:p-12">
          <div className="grid gap-10 md:grid-cols-[1fr_0.8fr] md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
                Portfolio Case Study
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white">
                A flagship project for remote AI product engineering roles.
              </h2>
              <p className="mt-5 leading-8 text-slate-400">
                This project demonstrates frontend engineering, product UI,
                AI-assisted workflows, database integration, automation thinking,
                and written product documentation.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-950 p-6">
              <p className="text-sm text-slate-400">Target Positioning</p>
              <h3 className="mt-2 text-2xl font-semibold text-white">
                AI Frontend Engineer
              </h3>
              <p className="mt-4 leading-7 text-slate-400">
                Building AI-powered web interfaces, dashboards, and
                automation-ready products using Next.js, TypeScript, AI tools,
                and modern workflow systems.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}