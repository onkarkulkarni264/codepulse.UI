import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogPost } from '../models/blog-post.model';
import { CategoryService } from '../../Category/services/category.service';
import { Category } from '../../Category/Models/category.model';
import { UpdateBlogPost } from '../models/update-blog-post.model';
import { BlogPostService } from '../services/blog-post.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageService } from 'src/app/Shared/Components/image-selector/image.service';

@Component({
  selector: 'app-edit-blogpost',
  templateUrl: './edit-blogpost.component.html',
  styleUrls: ['./edit-blogpost.component.css']
})
export class EditBlogpostComponent implements OnInit,OnDestroy  {
  id : string | null = null;
  model? : BlogPost;
  categories$? : Observable<Category[]>;
  selectedCategories? : string[];
  @ViewChild('deleteConfirmModal') deleteConfirmModal!: TemplateRef<any>;
  isImageSelectorOpen: boolean = false;

  routeSubscription? : Subscription;
  updateBlogPostSubscription? : Subscription;
  getBlogPostSubscription? : Subscription;
  deleteBlogPostSubscription? : Subscription;
  imageSelectorSubscription? : Subscription;

  constructor(private Route : ActivatedRoute, 
              private blogpostservice : BlogPostService,
              private categoryService : CategoryService,
              private router : Router,
              private modalService: NgbModal,
              private toastr: ToastrService,
              private imageService: ImageService
            ) { }

  ngOnInit(): void {
    this.categories$ = this.categoryService.getallcategories();

    this.routeSubscription = this.Route.paramMap.subscribe({
      next: (param) => {
        this.id = param.get('id');
        if(this.id) {
          this.getBlogPostSubscription=this.blogpostservice.getAllBlogPostById(this.id).subscribe({
            next: (response: BlogPost) => {
              this.model = response;
              this.selectedCategories = this.model.categories.map(c => c.id);
            }
          });
        }
        this.imageSelectorSubscription = this.imageService.onSelectImage().subscribe({
          next: (image) => {
            if(this.model) {
              this.model.featuredImageURL = image.url;
              this.isImageSelectorOpen = false;
            }
          }
        });
      }
    });
  }

  onformSubmit():void {
    if(this.model && this.id) {
      var updateBlogPost : UpdateBlogPost = {
        Title: this.model.title,
        ShortDescription: this.model.shortDescription,
        Content: this.model.content,
        FeaturedImageURL: this.model.featuredImageURL,
        URLHandle: this.model.urlHandle,
        Auther: this.model.auther,
        PublishedDate: this.model.publishedDate,
        IsVisible: this.model.isVisible,
        Categories: this.selectedCategories ?? []
      };
      this.updateBlogPostSubscription=this.blogpostservice.updateBlogPostById(this.id, updateBlogPost).subscribe({
        next: (response: BlogPost) => {
          this.router.navigateByUrl('/admin/blogposts');
        }
     });
    }
  }
  onCancel() : void {
    this.router.navigateByUrl('/admin/blogposts');
  }

  openImageSelector() : void {
    this.isImageSelectorOpen = true;
  }
  closeImageSelector() : void {
    this.isImageSelectorOpen = false;
  }

  deleteBlogPost(id: string) {
    if(this.id){
        this.modalService.open(this.deleteConfirmModal).result.then(
      (result) => {
        console.log('Modal result:', result);
        if (result === 'yes') {
          this.deleteBlogPostSubscription=this.blogpostservice.deleteBlogPost(id).subscribe({
            next: (response) => {
              this.router.navigateByUrl('/admin/blogposts');
              this.toastr.success('Blog Post deleted successfully!');
            },
            error: (error) => {
              this.toastr.error('Error deleting Blog Post!');
            }
          });
        }
      },
      (reason) => {
      }
    );
    }
    
  }
  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.updateBlogPostSubscription?.unsubscribe();
    this.getBlogPostSubscription?.unsubscribe();
    this.deleteBlogPostSubscription?.unsubscribe();
    this.imageSelectorSubscription?.unsubscribe();
  }
}
