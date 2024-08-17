import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <div className="flex flex-1">
      <footer className="mt-auto flex-1	bg-[#ebd8ac]">
        <div className="mx-auto w-full max-w-screen-xl p-4 ">
          <div className=" sm:flex sm:items-center sm:justify-between">
            <Link
              href="/"
              className="mb-4 flex items-center space-x-3 sm:mb-0 rtl:space-x-reverse"
            >
              <Image src="/stand.png" width={40} height={40} alt="" />
              <span className="self-center whitespace-nowrap text-2xl font-semibold text-black dark:text-white">
                StandOn
              </span>
            </Link>
            <div>
              <Link href="/settings/account">
                <span className="dark:text-whit self-center whitespace-nowrap pr-3 font-semibold text-black">
                  Account Info
                </span>
              </Link>
              <Link href="/about-us">
                <span className="self-center whitespace-nowrap pr-2 font-semibold text-black dark:text-white">
                  About Us
                </span>
              </Link>
              <Link href="/contact-us">
                <span className="self-center whitespace-nowrap  font-semibold text-black dark:text-white">
                  Contact Us
                </span>
              </Link>
            </div>
          </div>
          <hr className="my-6 border-[#355c36]" />
          <span className="block text-center text-sm text-black">
            © 2024{" "}
            <a href="/" className="hover:underline">
              StandOn
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}
