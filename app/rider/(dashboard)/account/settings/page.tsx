"use client";
export const dynamic = "force-dynamic";
import CountryPicker from "@/components/CountryPicker";
import FormInput from "@/components/FormInput";
import SuccessModal from "@/components/Overlays/SuccessModal";
import { Button } from "@/components/ui/button";
import { User } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";
import { Mail } from "lucide-react";
import React, { SyntheticEvent, useCallback, useState } from "react";

const ProfileSettings: React.FC = () => {
  const [name, setName] = useState("Taiwo");
  const [phoneNumber, setPhoneNumber] = useState("+234-1555-000-0000");
  const [email, setEmail] = useState("taiwo@gmail.com");
  const [openModal, setOpenModal] = useState(false);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  const handleOpenModal = useCallback((state: boolean) => {
    setOpenModal(state);
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className="py-8 px-6 space-y-6 md:max-w-96 mx-auto my-8">
      <div className="flex items-start gap-3 border-b border-b-foreground/20 py-6">
        <div className="w-16 h-16 rounded-full bg-gray-200 shrink-0">
          <User />
        </div>
        <div>
          <div className="flex flex-col items-start gap-2">
            <span className="">Upload Image</span>
            <small>Min 400x400px, PNG or JPEG</small>
            <>
              <label
                htmlFor="image"
                className="shadow shadow-foreground/20 px-3 py-1 rounded-md outline outline-1 outline-foreground/10">
                Upload
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                hidden
                multiple={true}
                onInput={(e) => {
                  console.log(e);
                }}
              />
            </>
          </div>
        </div>
      </div>
      <div className="grid gap-2">
        <Label className="font-medium text-sm" htmlFor="name">
          Name
        </Label>
        <FormInput
          wrapperClassName={(isFocused) =>
            cn(!isFocused && "ring-1 ring-foreground/20")
          }
          leading={<User />}
          id="name"
          type="name"
          placeholder="080 **** ****"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </div>

      <div className="grid gap-2">
        <Label className="font-medium text-sm" htmlFor="phoneNumber">
          {"Recipient's"} Phone Number
        </Label>
        <FormInput
          wrapperClassName={(isFocused) =>
            cn(!isFocused && "ring-1 ring-foreground/20")
          }
          leading={
            <div className="w-16 overflow-visible border-r pr-2">
              <CountryPicker />
            </div>
          }
          id="phoneNumber"
          type="phone"
          placeholder="080 **** ****"
          onChange={(e) => setPhoneNumber(e.target.value)}
          value={phoneNumber}
        />
      </div>

      <div className="grid gap-2">
        <Label className="font-medium text-sm" htmlFor="email">
          Email
        </Label>
        <FormInput
          wrapperClassName={(isFocused) =>
            cn(!isFocused && "ring-1 ring-foreground/20")
          }
          leading={<Mail />}
          id="email"
          type="email"
          placeholder="080 **** ****"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </div>

      <div className="flex md:flex-col items-center gap-3">
        <Button variant={"outline"}>Discard</Button>
        <Button onClick={() => handleOpenModal(true)}>Apply Changes</Button>
      </div>
      <SuccessModal
        title="Profile Updated"
        message="Changes to your profile has been updated successfully"
        showButton={false}
        isOpen={openModal}
        onClose={handleOpenModal}
      />
    </form>
  );
};

export default ProfileSettings;
