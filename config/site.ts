import { Cuboid, FerrisWheel, House, Mail, WalletCards } from "lucide-react";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Ilya Sullivan - Software Developer | UI/UX, Websites, Apps",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Home",
      href: "/",
      icon: House
    },
    {
      label: "Showcase",
      href: "/projects",
      icon: Cuboid
    },
    {
      label: "Playground",
      href: "/playground",
      icon: FerrisWheel,
    },
    {
      label: "Contact",
      href: "mailto:mail@ilyasullivan.com",
      icon: Mail
    },
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Playground",
      href: "/playground",
      icon: FerrisWheel,
    },
    {
      label: "Contact",
      href: "mailto:mail@ilyasullivan.com",
    },
  ],
  links: {
    github: "https://github.com/IlyaSulli",
    linkedin: "https://www.linkedin.com/in/ilya-sullivan/",
    instagram: "https://www.instagram.com/ilya.altered/",
    email: "mailto:mail@ilyasullivan.com",
    dribbble: "https://dribbble.com/IlyaSullivan",
  },
};
