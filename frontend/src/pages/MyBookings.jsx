import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const res = await api.get('/bookings/mine');
    setBookings(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCancel = async (id) => {
    if (!confirm('Cancel this booking?')) return;
    await api.put(`/bookings/${id}/cancel`);
    fetchData();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="font-display text-2xl font-semibold text-stone-800 mb-1">My Bookings</h1>
      <p className="text-stone-500 mb-6">Lockers you've reserved.</p>

      {loading ? (
        <p className="text-stone-400">Loading…</p>
      ) : bookings.length === 0 ? (
        <p className="text-stone-400">You haven't booked any lockers yet.</p>
      ) : (
        <div className="space-y-3">
          {bookings.map((b) => (
            <div key={b.id} className="bg-white rounded-2xl border border-stone-200 p-4 flex items-center justify-between flex-wrap gap-3">
              <div>
                <p className="font-semibold text-stone-800">{b.lockerTitle}</p>
                {b.locker && <p className="text-sm text-stone-500">📍 {b.locker.address}, {b.locker.city}</p>}
                <p className="text-sm text-stone-500">
                  From {b.startDate} for {b.durationMonths} month(s) · ₹{b.totalPrice}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${
                    b.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-stone-200 text-stone-600'
                  }`}
                >
                  {b.status}
                </span>
                {b.status === 'active' && (
                  <button onClick={() => handleCancel(b.id)} className="text-sm text-red-600 hover:underline">
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
