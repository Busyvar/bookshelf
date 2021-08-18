import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/models/Book.model';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-single-view',
  templateUrl: './single-view.component.html',
  styleUrls: ['./single-view.component.sass']
})
export class SingleViewComponent implements OnInit {
  book: Book = new Book("","");

  constructor(private route : ActivatedRoute, private router: Router, private bookService: BooksService) { }

  ngOnInit(): void {
    this.book = new Book('','');
    const id:number = this.route.snapshot.params['id'];
    this.bookService.getSingleBook(id).then(
      (book:Book)=>{
      this.book = book;
    });
  }
  onBack(){
    this.router.navigate(["/books"]);
  }

}
