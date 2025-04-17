import clsx from "clsx";
import Image from "next/image";
import box from "../../../../../assets/box.png";
import { Button } from "@/components/ui/button";
import SuccessModal from "@/components/Overlays/SuccessModal";

export const ConfirmPickupModal = ({
  mainText,
  desc,
  modalOpen,
  setModalOpen,
  cancelFn,
}: {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  mainText: string;
  desc: string;
  continueFn: () => void;
  cancelFn: () => void;
}) => {
  console.log("we dey here");
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={clsx(
        "fixed h-screen z-[100000] top-0 left-0 right-0 bottom-0 w-full bg-[#020D1730] flex items-center justify-center",
        modalOpen ? "block" : "hidden"
      )}>
      <div className=" w-[347px] lg:w-[652px]  h-fit lg:h-[389px]  rounded-[16px] bg-[#fff] py-5  flex flex-col items-center justify-center">
        <Image src={box} alt="confirm-pickup" width={171} height={169} />
        <p className="text-[26px] my-2.5  leading-[36px] tracking-[-6%] text-[#475467] font-semibold">
          {mainText}
        </p>
        <p className="text-[18px] lg:max-w-[436px] max-w-[239px] mb-6 text-center leading-[24px] tracking-[-6%] text-[#8A8A8C] font-normal">
          {desc}
        </p>
        <div className="flex flex-col lg:flex-row w-full lg:px-5 px-[14px] items-center justify-center gap-4">
          <Button
            onClick={() => {
              cancelFn();
              setModalOpen(false);
            }}
            className="text-[16px] bg-white text-[#525866] w-full border-[0.73px] border-[#00ABFD] rounded-[6px] ">
            Cancel
          </Button>
          <SuccessModal>
            <Button
              onClick={() => {
                // continueFn();
                setModalOpen(false);
              }}
              className=" w-full ">
              Confirm
            </Button>
          </SuccessModal>
        </div>
      </div>
    </div>
  );
};
