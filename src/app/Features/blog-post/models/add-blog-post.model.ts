export interface AddBlogPost {
    Title: string;
    ShortDescription: string;
    Content: string;
    FeaturedImageURL: string;
    URLHandle: string;
    Auther: string;
    PublishedDate: Date;
    IsVisible: boolean;
    Categories: string[];
}