"use client";

import { useState } from "react";
import { Check } from "lucide-react";

interface CheckboxIconProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  size?: number;
  className?: string;
}

export default function CheckboxIconCustom({
  checked = false,
  onChange,
  size = 24,
  className = "",
}: CheckboxIconProps) {
  const [isChecked, setIsChecked] = useState(checked);

  const handleToggle = () => {
    const newState = !isChecked;
    setIsChecked(newState);
    onChange?.(newState);
  };

  return (
    <div
      className={`relative cursor-pointer ${className}`}
      style={{ width: size, height: size }}
      onClick={handleToggle}
      role="checkbox"
      aria-checked={isChecked}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleToggle();
          e.preventDefault();
        }
      }}
    >
      {isChecked ? (
        <div className="flex items-center justify-center w-full h-full rounded-md bg-violet-500 text-white">
          <Check size={size * 0.6} strokeWidth={3} />
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-full rounded-md border-2 border-slate-300"></div>
      )}
    </div>
  );
}
