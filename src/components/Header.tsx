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

interface HeaderProps {}

const Header: FC<HeaderProps> = ({}) => {
  return (
    <div className="border-b h-14 bg-gray-50">
      <div className="container flex h-full items-center justify-between">
        <div className="flex gap-2 items-center">
          <Package className="h-6 w-6" />
          <h1 className="text-xl font-medium">Courier</h1>
        </div>
        <SignedIn>
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
