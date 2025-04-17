"use client";
import React, { Fragment, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/custom-select";
import FormInput from "@/components/FormInput";
import Pagination from "@/components/Pagination";
import { DeliveryDetails } from "@/components/Overlays/DeliveryDetails";
import { OrderCard } from "@/app/shared";
import Image from "next/image";
import NoOrders from "@/assets/no-orders.svg";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";

interface Package {
  id: string;
  status: string;
  ride_rating: string;
  package_category: string;
}

interface ApiResponse {
  data: Package[];
  total_pages: number;
}

export default function MyOrdersPage() {
  const [hasOrders, setHasOrders] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [rating, setRating] = useState("");
  const [packageType, setPackageType] = useState("");
  const [dateFilter, setDateFilter] = useState("today");
 // const [customDate, setCustomDate] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    setTimeout(() => {
      setHasOrders(true);
    }, 3000);
  }, []);

  const fetchPackages = async () => {
    const params = new URLSearchParams({
      search,
      status,
      ride_rating: rating,
      package_category: packageType,
      date_filter: dateFilter,
     // custom_date: customDate,
      page: page.toString(),
    });

    try {
      const res = await fetch(`https://jbuit.org/api/filter-packages.php?${params}`);
      const data: ApiResponse = await res.json();
      setPackages(data.data);
      setTotalPages(data.total_pages || 1);
    } catch (err) {
      console.error("Error fetching packages:", err);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, [search, status, rating, packageType, dateFilter, page]);

  return hasOrders ? (
    <>
      <div className="w-[90%] mx-auto space-y-3 py-6 relative">
        <Link href={"/passenger/home"} className="text-primary absolute right-4 flex gap-1 text-sm">
          <ChevronLeft />
          Back To Home
        </Link>
        <div>
          <h2 className="text-xl font-semibold">Recent Orders</h2>
          <p>Quick access to your latest deliveries! 📦 Check the status or view details.</p>
        </div>
        <div className="">
          <div className="flex flex-col justify-between md:flex-row md:items-center gap-2">
            <div className="flex items-center">
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="rounded-r-none min-w-16 px-2 focus:outline outline outline-1 outline-foreground/10 py-1 rounded-l-md whitespace-nowrap">
                  <SelectValue placeholder="Pick range" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="7-days">Last 7 days</SelectItem>
                  <SelectItem value="30-days">Last 30 days</SelectItem>
                  <SelectItem value="3-months">Last 3 months</SelectItem>
                </SelectContent>
              </Select>
              <DatePicker />
            </div>
            <div className="flex items-center gap-2">
              <FormInput
                leading={
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.25 0.5C10.976 0.5 14 3.524 14 7.25C14 10.976 10.976 14 7.25 14C3.524 14 0.5 10.976 0.5 7.25C0.5 3.524 3.524 0.5 7.25 0.5ZM7.25 12.5C10.1502 12.5 12.5 10.1502 12.5 7.25C12.5 4.349 10.1502 2 7.25 2C4.349 2 2 4.349 2 7.25C2 10.1502 4.349 12.5 7.25 12.5ZM13.6137 12.5532L15.7355 14.6742L14.6742 15.7355L12.5532 13.6137L13.6137 12.5532Z"
                      fill="#868C98"
                    />
                  </svg>
                }
                type="text"
                placeholder="search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="text-foreground rounded-md bg-background min-w-60 border-none outline-none"
                wrapperClassName={() =>
                  "outline !ring-foreground/10 outline-foreground/10 border-foreground/10"
                }
              />
              <DropdownMenu>
                <DropdownMenuTrigger className="flex gap-3 items-center border-b py-[6px] rounded-md px-2 border">
                  <svg
                    width="14"
                    height="10"
                    viewBox="0 0 14 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.5 9.5H8.5V8H5.5V9.5ZM0.25 0.5V2H13.75V0.5H0.25ZM2.5 5.75H11.5V4.25H2.5V5.75Z"
                      fill="#525866"
                    />
                  </svg>
                  <span className="text-sm text-foreground/70">Filter</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-72 right-0 p-2">
                  <header className="p-2">Filter Options</header>

                  <div className="p-2 space-y-3 border-t">
                    <div>
                      <Select value={status} onValueChange={setStatus}>
                        <Label className="text-xs">Order Status</Label>
                        <SelectTrigger className="p-2 rounded !outline outline-1 outline-foreground/10 focus:outline focus:outline-1">
                          <SelectValue placeholder="select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="All Status">All Status</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="Cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Select value={rating} onValueChange={setRating}>
                        <Label className="text-xs">Rider Rating</Label>
                        <SelectTrigger className="p-2 rounded !outline outline-1 outline-foreground/10 focus:outline focus:outline-1">
                          <SelectValue placeholder="5 stars" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="All Stars">All Stars</SelectItem>
                          <SelectItem value="5">5 Stars</SelectItem>
                          <SelectItem value="4">4 Stars</SelectItem>
                          <SelectItem value="3">3 Stars</SelectItem>
                          <SelectItem value="2">2 Stars</SelectItem>
                          <SelectItem value="1">1 Star</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="pb-2">
                      <Select value={packageType} onValueChange={setPackageType}>
                        <Label className="text-xs">Package Type</Label>
                        <SelectTrigger className="p-2 rounded !outline outline-1 outline-foreground/10 focus:outline focus:outline-1">
                          <SelectValue placeholder="Document" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="All Types">All Types</SelectItem>
                          <SelectItem value="Small">Small</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="Large">Large</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center gap-3 border-t pt-3">
                      <Button variant={"outline"}>Cancel</Button>
                      <Button>Apply</Button>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        <div className="space-y-2 w-[90%] md:w-full mx-auto divide-y divide-gray-50/20">
          {packages.map((packs) => (
            <Fragment key={packs.id}>
              <DeliveryDetails data={packs}> 
                <OrderCard data={packs} /> 
                </DeliveryDetails> 
                </Fragment> 
                ))} 
          </div> 
          {totalPages > 1 && ( 
            <Pagination 
            currentPage={page} 
            totalPages={totalPages} 
            onPageChange={setPage} /> 
          )}
          </div> </> ) : ( 
          <div className="w-full h-[80dvh] flex flex-col items-center justify-center gap-4"> 
            <Image src={NoOrders} alt="no orders" /> 
            <div className="text-sm text-center">
               <p>No orders yet</p>
               <p>Start exploring and ordering now!</p> 
            </div> 
            <Button asChild> 
              <Link href="/passenger/home">Go Back Home</Link> 
            </Button> 
          </div> ); }