"use client";

import { ChevronRight } from "lucide-react";
import { Button } from "../../ui/button";

function ShopSaleSection() {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6">Shop Sale</h2>
      <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-8 rounded-lg shadow-lg">
        <h3 className="text-3xl font-bold mb-4">Summer Gaming Blowout!</h3>
        <p className="text-xl mb-6">
          Up to 50% off on selected gaming gear. Limited time offer!
        </p>
        <Button size="lg" className="bg-white text-red-500 hover:bg-gray-100">
          Shop Now <ChevronRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </section>
  );
}

export default ShopSaleSection;
