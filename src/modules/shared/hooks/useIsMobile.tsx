import { useEffect, useState } from "react";

const useIsMobile = (breakpoint = 768) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => { // Safe to use window here
        const checkMobile = () => {
          setIsMobile(window.innerWidth < breakpoint);
        };
    
        checkMobile(); // Initial check
    
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
      }, [breakpoint]);

    return isMobile;
};

export default useIsMobile;