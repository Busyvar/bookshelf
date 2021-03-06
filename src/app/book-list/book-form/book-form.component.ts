import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/Book.model';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.sass']
})
export class BookFormComponent implements OnInit {
  bookForm: any = [];
  fileIsUploading: boolean = false;
  fileUrl: string = "";
  fileUploaded: boolean = false;

  constructor( 
    private formBuilder: FormBuilder,
    private bookService: BooksService,
    private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.bookForm = this.formBuilder.group({
      title: [ '', Validators.required],
      author: ['', Validators.required]
    })
  }

  onSaveBook(){
    const newBook = new Book(
      this.bookForm.get('title').value,
      this.bookForm.get('author').value
    );
    if(this.fileUrl && this.fileUrl != ""){
      newBook.photo = this.fileUrl;
    }
    this.bookService.createNewBook(newBook);
    this.router.navigate(["/books"]);

  }

  onUploadFile(file:File){
    this.fileIsUploading = true;
    this.bookService.uploadFile(file).then((url)=>{
      this.fileUrl = url;
      this.fileIsUploading = false;
      this.fileUploaded = true;
    })
  }

  detectFiles(event:any){
    this.onUploadFile(event.target.files[0])
  }
}
