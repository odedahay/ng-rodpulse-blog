import { Timestamp } from "@angular/fire/firestore";

export class BlogPostHelper {
    static createSlug(title: string): string {
        // remove all spaces and replace with a dash
        // add a random three digit number to the end of the slug
        // return the slug
        // example: "My First Blog Post" -> "my-first-blog-post-123"
        const slug = title.toLowerCase().replace(/\s+/g, '-');
        const randomThreeDigitNumber = Math.floor(Math.random() * 1000);
        return `${slug}-${randomThreeDigitNumber}`;
    }

    static converTimestampToDate(timestamp: Timestamp){
        return timestamp.toDate();
      }
}