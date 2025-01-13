// local modules
import { SENIORITY_OPTIONS } from "@/app/(main)/_data";

// components
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function SeniorityOptions() {
  return (
    <div className="space-y-2 rounded-md border p-3">
      <h1 className="font-semibold">Seniority</h1>
      <div className="grid grid-cols-2 gap-2">
        {SENIORITY_OPTIONS.map((item) => {
          return (
            <div
              key={item.seniorityOptionId}
              className="flex items-center gap-1"
            >
              <Checkbox
                id={item.seniorityOptionId}
                name={item.seniorityOptionId}
              />
              <Label
                htmlFor={item.seniorityOptionId}
                className="font-medium capitalize"
              >
                {item.label}
              </Label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
