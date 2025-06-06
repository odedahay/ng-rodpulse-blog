import { Timestamp } from "@angular/fire/firestore";

export interface BlogPost{
    title: string;
    slug: string;
    content: string;
    coverImageUrl: string;
    publishedOn: Timestamp;
}