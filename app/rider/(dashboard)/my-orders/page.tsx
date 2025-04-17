"use client";
import React, { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/custom-select";
import DayDate from "@/components/DayDate";
import Pagination from "@/components/Pagination";
import { DeliveryDetails } from "@/components/Overlays/DeliveryDetails";
import FormInput from "@/components/FormInput";
import { OrderCard } from "@/app/shared";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

const LOCATION_DATA = [
  {
    id: 1,
    date: "20 December 2024 ..12:30pm",
    address: "1234, Home Street, Home City",
    orderId: "123456",
    fare: "NGN 200",
    status: "Completed",
  },
  {
    id: 2,
    date: "21 December 2024 ..01:00pm",
    address: "5678, Work Street, Work City",
    orderId: "789012",
    fare: "NGN 300",
    status: "Pending",
  },
  {
    id: 3,
    date: "22 December 2024 ..02:30pm",
    address: "9101, Market Street, Market City",
    orderId: "345678",
    fare: "NGN 150",
    status: "Completed",
  },
  {
    id: 4,
    date: "23 December 2024 ..03:00pm",
    address: "1121, Park Street, Park City",
    orderId: "901234",
    fare: "NGN 250",
    status: "Cancelled",
  },
  {
    id: 5,
    date: "24 December 2024 ..04:30pm",
    address: "3141, Mall Street, Mall City",
    orderId: "567890",
    fare: "NGN 350",
    status: "Completed",
  },
];

export default function MyOrdersPage() {
  const [showDeliveryDetails, setShowDeliveryDetails] = useState(false);

  return (
    <>
      <div className="w-[90%] mx-auto space-y-3 py-6 relative">
        <Link
          href={"/rider/home"}
          className="text-primary absolute right-4 flex gap-1 text-sm">
          <ChevronLeft />
          Back To Home
        </Link>
        <div>
          <h2 className="text-xl font-semibold">Recent Orders</h2>
          <p>
            Quick access to your latest deliveries! 📦 Check the status or view
            details.
          </p>
        </div>
        <div className="">
          <div className="flex flex-col justify-between md:flex-row md:items-center gap-2">
            <DayDate />
            <div className="flex items-center gap-2">
              <FormInput
                leading={
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M7.25 0.5C10.976 0.5 14 3.524 14 7.25C14 10.976 10.976 14 7.25 14C3.524 14 0.5 10.976 0.5 7.25C0.5 3.524 3.524 0.5 7.25 0.5ZM7.25 12.5C10.1502 12.5 12.5 10.1502 12.5 7.25C12.5 4.349 10.1502 2 7.25 2C4.349 2 2 4.349 2 7.25C2 10.1502 4.349 12.5 7.25 12.5ZM13.6137 12.5532L15.7355 14.6742L14.6742 15.7355L12.5532 13.6137L13.6137 12.5532Z"
                      fill="#868C98"
                    />
                  </svg>
                }
                type="text"
                placeholder="search"
                className="text-foreground rounded-md bg-background min-w-60 border-none outline-none"
                wrapperClassName={() =>
                  "outline !ring-foreground/10 outline-foreground/10 border-foreground/10"
                }
              />
              <Select>
                <SelectTrigger className="min-w-16 px-2 focus:outline outline outline-1 outline-foreground/10 py-2 rounded-md whitespace-nowrap">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="7-days">Last 7 days</SelectItem>
                  <SelectItem value="30-days">Last 30 days</SelectItem>
                  <SelectItem value="3-months">Last 3 months</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        {LOCATION_DATA.map((location) => (
          <DeliveryDetails
            key={location.id}
            onOpenChange={(isOpen) => setShowDeliveryDetails(isOpen)}
            open={showDeliveryDetails}>
            <OrderCard {...location} />
          </DeliveryDetails>
        ))}
        <Pagination />
      </div>

      {/* <AnimateInOut
        show={showDeliveryDetails}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed flex items-center justify-center md:justify-end h-svh w-screen z-50 bg-foreground/10 top-0 left-0 cursor-pointer backdrop-blur-sm"
        onClick={() => setShowDeliveryDetails(false)}>
        <DeliveryDetails close={() => setShowDeliveryDetails(false)} />
      </AnimateInOut> */}
    </>
  );
}
