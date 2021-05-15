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
  menus = [
    {
      level: 1,
      title: 'Trang điểm',
      icon: 'mail',
      open: true,
      selected: false,
      disabled: false,
      children: [
        {
          level: 2,
          title: 'TRANG ĐIỂM MẶT',
          icon: 'bars',
          open: false,
          selected: false,
          disabled: false,
          children: [
            {
              level: 3,
              title: 'Kem che khuyết điểm',
              selected: false,
              disabled: false
            },
            {
              level: 3,
              title: 'Kem nền',
              selected: false,
              disabled: true
            },
            {
              level: 3,
              title: 'Phấn má hồng',
              selected: false,
              disabled: false
            },
            {
              level: 3,
              title: 'Xịt khoáng nền',
              selected: false,
              disabled: true
            }
          ]
        },
        {
          level: 2,
          title: 'Group 2',
          icon: 'bars',
          selected: true,
          disabled: false
        },
        {
          level: 2,
          title: 'Group 3',
          icon: 'bars',
          selected: false,
          disabled: false
        }
      ]
    },
    {
      level: 1,
      title: 'Team Group',
      icon: 'team',
      open: false,
      selected: false,
      disabled: false,
      children: [
        {
          level: 2,
          title: 'User 1',
          icon: 'user',
          selected: false,
          disabled: false
        },
        {
          level: 2,
          title: 'User 2',
          icon: 'user',
          selected: false,
          disabled: false
        }
      ]
    }
  ];


  constructor(private categoriesService: CategoriesService) { }


  ngOnInit(): void {
    this.getAllCategories()
  }

  getAllCategories(){
    this.categoriesService.getAllCategories().subscribe((data: any) =>{
      this.categories = data['categories']
      console.log(this.categories)
    })
  }
}
