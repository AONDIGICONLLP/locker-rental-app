import { useState } from 'react';
import api from '../api/axios';

export default function BookingModal({ locker, onClose, onSuccess }) {
  const [startDate, setStartDate] = useState('');
  const [durationMonths, setDurationMonths] = useState(1);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const total = locker.price * Number(durationMonths || 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!startDate) {
      setError('Please choose a start date');
      return;
    }
    setSubmitting(true);
    try {
      await api.post('/bookings', { lockerId: locker.id, startDate, durationMonths });
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Could not complete booking');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-md p-6">
        <h2 className="text-xl font-display font-semibold text-stone-800 mb-1">Book "{locker.title}"</h2>
        <p className="text-stone-500 text-sm mb-4">{locker.city} · ₹{locker.price}/month</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Start date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full border border-stone-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Duration (months)</label>
            <input
              type="number"
              min="1"
              max="36"
              value={durationMonths}
              onChange={(e) => setDurationMonths(e.target.value)}
              className="w-full border border-stone-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div className="bg-stone-50 rounded-lg p-3 flex items-center justify-between">
            <span className="text-stone-600 text-sm">Total amount</span>
            <span className="font-display font-semibold text-stone-800">₹{total}</span>
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-stone-300 rounded-lg py-2 text-stone-600 hover:bg-stone-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-brand-600 text-white rounded-lg py-2 font-medium hover:bg-brand-700 disabled:opacity-60"
            >
              {submitting ? 'Booking…' : 'Confirm Booking'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
