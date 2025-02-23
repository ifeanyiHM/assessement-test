"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useGeneral from "../context/useGeneral";
import { formattedItem } from "../utils/FormatString";

const menuItems = [
  "Branches",
  "Roles",
  "Users",
  "Card Scheme",
  "Card Profile",
  "Card Request",
  "Stock",
  "Cards",
  "Authorization List",
  "Authorization Queue",
  "Trail",
  "Account",
];

const menuSytles =
  "nav flex items-center gap-3 px-3 py-2.5 border-[0.6px] hover:border-[#E2E2E2] hover:bg-[#F6F6F6] hover:text-[#014DAF] hover:font-medium rounded-lg";

function Sidenav() {
  // const [isNavOpen, setIsNavOpen] = useState(false);

  const { isNavOpen, setIsNavOpen } = useGeneral();

  const closeNav = () => setIsNavOpen(false);

  const pathName = usePathname();

  // const formattedItem = (item: string) => {
  //   return item.toLowerCase().replace(/\s+/g, "-");
  // };

  return (
    <nav
      className={`${
        isNavOpen ? "translate-x-0" : "-translate-x-full"
      } lg:-translate-x-0 fixed lg:sticky z-[999999] lg:z-0 top-0 left-0 bg-white w-52 lg:w-[14.375rem] pl-[11px] pr-[13px] pt-[1.688rem] text-[#00000080] flex flex-col justify-between h-screen border-r border-[#DEDEDF] transition-all duration-300 ease-in-out`}
    >
      <div className="relative">
        <Image src="/Logo.svg" alt="lapo logo" width={138.32} height={45} />
        {isNavOpen && (
          <button
            className="absolute -top-4 -right-14 border border-[#E2E2E2] bg-[#F6F6F6] 
             w-8 h-8 flex items-center justify-center rounded-full"
            onClick={closeNav}
          >
            ✖
          </button>
        )}

        <Link href="/">
          <div
            onClick={closeNav}
            className={`${menuSytles} ${
              pathName === "/"
                ? "nav border-[#E2E2E2] bg-[#F6F6F6] text-[#014DAF] font-medium"
                : "border-transparent"
            } mt-8 `}
          >
            <Image
              src={`/icons/dashboard.svg`}
              alt="dashboard"
              width={16}
              height={16}
            />
            <span className="text-xs">Dashboard</span>
          </div>
        </Link>
        <p className="text-[0.513rem] px-3 pt-4 pb-2">MAIN MENU</p>

        <ul className="flex flex-col gap-1 h-[16rem] overflow-y-scroll sidebar">
          {menuItems.map((item, index) => {
            const itemPath = `/${formattedItem(item)}`;
            const isActive = pathName.startsWith(itemPath);
            return (
              <Link key={index} href={`/${formattedItem(item)}`}>
                <div
                  onClick={closeNav}
                  className={`${menuSytles} ${
                    isActive
                      ? "nav border-[#E2E2E2] bg-[#F6F6F6] text-[#014DAF] font-medium"
                      : "border-transparent"
                  }`}
                >
                  <Image
                    src={`/icons/${formattedItem(item)}.svg`}
                    alt={item}
                    width={16}
                    height={16}
                  />
                  <li className="text-xs">{item}</li>
                </div>
              </Link>
            );
          })}
        </ul>
      </div>

      <div>
        <Link href="/logout">
          {" "}
          <div
            onClick={closeNav}
            className={`${menuSytles} text-black border-transparent`}
          >
            <Image
              src={`/icons/logout.svg`}
              alt="logout"
              width={16}
              height={16}
            />
            <span className="text-xs">Logout</span>
          </div>
        </Link>
        <div>
          <p className="text-[0.513rem] px-3 pt-4 pb-2 text-[#808080] mt-11">
            POWERED BY
          </p>
          <Image
            src="/cardinfra.svg"
            alt="cardinfra logo"
            width={93.33}
            height={42}
          />
        </div>
      </div>
    </nav>
  );
}

export default Sidenav;
