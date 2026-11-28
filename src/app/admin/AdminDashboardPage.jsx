import Link from "next/link";

const STATS = [
  { label: "Total Bookings", value: "128", note: "+14 this week" },
  { label: "Pending Confirmation", value: "9", note: "Needs review" },
  { label: "Active Services", value: "6", note: "2 featured" },
];

const RECENT_BOOKINGS = [
  { id: "BK-1042", client: "Aarav Sharma", service: "Business Registration", date: "26 Nov 2026", status: "Confirmed" },
  { id: "BK-1041", client: "Meera Nair", service: "GST & Compliance Audit", date: "27 Nov 2026", status: "Pending" },
  { id: "BK-1040", client: "Rohan Verma", service: "Market Entry Consultation", date: "28 Nov 2026", status: "Confirmed" },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8 px-5 xl:px-8 2xl:px-12 py-5">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-3xl font-medium tracking-tight md:text-4xl">Admin Overview</h1>
          <p className="mt-2 text-base text-blackk/65">
            Manage client bookings, update service offerings, and review portal access.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/services"
            className="rounded-lg border border-blackk/15 bg-white px-5 py-2.5 text-sm font-semibold text-blackk transition-colors hover:border-bluee hover:text-bluee"
          >
            Edit Services
          </Link>
          <Link
            href="/admin/bookings"
            className="rounded-lg bg-bluee px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blackk"
          >
            View All Bookings
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-5 sm:grid-cols-3">
        {STATS.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-blackk/10 bg-white p-6">
            <p className="text-sm text-blackk/55">{stat.label}</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-blackk">{stat.value}</p>
            <p className="mt-1 text-xs font-medium text-bluee">{stat.note}</p>
          </div>
        ))}
      </div>

      {/* Recent Bookings Card */}
      <section className="rounded-3xl bg-white p-6 sm:p-8">
        <div className="flex items-center justify-between border-b border-blackk/10 pb-5">
          <h2 className="text-xl font-medium tracking-tight">Recent Bookings</h2>
          <Link href="/admin/bookings" className="text-sm font-medium text-bluee hover:underline">
            Manage all
          </Link>
        </div>

        <div className="mt-4 divide-y divide-blackk/10">
          {RECENT_BOOKINGS.map((booking) => (
            <div
              key={booking.id}
              className="flex flex-col justify-between gap-2 py-4 sm:flex-row sm:items-center"
            >
              <div>
                <p className="font-medium text-blackk">
                  {booking.client}{" "}
                  <span className="ml-2 text-xs font-normal text-blackk/50">({booking.id})</span>
                </p>
                <p className="text-sm text-blackk/65">
                  {booking.service} &bull; {booking.date}
                </p>
              </div>
              <span
                className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                  booking.status === "Confirmed"
                    ? "bg-bluee/10 text-bluee"
                    : "bg-yelloww/25 text-blackk"
                }`}
              >
                {booking.status}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}