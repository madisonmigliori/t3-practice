import { Children } from "react";
import SettingsNavBar from "~/app/settings/SettingsNavBar";

export default function Settings({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="column-1 items-center px-5 text-center">
        <div className="text-left">
          <h1 className="px-10 py-10 text-3xl font-bold">Settings</h1>
        </div>
      </div>
      <div>
        <div className="flex flex-row">
          <SettingsNavBar />
          {children}
        </div>
      </div>
    </div>
  );
}
