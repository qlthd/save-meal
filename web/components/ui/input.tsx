import * as React from "react";

import { cn } from "@/web/lib/utils";
import { FieldError, UseFormRegister } from "react-hook-form";

type InputProps = {
  type: string;
  placeholder?: string;
  name: string;
  register?: UseFormRegister<any>;
  error: FieldError | undefined;
  className?: string;
  valueAsNumber?: boolean;
  disabled?: boolean;
};

const Input = (props: InputProps) => {
  const {
    type,
    placeholder,
    name,
    register,
    error,
    valueAsNumber,
    className,
    disabled,
    ...rest
  } = props;
  return (
    <>
      <input
        disabled={disabled}
        type={type}
        placeholder={placeholder}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className,
        )}
        {...(register ? register(name, { valueAsNumber }) : null)}
      ></input>
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </>
  );
};
Input.displayName = "Input";

export { Input };
