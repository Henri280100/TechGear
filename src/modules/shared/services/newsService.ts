import { ITechNews } from "@/modules/shared/interfaces/ITTechNews";
import { newsApiClient } from "../../../app/api/config/axiosInstance";


export const fetchTechNews = async ({ pageParam = 1 }): Promise<{ articles: ITechNews[]; nextPage: number | null }> => {
  const pageSize = 5;

  try {
    const res = await newsApiClient.get<{ articles: ITechNews[] }>(
      "/top-headlines",
      {
        params: {
          category: "technology",
          pageSize,
          page: pageParam,
        },
      }
    );

    const hasMore = res.data.articles.length === pageSize;
    return {
      articles: res.data.articles,
      nextPage: hasMore ? pageParam + 1 : null,
    };
  } catch (error) {
    console.error("Error fetching tech news:", error);
    return {
      articles: [],
      nextPage: null,
    };
  }
};
