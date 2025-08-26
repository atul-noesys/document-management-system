import darkLogo from "@/assets/logos/dark.svg";
import logo from "@/assets/logos/main.svg";
import Image from "next/image";

export function Logo() {
  return (
    <div className="relative h-[36px] -mr-20">
      <Image
        src={"https://cdn.infoveave.com/infoveave_lightbg.svg"}
        fill
        className="dark:hidden"
        alt="NextAdmin logo"
        role="presentation"
        quality={100}
      />

      <Image
        src={"https://cdn.infoveave.com/infoveave_lightbg.svg"}
        fill
        className="hidden dark:block"
        alt="NextAdmin logo"
        role="presentation"
        quality={100}
      />
    </div>
  );
}
