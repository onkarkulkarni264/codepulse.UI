import { Injectable } from '@angular/core';
import { AddCategoryRequest } from '../Models/add-category-request.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../Models/category.model';
import { environment } from 'src/environments/environment';
import { updatecategoryrequest } from '../Models/update-category-request.model';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {
  private apiUrl = environment.apibaseurl;

  constructor(private http: HttpClient) {
  }



  getallcategories(searchText?: string, sortBy?: string, sortDirection?: string, pageNumber?: number, pageSize?: number): Observable<Category[]> {
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
    return this.http.get<Category[]>(`${this.apiUrl}/api/Categories`, { params: httpParams });
  }
  getcategorybyid(id: string): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/api/Categories/${id}`);
  }
  getCategoryCount(searchText?: string): Observable<number> {
    let httpParams = new HttpParams();
    if (searchText && searchText.trim() !== '') {
      httpParams = httpParams.set('SearchText', searchText.trim());
    }
    return this.http.get<number>(`${this.apiUrl}/api/Categories/count`, { params: httpParams });
  }
  addcategory(model: AddCategoryRequest): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/api/Categories?addAuth=true`, model);
  }
  updatecategory(id: string, updatedcategoryrequest: updatecategoryrequest): Observable<Category> {
    return this.http.put<Category>(`${this.apiUrl}/api/Categories/${id}?addAuth=true`, updatedcategoryrequest);
  }
  deletecategory(id: string): Observable<Category> {
    return this.http.delete<Category>(`${this.apiUrl}/api/Categories/${id}?addAuth=true`);
  }

}