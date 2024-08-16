/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { LogIn } from "lucide-react";
import { useSession } from "next-auth/react";

export default async function Home() {
  // const User = () => {
  //   const { data: session } = useSession();

  //   if (!session) {
  //     // Handle unauthenticated state, e.g. render a SignIn component
  //     return <LogIn />;
  //   }
  // };

  return (
    <main>
      <div className="column-1 items-center px-5 text-center">
        <div className="text-left">
          <h1 className="px-10 py-10 text-3xl font-bold">Home</h1>
        </div>
      </div>
    </main>
  );
}

// async function CrudShowcase() {
//   const session = await getServerAuthSession();
//   if (!session?.user) return null;

//   const latestPost = await api.listing.getLatest();

//   return <div></div>;
// }ctx: anyctx: unknown
