export interface ICategory {
    id: number;
    categoryName: string;
    categoryImage: string
}

export interface GetAllCategoriesResponse {
    getAllCategories: ICategory[];
}
