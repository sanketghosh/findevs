// local modules
import { WORKPLACE_OPTIONS } from "@/app/(main)/_data";

// components
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type WorkplaceOptionsProps = {
  defaultWorkplaceOptions?: string[];
};

export default function WorkplaceOptions({
  defaultWorkplaceOptions,
}: WorkplaceOptionsProps) {
  // console.log(defaultWorkplaceOptions);

  return (
    <div className="bg-card space-y-3 rounded-md border p-3">
      <h1 className="cursor-pointer text-sm font-medium select-none">
        Workplace
      </h1>
      <div className="grid grid-cols-2 gap-2">
        {WORKPLACE_OPTIONS.map((item) => {
          /**
           *
           * The issue was InCountryRemote also contains the string Remote
           *
           *
           * check if defaultWorkplaceOptions is an array using Array.isArray().
           *
           * If it's an array, we use the includes() method to check if it includes item.workplaceOptionId.
           *
           * If it's not an array, we assume it's a string and use the === operator to check for an exact match.
           *
           */
          const isChecked = Array.isArray(defaultWorkplaceOptions)
            ? defaultWorkplaceOptions.includes(item.workplaceOptionId)
            : defaultWorkplaceOptions === item.workplaceOptionId;
          return (
            <div
              key={item.workplaceOptionId}
              className="flex items-center gap-1"
            >
              <Checkbox
                id={item.workplaceOptionId}
                name="workplaceOptions"
                value={item.workplaceOptionId}
                defaultChecked={isChecked}
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
