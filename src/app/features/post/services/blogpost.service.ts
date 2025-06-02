import { inject, Injectable } from '@angular/core';
import { Firestore, doc, setDoc, addDoc } from '@angular/fire/firestore';
import { BlogpostHelper } from '../../../core/helpers/blogpost-helper';

@Injectable({
  providedIn: 'root'
})
export class BlogpostService {

   firestore = inject(Firestore);

   createBlogPost(title: string, content: string){
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
    });
   }
}
