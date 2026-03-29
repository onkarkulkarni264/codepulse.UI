import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../Models/category.model';
import { CategoryService } from '../services/category.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})

export class CategoryListComponent implements OnInit {
  categories$?: Observable<Category[]>;
  currentSearchText: string = '';
  sortBy: string = '';
  sortDirection: string = '';
  categoryCount?: number | null = 0;
  totalPages: number = 0;
  currentPage: number = 1;
  pageSize: number = 5;

  constructor(private router: Router, private categoryservise: CategoryService) { }

  navigateToAdminCategory() {
    this.router.navigate(['/admin/Category']);
  }

  ngOnInit(): void {


    this.categoryservise.getCategoryCount().subscribe({
      next: (response) => {
        this.categoryCount = response;
        this.totalPages = Math.ceil((this.categoryCount ?? 0) / this.pageSize);

        this.categories$ = this.categoryservise.getallcategories(undefined, undefined, undefined, this.currentPage, this.pageSize);
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
      this.categories$ = this.categoryservise.getallcategories(this.currentSearchText, this.sortBy, this.sortDirection, this.currentPage, this.pageSize);
    }
  }

  NextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.categories$ = this.categoryservise.getallcategories(this.currentSearchText, this.sortBy, this.sortDirection, this.currentPage, this.pageSize);
    }
  }

  GoToPage(page: number) {
    this.currentPage = page;
    this.categories$ = this.categoryservise.getallcategories(this.currentSearchText, this.sortBy, this.sortDirection, this.currentPage, this.pageSize);
  }

  SearchCatagories(searchText: string): void {
    this.currentSearchText = searchText;
    this.currentPage = 1;
    this.categoryservise.getCategoryCount(searchText).subscribe({
      next: (response) => {
        this.categoryCount = response;
        this.totalPages = Math.ceil((this.categoryCount ?? 0) / this.pageSize);
        this.categories$ = this.categoryservise.getallcategories(searchText, this.sortBy, this.sortDirection, this.currentPage, this.pageSize);
      }
    });
  }

  SortCategories(sortBy: string, sortDirection: string): void {
    this.sortBy = sortBy;
    this.sortDirection = sortDirection;
    this.categories$ = this.categoryservise.getallcategories(this.currentSearchText, this.sortBy, this.sortDirection);
  }
}
