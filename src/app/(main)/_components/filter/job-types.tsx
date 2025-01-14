// local modules
import { JOB_TYPES } from "@/app/(main)/_data";

// components
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function JobTypes() {
  return (
    <div className="space-y-2 rounded-md border p-3">
      <h1 className="font-semibold">Job Types</h1>
      <div className="grid grid-cols-2 gap-2">
        {JOB_TYPES.map((item) => {
          return (
            <div key={item.jobTypeId} className="flex items-center gap-1">
              <Checkbox
                id={item.jobTypeId}
                value={item.jobTypeId}
                name="jobTypes"
              />
              <Label
                htmlFor={item.jobTypeId}
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
