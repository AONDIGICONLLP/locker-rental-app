import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  MapPin,
  ShieldCheck,
  KeyRound,
  CreditCard,
  Package,
  PackageOpen,
  Boxes,
  Quote,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Headphones,
  Users,
  XCircle,
  Wallet,
} from 'lucide-react';
import api from '../api/axios';
import LockerCard from '../components/LockerCard';

const sizeCategories = [
  { key: 'small', label: 'Small Lockers', icon: Package, blurb: 'Documents, jewellery, passports' },
  { key: 'medium', label: 'Medium Lockers', icon: PackageOpen, blurb: 'Electronics, files, valuables' },
  { key: 'large', label: 'Large Lockers', icon: Boxes, blurb: 'Inventory, equipment, luggage' },
];

// Fallback arrays if specific contextual UI blocks require text structures
const sampleTestimonials = [
  { name: "Ankita S.", city: "Pune", quote: "Extremely secure, access was fast and customer service was incredibly accommodating." },
  { name: "Rahul M.", city: "Raipur", quote: "Clean spaces, seamless verification process, completely hassle-free setup." }
];

export default function Home() {
  const navigate = useNavigate();
  const [featured, setFeatured] = useState([]);
  const [lockersCountList, setLockersCountList] = useState([]);
  const [search, setSearch] = useState({ city: '', size: '' });
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    api
      .get('/lockers')
      .then((res) => {
        if (res.data && res.data.length > 0) {
          // Adjust capitalization checks based on TSQL model mappings (e.g., Id or id)
          setFeatured(res.data.slice(0, 6));
          
          // Generate real-time counts from the dynamic database response array
          const counts = sizeCategories.map((c) => ({
            ...c,
            count: res.data.filter((l) => String(l.size || l.Size).toLowerCase() === c.key).length,
          }));
          setLockersCountList(counts);
        }
      })
      .catch((err) => console.error("Error fetching homepage dynamic lists:", err));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search.city) params.set('city', search.city);
    if (search.size) params.set('size', search.size);
    navigate(`/browse?${params.toString()}`);
  };

  const nextSlide = () => setCurrentSlide((prev) => (prev === sampleTestimonials.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? sampleTestimonials.length - 1 : prev - 1));

  return (
    <div className="bg-stone-50 min-h-screen">
      <section className="bg-stone-900 pt-16 pb-20 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 bg-stone-800 text-brand-400 text-xs font-medium px-3 py-1 rounded-full mb-5">
              <ShieldCheck size={14} /> Bank-grade locker rentals
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold text-white leading-tight">
              Find a secure locker, <span className="text-brand-400">ready when you are.</span>
            </h1>
            <p className="mt-4 text-stone-300 text-lg max-w-lg mb-8">
              SecureLocker connects locker owners with people who need safe, affordable storage — search by city and size.
            </p>

            <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-xl p-4 flex flex-col sm:flex-row gap-3 relative z-10 max-w-xl">
              <div className="flex-1 flex items-center gap-2 border border-stone-200 rounded-lg px-3 py-2.5">
                <MapPin size={18} className="text-brand-600 shrink-0" />
                <input
                  placeholder="City (e.g. Raipur, Mumbai)"
                  value={search.city}
                  onChange={(e) => setSearch({ ...search, city: e.target.value })}
                  className="w-full outline-none text-sm text-stone-700 placeholder:text-stone-400"
                />
              </div>
              <div className="flex-1 flex items-center gap-2 border border-stone-200 rounded-lg px-3 py-2.5">
                <Boxes size={18} className="text-brand-600 shrink-0" />
                <select
                  value={search.size}
                  onChange={(e) => setSearch({ ...search, size: e.target.value })}
                  className="w-full outline-none text-sm text-stone-700 bg-transparent"
                >
                  <option value="">Any size</option>
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>
              <button type="submit" className="bg-brand-600 hover:bg-brand-700 transition text-white font-medium px-6 py-2.5 rounded-lg flex items-center justify-center gap-2">
                <Search size={16} /> Search
              </button>
            </form>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none flex justify-center">
            <div className="relative w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border-4 border-stone-800">
              <img 
                src="https://images.tv9telugu.com/wp-content/uploads/2025/11/gold-in-bank-locker.jpg" 
                alt="Premium Bank Gold Vault Lockers" 
                className="w-full h-80 object-cover brightness-95"
              />
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-16">
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { icon: Search, title: '01. Find a locker', text: 'Search by city, size and budget to compare available lockers.' },
            { icon: KeyRound, title: '02. Define your booking', text: 'Pick a start date and duration that suits how long you need it.' },
            { icon: CreditCard, title: '03. Confirm & go', text: 'Confirm your booking and track it any time from your dashboard.' },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700 mb-4">
                <Icon size={20} />
              </div>
              <h3 className="font-display font-semibold text-stone-800 mb-1">{title}</h3>
              <p className="text-stone-500 text-sm">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BROWSE BY SIZE CATEGORIES */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl font-semibold text-stone-800">Browse by Size</h2>
          <Link to="/browse" className="text-brand-700 text-sm font-medium flex items-center gap-1 hover:underline">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid sm:grid-cols-3 gap-6">
          {(lockersCountList.length > 0 ? lockersCountList : sizeCategories.map(c => ({...c, count: 0}))).map(({ key, label, icon: Icon, blurb, count }) => (
            <Link key={key} to={`/browse?size=${key}`} className="bg-stone-800 hover:bg-stone-900 transition rounded-2xl p-6 text-white flex items-center justify-between shadow">
              <div>
                <Icon size={26} className="text-brand-400 mb-3" />
                <h3 className="font-display font-semibold">{label}</h3>
                <p className="text-stone-400 text-sm">{blurb}</p>
                <p className="text-brand-400 text-xs mt-2">{count} Available Live</p>
              </div>
              <ArrowRight size={18} className="text-stone-500" />
            </Link>
          ))}
        </div>
      </section>

      {/* DYNAMIC POPULAR LOCKERS GRID */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <h2 className="font-display text-2xl font-semibold text-stone-800 mb-6">Popular Lockers</h2>
        {featured.length === 0 ? (
          <p className="text-stone-400 text-sm">No active locker data found in database.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map((locker) => (
              <LockerCard key={locker.Id || locker.id} locker={locker} onBook={() => navigate('/browse')} />
            ))}
          </div>
        )}
      </section>

      {/* TESTIMONIALS SLIDER */}
      <section className="bg-stone-100 py-16 border-t border-stone-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="relative bg-white rounded-3xl border border-stone-200 p-8 shadow-sm flex flex-col justify-between">
            <Quote size={40} className="text-brand-100 absolute top-6 left-6" />
            <div>
              <p className="text-stone-600 text-base italic mb-6">"{sampleTestimonials[currentSlide].quote}"</p>
              <p className="font-semibold text-stone-800 text-sm">{sampleTestimonials[currentSlide].name}</p>
              <p className="text-brand-600 text-xs font-medium">{sampleTestimonials[currentSlide].city}</p>
            </div>
            <div className="flex justify-center gap-3 mt-6">
              <button onClick={prevSlide} className="p-2 rounded-full border border-stone-200 bg-white"><ChevronLeft size={16} /></button>
              <button onClick={nextSlide} className="p-2 rounded-full border border-stone-200 bg-white"><ChevronRight size={16} /></button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}