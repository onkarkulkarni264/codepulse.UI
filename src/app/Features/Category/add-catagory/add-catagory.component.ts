import { Component, OnDestroy } from '@angular/core';
import { AddCategoryRequest } from '../Models/add-category-request.model';
import { CategoryService } from '../services/category.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-catagory',
  templateUrl: './add-catagory.component.html',
  styleUrls: ['./add-catagory.component.css']
})
export class AddCatagoryComponent implements OnDestroy {

  model: AddCategoryRequest;
  private addcategorysubscription? : Subscription

  constructor(private CategoryService: CategoryService, private router: Router) {
    this.model = {
      name: '',
      urlhandle: ''
    };
  }
  

onFormSubmit() {
  this.addcategorysubscription =
  this.CategoryService.addcategory(this.model).subscribe({
    next: () => {
      this.router.navigate(['/admin/addcatagories']);
    },
    error: () => {
      alert('Error adding category');
    }
  })
}

ngOnDestroy(): void {
    this.addcategorysubscription?.unsubscribe();
  
}

}
