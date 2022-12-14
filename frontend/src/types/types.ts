export interface IInfo {
    [key: string]: string;
}

export interface ILoginData {
    username: string;
    password: string;
}

export interface IRegisterData {
    email: string;
    username: string;
    password: string;
}

export interface IReputation {
    reviews: number;
    reviewsThisMonth: number;
    reviewsThisWeek: number;
    total: number;
}

export interface IAuthor {
    name: string;
    avatarUrl: string;
    salesCount: number;
    reputation: IReputation;
    id?: number;
}

export interface IProduct {
    id?: number;
    category: string;
    name: string;
    coverUrl: string;
    gallery: string[];
    price: number;
    author: IAuthor;
    description: string;
    likesCount: number;
    viewsCount: number;
    tags: string[];
    info: IInfo;
    license: string;
    createdAt?: string;
    isLiked?: boolean;
    isViewed?: boolean;
}

export interface ICategory {
    title: string;
    imgUrl: string;
}