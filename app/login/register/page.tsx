import { GalleryVerticalEnd } from "lucide-react";
import LoginRegister from "./login-register";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export default async function Page() {
  const session = await getServerSession(authOptions);
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex items-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Image
                src="/favicon.ico"
                alt="Favicon"
                width={20}
                height={20}
                className="h-6 w-6"
              />
            </div>
            <span className="text-xl">Acme Inc.</span>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-xl">
            <LoginRegister />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src="/1.jpg"
          alt="Login page background"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
