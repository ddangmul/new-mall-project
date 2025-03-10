import Link from "next/link";
import Image from "next/image";

import hyangnangLogo from "@/assets/logo/HyangNang-Logo-White.png";

const MainHeader: React.FC = () => {
  return (
    <header id="mainHeader" className="fixed top-0 left-0 w-full z-50">
      <div className="header-inner bg-[#121111] p-10">
        <div className="flex justify-between items-center text-[#d0d0d0] text-lg font-serif">
          <div className="basis-1/3 flex gap-8">
            <span>
              <Link href="/">Home</Link>
            </span>
            <span>
              <Link href="/">Shop</Link>
            </span>
            <span>
              <Link href="/about">About</Link>
            </span>
            <span>
              <Link href="/archive">Archive</Link>
            </span>
          </div>
          <div className="">
            <Link href="/">
              <Image
                src={hyangnangLogo}
                alt="hyangnang-logo"
                style={{ width: "70%", height: "auto" }}
                priority
              ></Image>
            </Link>
          </div>
          <div className="basis-1/3 flex justify-end gap-8">
            <span>
              <Link href="/login">Login</Link>
            </span>
            <span>
              <Link href="/cart">Cart</Link>
            </span>
            <span className="flex items-center ml-10">
              <p>Search</p>
              <input
                name="searchItem"
                type="text"
                className="border-b-1 border-b-amber-50 max-w-30"
              ></input>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
export default MainHeader;
