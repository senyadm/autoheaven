"use client";

import { TrashIcon, X } from "lucide-react";
import * as React from "react";

import clsx from "clsx";
import { Command as CommandPrimitive } from "cmdk";
import { Command, CommandGroup, CommandItem } from "../ui/command";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { Model } from "../../src/shared/model/models";
import { Button } from "../ui/button";

export function MultiSelect({
  label = "Select an item",
  placeholder = "Select an item",
  parentClassName,
  make,
  data,
  selected,
  setSelected,
}: {
  label?: string;
  placeholder?: string;
  parentClassName?: string;
  data: Model[];
  make: string;
  selected: Record<string, Model[]>;
  setSelected: React.Dispatch<React.SetStateAction<Record<string, Model[]>>>;
}) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  const handleUnselect = React.useCallback(
    (item: Model) => {
      setSelected((prev) => ({
        ...prev,
        [make]: prev[make].filter((s) => s.name !== item.name),
      }));
    },
    [make, setSelected]
  );

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "") {
            setSelected((prev) => {
              const newSelected = [...prev[make]];
              newSelected.pop();
              return { ...prev, [make]: newSelected };
            });
          }
        }
        // This is not a default behaviour of the <input /> field
        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    []
  );

  const selectables = data.filter((item) => !selected[make]?.includes(item));

  return (
    <div
      className={clsx(
        label && "gap-1.5",
        parentClassName,
        "grid w-full items-center"
      )}
    >
      <Command
        onKeyDown={handleKeyDown}
        className="overflow-visible bg-transparent"
      >
        <div className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
          <div className="flex gap-1 flex-wrap">
            {selected[make]?.map((item, index) => {
              return (
                <Badge key={"badge" + item.name} variant="secondary">
                  {item.name}
                  <button
                    className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleUnselect(item);
                      }
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onClick={() => handleUnselect(item)}
                  >
                    <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                  </button>
                </Badge>
              );
            })}
            {/* {selected.length > 2 && <p>{`+${selected.length - 2} more`}</p>} */}
            {/* Avoid having the "Search" Icon */}
            <CommandPrimitive.Input
              ref={inputRef}
              value={inputValue}
              onValueChange={setInputValue}
              onBlur={() => setOpen(false)}
              onFocus={() => setOpen(true)}
              placeholder={placeholder}
              className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1"
            />
          </div>
        </div>
        <div className="relative mt-2">
          {open && selectables.length > 0 ? (
            <div className="absolute w-full top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in h-48">
              <CommandGroup className="h-full overflow-auto">
                {selectables.map((model) => {
                  return (
                    <CommandItem
                      key={"cmd" + model.name}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onSelect={(value) => {
                        setInputValue("");
                        setSelected((prev) => ({
                          ...prev,
                          [make]: [...prev[make], model],
                        }));
                      }}
                    >
                      {model.name}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </div>
          ) : null}
        </div>
      </Command>
    </div>
  );
}
