import Link from "next/link";

export default function SettingsNavBar() {
  return (
    <div>
      <div className="gap-2">
        <div className="mx-10 grid grid-flow-row-dense grid-cols-1 gap-5  px-4 py-3">
          <div>
            <Link href="/settings/account">Account</Link>
          </div>
          <div>
            <Link href="/settings/buying">Buying</Link>
          </div>
          <div>
            <Link href="/settings/selling">Selling</Link>
          </div>
          <div>
            <Link href="/settings/messages">Message</Link>
          </div>
          <div>
            <Link href="/settings/notifications">Notifications</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
