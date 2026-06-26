import { useEffect, useState } from 'react';
import api from '../api/axios';
import AddLockerModal from '../components/AddLockerModal';

const sizeLabels = { small: 'Small', medium: 'Medium', large: 'Large' };

export default function OwnerDashboard() {
  const [tab, setTab] = useState('lockers');
  const [lockers, setLockers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalLocker, setModalLocker] = useState(undefined); // undefined = closed, null = add, object = edit

  const fetchData = async () => {
    setLoading(true);
    const [lockersRes, bookingsRes] = await Promise.all([api.get('/lockers/mine'), api.get('/bookings/owner')]);
    setLockers(lockersRes.data);
    setBookings(bookingsRes.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this locker?')) return;
    await api.delete(`/lockers/${id}`);
    fetchData();
  };

  const handleCancelBooking = async (id) => {
    if (!confirm('Cancel this booking?')) return;
    await api.put(`/bookings/${id}/cancel`);
    fetchData();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold text-stone-800">Owner Dashboard</h1>
          <p className="text-stone-500">Manage your lockers and bookings.</p>
        </div>
        <button
          onClick={() => setModalLocker(null)}
          className="bg-brand-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-brand-700 transition"
        >
          + Add Locker
        </button>
      </div>

      <div className="flex gap-2 mb-6 border-b border-stone-200">
        <button
          onClick={() => setTab('lockers')}
          className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px ${
            tab === 'lockers' ? 'border-brand-600 text-brand-700' : 'border-transparent text-stone-500'
          }`}
        >
          My Lockers ({lockers.length})
        </button>
        <button
          onClick={() => setTab('bookings')}
          className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px ${
            tab === 'bookings' ? 'border-brand-600 text-brand-700' : 'border-transparent text-stone-500'
          }`}
        >
          Bookings ({bookings.length})
        </button>
      </div>

      {loading ? (
        <p className="text-stone-400">Loading…</p>
      ) : tab === 'lockers' ? (
        lockers.length === 0 ? (
          <p className="text-stone-400">You haven't listed any lockers yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {lockers.map((locker) => (
              <div key={locker.id} className="bg-white rounded-2xl border border-stone-200 p-5">
                <div className="flex items-start justify-between mb-2 gap-2">
                  <h3 className="font-display font-semibold text-stone-800">{locker.title}</h3>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap ${
                      locker.status === 'available' ? 'bg-emerald-100 text-emerald-700' : 'bg-stone-200 text-stone-600'
                    }`}
                  >
                    {locker.status === 'available' ? 'Available' : 'Booked'}
                  </span>
                </div>
                <p className="text-stone-500 text-sm mb-1">📍 {locker.address}, {locker.city}</p>
                <p className="text-stone-500 text-sm mb-3">
                  {sizeLabels[locker.size]} · ₹{locker.price}/month
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setModalLocker(locker)}
                    className="flex-1 border border-stone-300 rounded-lg py-1.5 text-sm text-stone-600 hover:bg-stone-50"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(locker.id)}
                    disabled={locker.status === 'booked'}
                    className="flex-1 border border-red-200 rounded-lg py-1.5 text-sm text-red-600 hover:bg-red-50 disabled:opacity-40"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )
      ) : bookings.length === 0 ? (
        <p className="text-stone-400">No bookings on your lockers yet.</p>
      ) : (
        <div className="space-y-3">
          {bookings.map((b) => (
            <div key={b.id} className="bg-white rounded-2xl border border-stone-200 p-4 flex items-center justify-between flex-wrap gap-3">
              <div>
                <p className="font-semibold text-stone-800">{b.lockerTitle}</p>
                <p className="text-sm text-stone-500">
                  Renter: {b.renterName} {b.renterPhone && `· ${b.renterPhone}`}
                </p>
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
                  <button onClick={() => handleCancelBooking(b.id)} className="text-sm text-red-600 hover:underline">
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {modalLocker !== undefined && (
        <AddLockerModal
          locker={modalLocker}
          onClose={() => setModalLocker(undefined)}
          onSuccess={() => {
            setModalLocker(undefined);
            fetchData();
          }}
        />
      )}
    </div>
  );
}
