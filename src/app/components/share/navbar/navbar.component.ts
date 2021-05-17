import { NavigateByCateService } from './../../../services/navigate-by-cate.service';
import { Category } from './../../../models/category.model';
import { CategoriesService } from './../../../services/categories.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  categories: Category[] = []

  constructor(private categoriesService: CategoriesService, private handleCateService: NavigateByCateService) { }


  ngOnInit(): void {
    this.getAllCategories()
  }

  getAllCategories(){
    this.categoriesService.getAllCategories().subscribe((data: any) =>{
      this.categories = data['categories']
      console.log(this.categories)
    })
  }

  handleCategory(categoryID: string){
    this.handleCateService.btnHandleCategory.next(categoryID)
  }
}
