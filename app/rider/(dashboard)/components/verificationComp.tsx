"use client";

import Image from "next/image";
import { OrdersPage } from "./orders-page";
import { HeaderCard } from "./header-card";
import { useEffect, useState } from "react";
import loading from "@/assets/loading.svg";
import Pagination from "@/components/Pagination";

export const VerificationPage = () => {
  const [isVerifying, setIsVerifying] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsVerifying(false);
    }, 3000);
  }, []);
  return (
    <div className=" lg:px-[43px] px-[20px] ">
      <HeaderCard />
      {isVerifying ? (
        <div className=" pb-[153px] mt-[115px]">
          <div className=" flex mx-auto lg:flex-row flex-col w-fit items-center  gap-[98px]">
            <Image src={loading} alt="verification" width={294} height={291} />
            <div className="flex flex-col gap-2.5 max-w-[437px]">
              <p className=" text-[26px] text-center lg:text-left  font-semiBold leading-[36px] tracking-[-6%] text-[#475467]">
                Verification in Progress
              </p>
              <p className=" text-[18px] text-center lg:text-left  font-normal leading-[25px] tracking-[-6%] text-[#8A8A8C] ">
                Hang tight! We’re still reviewing your documents. Once approved,
                you’ll be all set to start earning with Apago.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <>
          <OrdersPage />
          <Pagination />
        </>
      )}
    </div>
  );
};
