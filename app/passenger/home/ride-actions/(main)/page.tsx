"use client";
export const dynamic = "force-dynamic";
import AnimateInOut from "@/components/AnimateInOut";
import { Button } from "@/components/ui/button";
import {
  CircularProgressBar,
  MessageIconSquare,
  MoneyIcon,
  NoDrivers,
  RiderAvatar,
  StarRating,
  Stars,
  Warn,
} from "@/assets";
import { ChevronRight, Loader, Map, Phone, Slash, X } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Info } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export default function RideActionsPage() {
  return (
    <div className="flex flex-col-reverse md:flex-row gap-10">
      <div className="flex-1">
        <h3 className="font-medium">Trip Details</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-4 px-2">
            <div className="rounded-full h-fit p-3 bg-orange-tint/5">
              <Image src={MoneyIcon} alt="fare" className="w-6" />
            </div>
            <div className="border-b-[1px] border-b-foreground/10 py-3 flex-1">
              <p className="text-gray-400 font-medium text-sm">Order Price</p>
              <div className="flex items-center gap-3">
                <p className="text-lg font-medium">NGN30,000</p>
                <div className="flex items-center gap-1 py-1 px-2 rounded-lg outline outline-1 outline-gray-400/80 shadow">
                  <span>
                    <Slash className="stroke-background p-1 rounded-full bg-gray-400 w-4 h-4" />
                  </span>
                  <small className="font-medium text-gray-400">Cash</small>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 px-2">
            <div className="rounded-full h-fit p-3 bg-primary/5 text-primary">
              <Map />
            </div>
            <div className="border-b-[1px] border-b-foreground/10 py-3 flex-1">
              <p className="text-gray-400 font-medium text-sm">Origin</p>
              <div className="flex items-center gap-3">
                <p className="text-lg font-medium">Hebert Macauley Road</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 px-2">
            <div className="rounded-full h-fit p-3 bg-primary/5 text-primary">
              <Map />
            </div>
            <div className="border-b-[1px] border-b-foreground/10 py-3 flex-1">
              <p className="text-gray-400 font-medium text-sm">Origin</p>
              <div className="flex items-center gap-3">
                <p className="text-lg font-medium">Hebert Macauley Road</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 px-2">
            <div className="rounded-full h-fit p-3 bg-primary/5">
              <Image src={Stars} alt="stars" />
            </div>
            <div className="border-b-[1px] border-b-foreground/10 py-3 flex-1">
              <p className="text-gray-400 font-medium text-sm">Order Details</p>
              <div className="flex items-center gap-3">
                <p className="text-lg font-medium">
                  +2348052866502, +2348054676804, Small envelope with fragile...
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <DeliveryDetails>
              <Button>Back to delivery Details</Button>
            </DeliveryDetails>
            <CancelRequest />
          </div>
        </div>
      </div>

      <div className="flex-1 rounded-xl bg-primary/5">
        {/* {loading ? (
          <div className="h-full w-full py-8 flex items-center justify-center">
            <Loader className="w-12 h-12 text-center text-primary animate-spin" />
          </div>
        ) : showRiderDetails ? (
          <AcceptedRiderDetails />
        ) : (
          <Image
            src={NoDrivers}
            alt="no-drivers"
            className="object-cover w-full h-full"
          />
          // <FareIncreaseInterface />
          // <RideSelectionInterface />
          // <Image
          //   src={NoDrivers}
          //   alt="no-drivers"
          //   className="object-cover w-full h-full"
          // />
        )} */}
        <RideActionSection />
      </div>
    </div>
  );
}

type RideState =
  | "available-rides"
  | "no-rides"
  | "rider-details"
  | "loading"
  | "increase-fare";

function RideActionSection() {
  const [rideState, setRideState] = useState<RideState>("loading");

  useEffect(() => {
    setTimeout(() => {
      setRideState("no-rides");
      setTimeout(() => {
        setRideState("increase-fare");
      }, 5000);
    }, 2000);
  }, []);

  switch (rideState) {
    case "loading":
      return (
        <div className="h-full w-full py-8 flex items-center justify-center">
          <Loader className="w-12 h-12 text-center text-primary animate-spin" />
        </div>
      );

    case "no-rides":
      return <NoRides />;

    case "increase-fare":
      return <FareIncreaseInterface setRideState={setRideState} />;

    case "available-rides":
      return <AvailableRides setRideState={setRideState} />;

    case "rider-details":
      return <AcceptedRiderDetails setRideState={setRideState} />;

    default:
      break;
  }
}

function SendDriverMessage() {
  return (
    <Link href={"/passenger/chat"}>
      <div className="flex items-center bg-background p-3 gap-3">
        <div className="bg-[#B47818]/10 p-3 rounded-full">
          <Image src={MessageIconSquare} alt="message" />
        </div>
        <div className="flex-1">Send driver a message</div>
        <Phone className="fill-foreground/80 stroke-none" />
      </div>
    </Link>
  );
}

function CancelRequest() {
  const router = useRouter();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="text-primary">
          Cancel Request
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-background md:min-w-[45rem] rounded-2xl">
        <div className="w-full h-full relative  py-16">
          <DialogTrigger asChild className="absolute top-4 right-4">
            <button>
              <X />
            </button>
          </DialogTrigger>
          <div className="space-y-6">
            <div className="p-6 rounded-full bg-orange-tint/5 mx-auto w-fit">
              <Image src={Warn} alt="warn" />
            </div>

            <div className="px-2 flex flex-col items-center gap-3">
              <p className="text-center text-2xl font-medium">
                Please enter a reason for cancellation
              </p>
              <div className="w-full max-w-md px-8">
                <Select>
                  <SelectTrigger className="p-2 py-4 rounded-md outline outline-1 outline-foreground/20 focus:outline focus:outline-1 focus:outline-foreground/20">
                    <SelectValue placeholder="reason for cancellation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">No AC</SelectItem>
                    <SelectItem value="2">Karen</SelectItem>
                    <SelectItem value="3">Attack Helicopter</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="w-1/2 mx-auto">
              <Button
                className="w-full"
                onClick={() => {
                  router.replace("/passenger/home");
                }}>
                Cancel Order
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function RiderStatus({
  info,
  title,
  text,
}: {
  title: string;
  info: string;
  text?: string;
}) {
  return (
    <div>
      <div className="flex justify-between">
        <p className="font-medium">{title}</p>
        <span className="text-primary text-sm">{info}</span>
      </div>
      <p className="text-sm text-foreground/60 mt-2">{text}</p>
    </div>
  );
}

import { Star } from "lucide-react";

import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/custom-select";
import { DeliveryDetails } from "@/components/Overlays/DeliveryDetails";
import SuccessModal from "@/components/Overlays/SuccessModal";

function AvailableRides({
  setRideState,
}: {
  setRideState: (state: RideState) => void;
}) {
  const rides = [
    {
      driver: "Mathew Aaron",
      rides: 933,
      rating: 4.5,
      price: 20000,
      eta: 11,
    },
    {
      driver: "Mathew Aaron",
      rides: 933,
      rating: 4.5,
      price: 20000,
      eta: 11,
    },
    {
      driver: "Mathew Aaron",
      rides: 933,
      rating: 4.5,
      price: 20000,
      eta: 11,
    },
    {
      driver: "Mathew Aaron",
      rides: 933,
      rating: 4.5,
      price: 20000,
      eta: 11,
    },
    {
      driver: "Mathew Aaron",
      rides: 933,
      rating: 4.5,
      price: 20000,
      eta: 11,
    },
  ];

  return (
    <div className="mx-auto px-4 max-h-96 flex flex-col">
      <header className="space-y-3 border-b py-3">
        <h3 className="font-medium text-xl">Available Rides</h3>
        <div className="flex items-center text-sm text-foreground mb-4 gap-2">
          {/* <Users className="mr-2 h-5 w-5" /> */}
          <div className=" flex items-center -space-x-5">
            <Image
              src={RiderAvatar}
              alt="rider"
              className="w-12 aspect-square object-cover rounded-full bg-purple-300"
            />
            <Image
              src={RiderAvatar}
              alt="rider"
              className="w-12 aspect-square object-cover rounded-full bg-purple-300"
            />
            <Image
              src={RiderAvatar}
              alt="rider"
              className="w-12 aspect-square object-cover rounded-full bg-purple-300"
            />
          </div>
          <span className="font-medium">and 5 others are viewing request</span>
        </div>
      </header>

      <div className="space-y-4 pt-6 flex-1 overflow-y-auto">
        {rides.map((ride, index) => (
          <div key={index} className="rounded-lg mb-4 overflow-hidden">
            <div className="flex items-center p-4">
              <div className="flex-grow">
                <div className="flex items-center mb-2">
                  <span className="font-semibold mr-2">{ride.driver}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-sm text-foreground/70">
                    {ride.rides} (rides)
                  </div>
                  <div className="flex items-center text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(ride.rating)
                            ? "fill-current"
                            : "stroke-current"
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-foreground/60">
                      {ride.rating}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <div className="text-lg font-bold text-right">
                  NGN {ride.price.toLocaleString()}
                </div>
                <div className="text-sm text-gray-500 text-right">
                  {ride.eta} min away
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 p-1 w-[75%] ml-auto">
              <Button variant={"outline"} className="">
                Decline
              </Button>
              <Button
                onClick={() => setRideState("rider-details")}
                className="">
                Accept
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FareIncreaseInterface({
  setRideState,
}: {
  setRideState: (state: RideState) => void;
}) {
  const [fare, setFare] = useState(30000);

  const decreaseFare = () => {
    setFare(Math.max(0, fare - 1000));
  };

  const increaseFare = () => {
    setFare(Math.min(fare + 1000, 100000)); // Capped at ±N100
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <header className="space-y-3 border-b py-3">
        <h3 className="font-medium text-xl">Available Rides</h3>
        <div className="flex items-center text-sm text-foreground mb-4 gap-2">
          {/* <Users className="mr-2 h-5 w-5" /> */}
          <div className=" flex items-center -space-x-5">
            <Image
              src={RiderAvatar}
              alt="rider"
              className="w-12 aspect-square object-cover rounded-full bg-purple-300"
            />
            <Image
              src={RiderAvatar}
              alt="rider"
              className="w-12 aspect-square object-cover rounded-full bg-purple-300"
            />
            <Image
              src={RiderAvatar}
              alt="rider"
              className="w-12 aspect-square object-cover rounded-full bg-purple-300"
            />
          </div>
          <span className="font-medium">and 5 others are viewing request</span>
        </div>
      </header>
      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-3 flex items-start space-x-3">
        <Info className="h-5 w-5 text-yellow-600 mt-1 flex-shrink-0" />
        <div>
          <p className="text-yellow-900 font-semibold">
            NGN 30,000 might not be sufficient for the delivery riders.
          </p>
          <p className="text-yellow-800 text-sm">
            Kindly consider increasing your suggested price.
          </p>
        </div>
      </div>
      <div className="text-sm text-foreground/60 mb-2">Enter a new offer</div>
      <div className="flex items-center border rounded-lg">
        <button
          onClick={decreaseFare}
          className="p-3 text-xl font-bold text-primary hover:bg-blue-50 transition">
          −
        </button>
        <div className="flex-grow text-center font-semibold text-lg">
          NGN {fare.toLocaleString()}
        </div>
        <button
          onClick={increaseFare}
          className="p-3 text-xl font-bold text-primary hover:bg-blue-50 transition">
          +
        </button>
      </div>
      <div className="border-l-4 border-primary p-3 flex items-center space-x-3">
        <Info className="h-5 w-5 text-foreground/70 flex-shrink-0" />
        <p className="text-foreground/70 text-sm">
          Capped at ±N100 for your convenience!
        </p>
      </div>

      <Button
        onClick={() => {
          setRideState("available-rides");
        }}
        className="w-full py-3 rounded-lg transition">
        Increase Fare
      </Button>
    </div>
  );
}

function AcceptedRiderDetails({}: {
  setRideState: (state: RideState) => void;
}) {
  const [rideArrived, setRideArrived] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setRideArrived(true);
      setTimeout(() => {
        setShowCompleted(true);
      }, 5000);
    }, 5000);
  }, []);

  return (
    <>
      <div className="w-[92%] mx-auto">
        <header className="py-2 border-b border-b-foreground/10">
          <h3>Rider Details</h3>
          <div className="flex items-center gap-2 pb-1 pt-3">
            <div className="rounded-full bg-purple-300">
              <Image
                src={RiderAvatar}
                alt="rider"
                className="w-12 aspect-square object-cover"
              />
            </div>
            <div className="w-full">
              <div className="flex items-center justify-between font-medium">
                <p className="">Matthew Aaron</p>
                <p>EPE248UH</p>
              </div>
              <div className="flex items-center text-foreground/70 w-full text-sm">
                <div className="flex items-center gap-2">
                  <span>933 (rides)</span>
                  <div className="">
                    <Image src={StarRating} alt="rating" />
                  </div>
                  <span>4.5</span>
                </div>
                <span className="ml-auto">Grey BAJAJ</span>
              </div>
            </div>
          </div>
        </header>
        <div className="space-y-4 py-3">
          <div className="space-y-2">
            <RiderStatus
              info={
                rideArrived ? "Your Rider Has Arrived🛵" : "EST Arrival 14mins"
              }
              title={
                rideArrived
                  ? "Waiting time : 10mins"
                  : "Your driver is on the way"
              }
              text={
                rideArrived
                  ? "Mathew has arrived and is ready to assist you with your delivery. Please head to the pickup point."
                  : undefined
              }
            />
            {rideArrived && (
              <AnimateInOut
                show={rideArrived}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="w-full flex items-center justify-center py-6">
                <Image src={CircularProgressBar} alt="progress" />
              </AnimateInOut>
            )}
            <SendDriverMessage />
          </div>
          <div className="space-y-6">
            <AnimateInOut
              show={!rideArrived}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              className="space-y-6 overflow-y-hidden">
              <div className="flex items-center gap-3 text-primary">
                <svg
                  width="24"
                  height="19"
                  viewBox="0 0 24 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12.125 13.25H9.875C8.02955 13.2493 6.21901 13.753 4.63911 14.7068C3.05921 15.6605 1.77005 17.0279 0.911002 18.6612C0.886855 18.3581 0.874846 18.0541 0.875001 17.75C0.875001 11.5366 5.91163 6.5 12.125 6.5V0.875L23.375 9.875L12.125 18.875V13.25Z"
                    fill="#00ABFD"
                  />
                </svg>

                <div className="flex-1">Share ride details</div>
                <ChevronRight className="" />
              </div>
              <div className="flex items-center gap-3 text-primary">
                <svg
                  width="22"
                  height="25"
                  viewBox="0 0 22 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M11.25 15.5335V24.25H2.90764e-07C-0.000348878 22.8762 0.313786 21.5206 0.918336 20.2871C1.52289 19.0535 2.4018 17.9747 3.48774 17.1333C4.57368 16.2919 5.83782 15.7103 7.1833 15.433C8.52877 15.1557 9.91987 15.1901 11.25 15.5335V15.5335ZM9 14.125C5.27062 14.125 2.25 11.1044 2.25 7.375C2.25 3.64562 5.27062 0.625 9 0.625C12.7294 0.625 15.75 3.64562 15.75 7.375C15.75 11.1044 12.7294 14.125 9 14.125ZM15.75 18.625V15.25H18V18.625H21.375V20.875H18V24.25H15.75V20.875H12.375V18.625H15.75Z"
                    fill="#00ABFD"
                  />
                </svg>

                <div className="flex-1">Request a new rider</div>
                <ChevronRight className="" />
              </div>
            </AnimateInOut>
            <div className="pt-2">
              <CancelRequest />
            </div>
            <div className="pt-2">
              <SuccessModal>
                <Button>Complete Order</Button>
              </SuccessModal>
            </div>
          </div>
        </div>
      </div>

      {showCompleted && <SuccessModal />}
    </>
  );
}

function NoRides() {
  return (
    <Image
      src={NoDrivers}
      alt="no-drivers"
      className="object-cover w-full h-full"
    />
  );
}
