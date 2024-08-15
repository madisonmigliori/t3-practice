import type { Metadata } from "next";
import AccountCard from "~/components/setting/account/AccountCard";
import AccountDetails from "~/components/setting/account/AccountDetails";

export const metadata: Metadata = {
  title: "Acccount Details",
  description: "",
};

export default function Account() {
  return (
    <div>
      {/* <AccountCard /> */}
      <AccountDetails />
    </div>
  );
}
