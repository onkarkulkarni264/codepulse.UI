import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './Features/Category/category-list/category-list.component';
import { AddCatagoryComponent } from './Features/Category/add-catagory/add-catagory.component';
import { EditCategoryComponent } from './Features/Category/edit-category/edit-category.component';
import { BlogpostListComponent } from './Features/blog-post/blogpost-list/blogpost-list.component';
import { AddBlogpostComponent } from './Features/blog-post/add-blogpost/add-blogpost.component';
import { EditBlogpostComponent } from './Features/blog-post/edit-blogpost/edit-blogpost.component';
import { HomeComponent } from './Features/Public/home/home.component';
import { BlogDetailsComponent } from './Features/Public/blog-details/blog-details.component';
import { LoginComponent } from './Features/Auth/login/login.component';
import { authGuard } from './Features/Auth/Guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'blog/:urlHandle', component: BlogDetailsComponent },
  { path: 'admin/addcatagories', component: CategoryListComponent, canActivate: [authGuard] },
  { path: 'admin/addcatagories/add', component: AddCatagoryComponent, canActivate: [authGuard] },
  { path: 'admin/categories/:id', component: EditCategoryComponent, canActivate: [authGuard] },
  { path: 'admin/blogposts', component: BlogpostListComponent, canActivate: [authGuard] },
  { path: 'admin/blogposts/add', component: AddBlogpostComponent, canActivate: [authGuard] },
  { path: 'admin/blogposts/:id', component: EditBlogpostComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }