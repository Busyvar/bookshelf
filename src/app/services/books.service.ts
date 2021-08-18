import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Book } from '../models/Book.model';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  books: Book[] = [];
  bookSubject = new Subject<Book[]>();

  emitBooks(){
    this.bookSubject.next(this.books);
  }
  saveBooks(){
    firebase.default.database().ref("/books").set(this.books);
  }

  loadBooks(){
    firebase.default.database().ref("/books").on('value', (data)=>{
      this.books = data.val() ? data.val(): [];
      this.emitBooks();
    });
  }

  getSingleBook(id:number):Promise<any> {
    return new Promise((resolve, reject)=>{
      firebase.default.database().ref("/books/" + id).once('value').then(
        (data) => { resolve(data.val()); },
        (error) => { reject(error) })
    })
  }

  createNewBook(book:Book){
    this.books.push(book);
    this.saveBooks();
    this.emitBooks();
  }

  removeBook(book: Book){
    this.books.splice(this.books.findIndex((e)=> e === book), 1);
    if(book.photo){
      const storageRef = firebase.default.storage().refFromURL(book.photo);
      storageRef.delete().then(()=>{
        console.log("photo has been deleted");
      }).catch((err)=>{
        console.log("fichier non trouvé:"+err)
      });
    }
    this.saveBooks();
    this.emitBooks();
  }

  uploadFile(file: File):Promise<any>{
    return new Promise((resolve, reject)=>{
      const almosUniqueFileName = Date.now().toString();
      const upload = firebase.default.storage().ref()
        .child('images/' + almosUniqueFileName + file.name)
        .put(file);
        upload.on(firebase.default.storage.TaskEvent.STATE_CHANGED,
          ()=>{
            console.log("loading...")
          },
          (error)=> {
            console.log("An error occured:" + error);
            reject(error);
          },
          ()=>{
            resolve(upload.snapshot.ref.getDownloadURL());
          })

    })
  }

}
