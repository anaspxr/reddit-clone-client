import React from "react";
import { Textarea } from "./textarea";

export default function MaxLengthTextarea({
  maxLength,
  className,
  onChange,
  ...props
}: React.ComponentProps<"textarea"> & { maxLength: number }) {
  const [length, setLength] = React.useState(
    props.value?.toString().length || 0
  );

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= maxLength) {
      setLength(e.target.value.length);
      onChange?.(e);
    } else {
      e.target.value = e.target.value.slice(0, maxLength);
    }
  };

  return (
    <div className="relative">
      <Textarea className={className} {...props} onChange={handleChange} />
      <div className="absolute right-2 -bottom-8">
        <span className="text-sm text-gray-500">{maxLength - length}</span>
      </div>
    </div>
  );
}
