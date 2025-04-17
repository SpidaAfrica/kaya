"use client";
export const dynamic = "force-dynamic";
import React from "react";
import TransactionTile from "../TransactionTile";
import Pagination from "@/components/Pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DayDate from "@/components/DayDate";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/custom-select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/FormInput";
// Ensure you import these icons from the correct library

interface Transaction {
  id: number;
  date: string;
  title: string;
  referenceId: string;
  balance: string;
  status: string;
  amount: string;
  type: "deposit" | "transfer";
}

const TRANSACTIONS: Transaction[] = [
  {
    id: 1,
    date: "20 December 2024 ..12:30pm",
    title: "Order Payment",
    referenceId: "#TSCFE - 123",
    balance: "200",
    status: "successful",
    amount: "2500",
    type: "deposit",
  },
  {
    id: 2,
    date: "21 December 2024 ..01:00pm",
    title: "Transfer - Funding",
    referenceId: "#TSCFE - 123",
    balance: "300",
    status: "cancelled",
    amount: "2500",
    type: "transfer",
  },
  {
    id: 3,
    date: "22 December 2024 ..02:30pm",
    title: "Order Payment",
    referenceId: "#TSCFE - 123",
    balance: "150",
    status: "successful",
    amount: "2500",
    type: "transfer",
  },
  {
    id: 4,
    date: "23 December 2024 ..03:00pm",
    title: "Order Payment",
    referenceId: "#TSCFE - 123",
    balance: "250",
    status: "successful",
    amount: "2500",
    type: "deposit",
  },
  {
    id: 5,
    date: "24 December 2024 ..04:30pm",
    title: "Transfer - Funding",
    referenceId: "#TSCFE - 123",
    balance: "350",
    status: "cancelled",
    amount: "2500",
    type: "deposit",
  },
];
export default function TransactionsPage() {
  return (
    <div className="w-[95%] md:w-[85%] mx-auto py-12 ">
      <div className="mx-auto space-y-3">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-xl">Recent Transactions</p>
          <Link href={"./"} className="text-primary">
            Back To Wallet
          </Link>
        </div>
        <p className="text-foreground/60">
          Quick access to your latest deliveries! 📦 Check the status or view
          details.{" "}
        </p>
      </div>

      <div className="mx-auto">
        <div className="flex flex-col justify-between md:flex-row md:items-center gap-2">
          <div className="flex items-center gap-2">
            <DayDate />
          </div>
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
            <DropdownMenu>
              <DropdownMenuTrigger className="flex gap-3 items-center border-b py-[6px] rounded-md px-2 border">
                <svg
                  width="14"
                  height="10"
                  viewBox="0 0 14 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M5.5 9.5H8.5V8H5.5V9.5ZM0.25 0.5V2H13.75V0.5H0.25ZM2.5 5.75H11.5V4.25H2.5V5.75Z"
                    fill="#525866"
                  />
                </svg>
                <span className="text-sm text-foreground/70">Filter</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-72 right-0 p-2">
                <header className="p-2">Filter Options</header>

                <div className="p-2 space-y-3 border-t border-b">
                  <div>
                    <Select defaultValue="funding">
                      <Label className="text-xs">Transfer Type</Label>
                      <SelectTrigger className="p-2 rounded !outline outline-1 outline-foreground/10 focus:outline focus:outline-1">
                        <SelectValue placeholder="select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="order">Order Payment</SelectItem>
                        <SelectItem value="funding">
                          Transfer Funding
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Select defaultValue="successful">
                      <Label className="text-xs">Transaction Status</Label>
                      <SelectTrigger className="p-2 rounded !outline outline-1 outline-foreground/10 focus:outline focus:outline-1">
                        <SelectValue placeholder="select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="successful">Successful</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="failed">Failed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center gap-3">
                    {/* <DropdownMenuTrigger asChild> */}
                    <Button variant={"outline"} className="">
                      Cancel
                    </Button>
                    {/* </DropdownMenuTrigger> */}
                    {/* <DropdownMenuTrigger asChild> */}
                    <Button>Apply</Button>
                    {/* </DropdownMenuTrigger> */}
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <div className="space-y-2 divide-y py-4">
        {TRANSACTIONS.map((transaction, i) => (
          <TransactionTile key={i} {...transaction} />
        ))}
        <Pagination />
      </div>
    </div>
  );
}
