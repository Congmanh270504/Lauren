import { GalleryVerticalEnd } from "lucide-react";
import LoginForm from "./login-form";
import Image from "next/image";

export default function Page() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-5 lg:p-10">
        <div className="flex items-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-5" />
            </div>
            <span className="text-xl">Acme Inc.</span>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center ">
          <div className="w-full max-w-xl">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block ">
        <Image
          src="/1.jpg"
          alt="Login page background"
          className="absolute inset-0 object-cover dark:brightness-[0.2] dark:grayscale"
          fill
        />
      </div>
    </div>
  );
}
