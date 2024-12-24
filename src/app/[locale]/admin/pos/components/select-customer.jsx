"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function SelectCustomer({customers, selectedCustomer, setSelectedCustomer}) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState(selectedCustomer || 0)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] overflow-x-auto justify-between border-[0.5px] rounded-none"
        >
          {value
            ? customers.find((customer) => customer.id == value)?.name
            : "Select customer..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 pointer-events-auto">
        <Command>
          <CommandInput placeholder="Search Customer..." className="h-9" />
          <CommandList>
            <CommandEmpty>No customer found.</CommandEmpty>
            <CommandGroup>
            <CommandItem
                  key={0}
                  value={0}
                  onSelect={(currentValue) => {
                    setValue(0)
                    setSelectedCustomer(0)
                    setOpen(false)
                  }}
                >
                  N/A
                  <Check
                    className={cn(
                      "ml-auto",
                      value === 0 ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              {customers?.map((customer) => (
                <CommandItem
                  key={customer.id}
                  value={customer.id}
                  onSelect={(currentValue) => {
                    setValue(currentValue == value ? "" : customer.id)
                    setSelectedCustomer(currentValue == value ? "0" : customer.id)
                    setOpen(false)
                  }}
                >
                  {customer.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === customer.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
