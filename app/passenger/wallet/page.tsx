"use client";
export const dynamic = "force-dynamic";
import { useEffect } from "react";
import { CardChip, WalletBanner } from "@/assets";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import { Eye, EyeClosed, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Building2, CreditCard } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Pagination from "@/components/Pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/custom-select";
import { Label } from "@/components/ui/label";
import DayDate from "@/components/DayDate";
import { MainContent } from "@/app/layouts/app-layout";
import Link from "next/link";
import TransactionTile from "./TransactionTile";
import { DialogTrigger } from "@radix-ui/react-dialog";

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


export default function WalletPage() {
  const [hideBalance, setHideBalance] = useState(false);
  const [showPaymentMethods, setShowPaymentMethods] = useState(false);

  const openDialog = useCallback(() => {
    setShowPaymentMethods(true);
  }, []);

  const toggleDialog = useCallback((state: boolean) => {
    setShowPaymentMethods(state);
  }, []);

const [transactions, setTransactions] = useState<Transaction[]>([]);
const [typeFilter, setTypeFilter] = useState("");
const [statusFilter, setStatusFilter] = useState("");
const [search, setSearch] = useState("");
const [page, setPage] = useState(1);
const userId = sessionStorage.getItem("userId");
const [totalPages, setTotalPages] = useState(1);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const query = new URLSearchParams({
    user_id: userId, // replace with actual user ID
    page: page.toString(),
    type: typeFilter,
    status: statusFilter,
    search,
  });

  fetch(`https://jbuit.org/api/get-transactions.php?${query.toString()}`)
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        setTransactions(data.transactions);
        setTotalPages(data.totalPages);
      }
    });
}, [typeFilter, statusFilter, search, page]);

  return (
    <MainContent>
      <div className="md:w-[90%] mx-auto space-y-5">
        <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-background rounded-xl mx-6 my-4 overflow-clip md:h-80 h-60">
          <Image
            src={WalletBanner}
            alt="banner"
            className="z-10 absolute w-full h-full object-cover"
          />
          <div className="relative flex flex-col justify-between z-20 w-[90%] py-5 h-full mx-auto">
            <div className="flex items-start justify-between">
              <div className="">
                <div className="flex items-center gap-3">
                  <p className="text-lg">Wallet Ballance</p>
                  <button onClick={() => setHideBalance((prev) => !prev)}>
                    {hideBalance ? <EyeClosed /> : <Eye />}
                  </button>
                </div>
                <p className="font-semibold text-6xl">
                  {hideBalance ? "****" : "N0.00"}
                </p>
              </div>
              <Image src={CardChip} alt="card-chip" />
            </div>
            <div className="w-fit ml-auto">
              <Button
                variant={"ghost"}
                className="w-fit min-w-60 bg-background text-foreground">
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 11 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M4.98624 6.36595L0.319214 1.70058L1.48576 0.533203L6.15279 5.20023L10.2357 1.11648V10.4497H0.902489L4.98624 6.36595Z"
                    fill="#1E2023"
                  />
                </svg>
                <p>Deposit Funds</p>
              </Button>
            </div>
          </div>
        </div>
        <div className="w-[90%] mx-auto">
          <button
            onClick={openDialog}
            className="flex items-center gap-2 font-semibold">
            <Plus />
            <p>Add new Payment method</p>
          </button>
        </div>

        <div className="w-[90%] mx-auto space-y-3">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-xl">Recent Transactions</p>
            <Link href={"wallet/transactions"} className="text-primary">
              View All
            </Link>
          </div>
          <p className="text-foreground/60">
            Quick access to your latest transactions. Check the status or view
            details.
          </p>
        </div>

        <div className="w-[90%] mx-auto">
          <div className="flex flex-col justify-between md:flex-row md:items-center gap-2">
            <div className="flex items-center gap-2">
              <DayDate />
            </div>
            <div className="flex items-center gap-2">
              <Input
                type="text"
                placeholder="search"
                className="text-foreground rounded-md bg-background border border-foreground/20 px-2 !py-2 h-auto min-w-60 outline outline-1 outline-foreground/20"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
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
                    {/*
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
                    */}
                    <div>
                      <Select onValueChange={(v) => setTypeFilter(v)}>
                        <Label className="text-xs">Transfer Type</Label>
                          <SelectTrigger className="p-2 rounded !outline outline-1 outline-foreground/10 focus:outline focus:outline-1">
                            <SelectValue placeholder="select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="deposit">Deposit</SelectItem>
                            <SelectItem value="transfer">Transfer</SelectItem>
                          </SelectContent>
                      </Select>
                    </div>
                    <div>
                    <Select onValueChange={(v) => setStatusFilter(v)}>
                      <Label className="text-xs">Transaction Status</Label>
                        <SelectTrigger className="p-2 rounded !outline outline-1 outline-foreground/10 focus:outline focus:outline-1">
                          <SelectValue placeholder="select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="successful">Successful</SelectItem>
                          <SelectItem value="failed">Failed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                    </Select>
                    </div>
                    {/*
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
                    */}
                    <div className="flex items-center gap-3">
                      {/* <DropdownMenuTrigger asChild> 
                      <Button variant={"outline"} className="">
                        Cancel
                      </Button>
                      {/* </DropdownMenuTrigger> */}
                      {/* <DropdownMenuTrigger asChild> 
                      <Button>Apply</Button>
                      {/* </DropdownMenuTrigger> */}
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        <div className="w-[90%] mx-auto space-y-3 divide-y">
          {loading ? (
            <p>Loading transactions...</p>
          ) : transactions.length > 0 ? (
            transactions.map((tx) => <TransactionTile key={tx.id} {...tx} />)
          ) : (
            <p>No transactions found.</p>
          )}

          <Pagination
            currentPage={page}
            totalPages={totalPages} // ideally from backend count
            onPageChange={(newPage) => setPage(newPage)}
          />
        </div>
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

      <Dialog open={showPaymentMethods} onOpenChange={toggleDialog}>
        <DialogContent className="w-full rounded-xl max-w-[90vw] md:max-w-lg ">
          <div className="h-full w-full relative px-6 py-8">
            <DialogTrigger className="absolute top-4 right-4">
              <button>
                <X />
              </button>
            </DialogTrigger>
            <DialogHeader className="flex flex-row items-center justify-between border-b py-2">
              <DialogTitle className="text-lg font-semibold">
                Add a New Payment Method
              </DialogTitle>
              {/* <button
                onClick={closeDialog}
                className="rounded-full p-1 hover:bg-gray-100 transition-colors">
                <X className="h-5 w-5 text-gray-500" />
              </button> */}
            </DialogHeader>

            <div className="space-y-4 mt-4">
              <button className="w-full flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors text-left">
                <div className="rounded-full bg-emerald-100 p-2">
                  <Building2 className="h-5 w-5 text-emerald-500" />
                </div>
                <div>
                  <div className="font-medium">New Bank Account</div>
                  <div className="text-sm text-gray-500">
                    Securely add your bank account for seamless payments and
                    quick refunds.
                  </div>
                </div>
              </button>

              <button className="w-full flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors text-left">
                <div className="rounded-full bg-emerald-100 p-2">
                  <CreditCard className="h-5 w-5 text-emerald-500" />
                </div>
                <div>
                  <div className="font-medium">New Credit/Debit Card</div>
                  <div className="text-sm text-gray-500">
                    Save your credit or debit card for fast and secure
                    transactions.
                  </div>
                </div>
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </MainContent>
  );
}
