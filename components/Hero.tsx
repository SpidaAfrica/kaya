import React from "react";
import { Banner } from "@/assets";
import Image from "next/image";
import { Button } from "./ui/button";
//import { NewLocationDropDown } from "@/app/shared";
import { DeliveryDetails } from "./Overlays/DeliveryDetails";
import { useState } from "react";
import AddStopsModal from "./Overlays/AddStopsModal";

function MapIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1.48463e-07 2.25L5.25 0L9.75 2.25L14.4772 0.22425C14.5343 0.199788 14.5966 0.189877 14.6584 0.195407C14.7202 0.200937 14.7797 0.221735 14.8316 0.255934C14.8834 0.290133 14.9259 0.336663 14.9553 0.391348C14.9847 0.446034 15.0001 0.507163 15 0.56925V12.75L9.75 15L5.25 12.75L0.52275 14.7757C0.465685 14.8002 0.40344 14.8101 0.341599 14.8046C0.279759 14.7991 0.220259 14.7783 0.16844 14.7441C0.116621 14.7099 0.0741043 14.6633 0.0447052 14.6087C0.0153061 14.554 -5.50922e-05 14.4928 1.48463e-07 14.4307V2.25ZM9.75 13.323V3.882L9.70125 3.903L5.25 1.677V11.118L5.29875 11.097L9.75 13.323Z"
        fill="#00ABFD"
      />
    </svg>
  );
}

export const Hero = () => {
  const [showDeliveryDetails, setShowDeliveryDetails] = useState(false);
  const [isPickup, setIsPickup] = useState(false);
  const [fromLocation, setFromLocation] = React.useState("");
  const [toLocation, setToLocation] = React.useState("");
  sessionStorage.setItem("fromLocation", fromLocation);
  sessionStorage.setItem("toLocation", toLocation);



  return (
    <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-xl mx-6 my-4 overflow-clip_ md:h-80">
      <Image
        src={Banner}
        alt="banner"
        className="z-10 absolute w-full h-full object-cover rounded-xl"
      />
      <div className="w-[90%] mx-auto py-6 md:py-12">
        <div className="relative z-20 flex flex-col md:flex-row items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <h1 className="text-3xl md:text-6xl font-bold">
              📦 Got a package to send?
            </h1>
          </div>
          <Button
            onClick={() => setIsPickup((prev) => !prev)}
            variant={"ghost"}
            className="flex w-fit items-center space-x-2 text-white hover:bg-background/10 hover:!text-background">
            <span className="">
              <svg
                width="22"
                height="24"
                viewBox="0 0 22 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M15.5 16.5V12L21.125 17.625L15.5 23.25V18.75H2V16.5H15.5ZM6.5 0.75V5.24888L20 5.25V7.5H6.5V12L0.875 6.375L6.5 0.75Z"
                  fill="white"
                />
              </svg>
            </span>
            <span>Switch to {isPickup ? "Delivery" : "Pickup"}</span>
          </Button>
        </div>

        <div className="mt-8 md:w-[80%] mx-auto relative z-20 flex flex-col gap-4 md:flex-row items-end space-x-4">
          <div className="w-full flex flex-col md:flex-row gap-3 md:gap-6">
            <div className="flex-1">
              <label className="block text-sm mb-1">
                Enter a {isPickup ? "Pickup" : "Delivery"} Location
              </label>
              {/*<NewLocationDropDown>*/}
                <div className="flex items-center">
                  <button className="">
                    <MapIcon />
                  </button>
                  <input
                    type="text"
                    placeholder="from"
                    className="w-full px-4 py-2 rounded text-gray-800 ml-2"
                    value={fromLocation}
                    onChange={(e) => setFromLocation(e.target.value)}
                  />
                </div>
              {/*</NewLocationDropDown>*/}
            </div>
            <div className="flex-1">
              <label className="block text-sm mb-1">
                Enter a dropoff location
              </label>
              {/*<NewLocationDropDown>*/}
                <div className="flex items-center gap-2">
                  <MapIcon />
                  <input
                    type="text"
                    placeholder="to"
                    className="w-full px-4 py-2 rounded text-gray-800"
                    value={toLocation}
                    onChange={(e) => setToLocation(e.target.value)}
                  />
                </div>
              {/*</NewLocationDropDown>*/}
            </div>
          </div>
          <div className="w-full flex md:flex-row gap-2">
            <div className="flex-[3]">
              <AddStopsModal>
                <Button
                  variant={"outline"}
                  className="outline-white text-xs md:text-base px-5 md:px-3 py-1 md:py-2 rounded hover:bg-background/40 w-full">
                  + Add Stops
                </Button>
              </AddStopsModal>
            </div>
            <div className="flex-[4]">
              <DeliveryDetails
                onOpenChange={(isOpen) => setShowDeliveryDetails(isOpen)}
                open={showDeliveryDetails}>
                <Button className="text-xs flex-1 md:text-base px-1 md:px-3 py-1 md:py-2 bg-primary rounded text-background">
                  Book your delivery
                </Button>
              </DeliveryDetails>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
