import React from "react";

export default function Footer() {
  return (
    <div className="flex min-h-screen flex-col">
      <footer className="mt-auto flex bg-slate-500">
        <div className="mx-auto w-full max-w-screen-xl p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <a
              href="/"
              className="mb-4 flex items-center space-x-3 sm:mb-0 rtl:space-x-reverse"
            >
              <img src="/shopping-icon.png" className="h-8" alt="" />
              <span className="self-center whitespace-nowrap text-2xl font-semibold text-white dark:text-white">
                Business Name
              </span>
            </a>
            <ul className="mb-6 flex flex-wrap items-center text-sm font-medium text-white sm:mb-0">
              <li>
                <a href="#" className="me-4 hover:underline md:me-6">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="me-4 hover:underline md:me-6">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="me-4 hover:underline md:me-6">
                  Licensing
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <hr className="my-6 border-gray-200 dark:border-gray-700 sm:mx-auto lg:my-8" />
          <span className="block text-sm text-white dark:text-gray-400 sm:text-center">
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
