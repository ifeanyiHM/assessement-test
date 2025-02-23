"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useGeneral from "../context/useGeneral";
import { formattedItem } from "../utils/FormatString";

interface MenuProps {
  title: string;
  subtitle?: string;
}

function Menu({ title, subtitle }: MenuProps) {
  const { isNavOpen, setIsNavOpen } = useGeneral();
  const router = useRouter();

  const toggleNav = () => setIsNavOpen(!isNavOpen);
  return (
    <div className="bg-white flex justify-between py-2 px-5 border-b border-[#DEDEDF]">
      <div className="flex gap-3 items-center text-[#001735] font-medium">
        <Image
          className="lg:hidden cursor-pointer"
          onClick={toggleNav}
          src={`/icons/authorization-list.svg`}
          alt="authorization-list"
          width={16}
          height={16}
        />

        {subtitle && (
          <button
            onClick={() => router.back()}
            className="text-xs font-medium flex gap-2 items-center hover:text-[#007bff]"
          >
            <span>&lsaquo;</span>
            <span>Back</span>
          </button>
        )}

        <Image
          src={`/icons/${formattedItem(title.toLowerCase())}.svg`}
          alt={title}
          width={16}
          height={16}
        />
        {subtitle && <span className="text-xs">&rsaquo;</span>}
        <span className="text-xs">{title}</span>
        {subtitle && (
          <div className="hidden md:flex items-center gap-3.5">
            <span className="text-xs">&rsaquo;</span>
            <span className="text-xs font-bold">{subtitle}</span>
          </div>
        )}
      </div>
      <div className="flex items-center gap-1">
        {!subtitle && (
          <div className="relative">
            <input
              className="py-[7px] pl-[2.384rem] max-w-28 md:max-w-[13.375rem] focus:ring focus:ring-blue-300 outline-none border border-[#D0D5DD] rounded-[97.99px] text-[0.735rem]"
              type="text"
              placeholder="search"
            />
            <Image
              className="absolute left-[0.858rem] top-1/2 -translate-y-1/2"
              src="/icons/search.svg"
              alt="lapo logo"
              width={16}
              height={16}
            />
          </div>
        )}
        <Image
          className="m-2.5"
          src="/icons/notification.svg"
          alt="lapo logo"
          width={20}
          height={20}
        />
        <Image
          src="/icons/profile-menu.svg"
          alt="lapo logo"
          width={32}
          height={32}
        />
      </div>
    </div>
  );
}

export default Menu;
