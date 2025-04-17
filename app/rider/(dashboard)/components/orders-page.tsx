"use client";
export const dynamic = "force-dynamic";

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ChevronRight,
  Clock,
  Clock12,
  Info,
  MapPinPlusInside,
  MessageSquareMore,
  Phone,
  Plus,
  RefreshCcw,
  X,
} from "lucide-react";
import clsx from "clsx";
import Image from "next/image";
import box from "../../../../assets/box.png";
import map from "../../../../assets/map.png";
import bike from "../../../../assets/bike.svg";
import user from "../../../../assets/temi.png";
import { Button } from "@/components/ui/button";
import boxopen from "../../../../assets/box-open.png";
import { useParams, useRouter } from "next/navigation";
import { ConfirmPickupModal } from "./modals/confirm-pickup";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export const OrdersPage = () => {
  const [customerNotified, setCustomerNotified] = useState(false);
  const params = useParams();
  const router = useRouter();
  const orders = true;
  const [activeTab, setActiveTab] = useState("available");
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  useEffect(() => {
    // Set the active tab based on the URL parameter
    if (params.tab) {
      setActiveTab(params.tab as string);
    }
  }, [params.tab]);

  const handleTabChange = (tab: string) => {
    // Update the URL with the new tab
    router.push(`/rider/home?tab=${tab}`);
    // Update the active tab state
    setActiveTab(tab);
  };

  const [activeOrder, setActiveOrder] = useState<{
    id: number;
    pickup_location: string;
    dropoff_location: string;
    order_id: string;
    order_created: string;
    order_fare: string;
    pickup_time: string;
    dropoff_time: string;
    status: string;
  } | null>(null);

  const [mockOrders, setMockOrders] = useState([
    {
      id: 1,
      pickup_location: "Location street",
      dropoff_location: "Location street",
      order_id: "ID23456",
      order_created: "20mins ago",
      order_fare: "NGN30,000",
      pickup_time: "17mins",
      dropoff_time: "17mins",
      status: "Awaiting Action",
    },

    {
      id: 2,
      pickup_location: "Location street",
      dropoff_location: "Location street",
      order_id: "ID23456",
      order_created: "20mins ago",
      order_fare: "NGN30,000",
      pickup_time: "17mins",
      dropoff_time: "17mins",
      status: "Awaiting Action",
    },
    {
      id: 3,
      pickup_location: "Location street",
      dropoff_location: "Location street",
      order_id: "ID23456",
      order_created: "20mins ago",
      order_fare: "NGN30,000",
      pickup_time: "17mins",
      dropoff_time: "17mins",
      status: "Awaiting Action",
    },
  ]);

  // return <EmptyOrderState />;

  return (
    <div className="pb-[153px] mt-[115px]">
      {/* <HeaderCard /> */}
      <div className="flex w-full border-b border-[#E2E4E9] space-x-6 _px-[14px] justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => handleTabChange("available")}
            className={` px-4 py-2 font-medium text-[16px] leading-[20px] tracking-[-6%] ${
              activeTab === "available"
                ? " border-b border-[#00ABFD] text-[#1E2023] font-medium leading-5 tracking-[-6%]"
                : "text-[#475467] "
            }`}>
            Available Orders
          </button>
          <button
            onClick={() => handleTabChange("completed")}
            className={`px-4 py-2 font-medium text-[16px] leading-[20px] tracking-[-6%]   ${
              activeTab === "completed"
                ? " border-b border-[#00ABFD] text-[#1E2023] font-medium leading-5 tracking-[-6%]"
                : "text-[#475467] font-medium text-[16p"
            }`}>
            Ongoing Orders
          </button>
        </div>
        <button className="flex items-center gap-2 text-primary">
          <RefreshCcw />
          Refresh
        </button>
      </div>

      {!orders ? (
        <EmptyOrderState />
      ) : (
        <div className="flex mt-[51px] flex-col gap-4">
          {mockOrders.map((order, index) => (
            <SingleOrderCard
              setActiveOrder={setActiveOrder}
              setDetailsModalOpen={setDetailsModalOpen}
              key={index}
              case2={activeTab}
              order={order}
            />
          ))}
        </div>
      )}

      <OrderDetailsModal
        setCustomerNotified={setCustomerNotified}
        customerNotified={customerNotified}
        activeOrder={activeOrder}
        setActiveOrder={setActiveOrder}
        setDetailsModalOpen={setDetailsModalOpen}
        isOpen={detailsModalOpen}
      />
    </div>
  );
};

export const SingleOrderCard = ({
  case2,
  setDetailsModalOpen,
  order,
  setActiveOrder,
}: {
  case2: string;
  setDetailsModalOpen: (value: boolean) => void;
  order: {
    id: number;
    pickup_location: string;
    dropoff_location: string;
    order_id: string;
    order_created: string;
    order_fare: string;
    pickup_time: string;
    dropoff_time: string;
    status: string;
  };
  setActiveOrder: Dispatch<
    SetStateAction<{
      id: number;
      pickup_location: string;
      dropoff_location: string;
      order_id: string;
      order_created: string;
      order_fare: string;
      pickup_time: string;
      dropoff_time: string;
      status: string;
    } | null>
  >;
}) => {
  return (
    <div className="flex lg:flex-row w-full flex-col items-start py-[15px] border-b border-[#F1F1F1] justify-between">
      {/* first section */}
      <div className="w-full justify-between lg:pr-[75px] pr-0 flex items-center">
        <div className="flex gap-[30px]">
          <div className="size-[64px] flex items-center justify-center rounded-[2px] bg-[#F3F9FF]">
            <Image src={boxopen} alt="box" width={43} height={43} />
          </div>
          <div className="flex flex-col gap-5 justify-between w-full">
            <div className="flex flex-col gap-1">
              <p className="text-[16px] leading-5 tracking-[-6%] text-[#475467] font-medium">
                Pickup Location
              </p>
              <p className="text-[20px] leading-[22px] tracking-[-6%] text-[#1E2023] font-medium">
                {order.pickup_location}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-[16px] leading-5 tracking-[-6%] text-[#475467] font-medium">
                Drop Off Location
              </p>
              <p className="text-[20px] leading-[22px] tracking-[-6%] text-[#1E2023] font-medium">
                {order.dropoff_location}
              </p>
            </div>

            <p className="text-[14px] gap-2.5 flex items-center leading-[15px] tracking-[-6%] text-[#8A8A8C] font-normal">
              <span className="text-[14px] leading-5 tracking-[-6%] text-[#8A8A8C] font-normal">
                Order Created {order.order_created}
              </span>
              <span>ID{order.order_id}</span>
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <p className="text-[22px] leading-[2]">{order.order_fare}</p>

          <div className="flex mt-[15px] mb-[18px] items-center gap-2.5">
            <div className="rounded-[6px] w-[75px] h-[24px] gap-[6px] flex justify-center items-center bg-[#EFFAF6]">
              <Clock color="#38C793" size={12} />
              <span className="text-[14px] leading-[16px] tracking-[-6%] text-[#38C793] font-medium">
                {order.pickup_time}
              </span>
            </div>
            <div className="rounded-[6px] w-[75px] h-[24px] gap-[6px] flex justify-center items-center bg-[#EFECFF]">
              <Clock color="#2B1664" size={12} />
              <span className="text-[14px] leading-[16px] tracking-[-6%] text-[#2B1664] font-medium">
                {order.dropoff_time}
              </span>
            </div>
          </div>

          <p className="flex gap-[14px] items-center">
            <Info size={20} fill="#475467" color="white" />
            <span className="text-[16px] leading-[18px] tracking-[-6%] text-[#475467]">
              Document
            </span>
          </p>
          <button className="flex mt-5 items-center gap-3">
            <Plus size={20} color="#00ABFD" />
            <span className="text-[16px] leading-[18px] tracking-[-6%] text-[#00ABFD]">
              Send new Offer
            </span>
          </button>
        </div>
      </div>

      {/* second section */}
      <div className="flex w-full lg:w-[231px] flex-row-reverse mt-6 lg:mt-auto lg:flex-col gap-5">
        {case2 === "available" ? (
          <>
            <Button className="bg-[#00ABFD] h-[51px] text-white">Accept</Button>
            <Button className="bg-[#fff] text-[#00ABFD]">Reject</Button>
          </>
        ) : (
          <div className="flex flex-col gap-4 items-start">
            <div
              onClick={() => {
                setActiveOrder(order);
                setDetailsModalOpen(true);
              }}
              className=" w-fit cursor-pointer flex items-center gap-1 text-[#00ABFD]">
              See Details <ChevronRight size={20} color="#00ABFD" />
            </div>
            {order.status === "Awaiting Action" && <AwaitingActionTag />}
          </div>
        )}
      </div>
    </div>
  );
};

export const EmptyOrderState = () => {
  return (
    <div className=" pb-[153px] mt-[115px]">
      <div className=" flex mx-auto lg:flex-row flex-col w-fit items-center  gap-[98px]">
        <Image src={box} alt="verification" width={294} height={291} />
        <div className="flex flex-col gap-2.5 max-w-[437px]">
          <p className=" text-[26px] text-center lg:text-left  font-semiBold leading-[36px] tracking-[-6%] text-[#475467]">
            No Orders Yet! 📭
          </p>
          <p className=" text-[18px] text-center lg:text-left  font-normal leading-[25px] tracking-[-6%] text-[#8A8A8C] ">
            No orders available at the moment. Stay ready—new deliveries could
            pop up any second!
          </p>
        </div>
      </div>
    </div>
  );
};

export const OrderDetailsModal = ({
  setCustomerNotified,
  customerNotified,
  activeOrder,
  isOpen,
  setDetailsModalOpen,
  setActiveOrder,
}: {
  setCustomerNotified: (value: boolean) => void;
  activeOrder: {
    id: number;
    pickup_location: string;
    dropoff_location: string;
    order_id: string;
    order_created: string;
    order_fare: string;
    pickup_time: string;
    dropoff_time: string;
    status: string;
  } | null;
  setActiveOrder: Dispatch<
    SetStateAction<{
      id: number;
      pickup_location: string;
      dropoff_location: string;
      order_id: string;
      order_created: string;
      order_fare: string;
      pickup_time: string;
      dropoff_time: string;
      status: string;
    } | null>
  >;
  customerNotified: boolean;
  isOpen: boolean;
  setDetailsModalOpen: (value: boolean) => void;
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "0px";
    } else {
      document.body.style.overflow = "auto";
      // document.body.style.paddingRight = "17px";
    }
  }, [isOpen]);

  const [confirmPickupModalOpen, setConfirmPickupModalOpen] = useState(false);
  const router = useRouter();
  // console.log(activeOrder);

  return (
    <div
      onClick={() => setDetailsModalOpen(false)}
      className={clsx(
        "fixed h-screen w-screen overflow-hidden top-0 left-0 bottom-0 right-0 transition-all duration-300 ease-in-out z-[100] bg-[#020D1730] flex items-center justify-center",
        isOpen ? "left-0 opacity-100" : "left-full opacity-0"
      )}>
      {/* <div className="absolute lg:w-[30rem] w-[335px] mx-auto bg-red-500 left-1/2 -translate-x-1/2 _lg:left-full lg:translate-x-1/2 lg:right-0 top-0 bottom-0 h-[90vh] my-auto lg:h-screen overflow-y-scroll flex flex-col"> */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[92%] md:w-[30rem] right-0 overflow-y-scroll  no-scrollbar  absolute bg-background h-[90%] md:h-full flex flex-col cursor-default">
        <div className="h-fit pb-[17px]">
          <div className="flex sticky top-0  bg-white border-b border-[#E2E4E9] px-4 py-5 items-center justify-between">
            <p className="text-[18px] leading-[25px] tracking-[-6%] text-[#1E2023] font-medium">
              Order Details
            </p>
            <X
              className="cursor-pointer"
              onClick={() => setDetailsModalOpen(false)}
              size={24}
              color="#525866"
            />
          </div>

          <div className="px-[15px] py-3">
            <Image
              src={map}
              alt="map"
              width={370}
              height={280}
              className=" w-full"
            />
          </div>

          <div className="bg-white mt-10 px-[18px] max-w-md mx-auto">
            <h2 className="text-[11px] w-fit mb-5 leading-4 font-medium text-primary px-2 py-1.5 rounded-full border border-primary">
              CUSTOMER DETAILS
            </h2>
            <div className="flex mb-[60px] border-b-[0.84px] border-[#F1F1F1 pb-2 items-center justify-between">
              <div className="flex items-center gap-3">
                <Image
                  src={user}
                  alt="user"
                  width={47}
                  height={47}
                  className="rounded-full"
                />
                <span className="text-[20px] font-medium text-[#1E2023]">
                  Temi Couture
                </span>
              </div>
              <div className=" flex items-center gap-5">
                <Phone size={25} color="#1D2939" />
                <MessageSquareMore size={25} color="#1D2939" />
              </div>
            </div>
            <div className="w-full flex items-center  justify-end">
              {" "}
              {activeOrder?.status === "Awaiting Action" && (
                <AwaitingActionTag className="ml-auto" />
              )}
              {activeOrder?.status === "Confirm Pick Up" && (
                <HeadToPickUpTag className="ml-auto" />
              )}
            </div>

            <div className="space-y-4 mb-[50px] text-gray-600">
              <p className="flex items-center justify-between">
                <span className=" text-[14px]  leading-5  tracking-[-6%] text-[#525866]">
                  Order ID:
                </span>
                <span className="text-[14px] font-medium text-right leading-[20px] tracking-[-6%] text-[#0A0D14] ">
                  ID23456
                </span>
              </p>
              <p className="flex items-center justify-between">
                <span className="text-[14px] leading-5  tracking-[-6%] text-[#525866]">
                  Order Fare:
                </span>
                <span className="text-[14px] font-medium text-right leading-[20px] tracking-[-6%] text-[#0A0D14] ">
                  NGN 30,000
                </span>
              </p>
              <p className="flex items-center justify-between">
                <span className="text-[14px] leading-5  tracking-[-6%] text-[#525866]">
                  Pickup Location:
                </span>
                <span className="text-[14px] font-medium text-right leading-[20px] tracking-[-6%] text-[#0A0D14] ">
                  Hebert Macauley Road
                </span>
              </p>
              <p className="flex items-center justify-between">
                <span className="text-[14px] leading-5  tracking-[-6%] text-[#525866]">
                  Drop Off Location:
                </span>
                <span className="text-[14px] font-medium text-right leading-[20px] tracking-[-6%] text-[#0A0D14] ">
                  Nnamdi Azikwe Road, Ikeja, Lagos
                </span>
              </p>
              <p className="flex items-center justify-between">
                <span className="text-[14px] leading-5  tracking-[-6%] text-[#525866]">
                  Number of Stops:
                </span>
                <span className="text-[14px] font-medium text-right leading-[20px] tracking-[-6%] text-[#0A0D14] ">
                  0
                </span>
              </p>
              <p className="flex items-center justify-between">
                <span className="text-[14px] leading-5  tracking-[-6%] text-[#525866]">
                  Order Description:
                </span>
                <span className="text-[14px] font-medium text-right leading-[20px] tracking-[-6%] text-[#0A0D14] ">
                  Document
                </span>
              </p>
              <p className="flex items-center justify-between">
                <span className="text-[14px] leading-5  tracking-[-6%] text-[#525866]">
                  EST Time of Arrival
                </span>
                <div className="rounded-[6px] w-[75px] h-[24px] gap-[6px] flex justify-center items-center bg-[#EFFAF6]">
                  <Clock color="#38C793" size={12} />
                  <span className="text-[14px] leading-[16px] tracking-[-6%] text-[#38C793] font-medium">
                    17mins
                  </span>
                </div>
              </p>
              <p className="flex items-center justify-between">
                <span className="text-[14px] leading-5  tracking-[-6%] text-[#525866]">
                  EST Distance
                </span>
                <div className="rounded-[6px] w-[75px] h-[24px] gap-[6px] flex justify-center items-center bg-[#EFECFF]">
                  <Clock color="#2B1664" size={12} />
                  <span className="text-[14px] leading-[16px] tracking-[-6%] text-[#2B1664] font-medium">
                    14.5km
                  </span>
                </div>
              </p>
            </div>
            <Button
              onClick={() => {
                if (customerNotified) {
                  setConfirmPickupModalOpen(true);
                } else {
                  setActiveOrder((prev: any) => ({
                    ...prev,
                    status: "Confirm Pick Up",
                  }));
                  setTimeout(() => {
                    setCustomerNotified(true);
                  }, 1000);
                }
              }}
              disabled={
                activeOrder?.status === "Confirm Pick Up" && !customerNotified
              }
              className={clsx(
                "bg-[#00ABFD] text-white",
                activeOrder?.status === "Confirm Pick Up" &&
                  !customerNotified &&
                  "bg-opacity-30"
              )}>
              {activeOrder?.status === "Confirm Pick Up"
                ? "Confirm Pick Up"
                : activeOrder?.status === "Awaiting Action"
                ? "Head to Pick up"
                : "Confirm Pick Up"}
            </Button>
            <Button
              onClick={() => {
                setDetailsModalOpen(false);
              }}
              className="bg-[#fff] mt-[14px] text-[#00ABFD] hover:text-white">
              Cancel Request
            </Button>
          </div>

          {customerNotified && <ArrivalNotification />}
        </div>
      </div>
      <ConfirmPickupModal
        modalOpen={confirmPickupModalOpen}
        setModalOpen={setConfirmPickupModalOpen}
        mainText="Confirm Pick up?"
        desc="Please ensure you have verified the package details before confirming pickup."
        continueFn={() => {
          router.push(`/rider/home/order/${activeOrder?.id}`);
        }}
        cancelFn={() => {}}
      />
    </div>
  );
};

export const AwaitingActionTag = ({ className }: { className?: string }) => {
  return (
    <div
      className={clsx(
        "rounded-[6px] _mr-auto mb-4 px-2 py-1  w-fit h-[24px] gap-[6px] flex justify-center items-center bg-[#FEF3EB]",
        className
      )}>
      <Clock color="white" fill="#F17B2C" size={16} />
      <span className="text-[14px] leading-[16px] tracking-[-6%] text-[#F17B2C] font-medium">
        Awaiting Action
      </span>
    </div>
  );
};
export const HeadToPickUpTag = ({ className }: { className?: string }) => {
  return (
    <div
      className={clsx(
        "rounded-[6px] ml-auto mb-4 px-2 py-1  w-fit h-[24px] gap-[6px] flex justify-center items-center bg-[#EFECFF]",
        className
      )}>
      <Image src={bike} alt="bike" width={16} height={16} />
      <span className="text-[14px] leading-[16px] tracking-[-6%] text-[#2B1664] font-medium">
        Heading to pickup
      </span>
    </div>
  );
};

const ArrivalNotification = () => {
  return (
    <div className="flex mt-[50px] items-center justify-center">
      {/* Circular Progress Indicator */}
      <div className="relative w-[70px] h-[70px] flex items-center justify-center">
        <svg className="w-full h-full" viewBox="0 0 36 36">
          <circle
            className="text-gray-300"
            stroke="currentColor"
            fill="transparent"
            strokeWidth="3"
            cx="18"
            cy="18"
            r="16"
          />
          <circle
            className="text-[#F17B2C]"
            stroke="currentColor"
            fill="transparent"
            strokeWidth="3"
            strokeDasharray="100"
            strokeDashoffset="75"
            strokeLinecap="round"
            cx="18"
            cy="18"
            r="16"
          />
        </svg>
        <span className="absolute text-xs font-bold text-gray-700">5mins</span>
      </div>

      {/* Text Content */}
      <div className="ml-3 max-w-[153px] text-gray-700">
        <p className="text-[14px] leading-[19px] tracking-[-6%] mb-1.5 text-[#1E2023] font-medium">
          Customer has been notified of your arrival
        </p>
        <p className="text-[14px] leading-[16px] tracking-[-6%] text-[#00ABFD] font-medium">
          Waiting time: 10mins
        </p>
      </div>
    </div>
  );
};
