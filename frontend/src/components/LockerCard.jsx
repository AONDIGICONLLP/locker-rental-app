const sizeLabels = { small: 'Small', medium: 'Medium', large: 'Large' };
const sizeColors = {
  small: 'bg-emerald-100 text-emerald-700',
  medium: 'bg-brand-100 text-brand-700',
  large: 'bg-stone-200 text-stone-700',
};

export default function LockerCard({ locker, onBook }) {
  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-5 flex flex-col gap-3 hover:shadow-md transition">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-display font-semibold text-stone-800 text-lg">{locker.title}</h3>
        <span className={`text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap ${sizeColors[locker.size]}`}>
          {sizeLabels[locker.size]}
        </span>
      </div>
      <p className="text-stone-500 text-sm">📍 {locker.address}, {locker.city}</p>
      {locker.description && <p className="text-stone-500 text-sm">{locker.description}</p>}
      {locker.ownerName && <p className="text-xs text-stone-400">Listed by {locker.ownerName}</p>}
      <div className="flex items-center justify-between mt-2 pt-3 border-t border-stone-100">
        <div>
          <span className="text-2xl font-display font-semibold text-stone-800">₹{locker.price}</span>
          <span className="text-stone-400 text-sm"> /month</span>
        </div>
        {onBook && (
          <button
            onClick={() => onBook(locker)}
            className="bg-brand-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-700 transition"
          >
            Book Now
          </button>
        )}
      </div>
    </div>
  );
}
