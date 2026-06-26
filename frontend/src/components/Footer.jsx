import { Link } from 'react-router-dom';
import { Lock, MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const cities = ['Raipur', 'Mumbai', 'Bengaluru', 'Delhi', 'Pune', 'Hyderabad'];

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-400 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 font-display font-semibold text-lg text-white mb-3">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white">
              <Lock size={16} strokeWidth={2.5} />
            </span>
            SecureLocker
          </div>
          <p className="text-sm leading-relaxed mb-4">
            A marketplace for renting secure, bank-style lockers — list a spare locker as an
            owner, or find one near you as a renter.
          </p>
          <div className="flex items-center gap-3">
            <a href="#" aria-label="Facebook" className="hover:text-brand-400 transition"><Facebook size={18} /></a>
            <a href="#" aria-label="Twitter" className="hover:text-brand-400 transition"><Twitter size={18} /></a>
            <a href="#" aria-label="Instagram" className="hover:text-brand-400 transition"><Instagram size={18} /></a>
            <a href="#" aria-label="LinkedIn" className="hover:text-brand-400 transition"><Linkedin size={18} /></a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3 text-sm tracking-wide uppercase">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-brand-400 transition">Home</Link></li>
            <li><Link to="/browse" className="hover:text-brand-400 transition">Browse Lockers</Link></li>
            <li><Link to="/signup" className="hover:text-brand-400 transition">List Your Locker</Link></li>
            <li><Link to="/login" className="hover:text-brand-400 transition">Log in</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3 text-sm tracking-wide uppercase">Popular Cities</h4>
          <ul className="space-y-2 text-sm">
            {cities.map((city) => (
              <li key={city}>
                <Link to={`/browse?city=${encodeURIComponent(city)}`} className="hover:text-brand-400 transition">
                  Lockers in {city}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3 text-sm tracking-wide uppercase">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="text-brand-400 mt-0.5 shrink-0" />
              Raipur, Chhattisgarh, India
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="text-brand-400 shrink-0" />
              1800-000-0000
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="text-brand-400 shrink-0" />
              support@securelocker.app
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-stone-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 text-xs text-stone-500 flex flex-wrap items-center justify-between gap-2">
          <span>© {new Date().getFullYear()} SecureLocker. A demo locker rental platform.</span>
          {/* <span>Built with React, Node.js and Tailwind CSS.</span> */}
        </div>
      </div>
    </footer>
  );
}