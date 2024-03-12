"use client";

import { FC, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";

interface SearchBarProps {}

const SearchBar: FC<SearchBarProps> = ({}) => {
  const [input, setInput] = useState<string>("");
  console.log(input.length);
  return (
    <Command className="relative inset-0 rounded-lg border max-w-sm z-50 overflow-visible">
      <CommandInput
        value={input}
        onValueChange={(text) => setInput(text)}
        placeholder="Search files"
      />
      <CommandList className="absolute bg-white top-full inset-x-0 shadow rounded-b-md">
        {input.length > 0 && (
          <CommandEmpty className="p-2">No results found.</CommandEmpty>
        )}
      </CommandList>
    </Command>
  );
};

export default SearchBar;
