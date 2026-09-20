import { Navbar, NavbarContent, NavbarBrand, NavbarItem } from "@heroui/navbar";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { Plus } from "lucide-react";
import { useState } from "react";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { Logo } from "@/components/icons";
import { fontDisplay } from "@/config/fonts";

const RollingText = ({ text }: { text: string }) => {
  const letters = Array.from(text);
  const renderLetters = (hidden: boolean) =>
    letters.map((letter, index) => (
      <span
        aria-hidden={hidden}
        className="inline-block transition-transform duration-300 ease-out group-hover:-translate-y-full group-focus-visible:-translate-y-full"
        key={`${hidden ? "hidden" : "visible"}-${index}`}
        style={{ transitionDelay: `${index * 40}ms` }}
      >
        {letter === " " ? "\u00a0" : letter}
      </span>
    ));

  return (
    <span className="relative inline-block h-[1.25em] overflow-hidden align-bottom whitespace-nowrap">
      <span className="block">{renderLetters(false)}</span>
      <span aria-hidden="true" className="absolute inset-x-0 top-full block">
        {renderLetters(true)}
      </span>
    </span>
  );
};

export const AppNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      maxWidth="xl"
      onMenuOpenChange={setIsMenuOpen}
      position="sticky"
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <NextLink
            aria-label="Ilya Sullivan Logo"
            className="flex justify-start items-center gap-1"
            href="/"
          >
            <Logo />
          </NextLink>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex basis-auto" justify="end">
        <div className="lg:flex md:flex sm:hidden gap-8 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "group flex items-center gap-2 data-[active=true]:text-primary data-[active=true]:font-medium",
                )}
                color="foreground"
                href={item.href}
              >
                {item.icon && <item.icon aria-hidden="true" size={16} />}
                <RollingText text={item.label} />
              </NextLink>
            </NavbarItem>
          ))}
          <ThemeSwitch className="mx-4" />
        </div>
      </NavbarContent>
      <NavbarContent className="lg:hidden md:hidden sm:flex basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <div
          className={clsx(
            "group/menu-trigger absolute right-4 z-50 flex justify-end",
            isMenuOpen ? "top-0" : "top-1/2 -translate-y-1/2",
          )}
        >
          <span
            className={clsx(
              "pointer-events-none absolute right-full top-7 mr-2 -translate-y-1/2 origin-right",
              "transition-none",
              isMenuOpen ? "translate-x-2 opacity-0" : "translate-x-0 opacity-100",
              fontDisplay.className,
              "text-2xl leading-none",
            )}
          >
            Menu
          </span>
          <button
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className={clsx(
              "relative flex overflow-hidden rounded-[2rem] border border-divider bg-background shadow-medium",
              "transition-[width,height,background-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
              isMenuOpen ? "h-[17rem] w-72 bg-foreground" : "h-14 w-14",
            )}
            onClick={() => setIsMenuOpen((open) => !open)}
            type="button"
          >
            <span
              className={clsx(
                "absolute right-2 top-2 flex h-10 w-10 items-center justify-center rounded-full",
                "transition-colors duration-300",
                isMenuOpen ? "bg-background/15 text-background" : "text-foreground",
              )}
            >
              <Plus
                aria-hidden="true"
                className={clsx(
                  "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  isMenuOpen && "rotate-45",
                )}
                size={28}
              />
            </span>
            <span
              className={clsx(
                "flex flex-col items-start gap-1 px-8 pb-5 pt-14 text-left transition-opacity duration-300",
                isMenuOpen ? "opacity-100 delay-150" : "opacity-0",
              )}
            >
              {siteConfig.navItems.map((item) => (
                <NextLink
                  className={clsx(
                    fontDisplay.className,
                    "group text-4xl leading-tight text-background transition-opacity hover:opacity-60",
                  )}
                  href={item.href}
                  key={item.href}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <RollingText text={item.label} />
                </NextLink>
              ))}
            </span>
          </button>
        </div>
      </NavbarContent>
    </Navbar>
  );
};
