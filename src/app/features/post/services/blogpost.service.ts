import { inject, Injectable } from '@angular/core';
import { Firestore, doc, setDoc, addDoc, collection, collectionData, docData, deleteDoc, query, where } from '@angular/fire/firestore';
import { BlogpostHelper } from '../../../core/helpers/blogpost-helper';
import { from, Observable } from 'rxjs';
import { BlogPost } from '../models/blogpost.model';
import { UserService } from '../../../core/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class BlogpostService {

   firestore = inject(Firestore);
   userService = inject(UserService);

   createBlogPost(title: string, content: string, coverImageUrl: string){
    // addDoc
    // const postsCollectionReference = collection(this.firestore, 'blog-posts');

    // addDoc(postsCollectionReference, {
    //   title : title,
    //   content: content,
    //   publishedOn: new Date(),
    // })

    // setDoc
    const blogPostDocumentRef = doc(this.firestore, 'blog-posts', BlogpostHelper.createSlug(title))
    
    setDoc(blogPostDocumentRef, {
      title : title,
      content: content,
      publishedOn: new Date(),
      coverImageUrl: coverImageUrl,
      userId: this.userService.currentUser()?.id
    });
   }

   updateBlogPost(slug:string, title: string, content: string, coverImageUrl: string){
    // addDoc
    // const postsCollectionReference = collection(this.firestore, 'blog-posts');

    // addDoc(postsCollectionReference, {
    //   title : title,
    //   content: content,
    //   publishedOn: new Date(),
    // })

    // setDoc
    const blogPostDocumentRef = doc(this.firestore, 'blog-posts', slug)
    
    setDoc(blogPostDocumentRef, {
      title : title,
      content: content,
      publishedOn: new Date(),
      coverImageUrl: coverImageUrl,
      userId: this.userService.currentUser()?.id
    });
   }

   getBlogPostsByUser(): Observable<BlogPost[]>{
    const blogPostCollectionRef = collection(this.firestore, 'blog-posts');

    const queryBlogPostFilterByUser = query(blogPostCollectionRef, where('userId', '==', this.userService.currentUser()?.id));

    return collectionData(queryBlogPostFilterByUser, {
      idField: 'slug'
    }) as Observable<BlogPost[]>;
   }

   getBlogPostBySlug(slug: string): Observable<BlogPost>{
      const blogPostDocumentRef = doc(this.firestore, 'blog-posts', slug);
      return docData(blogPostDocumentRef, {
        idField: 'slug'
      }) as Observable<BlogPost>;
   }

   deleteBlogPostBySlug(slug: string): Observable<void>{
      const blogPostDocumentRef = doc(this.firestore, 'blog-posts', slug);
      const promise = deleteDoc(blogPostDocumentRef);

      return from(promise);
   }
}
