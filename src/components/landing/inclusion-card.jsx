import Image from "next/image";

const InclusionCard = ({ item }) => (
  // Div luar sebagai "bingkai" dengan background gradasi dan padding tipis
  <div className="rounded-2xl bg-gradient-to-br from-[#EAC84C] to-[#D4802A] p-[2px] h-full transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2">
    {/* Div dalam sebagai "isi" kartu dengan background putih */}
    <div className="flex flex-col items-center text-center h-full rounded-[14px] bg-white p-8 gap-4">
      <Image
        src={item.icon}
        alt={item.title}
        width={60}
        height={60}
        className="h-16 w-16 mb-6"
      />
      <h3 className="text-xl font-extrabold bg-gradient-to-r from-[#D4802A] to-[#EAC84C] bg-clip-text text-transparent">{item.title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed flex-grow">{item.description}</p>
    </div>
  </div>
);

export default InclusionCard;