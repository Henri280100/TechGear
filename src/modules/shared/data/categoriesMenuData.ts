import {
    Armchair,
    Cpu,
    Gamepad,
    HardDrive,
    Headphones,
    Laptop,
    Layers,
    Monitor,
    Package,
    Tag,
    Zap
} from "lucide-react";
import { Category } from "../interfaces/CategoryMenu";

const categories = [
  {
    title: "Electronics",
    href: "/categories/electronics",
    description: "Cutting-edge gadgets and devices.",
    icon: Zap,
  },
  {
    title: "Clothing",
    href: "/categories/clothing",
    description: "Stylish apparel for all occasions.",
    icon: Tag,
  },
  {
    title: "Home & Garden",
    href: "/categories/home-garden",
    description: "Everything you need for your living space.",
    icon: Layers,
  },
  {
    title: "Sports & Outdoors",
    href: "/categories/sports-outdoors",
    description: "Gear up for your active lifestyle.",
    icon: Layers,
  },
];


// Updated submenuData with icons and items from the image
const submenuData: Record<string, Category> = {
  "Office Laptop": {
    icon: Laptop,
    items: [
      { title: "ASUS", href: "/office-laptop/asus" },
      { title: "ACER", href: "/office-laptop/acer" },
      { title: "MSI", href: "/office-laptop/msi" },
      { title: "LENOVO", href: "/office-laptop/lenovo" },
      { title: "DELL", href: "/office-laptop/dell" },
      { title: "HP-Pavilion", href: "/office-laptop/hp-pavilion" },
      { title: "LG-Gram", href: "/office-laptop/lg-gram" },
      { title: "Laptop AI", href: "/office-laptop/laptop-ai" },
    ],
  },
  "Gaming Laptop": {
    icon: Gamepad,
    items: [
      {
        title: "Entry Level (Below 15 millions)",
        href: "/gaming-laptop/under-15m",
      },
      {
        title: "Mid-Range (From 15 to 20 millions)",
        href: "/gaming-laptop/15-20m",
      },
      {
        title: "High-End (Above 20 millions)",
        href: "/gaming-laptop/over-20m",
      },
      { title: "Professional", href: "/gaming-laptop/professional" },
    ],
  },
  "Office PC": {
    icon: Monitor,
    items: [
      { title: "Mini PCs", href: "/office-pc/mini-pcs" },
      { title: "All-in-One", href: "/office-pc/all-in-one" },
      { title: "Workstations", href: "/office-pc/workstations" },
    ],
  },
  "Gaming PC": {
    icon: Gamepad,
    items: [
      {
        title: "Budget Builds (Below 15 millions)",
        href: "/gaming-pc/under-15m",
      },
      { title: "Mid-Range Builds (From 15 to 20)", href: "/gaming-pc/15-20m" },
      {
        title: "High-End Builds (Above 20 millions)",
        href: "/gaming-pc/over-20m",
      },
      {
        title: "Custom Water Cooling",
        href: "/gaming-pc/custom-water-cooling",
      },
    ],
  },
  "Main, CPU, VGA": {
    icon: Cpu,
    items: [
      { title: "Intel Core i3", href: "/components/intel-i3" },
      { title: "Intel Core i5", href: "/components/intel-i5" },
      { title: "Intel Core i7", href: "/components/intel-i7" },
      { title: "AMD Ryzen", href: "/components/amd-ryzen" },
    ],
  },
  "SSD, RAM, Memory, HardDisk": {
    icon: HardDrive,
    items: [
      { title: "Ram laptop", href: "/accessories/ram" },
      { title: "SSD laptop", href: "/accessories/ssd" },
      { title: "Portable hard drive", href: "/accessories/external-hdd" },
    ],
  },
  Chair: {
    icon: Armchair,
    items: [
      { title: "Gaming Chairs", href: "/chair/gaming-chairs" },
      { title: "Office Chairs", href: "/chair/office-chairs" },
      { title: "Ergonomic Options", href: "/chair/ergonomic-options" },
    ],
  },
  Accessories: {
    icon: Package,
    items: [
      { title: "Graphics Design - Studio", href: "/accessories/studio" },
      { title: "Students - Colleges", href: "/accessories/student" },
      { title: "Premium thin & light", href: "/accessories/premium" },
    ],
  },
  Headphones: {
    icon: Headphones,
    items: [
      { title: "Gaming Headsets", href: "/headphones/gaming-headsets" },
      { title: "Wireless Earbuds", href: "/headphones/wireless-earbuds" },
      { title: "Noise Cancelling", href: "/headphones/noise-cancelling" },

      { title: "Studio Quality", href: "/headphones/studio-quality" },
    ],
  },
};

export { categories, submenuData };
