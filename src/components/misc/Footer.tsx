import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <div className="flex flex-col">
      <footer className="mt-auto flex bg-slate-500">
        <div className="mx-auto w-full max-w-screen-xl p-4 ">
          <div className="sm:flex sm:items-center sm:justify-between">
            <Link
              href="/"
              className="mb-4 flex items-center space-x-3 sm:mb-0 rtl:space-x-reverse"
            >
              <Image src="/shopping-icon.png" width={40} height={40} alt="" />
              <span className="self-center whitespace-nowrap text-2xl font-semibold text-white dark:text-white">
                Business Name
              </span>
            </Link>
          </div>
          <hr className="border-gray-20 my-6" />
          <span className="block text-center text-sm text-white">
            © 2024{" "}
            <a href="/" className="hover:underline">
              Business
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}
