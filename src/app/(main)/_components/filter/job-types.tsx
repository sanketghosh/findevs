// local modules
import { JOB_TYPES } from "@/app/(main)/_data";

// components
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type JobTypesProps = {
  defaultJobTypes?: string[];
};

export default function JobTypes({ defaultJobTypes }: JobTypesProps) {
  // console.log(defaultJobTypes);

  return (
    <div className="bg-card space-y-3 rounded-md border p-3">
      <h1 className="cursor-pointer text-sm font-medium select-none">
        Job Types
      </h1>
      <div className="grid grid-cols-2 gap-2">
        {JOB_TYPES.map((item) => {
          return (
            <div key={item.jobTypeId} className="flex items-center gap-1">
              <Checkbox
                id={item.jobTypeId}
                value={item.jobTypeId}
                name="jobTypes"
                defaultChecked={defaultJobTypes?.includes(item.jobTypeId)}
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
