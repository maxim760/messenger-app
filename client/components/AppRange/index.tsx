import React from "react";

interface AppRangeProps {
  min ?: number
  max: number;
  current: number;
  onChange: (e: React.ChangeEvent) => void;
  className ?: string 
}

export const AppRange: React.FC<AppRangeProps> = ({
  min = 0,
  max,
  current,
  onChange,
  className = ""
}): React.ReactElement => {
  return (
    <input
      className={className}
      type="range"
      min={min}
      max={max}
      value={current}
      onChange={onChange}
    />
  );
};
