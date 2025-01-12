// components
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function SeniorityOptions() {
  return (
    <div className="space-y-2 rounded-md border p-3">
      <h1 className="font-semibold">Seniority</h1>
      <div className="grid grid-cols-2 gap-2">
        {[
          "entry level",
          "mid level",
          "senior",
          "manager",
          "director",
          "executive",
        ].map((item, idx) => {
          let itemId = item.split(" ").join("");
          return (
            <div key={idx} className="flex items-center gap-1">
              <Checkbox id={itemId} />
              <Label htmlFor={itemId} className="font-medium capitalize">
                {item}
              </Label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
