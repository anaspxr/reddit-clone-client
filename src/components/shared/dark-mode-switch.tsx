import { Moon } from "lucide-react";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";

export default function DarkModeSwitch() {
  return (
    <div className="flex items-center gap-2 p-2 ">
      <Label htmlFor="airplane-mode" className="flex items-center gap-2">
        <Moon strokeWidth={1.2} /> Dark mode
      </Label>
      <Switch id="airplane-mode" />
    </div>
  );
}
