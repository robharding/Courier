"use client";

import {
  OrganizationList,
  OrganizationSwitcher,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { FC } from "react";
import { Button } from "./ui/button";
import { Package } from "lucide-react";
import SearchBar from "./SearchBar";

interface HeaderProps {}

const Header: FC<HeaderProps> = ({}) => {
  return (
    <div className="border-b h-16 bg-zinc-100 z-10 py-2">
      <div className="container flex items-center justify-between h-full">
        <div className="flex gap-2 items-center">
          <span className="group h-8 w-8 flex items-center justify-center bg-primary rounded">
            <Package className="h-6 w-6 fill-white stroke-primary/80" />
          </span>
          <h1 className="text-xl font-medium">Courier</h1>
        </div>

        <SignedIn>
          <SearchBar />
          <div className="flex gap-4 items-center">
            <div className="mt-2">
              <OrganizationSwitcher />
            </div>

            <UserButton />
          </div>
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal">
            <Button>Sign In</Button>
          </SignInButton>
        </SignedOut>
      </div>
    </div>
  );
};

export default Header;
