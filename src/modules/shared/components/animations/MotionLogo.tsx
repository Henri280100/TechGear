import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import useIsMobile from "../../hooks/useIsMobile";

const MotionLogo = () => {
  const isMobile = useIsMobile();
  

  return (
    <Link href="/" className="text-2xl font-bold text-primary">
      <motion.span
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
      >
        <Image
          src="/TG.svg"
          alt="Logo"
          width={30}
          height={30}
          className="inline-block m-3"
          priority
          quality={80}
        />
        {!isMobile && "TGShop"}
      </motion.span>
    </Link>
  );
};

export default MotionLogo;
