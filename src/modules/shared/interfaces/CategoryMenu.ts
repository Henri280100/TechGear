// Define SubmenuItem type
export interface SubmenuItem {
  title: string;
  href: string;
};

// Define Category type for submenuData
export interface Category {
  icon: React.ComponentType<{ className?: string }>;
  items: SubmenuItem[];
};
