import { cn } from "@/lib/utils";
import { useState, useEffect, type ReactNode } from "react";
import { Button } from "./button";

import { Popover, PopoverContent, PopoverTrigger } from "./popover";

import { MoonIcon, SunIcon, Monitor } from "lucide-react";

type Theme = "system" | "light" | "dark";

const ThemeOption = ({ value, label, icon, selected, onSelect }: { value: Theme; label: string; icon: ReactNode; selected: boolean; onSelect: () => void }) => {
  return (
    <button
      className={cn(
        "flex items-center gap-2 w-full px-3 py-2 rounded-md text-sm transition-colors",
        selected
          ? "bg-gray-200 text-foreground dark:bg-muted"
          : "hover:bg-accent/50 hover:text-accent-foreground text-muted-foreground"
      )}
      onClick={onSelect}
    >
      <span className="w-4 h-4">{icon}</span>
      <span>{label}</span>
      {selected && <div className="ml-auto w-2 h-2 rounded-full bg-primary" />}
    </button>
  );
};

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
      return <Monitor size={16} className={isDark ? "text-muted-foreground" : "text-foreground"} />;
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
        className="w-48 p-2 sm:w-56 sm:p-3 bg-background" 
        align="end" 
        sideOffset={8}
      >
        <div className="space-y-1">
          <ThemeOption
            value="system"
            label="System"
            icon={<Monitor size={16} className={isDark ? "text-muted-foreground" : "text-foreground"} />}
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
