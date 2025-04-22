import { ITechNews } from "@/modules/shared/interfaces/ITTechNews";
import { getRequest } from "./httpService";
import { newsApiClient } from "@/app/api/config/axiosInstance";

export const fetchTechNews = async ({
  pageParam = 1,
}): Promise<{ articles: ITechNews[]; nextPage: number | null }> => {
  const pageSize = 5;

  try {
    const data = await getRequest<{ articles: ITechNews[] }>(
      newsApiClient,
      "/top-headlines",
      {
        category: "technology",
        pageSize: 5,
        page: pageParam,
      }
    );

    const hasMore = data.articles.length === pageSize;

    return {
      articles: data.articles,
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
