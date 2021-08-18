import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';
import { Book } from '../models/Book.model';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.sass']
})
export class BookListComponent implements OnInit , OnDestroy{
  books: Array<Book> = [];
  bookSubscription: Subscription = new Subscription();

  constructor(private bookService: BooksService, private router: Router) { }

  ngOnInit(): void {
    this.bookSubscription = this.bookService.bookSubject.subscribe(
      (books:Book[])=>{
        this.books = books;
      }
    );
    this.bookService.loadBooks();
    this.bookService.emitBooks();
  }

  onNewBook(){
    this.router.navigate(["/books", "new"])
  }
  onDeleteBook(book:Book){
    this.bookService.removeBook(book);
  }
  onViewBook(id:number){
    this.router.navigate(["/books", "view", id]);
  }
  ngOnDestroy(){
    this.bookSubscription.unsubscribe();
  }


}
