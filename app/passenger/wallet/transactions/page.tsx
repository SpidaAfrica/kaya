"use client";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
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
import { Input } from "@/components/ui/input";
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

export default function TransactionsPage() {
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
    <div className="w-[95%] md:w-[85%] mx-auto py-12 ">
      <div className="mx-auto space-y-3">
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

      <div className="mx-auto">
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
  );
}
