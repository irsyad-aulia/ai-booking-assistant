type BookingRequest = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  service: string;
  preferred_date: string;
  message: string | null;
  status: string;
  ai_reply: string | null;
  created_at: string;
};

async function getBookingRequests() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const response = await fetch(`${baseUrl}/api/booking-requests`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch booking requests");
  }

  return response.json();
}

export default async function DashboardPage() {
  const { bookingRequests } = await getBookingRequests();

  return (
    <main className="min-h-screen bg-[#050816] px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
              Admin Dashboard
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight">
              Booking Requests
            </h1>
            <p className="mt-3 max-w-2xl leading-7 text-slate-400">
              Review customer booking requests submitted through the AI Booking
              Assistant form.
            </p>
          </div>

          <a
            href="/"
            className="rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-300/60 hover:text-cyan-200"
          >
            Back to Landing Page
          </a>
        </div>

        <div className="grid gap-5">
          {bookingRequests.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-slate-400">
              No booking requests yet.
            </div>
          ) : (
            bookingRequests.map((request: BookingRequest) => (
              <article
                key={request.id}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
              >
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                  <div>
                    <h2 className="text-2xl font-semibold text-white">
                      {request.name}
                    </h2>
                    <p className="mt-2 text-slate-400">{request.email}</p>
                    {request.phone && (
                      <p className="mt-1 text-slate-500">{request.phone}</p>
                    )}
                  </div>

                  <div className="rounded-full bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-200">
                    {request.status}
                  </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                    <p className="text-sm text-slate-500">Service</p>
                    <p className="mt-1 font-semibold text-white">
                      {request.service}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                    <p className="text-sm text-slate-500">Preferred Date</p>
                    <p className="mt-1 font-semibold text-white">
                      {request.preferred_date}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                    <p className="text-sm text-slate-500">Created At</p>
                    <p className="mt-1 font-semibold text-white">
                      {new Date(request.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>

                {request.message && (
                  <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                    <p className="text-sm text-slate-500">Customer Message</p>
                    <p className="mt-2 leading-7 text-slate-300">
                      {request.message}
                    </p>
                  </div>
                )}

                {request.ai_reply && (
                  <div className="mt-5 rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4">
                    <p className="text-sm font-semibold text-cyan-200">
                      AI Reply Draft
                    </p>
                    <p className="mt-2 leading-7 text-slate-300">
                      {request.ai_reply}
                    </p>
                  </div>
                )}
              </article>
            ))
          )}
        </div>
      </div>
    </main>
  );
}