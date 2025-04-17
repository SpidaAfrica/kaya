"use client";
export const dynamic = "force-dynamic";

import { cn } from "@/lib/utils";
import { ChevronRight, Clock12, Minus, Plus, X } from "lucide-react";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useMediaQuery } from "@/hooks/use-media-query";
import { DialogClose, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeliveryDetails } from "@/components/Overlays/DeliveryDetails";
import { SuggestPrice } from "@/components/Overlays/SuggestPrice";
import { OrderDetails } from "@/components/Overlays/OrderDetails";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { NotificationsEmpty, PackageImg } from "@/assets";
import NavLink from "@/components/Navlink";
import Link from "next/link";

export const SAVED_LOCATION_PAGES = {
  DELIVERY_DETAILS: DeliveryDetails,
  SUGGEST_PRICE: SuggestPrice,
  ORDER_DETAILS: OrderDetails,
} as const;

type PageParams = keyof typeof SAVED_LOCATION_PAGES;

export type Actions = {
  switchPage?(page: PageParams): void;
  close?(): void;
};

export function DetailsLayout({
  title,
  children,
}: PropsWithChildren<{ title: string | React.ReactNode; hide(): void }>) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  if (isDesktop)
    return (
      <div className="md:flex h-full flex-col mx-auto w-[95%]">
        <SheetHeader className="border-b border-b-foreground/20">
          <div className="flex items-center justify-between w-[95%] mx-auto py-3">
            <SheetTitle className="font-semibold text-2xl">{title}</SheetTitle>
            <SheetTrigger className="">
              <X />
            </SheetTrigger>
          </div>
        </SheetHeader>
        <div className="flex-1 w-full pt-2 pb-6 overflow-auto flex-col no-scrollbar mx-auto space-y-7 px-1">
          {children}
        </div>
      </div>
    );
  return (
    <>
      <DialogHeader className="border-b border-b-foreground/20">
        <div className="flex items-center justify-between w-[95%] mx-auto py-3">
          <DialogTitle className="font-semibold text-2xl">{title}</DialogTitle>
          <DialogClose className="">
            <X />
          </DialogClose>
        </div>
      </DialogHeader>
      <div className="flex flex-col flex-1 overflow-auto no-scrollbar w-[98%] mx-auto pt-2_ pb-6 space-y-7 px-1">
        {children}
      </div>
    </>
  );
}

export function IncrementDecrement() {
  const [value, setValue] = useState(0);

  const handleIncrement = () => setValue((prev) => prev + 1);
  const handleDecrement = () => setValue((prev) => (prev > 0 ? prev - 1 : 0));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value.replace(/\D/g, ""));
    if (!isNaN(newValue)) setValue(newValue);
    else setValue(0);
  };

  
  useEffect(() => {
    sessionStorage.setItem("price", String(value));
  }, [value]);

  return (
    <div className="flex items-center gap-2 w-full p-1 text-foreground">
      <button
        onClick={handleDecrement}
        className="bg-background p-1 rounded-lg shadow-lg shadow-foreground/10"
      >
        <Minus />
      </button>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        className="flex-1 text-center bg-transparent outline-none border-none text-lg"
      />
      <button
        onClick={handleIncrement}
        className="bg-background p-1 rounded-lg shadow-lg shadow-primary/10"
      >
        <Plus />
      </button>
    </div>
  );
}

export function RadioGroup() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1">
        <span className="inline-block w-4 h-4 rounded-full border-4 border-foreground/90 shadow shadow-foreground/20"></span>
        <span>Online Payment</span>
      </div>
      <div className="flex items-center gap-1">
        <span className="inline-block w-4 h-4 rounded-full border-4 shadow shadow-foreground/20 border-primary"></span>
        <span>Cash</span>
      </div>
    </div>
  );
}

export const NewLocationDropDown = ({
  children,
}: React.PropsWithChildren) => {
  const [locations, setLocations] = useState<{ address: string; city: string }[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://jbuit.org/api/get-locations.php")
      .then(res => res.json())
      .then(data => setLocations(data));
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "lg:w-[478px] w-[324px] shadow-[0px_16px_40px_-8px_rgba(88,92,95,0.16)] h-[311px] border-[#E2E4E9] border z-30 bg-background rounded-[16px] p-5 mt-2"
        )}>
        <div className="p-3 bg-[#F6F8FA] border border-[#EFF3F5] rounded-[4px] text-[#8A8A8C]">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter a new address"
            className="w-full placeholder:text-[14px] placeholder:leading-[16px] placeholder:tracking-[-6%] placeholder:text-[#8A8A8C] bg-transparent outline-none"
          />
        </div>
        <div className="mt-3 bg-white relative w-full">
          <span className="text-[14px] leading-[16px] tracking-[-6%] text-[#1E2023]">
            Choose Location on Map
          </span>

          <div className="flex mt-3 flex-col gap-3">
            {locations
              .filter((loc) =>
                loc.address.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((loc, index) => (
                <div
                  key={index}
                  className="flex py-2.5 gap-[14px] items-center border-b last:border-b-0 cursor-pointer hover:bg-gray-100">
                  <Clock12 size={20} color="#FF9500" className="rotate-45" />
                  <div>
                    <p className="text-[#1E2023] font-medium text-[14px] leading-[16px] tracking-[-6%]">
                      {loc.address}
                    </p>
                    <p className="text-[12px] leading-[14px] tracking-[-6%] text-[#8A8A8C]">
                      {loc.city}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};


export function NoNotifications() {
  return (
    <div className="space-y-6 flex flex-col items-center w-fit mx-auto text-center py-8">
      <Image src={NotificationsEmpty} alt="chat" />

      <p className="text-2xl font-semibold">No Notifications Yet 📭</p>
      <span className=" text-foreground/60">
        Stay tuned! Updates about your orders and account will appear here.{" "}
      </span>
      <div className="w-full px-6">
        <Button>Book a delivery Now</Button>
      </div>
    </div>
  );
}

export function NotificationCard({
  type,
  title,
  description,
  actionText,
}: {
  type: string;
  title: string;
  description: string;
  actionText: string;
}) {
  return (
    <div className="w-full px-2 md:px-12">
      <div className="border-b border-gray-200 py-6 flex flex-col">
        <div className={`px-4_ flex gap-4 w-full ${type === "error" ? "bg-red-50" : ""}`}>
          <svg
            className="w-12 md:w-6 md:h-6 self-start mt-4"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M17.1584 14.3254H19.0484V16.2154H0.148438V14.3254H2.03844V7.71039C2.03844 5.70535 2.83494 3.78244 4.25271 2.36466C5.67049 0.946888 7.5934 0.150391 9.59844 0.150391C11.6035 0.150391 13.5264 0.946888 14.9442 2.36466C16.3619 3.78244 17.1584 5.70535 17.1584 7.71039V14.3254ZM6.76344 18.1054H12.4334V19.9954H6.76344V18.1054Z"
              fill="#00ABFD"
            />
          </svg>

          <div className="flex-grow">
            <h2 className="text-xl text-gray-700 font-medium flex items-center gap-2">
              {title}
            </h2>

            <p className="text-gray-500 mt-2 text-base max-w-md">
              {description}
            </p>
          </div>
        </div>
        <a
          href="#"
          className="flex ml-auto items-center text-primary transition-colors gap-1 whitespace-nowrap underline self-end">
          {actionText}
          <ChevronRight className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
}

export function NotificationsLayout({
  children,
  links,
}: PropsWithChildren<{ links: { title: string; url: string }[] }>) {
  return (
    <div className="md:bg-primary/10 md:w-[80%] mx-auto md:py-8 flex-1 flex overflow-y-auto_">
      <div className="relative bg-background w-[90%] mx-auto md:py-8 max-w-4xl flex flex-col h-full">
        <div className="flex items-center mt-11 border-b border-b-foreground/20 w-full md:w-[90%] mx-auto overflow-x-auto no-scrollbar sticky">
          {links.map((link) => (
            <NavLink key={link.url} href={`${link.url}`} className="block px-1">
              {({ isActive }) => (
                <div
                  className={cn(
                    "relative h-full inline-flex items-center justify-center whitespace-nowrap rounded-sm_ px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-background text-foreground shadow-sm",
                    isActive &&
                      "after:absolute after:h-[2px] after:bottom-0 after:bg-primary/60 after:w-full after:transition-all after:duration-300 after:ease-in-out"
                  )}>
                  {link.title}
                </div>
              )}
            </NavLink>
          ))}
        </div>
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}



export function Notifications() {
  type Notification = {
    id: string;
    type: string;
    title: string;
    description: string;
    action_text: string;
  };
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = sessionStorage.getItem("userId"); // or get from sessionStorage, cookies, etc.

    fetch(`https://jbuit.org/api/notifications.php?user_id=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setNotifications(data.data);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;

  return notifications.length > 0 ? (
    <div className="pt-8 py-16 mt-2 mb-12">
      <div className="mx-auto bg-background py-4">
        {notifications.map((n, i) => (
          <NotificationCard
            key={n.id}
            type={n.type}
            title={n.title}
            description={n.description}
            actionText={n.action_text}
          />
        ))}
      </div>
    </div>
  ) : (
    <NoNotifications />
  );
}


export function OrderCard(props: {
  id: number;
  created_at: string;
  to_location: string;
  delivery_id: string;
  price: string;
  status: string;
}) {
  return (
    <button className="flex w-full gap-2 md:gap-4 py-4 px-1">
      <div className="w-14 h-12 shrink-0 bg-white flex items-center justify-center">
        <Image src={PackageImg} alt="package" />
      </div>
      <div className="flex flex-col w-full gap-2">
        <div className="flex flex-col_ md:items-center md:flex-row justify-between w-full">
          <p className="text-lg font-medium max-w-48 truncate whitespace-nowrap">
            {props.to_location}
          </p>
          <p className="text-xs text-green-400 flex gap-1 items-center rounded-md bg-green-100 px-2 py-1 w-fit">
            <svg
              width="13"
              height="12"
              viewBox="0 0 13 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6.5 12C3.1862 12 0.5 9.3138 0.5 6C0.5 2.6862 3.1862 0 6.5 0C9.8138 0 12.5 2.6862 12.5 6C12.5 9.3138 9.8138 12 6.5 12ZM5.9018 8.4L10.1438 4.1574L9.2954 3.309L5.9018 6.7032L4.2044 5.0058L3.356 5.8542L5.9018 8.4Z"
                fill="#38C793"
              />
            </svg>

            {props.status}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-start text-foreground text-xl font-medium">
            {props.price}
          </p>
          <p className="text-base font-medium">Order ID: #{props.id}</p>
        </div>
        <div className="flex flex-col md:items-center md:flex-row justify-between">
          <p className="text-foreground/60 text-xs text-start">{props.created_at}</p>
        </div>
      </div>
      <ChevronRight className="hidden md:block" />
    </button>
  );
}
export function OrderCard_1(props: {
  id: number;
  created_at: string;
  to_location: string;
  delivery_id: string;
  price: string;
  status: string;
}) {
  return (
    <button className="flex w-full gap-2 md:gap-4 py-4 px-1">
      <div className="w-14 h-12 shrink-0 bg-white flex items-center justify-center">
        <Image src={PackageImg} alt="package" />
      </div>
      <div className="flex flex-col w-full gap-2">
        <div className="flex flex-col_ md:items-center md:flex-row justify-between w-full">
          <p className="text-lg font-medium max-w-48 truncate whitespace-nowrap">
            {props.to_location}
          </p>
          <p className="text-xs text-green-400 flex gap-1 items-center rounded-md bg-green-100 px-2 py-1 w-fit">
            <svg
              width="13"
              height="12"
              viewBox="0 0 13 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6.5 12C3.1862 12 0.5 9.3138 0.5 6C0.5 2.6862 3.1862 0 6.5 0C9.8138 0 12.5 2.6862 12.5 6C12.5 9.3138 9.8138 12 6.5 12ZM5.9018 8.4L10.1438 4.1574L9.2954 3.309L5.9018 6.7032L4.2044 5.0058L3.356 5.8542L5.9018 8.4Z"
                fill="#38C793"
              />
            </svg>

            {props.status}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-start text-foreground text-xl font-medium">
            {props.price}
          </p>
          <p className="text-base font-medium">Order ID: #{props.delivery_id}</p>
        </div>
        <div className="flex flex-col md:items-center md:flex-row justify-between">
          <p className="text-foreground/60 text-xs text-start">{props.created_at}</p>
        </div>
      </div>
      <ChevronRight className="hidden md:block" />
    </button>
  );
}


export function ViewMapInFullMode({
  userType,
}: {
  userType: "rider" | "passenger";
}) {
  return (
    <Button asChild className="bg-black w-fit absolute bottom-4 right-4">
      <Link href={`/${userType}/big-map`}>
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
  );
}
