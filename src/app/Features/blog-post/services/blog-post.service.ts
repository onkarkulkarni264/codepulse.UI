import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BlogPost } from '../models/blog-post.model';
import { UpdateBlogPost } from '../models/update-blog-post.model';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {

  constructor(private http: HttpClient) {

  }
  createBlogPost(data: AddBlogPost): Observable<BlogPost> {
    return this.http.post<BlogPost>(`${environment.apibaseurl}/api/blogposts?addAuth=true`, data);
  }
  getAllBlogPosts(searchText?: string, sortBy?: string, sortDirection?: string, pageNumber?: number, pageSize?: number): Observable<BlogPost[]> {
    let httpParams = new HttpParams();
    if (searchText && searchText.trim() !== '') {
      httpParams = httpParams.set('SearchText', searchText.trim());
    }
    if (sortBy) {
      httpParams = httpParams.set('SortBy', sortBy);
    }
    if (sortDirection) {
      httpParams = httpParams.set('SortDirection', sortDirection);
    }
    if (pageNumber) {
      httpParams = httpParams.set('PageNumber', pageNumber);
    }
    if (pageSize) {
      httpParams = httpParams.set('PageSize', pageSize);
    }
    return this.http.get<BlogPost[]>(`${environment.apibaseurl}/api/blogposts`, { params: httpParams });
  }
  getBlogPostCount(searchText?: string): Observable<number> {
    let httpParams = new HttpParams();
    if (searchText && searchText.trim() !== '') {
      httpParams = httpParams.set('SearchText', searchText.trim());
    }
    return this.http.get<number>(`${environment.apibaseurl}/api/blogposts/count`, { params: httpParams });
  }
  getAllBlogPostById(id: string): Observable<BlogPost> {
    var response = this.http.get<BlogPost>(`${environment.apibaseurl}/api/blogposts/${id}`);
    return response;
  }
  updateBlogPostById(id: string, updatedBlogPost: UpdateBlogPost): Observable<BlogPost> {
    return this.http.put<BlogPost>(`${environment.apibaseurl}/api/blogposts/${id}?addAuth=true`, updatedBlogPost);
  }
  deleteBlogPost(id: string): Observable<BlogPost[]> {
    return this.http.delete<BlogPost[]>(`${environment.apibaseurl}/api/blogposts/${id}?addAuth=true`);
  }
  getBlogPostByurlHandle(urlHandle: string): Observable<BlogPost> {
    var response = this.http.get<BlogPost>(`${environment.apibaseurl}/api/blogposts/${urlHandle}?addAuth=true`);
    return response;
  }
}
