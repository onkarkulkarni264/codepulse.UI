import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BlogPost } from '../../blog-post/models/blog-post.model';
import { BlogPostService } from '../../blog-post/services/blog-post.service';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {
  urlHandle: string | null = null;
  blogpost$? : Observable<BlogPost>;
  constructor(private route: ActivatedRoute, private blogpostService: BlogPostService) { 

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        this.urlHandle= params.get('urlHandle');
        console.log('Route parameter urlHandle:', this.urlHandle);
      }
    });
    if(this.urlHandle) {
      this.blogpost$= this.blogpostService.getBlogPostByurlHandle(this.urlHandle);
    }
    
  }
}
