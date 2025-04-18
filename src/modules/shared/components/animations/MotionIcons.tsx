import { motion } from "framer-motion";
import { Menu, Search, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { HeaderPropsPreviewIcon } from "../../interfaces/HeaderProps";

const MotionIcons: React.FC<HeaderPropsPreviewIcon> = ({isAtTop, toggleSearch, toggleMobileMenu}) => {
  return (
    <div className="flex items-center space-x-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSearch}
          className={`${isAtTop ? "hover:bg-white/20" : "hover:bg-accent/50"}`}
        >
          <Search className="h-5 w-5" />
        </Button>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Button
          variant="ghost"
          size="icon"
          className={`${isAtTop ? "hover:bg-white/20" : "hover:bg-accent/50"}`}
        >
          <Link href={"/shop/cart"}>
            <ShoppingCart className="h-5 w-5" />
          </Link>
        </Button>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Button
          variant="ghost"
          size="icon"
          className={`${isAtTop ? "hover:bg-white/20" : "hover:bg-accent/50"}`}
        >
          <User className="h-5 w-5" />
        </Button>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7 }}
        className="md:hidden"
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMobileMenu}
          className={`${isAtTop ? "hover:bg-white/20" : "hover:bg-accent/50"}`}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </motion.div>
    </div>
  );
}

export default MotionIcons;
