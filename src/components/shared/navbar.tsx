import Image from "next/image";
import SearchBox from "./search-box";
import Link from "next/link";
import NavbarButtons from "./navbar-buttons";
import { SidebarTrigger } from "./sidebar";

export default function Navbar() {
  return (
    <div className="px-4 py-2 flex justify-between border-b gap-2 bg-white dark:bg-gray-950">
      <SidebarTrigger />
      <div className="flex gap-2 items-center flex-shrink-0">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/reddit-logo.svg"
            alt="Reddit Logo"
            width={35}
            height={35}
          />
          <span className="hidden md:block text-main text-3xl font-semibold tracking-tighter">
            reddit
          </span>
        </Link>
      </div>
      <SearchBox />
      <NavbarButtons />
    </div>
  );
}
