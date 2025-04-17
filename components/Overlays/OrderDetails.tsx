import { Actions, DetailsLayout } from "@/app/shared";
import { PropsWithChildren, useState } from "react";
import { Label } from "../ui/label";
import FormInput from "../FormInput";
import { cn } from "@/lib/utils";
import CountryPicker from "../CountryPicker";
import { CustomSelect } from "../ui/custom-select";
import { CustomTextArea } from "../CustomTextarea";
import { InfoIcon, WarnIcon2 } from "@/lib/icons";
import { Button } from "../ui/button";
import { Dot, X } from "lucide-react";
import DynamicOverlay from "./DynamicOverlay";
import DynamicTrigger from "./DynamicTrigger";

export function OrderDetails({
  actions,
  children,
  onOpenChange,
  open,
}: PropsWithChildren<{
  onOpenChange?(open: boolean): void;
  open?: boolean;
  actions?: Actions;
}>) {
  const [senderPhone, setSenderPhone] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");
  const [packageCategory, setPackageCategory] = useState("");
  const [packageDescription, setPackageDescription] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    if (name === "senderPhone") {
      setSenderPhone(value.replace(/^0/, "")); 
    }
    if (name === "recipientPhone") {
      setRecipientPhone(value.replace(/^0/, "")); 
    }
  };

    sessionStorage.setItem("senderPhone", `+234${senderPhone}`);
    sessionStorage.setItem("recipientPhone", `+234${recipientPhone}`);
    sessionStorage.setItem("packageCategory", packageCategory);
    sessionStorage.setItem("packageDescription", packageDescription);
   

  return (
    <DynamicOverlay onOpenChange={onOpenChange} open={open} trigger={children}>
      <DetailsLayout title="Order Details" hide={() => actions?.close?.()}>
        <div className="py-4 space-y-8">
          <div className="grid gap-2">
            <Label className="font-light" htmlFor="senderPhone">
              {"Sender's"} Phone Number
            </Label>
            <FormInput
              wrapperClassName={(isFocused) =>
                cn(!isFocused && "ring-1 ring-foreground/20")
              }
              leading={
                <div className="w-16 overflow-visible border-r pr-2">
                  +234
                </div>
              }
              id="senderPhone"
              type="phone"
              name="senderPhone"
              placeholder="080 **** ****"
              onChange={handleChange}
              value={senderPhone}
            />
          </div>

          <div className="grid gap-2">
            <Label className="font-light" htmlFor="recipientPhone">
              {"Recipient's"} Phone Number
            </Label>
            <FormInput
              wrapperClassName={(isFocused) =>
                cn(!isFocused && "ring-1 ring-foreground/20")
              }
              leading={
                <div className="w-16 overflow-visible border-r pr-2">
                   +234
                </div>
              }
              id="recipientPhone"
              name="recipientPhone"
              type="phone"
              placeholder="080 **** ****"
              onChange={handleChange}
              value={recipientPhone}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="packageCategory">Package Category</Label>
            <CustomSelect
              className="outline !outline-1 !outline-foreground/20 shadow-sm rounded-md py-3 px-2"
              isLoading={false}
              value={packageCategory}
              onSelect={(val) => setPackageCategory(val as string)}
              placeholder="Select Category"
              id="packageCategory"
              name="packageCategory"
              items={[
                { name: "Electronics", id: "1" },
                { name: "Clothings", id: "2" },
                { name: "Shoes", id: "3" },
                { name: "Documents", id: "4" },
                { name: "Products", id: "5" },
                { name: "Computer Accessories", id: "6" },
                { name: "Phones", id: "7" },
                { name: "Food", id: "8" },
                { name: "Others", id: "9" },
              ]}
            />
          </div>
          <div className="space-y-2">
            <Label className="font-light">Package description (Optional)</Label>
            <CustomTextArea
              placeholder="Enter details of items to be delivered"
              className="!w-full"
              onChange={(e) => setPackageDescription(e.target.value)}
              value={packageDescription}
            />
            <div className="flex items-center gap-2 text-gray-400 font-normal text-sm">
              <InfoIcon className="fill-gray-400 stroke-background" />
              <span className="">
                please make sure your package complies with our guidelines
              </span>
            </div>
          </div>

          <div className="pt-6 md:pt-3">
            <div>
              <DynamicTrigger>
                <Button
                  onClick={() => {
                    actions?.switchPage?.("DELIVERY_DETAILS");
                    // actions?.close();
                  }}
                  className="">
                  Save Details
                </Button>
              </DynamicTrigger>
            </div>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="rounded-xl bg-orange-tint/10">
            <div className="w-[90%] mx-auto flex gap-3 py-4">
              <div className="text-orange-tint">
                <WarnIcon2 className="" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="font-semibold">Package Guidelines</p>
                  <button>
                    <X />
                  </button>
                </div>
                <div className="space-y-3 w-[98%] ml-auto text-sm">
                  <div className="flex">
                    <Dot className="" />
                    <p>
                      Clearly label fragile items and provide extra cushioning
                      for protection.
                    </p>
                  </div>

                  <div className="flex">
                    <Dot className="" />
                    <p>
                      Properly wrap and seal your package to prevent damage
                      during transit.
                    </p>
                  </div>

                  <div className="flex">
                    <Dot className="" />
                    <p>
                      Ensure your parcel fits within the {"app's"} specified
                      size and weight restrictions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DetailsLayout>
    </DynamicOverlay>
  );
}
