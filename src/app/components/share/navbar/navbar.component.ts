import { Observable } from 'rxjs';
import { Category } from './../../../models/category.model';
import { CategoriesService } from './../../../services/categories.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  categories$!: Observable<Category[]>
  constructor(private categoriesService: CategoriesService) { }


  affixChange(s: any){
  }
  ngOnInit(): void {
    this.categories$ = this.categoriesService.getAllCategories()

  }

}
