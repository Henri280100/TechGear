import { useEffect, useState } from "react";
import {motion, AnimatePresence} from "motion/react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Info, Monitor, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { FeatureCardType } from "@/app/types/FeatureCard";

const Hero = () => {
    const [isLoaded, setIsLoaded] = useState(false);
  
    useEffect(() => {
      setIsLoaded(true);
  
      const handleScroll = () => {
        const elements = document.querySelectorAll(".animate-on-scroll");
        elements.forEach((element) => {
          const elementTop = element.getBoundingClientRect().top;
          const windowHeight = window.innerHeight;
          if (elementTop < windowHeight * 0.75) {
            element.classList.add("animate-fade-in");
          }
        });
      };
  
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);
  
    return (
      <div className="relative min-h-screen overflow-hidden bg-gray-900">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.4)",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 opacity-70"></div>
        </div>
  
        <div className="relative z-10 px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <AnimatePresence>
            {isLoaded && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <motion.h1
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl"
                >
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                    Epic Gaming
                  </span>
                  <span className="block mt-2">Awaits!</span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="max-w-xl mx-auto mt-6 text-xl text-gray-300"
                >
                  Experience the future of gaming with our latest products!
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="mt-8"
                >
                  <Button
                    size="lg"
                    className="px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out transform hover:scale-105"
                  >
                    Explore Now
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
  
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="grid gap-8 mt-16 lg:grid-cols-3"
          >
            {/* Gaming PC Feature */}
            <FeatureCard
              image="https://images.unsplash.com/photo-1587202372775-e229f172b9d7"
              title="Ultimate Gaming PC"
              description="RTX 4090, Intel i9, 64GB RAM - Dominate every game!"
              buttonText="Explore Gaming PC"
              buttonIcon={<Monitor />}
              buttonColor="bg-blue-600 hover:bg-blue-700"
              saleTag={undefined}
            />
  
            {/* Upcoming Laptop Feature */}
            <FeatureCard
              image="https://images.unsplash.com/photo-1593642632823-8f785ba67e45"
              title="Coming Soon: Next-Gen Laptop"
              description="Elevate Your Game with Revolutionary Performance!"
              buttonText="Learn More"
              buttonIcon={<Info />}
              buttonColor="bg-purple-600 hover:bg-purple-700"
              saleTag={undefined}
            />
  
            {/* Sale Announcement */}
            <FeatureCard
              image="https://images.unsplash.com/photo-1593640408182-31c70c8268f5"
              title="Limited Time Sale!"
              description="Massive discounts on selected gaming gear!"
              buttonText="Shop Now"
              buttonIcon={<ShoppingCart />}
              buttonColor="bg-red-600 hover:bg-red-700"
              saleTag="30% OFF"
            />
          </motion.div>
  
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex justify-center mt-16"
          >
            <ChevronDown className="text-white animate-bounce" size={24}/>
          </motion.div>
        </div>
      </div>
    );
  };
  
  const FeatureCard: React.FC<FeatureCardType> = ({
    image,
    title,
    description,
    buttonText,
    buttonIcon,
    buttonColor,
    saleTag,
  }) => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="p-6 transition-all duration-300 bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl"
    >
      <div className="relative overflow-hidden rounded-lg">
        <Image
          src={image}
          alt={title}
          className="object-cover w-full h-48 transition-transform duration-300 hover:scale-110"
        />
        {saleTag && (
          <div className="absolute top-0 right-0 px-4 py-2 text-white bg-red-600 rounded-bl-lg">
            {saleTag}
          </div>
        )}
      </div>
      <h3 className="mt-4 text-2xl font-bold text-white">{title}</h3>
      <p className="mt-2 text-gray-300">{description}</p>
      <Button
        className={`flex items-center justify-center w-full gap-2 px-4 py-2 mt-4 text-white transition-colors rounded-lg ${buttonColor}`}
      >
        {buttonIcon}
        {buttonText}
      </Button>
    </motion.div>
  );

export default Hero;