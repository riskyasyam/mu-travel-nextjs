'use client';

// Komponen ini sekarang menerima: href, text, icon, dan className
const GradientOutlineButton = ({ href, text, icon: Icon, className }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      // Hapus 'text-white' dari sini agar bisa diatur dari luar
      className="relative inline-flex items-center justify-center rounded-xl px-8 py-4 font-bold group mt-8"
    >
      {/* SVG untuk border gradasi (tetap sama) */}
      <svg className="absolute inset-0 w-full h-full" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="gradient-border" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#EAC84C" />
            <stop offset="100%" stopColor="#D4802A" />
          </linearGradient>
        </defs>
        <rect
          x="1.5" y="1.5"
          width="calc(100% - 3px)" height="calc(100% - 3px)"
          rx="12"
          ry="12"
          stroke="url(#gradient-border)"
          strokeWidth="2"
          fill="transparent"
        />
      </svg>
      
      {/* Konten Tombol */}
      {/* Tambahkan prop 'className' di sini */}
      <span className={`relative z-10 flex items-center ${className}`}>
        {Icon && <Icon className="mr-3 h-5 w-5" />}
        {text}
      </span>
    </a>
  );
};

export default GradientOutlineButton;