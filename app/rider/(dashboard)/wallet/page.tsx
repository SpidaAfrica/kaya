"use client";
export const dynamic = "force-dynamic";
import { CardChip, MoneyWings, WalletBanner } from "@/assets";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";

import {
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeClosed,
  User,
  User2,
} from "lucide-react";
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
import { ClogIcon, KeyboardIcon, LockIcon } from "@/lib/icons";
import FormInput from "@/components/FormInput";
import SuccessModal from "@/components/Overlays/SuccessModal";

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

export default function WalletPage() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <>
      {activeStep === null ? (
        <WalletOverView setActiveStep={setActiveStep} />
      ) : (
        <div className=" bg-primary/10 w-[90%] mx-auto my-8 py-6">
          <div className="w-fit mx-auto relative py-8">
            <Button
              variant={"ghost"}
              className="text-primary w-fit ml-auto right-3 top-0 absolute"
              onClick={() => {
                if (activeStep === 2) setActiveStep(1);
                else {
                  setActiveStep(null);
                }
              }}>
              <ChevronLeft />
              <span> {activeStep === 2 ? "Go Back" : "Back to Wallet"}</span>
            </Button>
            {activeStep === 1 ? (
              <BankDetails setActiveStep={setActiveStep} />
            ) : activeStep === 2 ? (
              <UpdatePin setActiveStep={setActiveStep} />
            ) : activeStep === 3 ? (
              <WithdrawFunds setActiveStep={setActiveStep} />
            ) : null}
          </div>
        </div>
      )}
    </>
  );
}

function NoEarnings() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-10 py-12">
      <Image src={MoneyWings} alt="money-wings" />
      <div className="">
        <header className="font-semibold text-xl">
          You have no earnings yet
        </header>
        <p className="text-foreground/60 max-w-md">
          Your wallet is waiting for its first entry. Accept an order today and
          start earning!{" "}
        </p>
        <button className="flex items-center">
          <span>Set Up Withdrawal details</span>
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}

function WalletOverView({
  setActiveStep,
}: {
  setActiveStep: (step: number | null) => void;
}) {
  const [showEarnings, setShowEarnings] = useState(false);
  const [hideBalance, setHideBalance] = useState(false);
  const [showPaymentMethods, setShowPaymentMethods] = useState(false);

  const toggleDialog = useCallback((state: boolean) => {
    setShowPaymentMethods(state);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setShowEarnings(true);
    }, 2000);
  }, []);

  return (
    <MainContent>
      <div className="md:w-[90%] mx-auto space-y-5">
        <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-xl mx-6 my-4 overflow-clip md:h-80 h-60">
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
                onClick={() => setActiveStep(3)}
                variant={"ghost"}
                className="w-fit bg-background text-foreground">
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 11 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M6.08151 4.6316L10.7494 9.2978L9.58198 10.4652L4.91578 5.79815L0.832031 9.8819V0.547852H10.1653L6.08151 4.6316Z"
                    fill="#1E2023"
                  />
                </svg>
                <p>Withdraw Funds</p>
              </Button>
            </div>
          </div>
        </div>
        <div className="w-[90%] mx-auto">
          <button
            onClick={() => setActiveStep(1)}
            className="flex items-center gap-2">
            <ClogIcon />
            <p className="font-medium">Set up Withdrawal detail</p>
          </button>
        </div>

        {showEarnings ? (
          <>
            <div className="w-[90%] mx-auto space-y-3">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-xl">Recent Transactions</p>
                <Link href={"wallet/transactions"} className="text-primary">
                  View All
                </Link>
              </div>
              <p className="text-foreground/60">
                Quick access to your latest transactions. Check the status or
                view details.
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
                    <DropdownMenuContent
                      align="end"
                      className="w-72 right-0 p-2">
                      <header className="p-2">Filter Options</header>

                      <div className="p-2 space-y-3 border-t border-b">
                        <div>
                          <Select defaultValue="funding">
                            <Label className="text-xs">Transfer Type</Label>
                            <SelectTrigger className="p-2 rounded !outline outline-1 outline-foreground/10 focus:outline focus:outline-1">
                              <SelectValue placeholder="select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="order">
                                Order Payment
                              </SelectItem>
                              <SelectItem value="funding">
                                Transfer Funding
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Select defaultValue="successful">
                            <Label className="text-xs">
                              Transaction Status
                            </Label>
                            <SelectTrigger className="p-2 rounded !outline outline-1 outline-foreground/10 focus:outline focus:outline-1">
                              <SelectValue placeholder="select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="successful">
                                Successful
                              </SelectItem>
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
            <div className="w-[95%] md:w-[90%] mx-auto">
              {TRANSACTIONS.map((transaction, i) => (
                <TransactionTile key={i} {...transaction} />
              ))}
            </div>
            <Pagination />
          </>
        ) : (
          <NoEarnings />
        )}
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
        <DialogContent className="w-full rounded-xl max-w-[90vw] md:max-w-md p-3">
          <DialogHeader className="flex flex-row items-center justify-between">
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
                  Securely add your bank account for seamless payments and quick
                  refunds.
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
        </DialogContent>
      </Dialog>
    </MainContent>
  );
}

const BankDetails = ({
  setActiveStep,
}: {
  setActiveStep: (step: number | null) => void;
}) => {
  return (
    <div className="flex mx-auto lg:w-[558px] w-[90%] flex-col gap-4">
      <header className="space-y-2">
        <h2 className="text-2xl font-semibold">Set up your bank details!🛵</h2>
        <p className="text-foreground/60">
          Your information is safe with us and helps ensure smooth communication
          and operations.
        </p>
      </header>
      <FormInput
        leading={<KeyboardIcon />}
        label="Bank Verification Number (BVN) "
        placeholder="Taiwo@gmail.com"
      />
      <FormInput
        leading={
          <>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M0.5 14H15.5V15.5H0.5V14ZM2 8H3.5V13.25H2V8ZM5.75 8H7.25V13.25H5.75V8ZM8.75 8H10.25V13.25H8.75V8ZM12.5 8H14V13.25H12.5V8ZM0.5 4.25L8 0.5L15.5 4.25V7.25H0.5V4.25ZM2 5.177V5.75H14V5.177L8 2.177L2 5.177ZM8 5C7.80109 5 7.61032 4.92098 7.46967 4.78033C7.32902 4.63968 7.25 4.44891 7.25 4.25C7.25 4.05109 7.32902 3.86032 7.46967 3.71967C7.61032 3.57902 7.80109 3.5 8 3.5C8.19891 3.5 8.38968 3.57902 8.53033 3.71967C8.67098 3.86032 8.75 4.05109 8.75 4.25C8.75 4.44891 8.67098 4.63968 8.53033 4.78033C8.38968 4.92098 8.19891 5 8 5Z"
                fill="#868C98"
              />
            </svg>
          </>
        }
        label="Bank Name"
        placeholder="Taiwo@gmail.com"
      />
      <FormInput
        leading={<User2 className="size-5" color="#868C98" />}
        label="Account Number"
        placeholder="Taiwo@gmail.com"
      />
      <div className="w-full flex -mt-2">
        <div className="flex rounded-md items-center gap-2 bg-[hsla(25,90%,96%,1)] py-1 px-2 ml-auto">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M6 12C2.6862 12 0 9.3138 0 6C0 2.6862 2.6862 0 6 0C9.3138 0 12 2.6862 12 6C12 9.3138 9.3138 12 6 12ZM6.6 6V3H5.4V7.2H9V6H6.6Z"
              fill="#F27B2C"
            />
          </svg>
          <small className="text-[#F27B2C]">Aaron Ramon</small>
        </div>
      </div>
      <Button onClick={() => setActiveStep(2)}>Save and Continue</Button>
      <Button
        variant={"outline"}
        onClick={() => setActiveStep(null)}
        className="mt-4 text-primary">
        Cancel
      </Button>
    </div>
  );
};

const UpdatePin = ({
  setActiveStep,
}: {
  setActiveStep: (step: number | null) => void;
}) => {
  return (
    <div className=" flex mx-auto lg:w-[558px] w-[90%] flex-col gap-4">
      <header className="space-y-2">
        <h2 className="text-2xl font-semibold">Update Pin</h2>
      </header>
      <FormInput
        leading={<LockIcon className="size-5" />}
        label="Enter Old 4-digit Password"
        placeholder="Enter Password"
      />
      <FormInput
        leading={<LockIcon className="size-5" />}
        label="Enter new 4-digit Password"
        placeholder="Enter Password"
      />
      <FormInput
        leading={<LockIcon className="size-5" />}
        label="Re- Enter a new-digit Password"
        placeholder="Enter Password"
      />
      <SuccessModal
        title="Wallet Setup Complete"
        message="Your new bank details has been successfully updated"
        showButton={false}>
        <Button onClick={() => setActiveStep(2)}>Save and Continue</Button>
      </SuccessModal>
      <Button
        variant={"outline"}
        onClick={() => setActiveStep(null)}
        className="mt-4 text-primary">
        Cancel
      </Button>
    </div>
  );
};

function WithdrawFunds({
  setActiveStep,
}: {
  setActiveStep: (step: number | null) => void;
}) {
  return (
    <div className=" flex mx-auto lg:w-[558px] w-[90%] flex-col gap-4">
      <header className="space-y-2">
        <h2 className="text-2xl font-semibold">Withdraw Funds</h2>
        <p className="text-foreground/60">
          Successfully withdraw your funds. You’ve Earned it!!
        </p>
      </header>
      <FormInput
        leading={
          <svg
            width="14"
            height="10"
            viewBox="0 0 14 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7.00111 7.50012C8.38179 7.50012 9.50111 6.38081 9.50111 5.00012C9.50111 3.61941 8.38179 2.50012 7.00111 2.50012C5.62037 2.50012 4.50109 3.61941 4.50109 5.00012C4.50109 6.38081 5.62037 7.50012 7.00111 7.50012ZM12.6289 0.00195312H1.37891C1.03373 0.00195312 0.753906 0.281772 0.753906 0.626953V9.37693C0.753906 9.72212 1.03373 10.0019 1.37891 10.0019H12.6289C12.9741 10.0019 13.2539 9.72212 13.2539 9.37693V0.626953C13.2539 0.281772 12.9741 0.00195312 12.6289 0.00195312ZM2.00391 7.27906V2.72119C2.70751 2.51075 3.26233 1.9557 3.47245 1.25195H10.5297C10.7404 1.95758 11.2976 2.51372 12.0039 2.72287V7.27737C11.2964 7.48687 10.7385 8.04456 10.5286 8.75193H3.47354C3.26426 8.0465 2.70874 7.48987 2.00391 7.27906Z"
              fill="#868C98"
            />
          </svg>
        }
        label="Amount To withdraw"
        placeholder="Enter amount to withdraw"
      />

      <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-[#f2f2f2] w-fit">
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 5.39961V10.7996C12 10.9587 11.9368 11.1114 11.8243 11.2239C11.7117 11.3364 11.5591 11.3996 11.4 11.3996H0.6C0.44087 11.3996 0.288258 11.3364 0.175736 11.2239C0.0632141 11.1114 0 10.9587 0 10.7996V5.39961H12ZM12 2.99961H0V1.19961C0 1.04048 0.0632141 0.887867 0.175736 0.775345C0.288258 0.662823 0.44087 0.599609 0.6 0.599609H11.4C11.5591 0.599609 11.7117 0.662823 11.8243 0.775345C11.9368 0.887867 12 1.04048 12 1.19961V2.99961Z"
            fill="#475467"
          />
        </svg>
        <span>Current Balance: NGN {"50,000"}</span>
      </div>

      <FormInput
        leading={<User className="size-5" />}
        label="Destination"
        placeholder="Meji Austin Peters"
      />
      <FormInput
        leading={<LockIcon className="size-5" />}
        label="Wallet Pin"
        type="Password"
        placeholder="4-digit wallet pin"
      />
      <div className="flex md:flex-col items-center gap-3 mt-3">
        <SuccessModal
          title="Withdrawal Successful! 💸"
          message="Your withdrawal has been processed. Check your account shortly!"
          showButton={false}>
          <Button>Save and Continue</Button>
        </SuccessModal>
        <Button
          variant={"outline"}
          onClick={() => setActiveStep(null)}
          className="text-primary">
          Cancel
        </Button>
      </div>
    </div>
  );
}
