import * as React from "react";

import { cn } from "@/web/lib/utils";
import { UseFormRegister } from "react-hook-form";

export interface TextareaProps {
  id: string;
  name: string;
  register: UseFormRegister<any>;
  valueAsNumber?: boolean;
  className?: string;
}

export const Textarea = (props: TextareaProps) => {
  const { id, name, register, className, valueAsNumber } = props;
  return (
    <textarea
      id={id}
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...register(name, { valueAsNumber })}
    />
  );
};
