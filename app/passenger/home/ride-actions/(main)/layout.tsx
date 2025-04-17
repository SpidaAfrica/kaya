import { HeroMap, MiniMap } from "@/assets";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { PropsWithChildren } from "react";

export default function RideActionsLayout({ children }: PropsWithChildren) {
  return (
    <div className="w-[95%] mx-auto py-4">
      <div className="hidden md:block mx-auto relative">
        <Image src={HeroMap} alt="map" className="w-full h-full object-cover" />
        <Button asChild className="bg-black w-fit absolute bottom-4 right-4">
          <Link href={"/passenger/big-map"}>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1.1877e-07 1.8L4.2 0L7.8 1.8L11.5818 0.1794C11.6275 0.15983 11.6772 0.151901 11.7267 0.156325C11.7762 0.160749 11.8238 0.177388 11.8652 0.204747C11.9067 0.232106 11.9407 0.26933 11.9642 0.313079C11.9878 0.356827 12 0.40573 12 0.4554V10.2L7.8 12L4.2 10.2L0.4182 11.8206C0.372548 11.8402 0.322752 11.8481 0.273279 11.8437C0.223807 11.8393 0.176208 11.8226 0.134752 11.7953C0.093297 11.7679 0.0592835 11.7307 0.0357642 11.6869C0.0122449 11.6432 -4.40738e-05 11.5943 1.1877e-07 11.5446V1.8ZM7.8 10.6584V3.1056L7.761 3.1224L4.2 1.3416V8.8944L4.239 8.8776L7.8 10.6584Z"
                fill="white"
              />
            </svg>
            View Map in full Mode
          </Link>
        </Button>
      </div>
      <div className="md:hidden">
        <Image src={MiniMap} alt="map" className="w-full" />
      </div>
      <div className="md:w-[95%] mx-auto flex flex-col md:flex-row gap-10 items-stretch my-8">
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
