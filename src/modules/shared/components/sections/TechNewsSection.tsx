"use client";


import Image from "next/image";
import { ChevronRight, ChevronDown, LucideBadgeCheck } from "lucide-react";
import { formatDateTime } from "@/app/utils/formatDateTime";
import { Button } from "../ui/button";
import { ITechNews } from "@/modules/shared/interfaces/ITTechNews";

interface TechNewsSectionProps {
  techNews: ITechNews[];
}

function TechNewsSection({ techNews }: Readonly<TechNewsSectionProps>) {
  const techNewsWithFeatured = techNews.map((news, index) => ({
    ...news,
    featured: index === 0,
    category: "Technology",
  }));

  if (techNews.length === 0) {
    throw new Error("TechNewsSection: No tech news data available");
  }

  return (
    <section className="py-16 px-8 relative overflow-hidden bg-white z-10 border border-gray-200 rounded-lg shadow-lg">
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-[#4F709C]/15 to-[#E5D9B6]/10 rounded-full blur-3xl opacity-70" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-[#E5D9B6]/15 to-[#4F709C]/10 rounded-full blur-3xl opacity-70" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-[#4F709C]/5 to-[#E5D9B6]/5 rounded-full blur-3xl opacity-30" />

      <div className="relative mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">

          <div className="transform transition-all duration-500 hover:translate-x-1">
            <div className="px-3 py-1 border border-[#4F709C]/20 rounded-full text-sm font-medium text-[#4F709C]/80 inline-flex items-center gap-2 mb-4 bg-[#4F709C]/5 backdrop-blur-sm hover:bg-[#4F709C]/10 transition-all">
              {/* <span className="material-symbols-outlined ">
                new_releases
              </span> */}
              <LucideBadgeCheck className="text-base"/> {" "}
              Latest Updates
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[#213555] to-[#4F709C] bg-clip-text text-transparent leading-tight">
              Tech News
            </h2>
          </div>

          <Button className="group mt-6 md:mt-0 flex items-center gap-2 py-2 px-4 rounded-full bg-white text-[#4F709C]/80 font-medium border border-[#4F709C]/20 hover:bg-[#4F709C]/10 transition-all duration-300 hover:shadow-md">
            View all articles
            <ChevronRight className="material-symbols-outlined transform transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {techNewsWithFeatured.slice(0, 5).map((news) => (
            <div
              key={news.url}
              className={`group rounded-2xl overflow-hidden border border-gray-200/60 transition-all duration-500 hover:shadow-xl hover:border-[#4F709C]/20 bg-white ${
                news.featured ? "lg:col-span-2 lg:row-span-1" : ""
              } hover:-translate-y-2`}
              aria-label={`Read more about ${news.title}`}
            >
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                <Image
                  width={500}
                  height={500}
                  src={
                    news.urlToImage
                      ? `/api/image-proxy?url=${encodeURIComponent(
                          news.urlToImage
                        )}`
                      : "/placeholder.svg"
                  }
                  alt={news.title}
                  className="w-full h-60 object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[#4F709C]/80 font-medium text-xs transform translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                  {news.category}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 z-20 transform translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                  <h3 className="font-bold text-xl text-white mb-2 line-clamp-2">
                    {news.title}
                  </h3>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                  <span className="flex items-center">
                    <span className="material-symbols-outlined mr-1 text-base">
                      calendar_month
                    </span>
                    {formatDateTime(news.publishedAt)}
                  </span>
                  <span className="flex items-center">
                    <span className="material-symbols-outlined mr-1 text-base">
                      sell
                    </span>
                    {news.category}
                  </span>
                </div>

                <h3 className="font-bold text-xl mb-3 line-clamp-2 transition-colors group-hover:text-[#4F709C]">
                  {news.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-3 mb-6">
                  {news.description}
                </p>

                <div className="pt-4 border-t border-gray-100">
                  <Button className="w-full group/btn flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white border border-[#4F709C]/20 text-[#4F709C] font-medium hover:bg-[#4F709C] hover:text-white transition-all duration-300">
                    Read Article
                    <ChevronRight className="material-symbols-outlined transform transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <Button className="py-3 px-8 rounded-full bg-[#4F709C]/10 text-[#4F709C] font-medium hover:bg-[#4F709C] hover:text-white transition-all duration-300 flex items-center gap-2 transform hover:scale-105">
            Load more articles
            <ChevronDown className="material-symbols-outlined transform transition-transform duration-300" />
          </Button>
        </div>
      </div>
    </section>
  );
}

export default TechNewsSection;
