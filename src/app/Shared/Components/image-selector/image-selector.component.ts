import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ImageService } from './image.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { BlogImage } from '../../models/blog-image.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrls: ['./image-selector.component.css']
})
export class ImageSelectorComponent implements OnInit {
  
  @Output() close = new EventEmitter<void>();
  @ViewChild('form', { static: false } ) imageUploadForm?: NgForm;

  private file?: File;
  filename: string = '';
  title: string = '';
  images$? : Observable<BlogImage[]>;
  
  constructor(protected imageService : ImageService,
              private toastr: ToastrService) {
    
  }
  ngOnInit(): void {
    this.GetImages();
  }


  onFileSelected(event: Event) : void {
    const element = event?.currentTarget as HTMLInputElement;
    this.file = element?.files?.[0];
  }
  uploadImage() : void {
    if (this.file && this.title  !== "" && this.filename  !== "") {
      this.imageService.UploadImage(this.file, this.filename, this.title).subscribe({
        next: (response) => {
          this.toastr.success('Image uploaded successfully');
          this.imageUploadForm?.resetForm();
          this.GetImages();
        }
      });
    } 
  }
  private GetImages(){
    this.images$ = this.imageService.GetAllImages();
  }
  SelectImage(image: BlogImage) : void {
    this.imageService.SelectImage(image);
  }

} 
