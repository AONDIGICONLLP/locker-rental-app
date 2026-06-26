import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '', role: 'renter' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const user = await signup(form);
      navigate(user.role === 'owner' ? '/owner' : '/browse');
    } catch (err) {
      setError(err.response?.data?.message || 'Could not create account');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <h1 className="font-display text-2xl font-semibold text-stone-800 mb-1">Create your account</h1>
      <p className="text-stone-500 mb-6">Join as a locker owner or a renter.</p>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <button
          type="button"
          onClick={() => setForm({ ...form, role: 'renter' })}
          className={`rounded-xl border p-4 text-left transition ${
            form.role === 'renter' ? 'border-brand-600 bg-brand-50' : 'border-stone-200'
          }`}
        >
          <div className="text-2xl mb-1">🙋</div>
          <div className="font-semibold text-stone-800">Renter</div>
          <div className="text-xs text-stone-500">I want to book a locker</div>
        </button>
        <button
          type="button"
          onClick={() => setForm({ ...form, role: 'owner' })}
          className={`rounded-xl border p-4 text-left transition ${
            form.role === 'owner' ? 'border-brand-600 bg-brand-50' : 'border-stone-200'
          }`}
        >
          <div className="text-2xl mb-1">🏦</div>
          <div className="font-semibold text-stone-800">Owner</div>
          <div className="text-xs text-stone-500">I want to list lockers</div>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Full name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border border-stone-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border border-stone-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Phone (optional)</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full border border-stone-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            minLength={6}
            className="w-full border border-stone-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-brand-600 text-white rounded-lg py-2.5 font-medium hover:bg-brand-700 disabled:opacity-60"
        >
          {submitting ? 'Creating account…' : 'Create account'}
        </button>
      </form>

      <p className="text-center text-sm text-stone-500 mt-6">
        Already have an account? <Link to="/login" className="text-brand-700 font-medium">Log in</Link>
      </p>
    </div>
  );
}
