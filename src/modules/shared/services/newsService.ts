import { ITechNews } from "@/modules/shared/interfaces/ITTechNews";
import { newsApiClient } from "../../../app/api/config/axiosInstance";


export const fetchTechNews = async (): Promise<ITechNews[]> => {
  try {
    const response = await newsApiClient.get<{ articles: ITechNews[] }>(
      "/top-headlines",
      {
        params: {
          category: "technology",
          pageSize: 6,
        },
      }
    );
    return response.data.articles;
  } catch (error) {
    console.error("Error fetching tech news:", error);
    return [];
  }
};
