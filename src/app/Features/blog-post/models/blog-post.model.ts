import { Category } from "../../Category/Models/category.model";

export interface BlogPost {
    id : string;
    title: string;
    shortDescription: string;
    content: string;
    featuredImageURL: string;
    urlHandle: string;
    // publishedDate: string;
    // auther: Date;
    publishedDate: Date;
    auther: string;
    isVisible: boolean;
    categories : Category[];
}   