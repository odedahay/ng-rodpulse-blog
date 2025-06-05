import { inject, Injectable } from '@angular/core';
import { Storage, uploadBytes, getDownloadURL, uploadBytesResumable, UploadTask } from '@angular/fire/storage';
import { ref } from 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  firebaseStorage = inject(Storage);

  uploadImage(imageName: string, image: File): UploadTask{
    const storageRef = ref(this.firebaseStorage, `images/${imageName}`);
    return uploadBytesResumable(storageRef, image);
  }

  // private storage = inject(Storage); // ✅ inject instead of using getStorage()

  // async uploadImage(filePath: string, file: File) {
  //   const storageRef = ref(this.storage, filePath);
  //   const snapshot = await uploadBytes(storageRef, file);
  //   return snapshot;
  // }

  // async getDownloadUrl(snapshot: any): Promise<string> {
  //   return getDownloadURL(snapshot.ref);
  // }

}
