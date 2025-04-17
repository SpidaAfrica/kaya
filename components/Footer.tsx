import { Logo_light } from "@/assets";
import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-primary text-white bottom-0 mt-auto">
      <div className="w-[95%] mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row">
          <div className="flex justify-between items-center md:items-start flex-[3]">
            <div className="w-full md:w-[70%] flex flex-col gap-8 justify-between">
              <Image
                src={Logo_light}
                alt="kaya Logo"
                className="mb-4 object-cover mx-auto md:mx-0"
              />
              <div className="w-full md:hidden flex flex-col md:flex-row gap-3 items-center mx-auto">
                <ul className="flex items-center gap-2 justify-between w-full">
                  <li>
                    <Link href="/" className="hover:underline">
                      Home
                    </Link>
                  </li>
                  <li>
                    <a href="/contact" className="hover:underline">
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a href="/socials" className="hover:underline">
                      Our Socials
                    </a>
                  </li>
                </ul>
                <ul className="flex items-center gap-2 w-full justify-around">
                  <li>
                    <a href="/terms" className="hover:underline">
                      Terms & Conditions
                    </a>
                  </li>
                  <li>
                    <a href="/privacy" className="hover:underline">
                      Privacy Policy
                    </a>
                  </li>
                </ul>
              </div>
              <div className="hidden w-full md:flex flex-col md:flex-row gap-3 items-center mx-auto">
                <ul className="flex items-center gap-2 justify-between w-full">
                  <li>
                    <Link href="/" className="hover:underline">
                      Home
                    </Link>
                  </li>
                  <li>
                    <a href="/contact" className="hover:underline">
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a href="/socials" className="hover:underline">
                      Our Socials
                    </a>
                  </li>
                  <li>
                    <a href="/terms" className="hover:underline">
                      Terms & Conditions
                    </a>
                  </li>
                  <li>
                    <a href="/privacy" className="hover:underline">
                      Privacy Policy
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-blue-400 pt-8 md:pt-0 flex justify-between items-center md:justify-start md:items-start flex-[2]">
            <p className="max-w-md md:max-w-none text-center md:text-left">
              At Kaya, our mission is to simplify parcel delivery by connecting
              individuals and businesses with reliable, affordable, and
              efficient riders. We are committed to delivering not just parcels
              but also trust, convenience, and peace of mind.
            </p>
          </div>
        </div>
        <div className="text-center md:text-left mt-8 md:mt-12 flex flex-col md:flex-row gap-4 justify-between">
          <div>
            <p>
              © 2024 Kaya. All rights reserved. Deliveries made simple, every
              time.
            </p>
          </div>

          <div className="flex justify-center gap-6">
            <a href="/terms" className="hover:underline">
              Terms And Condition
            </a>
            <a href="/privacy" className="hover:underline">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
