export default function SettingsPage() {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm border">
      <h2 className="text-3xl font-bold text-[#0B4E9B] mb-4">
        Account Settings
      </h2>

      <p className="text-gray-600 mb-8">
        Update your profile information and account preferences.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          type="text"
          placeholder="Full Name"
          className="border rounded-xl px-4 py-4 outline-none focus:border-[#0B4E9B]"
        />

        <input
          type="email"
          placeholder="Email Address"
          className="border rounded-xl px-4 py-4 outline-none focus:border-[#0B4E9B]"
        />
      </div>

      <button className="mt-8 bg-[#0B4E9B] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#00B7EB] transition">
        Save Changes
      </button>
    </div>
  );
}