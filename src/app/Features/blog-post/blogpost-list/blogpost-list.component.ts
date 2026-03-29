import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { BlogPostService } from '../services/blog-post.service';
import { Observable } from 'rxjs';
import { BlogPost } from '../models/blog-post.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-blogpost-list',
  templateUrl: './blogpost-list.component.html',
  styleUrls: ['./blogpost-list.component.css']
})
export class BlogpostListComponent implements OnInit {
  $blogposts?: Observable<BlogPost[]>;
  @ViewChild('deleteConfirmModal') deleteConfirmModal!: TemplateRef<any>;

  currentSearchText: string = '';
  sortBy: string = '';
  sortDirection: string = '';
  blogpostCount?: number | null = 0;
  totalPages: number = 0;
  currentPage: number = 1;
  pageSize: number = 5;

  constructor(private blogPostservicse: BlogPostService, private modalService: NgbModal
    , private toastr: ToastrService
  ) {

  }

  ngOnInit(): void {
    this.blogPostservicse.getBlogPostCount().subscribe({
      next: (response) => {
        this.blogpostCount = response;
        this.totalPages = Math.ceil((this.blogpostCount ?? 0) / this.pageSize);
        this.$blogposts = this.blogPostservicse.getAllBlogPosts(undefined, undefined, undefined, this.currentPage, this.pageSize);
      }
    });
  }

  getPages(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  PreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.$blogposts = this.blogPostservicse.getAllBlogPosts(this.currentSearchText, this.sortBy, this.sortDirection, this.currentPage, this.pageSize);
    }
  }

  NextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.$blogposts = this.blogPostservicse.getAllBlogPosts(this.currentSearchText, this.sortBy, this.sortDirection, this.currentPage, this.pageSize);
    }
  }

  GoToPage(page: number) {
    this.currentPage = page;
    this.$blogposts = this.blogPostservicse.getAllBlogPosts(this.currentSearchText, this.sortBy, this.sortDirection, this.currentPage, this.pageSize);
  }

  SearchBlogPosts(searchText: string): void {
    this.currentSearchText = searchText;
    this.currentPage = 1;
    this.blogPostservicse.getBlogPostCount(searchText).subscribe({
      next: (response) => {
        this.blogpostCount = response;
        this.totalPages = Math.ceil((this.blogpostCount ?? 0) / this.pageSize);
        this.$blogposts = this.blogPostservicse.getAllBlogPosts(searchText, this.sortBy, this.sortDirection, this.currentPage, this.pageSize);
      }
    });
  }

  SortBlogPosts(sortBy: string, sortDirection: string): void {
    this.sortBy = sortBy;
    this.sortDirection = sortDirection;
    this.$blogposts = this.blogPostservicse.getAllBlogPosts(this.currentSearchText, this.sortBy, this.sortDirection);
  }

  deleteBlogPost(id: string) {
    this.modalService.open(this.deleteConfirmModal).result.then(
      (result) => {
        console.log('Modal result:', result);
        if (result === 'yes') {
          this.blogPostservicse.deleteBlogPost(id).subscribe({
            next: (response) => {
              this.$blogposts = this.blogPostservicse.getAllBlogPosts(this.currentSearchText, this.sortBy, this.sortDirection, this.currentPage, this.pageSize);
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
