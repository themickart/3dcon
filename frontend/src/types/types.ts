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
    avatarArl: string;
    salesCount: number;
    reputation: IReputation;
}

export interface IProduct {
    id?: number;
    category: string;
    name: string;
    coverArl: string;
    gallery: string[];
    price: number;
    author: IAuthor;
    description: string;
    likesCount: number;
    viewsCount: number;
    tags: string[];
    info: IInfo;
    license: string;
    createdAt: string;
    isLiked: boolean;
    isViewed: boolean;
}

// export interface ModelProps {
//   id: string;
//   title: string;
//   imgUrl: string;
//   category: string;
//   price: string;
//   sales: string;
//   views: string;
// }

// interface InputType {
//   id: number;
//   title: string;
//   category: string;
//   price: string;
// }
