import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { BlogPostService } from '../services/blog-post.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../Category/services/category.service';
import { Observable, Subscription } from 'rxjs';
import { Category } from '../../Category/Models/category.model';
import { ImageService } from 'src/app/Shared/Components/image-selector/image.service';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css']
})
export class AddBlogpostComponent implements OnInit, OnDestroy {

  model : AddBlogPost;
  isImageSelectorOpen: boolean = false;
  categories$?: Observable<Category[]>;
  imageSelectorSubscription?: Subscription; 
  constructor(private blogpostservice: BlogPostService, private router: Router, private toastr: ToastrService,
              private categoryservice: CategoryService, private imageService: ImageService) 
  {
    this.model = {
      Title: '',
      ShortDescription: '',
      Content: '',
      FeaturedImageURL: '',
      URLHandle: '',
      Auther: '',
      PublishedDate: new Date(),
      IsVisible: true,
      Categories: []
    };
  }
  ngOnInit(): void {
    this.categories$ = this.categoryservice.getallcategories();
    this.imageSelectorSubscription = this.imageService.onSelectImage().subscribe({
          next: (image) => {
            if(this.model) {
              this.model.FeaturedImageURL = image.url;
              this.closeImageSelector();
            }
          }
        });
  }
  onformSubmit () : void {
     this.blogpostservice.createBlogPost(this.model).subscribe({
      next: (response) => {
        this.router.navigateByUrl('/admin/blogposts');
        this.toastr.success('Blog Post Added successfully!');
      }
     });
  }
  openImageSelector() : void {
    this.isImageSelectorOpen = true;
  }
  closeImageSelector() : void {
    this.isImageSelectorOpen = false;
  }
  ngOnDestroy(): void {
    this.imageSelectorSubscription?.unsubscribe();
  }
}
