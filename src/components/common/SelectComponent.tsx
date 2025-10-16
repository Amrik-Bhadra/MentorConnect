import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectItemType {
  key: string | number;
  value: string;
}

type SelectItemListType = SelectItemType[];

interface SelectComponentPropType {
  onChange: (value: string) => void;
  value: string;
  itemList: SelectItemListType;
  placeholder: string;
  label?:string
}

export function SelectComponent({
  onChange,
  value,
  itemList,
  placeholder,
  label
}: SelectComponentPropType) {
  return (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger className="">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {itemList.map((item, index) => (
            <SelectItem key={index} value={item.value}>
              {item.key}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
