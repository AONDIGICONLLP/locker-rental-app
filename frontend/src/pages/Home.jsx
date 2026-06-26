import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  MapPin,
  ShieldCheck,
  KeyRound,
  CreditCard,
  Lock,
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
  PlusCircle,
} from 'lucide-react';
import api from '../api/axios';
import LockerCard from '../components/LockerCard';
import { sampleLockers, sampleTestimonials, sampleStats } from '../data/sampleLockers';

const sizeCategories = [
  { key: 'small', label: 'Small Lockers', icon: Package, blurb: 'Documents, jewellery, passports' },
  { key: 'medium', label: 'Medium Lockers', icon: PackageOpen, blurb: 'Electronics, files, valuables' },
  { key: 'large', label: 'Large Lockers', icon: Boxes, blurb: 'Inventory, equipment, luggage' },
];

export default function Home() {
  const navigate = useNavigate();
  const [featured, setFeatured] = useState(sampleLockers.slice(0, 6)); // text fallback
  const [search, setSearch] = useState({ city: '', size: '' });
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    api
      .get('/lockers')
      .then((res) => {
        if (res.data && res.data.length > 0) setFeatured(res.data.slice(0, 6)); // fetch fallback check
      })
      .catch(() => {
        // API not running yet — keep showing sample lockers
      });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search.city) params.set('city', search.city);
    if (search.size) params.set('size', search.size);
    navigate(`/browse?${params.toString()}`); // route dynamic update
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === sampleTestimonials.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? sampleTestimonials.length - 1 : prev - 1));
  };

  const counts = sizeCategories.map((c) => ({
    ...c,
    count: sampleLockers.filter((l) => l.size === c.key).length,
  }));

  return (
    <div className="bg-stone-50 min-h-screen">
      {/* HERO SECTION - Overlap fixed by placing widget in natural flow structure */}
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
              SecureLocker connects locker owners with people who need safe, affordable storage —
              search by city and size, then book in minutes.
            </p>

            {/* FIXED SEARCH WIDGET: Placed cleanly under prose layout inside relative layout bounds */}
            <form
              onSubmit={handleSearch}
              className="bg-white rounded-2xl shadow-xl p-4 flex flex-col sm:flex-row gap-3 relative z-10 max-w-xl"
            >
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
              <button
                type="submit"
                className="bg-brand-600 hover:bg-brand-700 transition text-white font-medium px-6 py-2.5 rounded-lg flex items-center justify-center gap-2"
              >
                <Search size={16} /> Search
              </button>
            </form>
          </div>

          {/* Right Column - Premium Gold Bank Locker Image */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-none flex justify-center">
            <div className="relative w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border-4 border-stone-800">
              <img 
                src="https://images.tv9telugu.com/wp-content/uploads/2025/11/gold-in-bank-locker.jpg" 
                alt="Premium Bank Gold Vault Lockers" 
                className="w-full h-80 object-cover brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 bg-stone-900/90 backdrop-blur-sm rounded-xl p-4 border border-stone-700">
                <p className="text-stone-300 text-xs text-center">
                  Locker <span className="text-brand-400 font-semibold">#07</span> reserved for Ankita S. in Pune
                </p>
              </div>
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
            <div key={title} className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm hover:shadow-md transition">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700 mb-4">
                <Icon size={20} />
              </div>
              <h3 className="font-display font-semibold text-stone-800 mb-1">{title}</h3>
              <p className="text-stone-500 text-sm">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHY US SECTION WITH STORAGE VAULT GRAPHIC */}
      <section className="bg-[#eef5fb] border-y border-stone-200 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row items-stretch min-h-[480px]">
            
            {/* LEFT BLOCK: Content-Relevant Vault Image Asset */}
            <div className="hidden lg:block lg:w-5/12 relative">
              <div className="absolute inset-0 my-8 pr-8 flex items-center justify-center">
                <img 
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrHffc1ZSvCNGEghLo2NU8FCa5t9vk9teQs0juwatg43TBQO0W48mLKLo&s=10" 
                  alt="Secure Locker Storage Rooms" 
                  className="w-full h-full object-cover rounded-3xl shadow-md border border-stone-200/60"
                />
              </div>
            </div>

            {/* RIGHT BLOCK: Text Content & Features */}
            <div className="w-full lg:w-7/12 py-16 lg:py-20 flex flex-col justify-center">
              {/* Header Titles */}
              <div className="mb-10">
                <h4 className="font-display text-3xl font-semibold text-stone-800 uppercase tracking-wide">Why us?</h4>
                <div className="text-brand-600 text-sm font-medium mt-1 italic">something to make you love us more</div>
              </div>

              {/* Content Feature Grid */}
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-10">
                
                {/* Feature 1 */}
                <div className="flex gap-4 items-start">
                  <div className="bg-brand-50 text-brand-700 p-3 rounded-xl shrink-0">
                    <Headphones size={22} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-stone-800 text-base mb-1">Premium Support</h4>
                    <p className="text-stone-500 text-sm leading-relaxed">We’re available for helping you, including holidays</p>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="flex gap-4 items-start">
                  <div className="bg-brand-50 text-brand-700 p-3 rounded-xl shrink-0">
                    <ShieldCheck size={22} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-stone-800 text-base mb-1">High quality lockers</h4>
                    <p className="text-stone-500 text-sm leading-relaxed">Our spaces are certified by security specialists with 20+ years experience</p>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="flex gap-4 items-start">
                  <div className="bg-brand-50 text-brand-700 p-3 rounded-xl shrink-0">
                    <Users size={22} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-stone-800 text-base mb-1">Trusted by 10k+ clients</h4>
                    <p className="text-stone-500 text-sm leading-relaxed">We have 10k+ happy clients who love us and trust our facilities</p>
                  </div>
                </div>

                {/* Feature 4 */}
                <div className="flex gap-4 items-start">
                  <div className="bg-brand-50 text-brand-700 p-3 rounded-xl shrink-0">
                    <XCircle size={22} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-stone-800 text-base mb-1">Free cancellation</h4>
                    <p className="text-stone-500 text-sm leading-relaxed">No extra fee, you can cancel your booking setup anytime hassle-free</p>
                  </div>
                </div>

                {/* Feature 5 */}
                <div className="flex gap-4 items-start">
                  <div className="bg-brand-50 text-brand-700 p-3 rounded-xl shrink-0">
                    <Wallet size={22} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-stone-800 text-base mb-1">No advance deposits required</h4>
                    <p className="text-stone-500 text-sm leading-relaxed">Just verify your regular basic KYC documents online and you are fully good to go</p>
                  </div>
                </div>

                {/* Feature 6 */}
                <div className="flex gap-4 items-start">
                  <div className="bg-brand-50 text-brand-700 p-3 rounded-xl shrink-0">
                    <PlusCircle size={22} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-stone-800 text-base mb-1">And more features</h4>
                    <p className="text-stone-500 text-sm leading-relaxed">This space is too small to show you all the premium amenities we host</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* BROWSE BY SIZE */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl font-semibold text-stone-800">Browse by Size</h2>
          <Link to="/browse" className="text-brand-700 text-sm font-medium flex items-center gap-1 hover:underline">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid sm:grid-cols-3 gap-6">
          {counts.map(({ key, label, icon: Icon, blurb, count }) => (
            <Link
              key={key}
              to={`/browse?size=${key}`}
              className="bg-stone-800 hover:bg-stone-900 transition rounded-2xl p-6 text-white flex items-center justify-between shadow"
            >
              <div>
                <Icon size={26} className="text-brand-400 mb-3" />
                <h3 className="font-display font-semibold">{label}</h3>
                <p className="text-stone-400 text-sm">{blurb}</p>
                <p className="text-brand-400 text-xs mt-2">{count} listed in demo data</p>
              </div>
              <ArrowRight size={18} className="text-stone-500" />
            </Link>
          ))}
        </div>
      </section>

      {/* POPULAR LOCKERS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-display text-2xl font-semibold text-stone-800">Popular Lockers</h2>
            <p className="text-stone-500 text-sm mt-1">A few of the lockers available right now.</p>
          </div>
          <Link to="/browse" className="text-brand-700 text-sm font-medium flex items-center gap-1 hover:underline">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((locker) => (
            <LockerCard key={locker.id} locker={locker} onBook={() => navigate('/browse')} />
          ))}
        </div>
      </section>

      {/* STATS / ABOUT */}
      <section className="bg-stone-800 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="font-display text-3xl font-semibold mb-3">Built on trust, secured by design.</h2>
            <p className="text-stone-300">
              Every listing goes through an owner verification step, and every booking is tracked end
              to end — from reservation to renewal — so both sides always know where things stand.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {sampleStats.map((s) => (
              <div key={s.label} className="bg-stone-900/60 rounded-xl p-5 text-center">
                <p className="font-display text-3xl font-semibold text-brand-400">{s.value}</p>
                <p className="text-stone-400 text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL SLIDER SECTION */}
      <section className="bg-stone-100 py-16 border-t border-stone-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-display text-2xl font-semibold text-stone-800 mb-8">What our users say</h2>
          
          <div className="relative bg-white rounded-3xl border border-stone-200 p-8 sm:p-12 shadow-sm min-h-[220px] flex flex-col justify-between">
            <Quote size={40} className="text-brand-100 absolute top-6 left-6" />
            
            <div className="transition-all duration-300">
              <p className="text-stone-600 text-base sm:text-lg italic leading-relaxed mb-6">
                "{sampleTestimonials[currentSlide].quote}"
              </p>
              <div>
                <p className="font-semibold text-stone-800 text-sm">{sampleTestimonials[currentSlide].name}</p>
                <p className="text-brand-600 text-xs font-medium">{sampleTestimonials[currentSlide].city}</p>
              </div>
            </div>

            {/* Slider Navigation Buttons */}
            <div className="flex justify-center gap-3 mt-6">
              <button 
                onClick={prevSlide}
                className="p-2 rounded-full border border-stone-200 bg-white hover:bg-stone-50 text-stone-600 transition shadow-sm"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={16} />
              </button>
              <button 
                onClick={nextSlide}
                className="p-2 rounded-full border border-stone-200 bg-white hover:bg-stone-50 text-stone-600 transition shadow-sm"
                aria-label="Next testimonial"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION: MODELLED AFTER image_212b2b.png */}
<section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
  <div 
    className="relative rounded-3xl overflow-hidden shadow-xl bg-[#71887a] flex items-center justify-center py-20 px-6 border-4 border-stone-800/20"
    style={{
      // Recreates the vintage vertical locker panel slits seen in image_212b2b.png
      backgroundImage: `
        linear-gradient(90deg, transparent 49%, #4d5e54 49%, #4d5e54 51%, transparent 51%),
        linear-gradient(90deg, transparent 19%, #4d5e54 19%, #4d5e54 21%, transparent 21%),
        linear-gradient(90deg, transparent 79%, #4d5e54 79%, #4d5e54 81%, transparent 81%)
      `,
      backgroundSize: '100% 100%'
    }}
  >
    {/* Left Combination Padlock Element */}
    <div className="absolute left-8 sm:left-16 hidden md:flex flex-col items-center gap-3">
      <div className="w-16 h-16 bg-[#5f7467] border-2 border-[#4d5e54] rounded-lg shadow-inner flex items-center justify-center p-2">
        <div className="w-full h-full bg-stone-300 rounded-full border-4 border-stone-400 shadow flex items-center justify-center relative">
          <div className="absolute inset-0 border border-stone-600 rounded-full scale-75"></div>
          <span className="text-[7px] font-mono text-stone-800 font-bold tracking-tighter">0-15-30</span>
        </div>
      </div>
      <div className="w-6 h-6 bg-[#83998c] rounded-full shadow-md border border-[#5f7467]"></div>
    </div>

    {/* Central Vintage Badge Wrapper */}
    <div className="bg-[#ffdb58] rounded-[2.5rem] p-8 sm:p-12 text-center max-w-2xl w-full shadow-lg transform -rotate-1 hover:rotate-0 transition-transform duration-300 border-4 border-[#e0bf43]">
      <h2 
        className="font-serif text-5xl sm:text-7xl font-black text-[#56361d] tracking-tight leading-none drop-shadow-sm select-none"
        style={{ fontFamily: 'Georgia, serif' }}
      >
        Locker<br />rentals
      </h2>
      <p className="text-[#56361d] font-sans font-bold text-xs sm:text-sm tracking-[0.25em] uppercase mt-4 mb-8 opacity-90">
        IN SCARFE FOR THE YEAR
      </p>
      
      <Link
        to="/signup"
        className="inline-flex items-center gap-2 bg-[#56361d] hover:bg-[#3d2513] text-[#ffdb58] font-bold px-8 py-3.5 rounded-xl transition shadow-md hover:shadow-lg text-sm uppercase tracking-wider"
      >
        List Your Space Now <ArrowRight size={16} />
      </Link>
    </div>

    {/* Right Combination Padlock Element */}
    <div className="absolute right-8 sm:right-16 hidden md:flex flex-col items-center gap-3">
      <div className="w-16 h-16 bg-[#5f7467] border-2 border-[#4d5e54] rounded-lg shadow-inner flex items-center justify-center p-2">
        <div className="w-full h-full bg-stone-300 rounded-full border-4 border-stone-400 shadow flex items-center justify-center relative">
          <div className="absolute inset-0 border border-stone-600 rounded-full scale-75"></div>
          <span className="text-[7px] font-mono text-stone-800 font-bold tracking-tighter">5-20-35</span>
        </div>
      </div>
      <div className="w-6 h-6 bg-[#83998c] rounded-full shadow-md border border-[#5f7467]"></div>
    </div>
  </div>
</section>
    </div>
  );
}