// local modules
import { WORKPLACE_OPTIONS } from "@/app/(main)/_data";

// components
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function WorkplaceOptions() {
  return (
    <div className="space-y-2 rounded-md border p-3">
      <h1 className="font-semibold">Workplace</h1>
      <div className="grid grid-cols-2 gap-2">
        {WORKPLACE_OPTIONS.map((item) => {
          return (
            <div
              key={item.workplaceOptionId}
              className="flex items-center gap-1"
            >
              <Checkbox
                id={item.workplaceOptionId}
                name="workplaceOptions"
                value={item.workplaceOptionId}
              />
              <Label
                htmlFor={item.workplaceOptionId}
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
