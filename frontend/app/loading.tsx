import { FaPaw as FaPawIcon } from 'react-icons/fa';

export default function Loading() {
  return (
    <div className="flex h-[70vh] w-full flex-col items-center justify-center space-y-4">
      <div className="relative flex items-center justify-center">
        {/* Animated outer ring */}
        <div className="h-20 w-20 animate-spin rounded-full border-4 border-slate-100 border-t-teal-600"></div>
        
        {/* Pulsing icon in the center */}
        <div className="absolute flex animate-pulse items-center justify-center rounded-full bg-teal-50 p-3">
          <FaPawIcon className="text-2xl text-teal-600" />
        </div>
      </div>
      
      <div className="text-center">
        <h3 className="text-lg font-bold text-slate-800">Chargement...</h3>
        <p className="text-sm font-medium text-slate-400">Préparation de vos données</p>
      </div>

      {/* Optional: Skeleton mimics for card layouts */}
      <div className="mt-8 grid w-full max-w-4xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 opacity-20">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-48 rounded-[28px] bg-slate-200 animate-pulse"></div>
        ))}
      </div>
    </div>
  );
}
