import Image from "next/image";
import Link from "next/link";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="px-4 py-2 ">
        <div className="flex gap-2 items-center flex-shrink-0">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/reddit-logo.svg"
              alt="Reddit Logo"
              width={35}
              height={35}
            />
            <span className="text-main text-3xl font-semibold tracking-tighter">
              reddit
            </span>
          </Link>
        </div>
      </div>
      {children}
    </div>
  );
}
