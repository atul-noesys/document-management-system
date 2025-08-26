import Signin from "@/components/Auth/Signin";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Log in",
};

export default function Login() {
  return (
    <>
      <div className="h-screen bg-blue-50 shadow-1 dark:bg-gray-dark dark:shadow-card flex items-center justify-center">
        <div className="flex w-[400px] flex-col rounded-lg bg-white p-6 shadow-card">
          <div>
          <Image
            src={"https://cdn.infoveave.com/infoveave_lightbg.svg"}
            className="mb-10"
            alt="NextAdmin logo"
            role="presentation"
            quality={100}
            width={200}
            height={50}
          />
          </div>
          <Signin />
        </div>
      </div>
    </>
  );
}
