import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Button } from "./button";

import { Popover, PopoverContent, PopoverTrigger } from "./popover";

import { MoonIcon, SunIcon, SunMoonIcon } from "lucide-react";

type Theme = "system" | "light" | "dark";

export const AnimatedThemeToggle = ({ className }: { className?: string }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme") as Theme | null;
      if (saved) return saved;
      return "system";
    }
    return "system";
  });

  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return false;
    if (theme === "system") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return theme === "dark";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    
    if (theme === "system") {
      const systemIsDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDark(systemIsDark);
      if (systemIsDark) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    } else {
      setIsDark(theme === "dark");
      if (theme === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }
    
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    setIsDark(newTheme === "dark" || (newTheme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches));
  };

  const getThemeIcon = () => {
    if (theme === "system") {
      return <SunMoonIcon size={16} className={isDark ? "text-muted-foreground" : "text-foreground"} />;
    } else if (isDark) {
      return <MoonIcon size={16} className="text-muted-foreground" />;
    } else {
      return <SunIcon size={16} className="text-muted-foreground" />;
    }
  };

  const getThemeLabel = () => {
    if (theme === "system") return "System";
    if (theme === "dark") return "Dark mode";
    return "Light mode";
  };

  const getThemeIconClass = () => {
    if (theme === "system") return isDark ? "text-muted-foreground" : "text-foreground";
    return "text-muted-foreground";
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className={cn("px-2.5 hover:bg-transparent shadow-none transition-all duration-300", className)}
          variant="ghost"
          size="icon"
        >
          <div className="flex items-center gap-2">
            {getThemeIcon()}
            <span className="text-xs font-medium hidden sm:inline-block transition-colors duration-300" style={{ color: getThemeIconClass() }}>
              {getThemeLabel()}
            </span>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-48 p-2 sm:w-56 sm:p-3" 
        align="end" 
        sideOffset={8}
      >
        <div className="space-y-1">
          <ThemeOption
            value="system"
            label="System"
            icon={<SunMoonIcon size={16} className={isDark ? "text-muted-foreground" : "text-foreground"} />}
            selected={theme === "system"}
            onSelect={() => handleThemeChange("system")}
          />
          <ThemeOption
            value="light"
            label="Light"
            icon={<SunIcon size={16} className="text-muted-foreground" />}
            selected={theme === "light"}
            onSelect={() => handleThemeChange("light")}
          />
          <ThemeOption
            value="dark"
            label="Dark"
            icon={<MoonIcon size={16} className="text-muted-foreground" />}
            selected={theme === "dark"}
            onSelect={() => handleThemeChange("dark")}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};
