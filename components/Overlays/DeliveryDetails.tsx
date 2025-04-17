"use client";
import { useEffect, useState } from "react";
import { Actions, DetailsLayout, ViewMapInFullMode } from "@/app/shared";
import { MiniMap, MoneyIcon, Stars } from "@/assets";
import { Dot, Edit3, Plus } from "lucide-react";
import Image from "next/image";
import React, { PropsWithChildren } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import DynamicOverlay from "./DynamicOverlay";
import { SuggestPrice } from "./SuggestPrice";
import { OrderDetails } from "./OrderDetails";
import Link from "next/link";

export function DeliveryDetails({
  actions,
  children,
  onOpenChange,
  open,
  withMoreActions = true,
  type = "delivery",
}: PropsWithChildren<{
  onOpenChange?(open: boolean): void;
  open?: boolean;
  actions?: Actions;
  withMoreActions?: boolean;
  type?: "delivery" | "order";
}>) {
  const fromLocation = sessionStorage.getItem("fromLocation");
  const toLocation = sessionStorage.getItem("toLocation");
  const stopCount = JSON.parse(sessionStorage.getItem("dynamicStops") || "[]").length;
  const [paymentMethod, setPaymentMethod] = useState(
    sessionStorage.getItem("paymentMethod") || "online-payment"
  );

  useEffect(() => {
    sessionStorage.setItem("paymentMethod", paymentMethod);
  }, [paymentMethod]);

  // Other sessionStorage items
  const userId = sessionStorage.getItem('userId');
  const packageCategory = sessionStorage.getItem('packageCategory');
  const packageDescription = sessionStorage.getItem('packageDescription');
  const price = sessionStorage.getItem('price');
  const senderPhone = sessionStorage.getItem('senderPhone');
  const recipientPhone = sessionStorage.getItem('recipientPhone');
  const dynamicStops = JSON.parse(sessionStorage.getItem('dynamicStops')) || [];

  // Function to handle button click and send data to backend
  const handleSubmit = async () => {
    try {
      // Send data to PHP backend
      const response = await fetch('https://jbuit.org/api/create-package.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          user_id: userId,
          from_location: fromLocation,
          to_location: toLocation,
          package_category: packageCategory,
          package_description: packageDescription,
          price: price,
          payment_method: paymentMethod,
          sender_phone: senderPhone,
          recipient_phone: recipientPhone,
          dynamic_stops: JSON.stringify(dynamicStops) // Send dynamic stops as a string
        })
      });

      const data = await response.json();
      if (data.status === 'success') {
        alert('Package created successfully!');
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error creating package:', error);
      alert('There was an error submitting the package.');
    }
  };


  return (
    <DynamicOverlay onOpenChange={onOpenChange} open={open} trigger={children}>
      <DetailsLayout
        hide={() => actions?.close?.()}
        title={type === "delivery" ? "Delivery Details" : "Order Details"}>
        <div className="w-full relative">
          <Image src={MiniMap} alt="mini-map" className="w-full" />
          <ViewMapInFullMode userType="passenger" />
        </div>
        <div className="space-y-4">
          {type === "order" && (
            <div className="flex items-center justify-between">
              <p className="text-gray-400">OrderID</p>
              <p className="font-semibold">#453GBR89</p>
            </div>
          )}
          {!withMoreActions && type !== "order" && (
            <div className="flex items-center justify-between">
              <p className="text-gray-400">Price</p>
              <p className="font-semibold">{price}</p>
            </div>
          )}
          <div className="flex items-center justify-between">
            <p className="text-gray-400">Current Location</p>
            <p className="font-semibold">{fromLocation}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-gray-400">Destination</p>
            <p className="font-semibold">{toLocation}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-gray-400">Number of stops</p>
            <p className="font-semibold">{stopCount}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-gray-400">Payment Method</p>
            <p className="font-semibold">{paymentMethod}</p>
          </div>

          {type === "order" && (
            <>
              <div className="flex items-center justify-between">
                <p className="text-gray-400">Order Date</p>
                <p className="font-semibold">20 December 2024.....12:30pm</p>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-gray-400">Order Status</p>
                <p className="text-xs text-green-400 flex gap-1 items-center rounded-md bg-green-100 px-2 py-1">
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

                  {"completed"}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-gray-400">Rider Name</p>
                <p className="font-semibold">Matthew Aaron</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-gray-400">Rider ID</p>
                <p className="font-semibold">RD6799909</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-gray-400">Rider rating</p>
                <p className="font-semibold">4 stars</p>
              </div>
            </>
          )}
        </div>

        {type === "order" && <Button>Rebook Order</Button>}

        {withMoreActions ? (
          <>
            <OrderDetails
              actions={actions}
              onOpenChange={onOpenChange}
              open={open}>
              <button className="flex items-center justify-between text-primary">
                <div className="flex items-center gap-2">
                  <Image src={Stars} alt="stars" />
                  <p>Enter Order Details</p>
                </div>
                <Plus />
              </button>
            </OrderDetails>
            <SuggestPrice
              actions={actions}
              onOpenChange={onOpenChange}
              open={open}>
              <button className="flex w-full px-3 py-4 gap-2 rounded-md bg-orange-tint/[7%] justify-between">
                <div className="rounded-full h-fit p-3 bg-orange-tint/5">
                  <Image src={MoneyIcon} alt="fare" />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-4">
                    <p className="font-semibold">NGN{"25,000"}</p>
                    <span className="font-semibold flex bg-background items-center rounded-full text-xs text-gray-400 border-gray-400 border pr-2">
                      <Dot />
                      Standard
                    </span>
                  </div>
                  <p className="text-foreground/60 text-left">
                    Tap to suggest a new fare
                  </p>
                </div>
                <div className="">
                  <Edit3 />
                </div>
              </button>
            </SuggestPrice>

            <RadioGroup
              value={paymentMethod}
              onValueChange={setPaymentMethod}
              className="flex items-center gap-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="online-payment" id="online-payment" />
                <Label htmlFor="online-payment">Online Payment</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="cash" id="cash" />
                <Label htmlFor="cash">Cash</Label>
              </div>
            </RadioGroup>

            <div className="rounded-md flex items-center bg-primary/10 p-4 rounded-l-md">
              <div className="flex-[2]">
                <p>Automatically accept nearest rider for NGN25,000</p>
              </div>
              <div className="flex-[1]">
                <div className="w-fit ml-auto h-fit">
                  <Switch />
                </div>
              </div>
            </div>
            <DialogTrigger asChild>
              <Button
                type="submit"
                onClick={handleSubmit}
                asChild
                //onClick={() => {
                  //console.log("confirm delivery");
                  //   actions.switchPage?.("SUGGEST_PRICE");
                //}}
                >
               {/* <Link href={"/passenger/home/ride-actions"}>
                  Confirm Delivery
                </Link>
                */}
                <Link href={"/passenger/home/"}>
                  Confirm Delivery
                </Link>
              </Button>
            </DialogTrigger>
          </>
        ) : (
          <div className="h-40" />
        )}
      </DetailsLayout>
    </DynamicOverlay>
  );
}
