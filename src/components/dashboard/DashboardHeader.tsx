export default function DashboardHeader() {
  return (
    <header className="sticky top-0 z-30 border-b bg-white px-4 md:px-8 py-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#0B4E9B]">
            Customer Dashboard
          </h1>

          <p className="text-gray-500 mt-1">
            Manage your bookings, favorites, and settings.
          </p>
        </div>

        {/* User */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-[#0B4E9B] text-white flex items-center justify-center font-bold">
            C
          </div>
        </div>
      </div>
    </header>
  );
}