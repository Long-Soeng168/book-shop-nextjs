import { LoginForm } from "@/components/login-form";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex items-center justify-center w-6 h-6 rounded-md bg-primary text-primary-foreground">
              <Image
                width={200}
                height={200}
                src="/images/logo_thnal.png"
                alt="Thnal Logo Image"
                className="inset-0 object-cover dark:brightness-[0.2] dark:grayscale"
              />
            </div>
            Thnal.org
          </a>
        </div>
        <div className="flex items-center justify-center flex-1">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative items-center justify-center hidden w-full h-full bg-muted lg:flex">
        <Image
          width={200}
          height={200}
          src="/images/logo_thnal.png"
          alt="Thnal Logo Image"
          className="inset-0 object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
