import React from "react";
import SettingsNavBar from "~/components/SettingsNavBar";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div>
        <div className="column-1 items-center px-5 text-center">
          <div className="text-left">
            <h1 className="px-10 py-10 text-3xl font-bold">Settings</h1>
          </div>
        </div>
      </div>
      <div className="flex flex-row">
        <div className="basis-1/5">
          <SettingsNavBar />
        </div>
        <main className="basis-2/3">{children}</main>
      </div>
    </div>
  );
}
