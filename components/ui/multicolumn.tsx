/* eslint-disable react/display-name */
import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/shared/utils/cn";

const MultiColumnSelect = SelectPrimitive.Root;

const MultiColumnSelectGroup = SelectPrimitive.Group;

const MultiColumnSelectValue = SelectPrimitive.Value;

type MultiColumnSelectTriggerProps = React.ComponentPropsWithoutRef<
  typeof SelectPrimitive.Trigger
> & {
  currentValue?: string;
  className?: string;
  children?: React.ReactNode;
};

const MultiColumnSelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  MultiColumnSelectTriggerProps
>(({ className, children, currentValue, ...props }, ref) => {
  const displayValue = currentValue || children;
  return (
    <SelectPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      {displayValue}
      <SelectPrimitive.Icon asChild>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
});

type MultiColumnSelectContentProps = React.ComponentPropsWithoutRef<
  typeof SelectPrimitive.Content
> & {
  className?: string;
  children?: React.ReactNode;
  position?: string;
};

const MultiColumnSelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  MultiColumnSelectContentProps
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; max-height: 300px; overflow-y: auto;",
        position === "popper" && "...",
        className
      )}
      position={position}
      {...props}
    >
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));

type MultiColumnSelectItemProps = React.ComponentPropsWithoutRef<
  typeof SelectPrimitive.Item
> & {
  className?: string;
  children?: React.ReactNode;
};

const MultiColumnSelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  MultiColumnSelectItemProps
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));

type MultiColumnSelectSeparatorProps = React.ComponentPropsWithoutRef<
  typeof SelectPrimitive.Item
> & {
  className?: string;
  children?: React.ReactNode;
};

const MultiColumnSelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.SelectSeparator>,
  MultiColumnSelectSeparatorProps
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
));

export {
  MultiColumnSelect,
  MultiColumnSelectGroup,
  MultiColumnSelectValue,
  MultiColumnSelectTrigger,
  MultiColumnSelectContent,
  MultiColumnSelectItem,
  MultiColumnSelectSeparator,
};
