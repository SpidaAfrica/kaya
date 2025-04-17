import { Actions, DetailsLayout } from "@/app/shared";
import React, { PropsWithChildren, useEffect, useState } from "react";
import DynamicOverlay from "./DynamicOverlay";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import FormInput from "../FormInput";
import DynamicTrigger from "./DynamicTrigger";

type Stop = {
  identifier: string;
  location: string;
  new: boolean;
};

const STORAGE_KEY = "dynamicStops";

export default function AddStopsModal({
  actions,
  children,
  onOpenChange,
  open,
}: PropsWithChildren<{
  onOpenChange?(open: boolean): void;
  open?: boolean;
  actions?: Actions;
}>) {
  const fromLocation = sessionStorage.getItem("fromLocation") || "";
  const toLocation = sessionStorage.getItem("toLocation") || "";

  const [dynamicStops, setDynamicStops] = useState<Stop[]>([]);

  // On open, load stored dynamic stops
  useEffect(() => {
    if (open) {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      setDynamicStops(stored ? JSON.parse(stored) : []);
    }
  }, [open]);

  const allStops: Stop[] = [
    { identifier: "Current Location", location: fromLocation, new: false },
    ...dynamicStops,
    { identifier: "Final Destination", location: toLocation, new: false },
  ];

  const handleAddStop = () => {
    const stopNumber = dynamicStops.length + 1;
    setDynamicStops((prev) => [
      ...prev,
      {
        identifier: `Stop ${stopNumber}`,
        location: "",
        new: true,
      },
    ]);
  };

  const handleSave = () => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(dynamicStops));
    actions?.close?.();
  };

  const updateStopLocation = (index: number, value: string) => {
    setDynamicStops((prev) => {
      const updated = [...prev];
      updated[index].location = value;
      return updated;
    });
  };

  const removeStop = (index: number) => {
    setDynamicStops((prev) => {
      const updated = [...prev];
      updated.splice(index, 1);
      return updated;
    });
  };

  return (
    <DynamicOverlay onOpenChange={onOpenChange} open={open} trigger={children}>
      <DetailsLayout hide={() => actions?.close?.()} title="Add Stops">
        <div className="py-12">
          <div className="flex flex-col gap-4">
            {allStops.map((stop, index) => (
              <StopItem
                key={index}
                identifier={stop.identifier}
                location={stop.location}
                isNew={stop.new}
                isEditable={stop.new}
                onChange={(val) => updateStopLocation(index - 1, val)}
                onDelete={() => removeStop(index - 1)}
              />
            ))}
          </div>

          <Button
            onClick={handleAddStop}
            variant="ghost"
            className="text-primary gap-2 mt-5 w-fit"
          >
            <Plus />
            Add Additional Stop
          </Button>

          <DynamicTrigger>
            <Button className="mt-14" onClick={handleSave}>
              Save Stop Details
            </Button>
          </DynamicTrigger>
        </div>
      </DetailsLayout>
    </DynamicOverlay>
  );
}

function StopItem({
  identifier,
  location,
  isNew,
  isEditable,
  onChange,
  onDelete,
}: {
  identifier: string;
  location: string;
  isNew: boolean;
  isEditable: boolean;
  onChange?: (value: string) => void;
  onDelete?: () => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.00017 15.7137C3.73957 15.7137 0.285889 12.26 0.285889 7.99944C0.285889 3.73884 3.73957 0.285156 8.00017 0.285156C12.2608 0.285156 15.7145 3.73884 15.7145 7.99944C15.7145 12.26 12.2608 15.7137 8.00017 15.7137ZM8.00017 10.3137C8.61396 10.3137 9.20261 10.0699 9.63662 9.63589C10.0706 9.20188 10.3145 8.61323 10.3145 7.99944C10.3145 7.38566 10.0706 6.79701 9.63662 6.36299C9.20261 5.92898 8.61396 5.68516 8.00017 5.68516C7.38639 5.68516 6.79774 5.92898 6.36373 6.36299C5.92971 6.79701 5.68589 7.38566 5.68589 7.99944C5.68589 8.61323 5.92971 9.20188 6.36373 9.63589C6.79774 10.0699 7.38639 10.3137 8.00017 10.3137V10.3137Z"
          fill="#00ABFD"
        />
      </svg>

      <div className="space-y-1 w-full">
        <span className="text-sm text-foreground/70">{identifier}</span>
        {isEditable ? (
          <div className="flex items-center gap-2 w-full">
            <FormInput
              wrapperClassName={() => "w-full flex-1"}
              className="w-full"
              outerClassName="w-full"
              defaultValue={location}
              onChange={(e) => onChange?.(e.target.value)}
            />
            <button onClick={onDelete}>
              ❌
            </button>
          </div>
        ) : (
          <p>{location}</p>
        )}
      </div>
    </div>
  );
}
