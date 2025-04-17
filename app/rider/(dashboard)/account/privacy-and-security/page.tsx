"use client";
export const dynamic = "force-dynamic";
import FormInput from "@/components/FormInput";
import SuccessModal from "@/components/Overlays/SuccessModal";
import { Lock } from "@/components/svgs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";
import React, { SyntheticEvent, useCallback, useState } from "react";

export default function PrivacyAndSecurity() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = useCallback((e: SyntheticEvent) => {
    e.preventDefault();
    // Handle form
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className="py-8 px-6 space-y-6 md:max-w-96 mx-auto mt-12 my-8">
      <div className="grid gap-2">
        <Label className="font-medium text-sm" htmlFor="old_password">
          Old Password
        </Label>
        <FormInput
          wrapperClassName={(isFocused) =>
            cn(!isFocused && "ring-1 ring-foreground/20")
          }
          leading={<Lock />}
          id="old_password"
          type="password"
          placeholder=""
          onChange={(e) => setOldPassword(e.target.value)}
          value={oldPassword}
        />
      </div>

      <div className="grid gap-2">
        <Label className="font-medium text-sm" htmlFor="new_password">
          New Password <small className="text-foreground/50">(optional)</small>
        </Label>
        <FormInput
          wrapperClassName={(isFocused) =>
            cn(!isFocused && "ring-1 ring-foreground/20")
          }
          leading={<Lock />}
          id="new_password"
          type="password"
          placeholder=""
          onChange={(e) => setNewPassword(e.target.value)}
          value={newPassword}
        />
      </div>

      <div className="grid gap-2">
        <Label className="font-medium text-sm" htmlFor="confirmPassword}">
          Confirm Password{" "}
          <small className="text-foreground/50">(optional)</small>
        </Label>
        <FormInput
          wrapperClassName={(isFocused) =>
            cn(!isFocused && "ring-1 ring-foreground/20")
          }
          leading={<Lock />}
          id="confirmPassword}"
          type="confirmPassword"
          placeholder=""
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
        />
      </div>

      <div className="flex items-center gap-3">
        <Button variant={"outline"}>Discard</Button>

        <SuccessModal
          title="Profile Updated"
          message="Changes to your profile has been updated successfully"
          showButton={false}>
          <Button>Update Password</Button>
        </SuccessModal>
      </div>
    </form>
  );
}
