import * as React from "react";

import { cn } from "@/web/lib/utils";
import { FieldError, UseFormRegister } from "react-hook-form";

export interface TextareaProps {
  id: string;
  name: string;
  register: UseFormRegister<any>;
  valueAsNumber?: boolean;
  className?: string;
  error: FieldError | undefined;
  placeholder?: string;
  rows?: number;
}

export const Textarea = (props: TextareaProps) => {
  const {
    id,
    name,
    register,
    className,
    valueAsNumber,
    error,
    placeholder,
    rows,
  } = props;
  return (
    <>
      <textarea
        placeholder={placeholder}
        id={id}
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        rows={rows}
        {...register(name, { valueAsNumber })}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </>
  );
};
