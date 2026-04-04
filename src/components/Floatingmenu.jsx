import React from "react";
import { FloatingDock } from "./ui/floating-dock";
import {
  IconBrandX,
  IconExchange,
  IconHome,
  IconNewSection,
  IconTerminal2,
  IconUserBolt,
} from "@tabler/icons-react";


export function Floatingmenu() {
  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/",
    },

    {
      title: "Explore",
      icon: (
        <IconTerminal2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/view",
    },
    {
      title: "Mint NFT",
      icon: (
        <IconNewSection className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/list",
    },
    {
      title: "profile",
      icon: (
        <IconUserBolt className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/profile",
    },

    {
      title: "Twitter",
      icon: (
        <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
    },
    {
      title: "GitHub",
      icon: (
      ),
    },
  ];
  return (
    <div className="flex items-center justify-center bottom-6 left-4 md:left-16 fixed z-50">
      <FloatingDock
        // only for demo, remove for production
        mobileClassName="translate-y-20"
        items={links}
      />
    </div>
  );
}
