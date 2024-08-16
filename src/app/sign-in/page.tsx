// import ProviderButton from "@/components/sign-in/ProviderButton";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { cn } from "~/lib/utils";

export const metadata: Metadata = {
  title: "Sign In",
  // TODO: Add meta description
  description: "...",
};

export default async function SignInPage({
  searchParams,
}: {
  searchParams: {
    callbackUrl?: string;
  };
}) {
  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-full max-w-[624px] gap-6 px-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Secure, 1-Click Login</h1>

            <p className="text-balance text-muted-foreground">
              We&apos;ll send a secure link to the email you used to sign up
              with.
              <br />
              No password needed.
            </p>
          </div>
          <div>
            <div className="my-4 flex items-center justify-center">
              <hr className="flex-1 border-t border-gray-300" />
              <p className="mx-4 text-sm text-gray-500">Or</p>
              <hr className="flex-1 border-t border-gray-300" />
            </div>

            {/* {providerMap
              .filter((x) => x.id !== "resend")
              .map((provider) => (
                <ProviderButton {...provider} key={provider.id} />
              ))} */}
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="underline">
              Sign Up
            </Link>
          </div>
        </div>
      </div>

      <div className="flex place-items-center bg-muted py-12">
        <div className="mx-auto w-full max-w-[624px] px-6">
          <Card>
            <CardHeader>
              <CardTitle className="uppercase">YEP</CardTitle>
              <h4>YEP</h4>
            </CardHeader>
            <CardContent></CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
