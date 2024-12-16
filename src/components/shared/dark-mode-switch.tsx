import { Moon } from "lucide-react";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function DarkModeSwitch() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 p-2 ">
      <Label htmlFor="airplane-mode" className="flex items-center gap-2">
        <Moon strokeWidth={1.2} /> Dark mode
      </Label>
      <Switch
        checked={theme === "dark"}
        onClick={() => {
          if (theme === "dark") setTheme("light");
          else setTheme("dark");
        }}
        id="airplane-mode"
      />
    </div>
  );
}
