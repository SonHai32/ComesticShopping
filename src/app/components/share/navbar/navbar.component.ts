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

  constructor(private categoriesService: CategoriesService) { }


  ngOnInit(): void {
    this.getAllCategories()
  }

  getAllCategories(){
    this.categoriesService.getAllCategories().subscribe((data: any) =>{
      this.categories = data['categories']
    })
  }

}
