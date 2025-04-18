import Link from "next/link";

interface BottomNavItemProps {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

const BottomNavItem: React.FC<BottomNavItemProps> = ({
  href,
  icon: Icon,
  label,
}) => (
  <Link href={href} className="flex flex-col items-center space-y-1">
    <Icon className="h-6 w-6" />
    <span className="text-xs">{label}</span>
  </Link>
);

export default BottomNavItem;