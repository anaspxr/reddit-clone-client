import Image from "next/image";
import SearchBox from "./search-box";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";
import NavbarButtons from "./navbar-buttons";

export default function Navbar() {
  return (
    <div className="px-4 py-2 flex justify-between border-b gap-2">
      <div className="flex gap-2 items-center flex-shrink-0">
        <Button variant="ghost" className="h-10 w-10 md:hidden">
          <Menu width={25} height={25} strokeWidth={1.2} />
        </Button>
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/reddit-logo.svg"
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
