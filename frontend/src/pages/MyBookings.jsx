import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await api.get('/bookings/mine');
      setBookings(res.data || []);
    } catch (err) {
      console.error("Failed to load user bookings runtime array:", err);
    } {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCancel = async (id) => {
    if (!confirm('Cancel this booking?')) return;
    try {
      await api.put(`/bookings/${id}/cancel`);
      fetchData();
    } catch (err) {
      alert("Failed to process transaction cancel operation.");
    }
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
          {bookings.map((b) => {
            const currentId = b.Id || b.id;
            const currentStatus = String(b.Status || b.status).toLowerCase();
            
            // Handles both nested data objects and flattened table joins
            const displayAddress = b.locker?.address || b.Address || '';
            const displayCity = b.locker?.city || b.City || '';
            const title = b.lockerTitle || b.Title || 'Locker Storage Unit';

            return (
              <div key={currentId} className="bg-white rounded-2xl border border-stone-200 p-4 flex items-center justify-between flex-wrap gap-3">
                <div>
                  <p className="font-semibold text-stone-800">{title}</p>
                  {(displayAddress || displayCity) && (
                    <p className="text-sm text-stone-500">📍 {displayAddress} {displayCity && `, ${displayCity}`}</p>
                  )}
                  <p className="text-sm text-stone-500">
                    From {b.startDate || b.StartDate} for {b.durationMonths || b.DurationMonths} month(s) · ₹{b.totalPrice || b.TotalPrice}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    currentStatus === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-stone-200 text-stone-600'
                  }`}>
                    {currentStatus}
                  </span>
                  {currentStatus === 'active' && (
                    <button onClick={() => handleCancel(currentId)} className="text-sm text-red-600 hover:underline">
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}