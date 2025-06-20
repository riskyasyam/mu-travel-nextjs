import Image from "next/image";

// Komponen ini menerima props: icon, title, dan description
const AdvantageCard = ({ icon, title, description }) => {
  return (
    // Div luar sebagai "bingkai" dengan background gradasi dan padding tipis
    <div className="rounded-2xl bg-gradient-to-br from-[#EAC84C] to-[#D4802A] p-[2px] h-full transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2">
      {/* Div dalam sebagai "isi" kartu dengan background putih */}
      <div className="flex flex-col items-center text-center h-full rounded-[14px] bg-white p-8">
        <Image 
          src={icon}
          alt={title}
          width={64}
          height={64}
          className="h-16 w-16 mb-6"
        />
        <h3 className="text-2xl font-semibold text-black font-poppins">
          {title}
        </h3>
        <p className="mt-2 text-lg font-poppins font-semibold leading-relaxed bg-gradient-to-r from-[#D4802A] to-[#EAC84C] bg-clip-text text-transparent">
          {description}
        </p>
      </div>
    </div>
  );
};

export default AdvantageCard;