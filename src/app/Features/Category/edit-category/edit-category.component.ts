import { Component,OnDestroy,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { Category } from '../Models/category.model';
import { updatecategoryrequest } from '../Models/update-category-request.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit,OnDestroy {
  id: string | null = null;
  paramsubscription? : Subscription;
  editcategorysubscription? : Subscription;
  category? : Category;
constructor( private route: ActivatedRoute, private categoryservice: CategoryService,private router: Router, private toastr: ToastrService) {
  // Initialize the category object to avoid null checks in the template
  this.category = {
    id: '',
    name: '',
    urlHandle: ''
  };

}
ngOnInit(): void {
  this.paramsubscription= this.route.paramMap.subscribe({
    next:(params) => {
     this.id= params.get('id');
     if(this.id){
        this.categoryservice.getcategorybyid(this.id).subscribe({
          next:(response : Category) => {
              this.category= response;
          }
     });
    }
  }
  });
}
onFormSubmit() : void {
  const updatecategoryrequest : updatecategoryrequest = {
    name: this.category?.name ?? '',
    urlhandle: this.category?.urlHandle ?? ''
  }
  if(this.id){
   this.editcategorysubscription= this.categoryservice.updatecategory(this.id,updatecategoryrequest).subscribe({
      next: (response) => {
        this.router.navigateByUrl('/admin/addcatagories');
        this.toastr.success('Category updated successfully!');
      }
    });
  }
}

OnDelete() : void{
  if(this.id){
    this.categoryservice.deletecategory(this.id).subscribe({
      next: (response) => {
        this.router.navigateByUrl('/admin/addcatagories');
        this.toastr.success('Category Deleted successfully!');
      }
    });
  }
}
ngOnDestroy(): void {
  this.paramsubscription?.unsubscribe();
  this.editcategorysubscription?.unsubscribe();
}

}
