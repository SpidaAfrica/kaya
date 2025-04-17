"use client";

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
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();

      if (!oldPassword || !newPassword || !confirmPassword) {
        alert("Please fill all fields");
        return;
      }

      if (newPassword !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      try {
        const res = await fetch("https://jbuit.org/api/change-password.php", {
          method: "POST",
          body: new URLSearchParams({
            user_id: sessionStorage.getItem("userId") || "1",
            old_password: oldPassword,
            new_password: newPassword,
            confirm_password: confirmPassword,
          }),
        });

        const data = await res.json();

        if (data.success) {
          setShowSuccess(true);
          setOldPassword("");
          setNewPassword("");
          setConfirmPassword("");
        } else {
          alert("Error: " + data.message);
        }
      } catch (err) {
        console.error("Failed to change password", err);
        alert("Something went wrong");
      }
    },
    [oldPassword, newPassword, confirmPassword]
  );

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="py-8 px-6 space-y-6 md:max-w-96 mx-auto mt-12 my-8"
      >
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
          <Label className="font-medium text-sm" htmlFor="confirm_password">
            Confirm Password{" "}
            <small className="text-foreground/50">(optional)</small>
          </Label>
          <FormInput
            wrapperClassName={(isFocused) =>
              cn(!isFocused && "ring-1 ring-foreground/20")
            }
            leading={<Lock />}
            id="confirm_password"
            type="password"
            placeholder=""
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
        </div>

        <div className="flex items-center gap-3">
          <Button variant={"outline"} type="button">
            Discard
          </Button>
          <Button type="submit">Update Password</Button>
        </div>
      </form>

      {showSuccess && (
        <SuccessModal
          title="Password Updated 🔒"
          message="Your password has been changed successfully."
          onClose={() => setShowSuccess(false)}
          showButton={true}
        />
      )}
    </>
  );
}
