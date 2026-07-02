import { useEffect, useState } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import LockerCard from '../components/LockerCard';
import BookingModal from '../components/BookingModal';

export default function Browse() {
  const { user } = useAuth();
  const [lockers, setLockers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ city: '', size: '', maxPrice: '' });
  const [bookingLocker, setBookingLocker] = useState(null);
  const [message, setMessage] = useState('');

  const fetchLockers = async () => {
    setLoading(true);
    const params = {};
    if (filters.city) params.city = filters.city;
    if (filters.size) params.size = filters.size;
    if (filters.maxPrice) params.maxPrice = filters.maxPrice;
    const res = await api.get('/lockers', { params });
    setLockers(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchLockers();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchLockers();
  };

  const handleBookClick = (locker) => {
    if (!user) {
      setMessage('Please log in as a renter to book a locker.');
      return;
    }
    if (user.role !== 'renter') {
      setMessage('Only renter accounts can book lockers.');
      return;
    }
    setMessage('');
    setBookingLocker(locker);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="font-display text-2xl font-semibold text-stone-800 mb-1">Browse Lockers</h1>
      <p className="text-stone-500 mb-6">Find an available locker that fits your needs.</p>

      <form onSubmit={handleSearch} className="bg-white border border-stone-200 rounded-2xl p-4 flex flex-wrap gap-3 mb-8">
        <input
          placeholder="City"
          value={filters.city}
          onChange={(e) => setFilters({ ...filters, city: e.target.value })}
          className="border border-stone-300 rounded-lg px-3 py-2 flex-1 min-w-[140px] focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
        <select
          value={filters.size}
          onChange={(e) => setFilters({ ...filters, size: e.target.value })}
          className="border border-stone-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500"
        >
          <option value="">Any size</option>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
        <input
          type="number"
          placeholder="Max price (₹)"
          value={filters.maxPrice}
          onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
          className="border border-stone-300 rounded-lg px-3 py-2 w-40 focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
        <button type="submit" className="bg-brand-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-brand-700 transition">
          Search
        </button>
      </form>

      {message && (
        <p className="text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2 mb-6 text-sm">{message}</p>
      )}

      {loading ? (
        <p className="text-stone-400">Loading lockers…</p>
      ) : lockers.length === 0 ? (
        <p className="text-stone-400">No lockers found. Try adjusting your filters.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {lockers.map((locker) => (
            <LockerCard key={locker.id} locker={locker} onBook={handleBookClick} />
          ))}
        </div>
      )}

      {bookingLocker && (
        <BookingModal
          locker={bookingLocker}
          onClose={() => setBookingLocker(null)}
          onSuccess={() => {
            setBookingLocker(null);
            setMessage('Locker booked successfully! Check "My Bookings" for details.');
            fetchLockers();
          }}
        />
      )}
    </div>
  );
}
