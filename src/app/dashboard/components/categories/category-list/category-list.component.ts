import { take } from 'rxjs/operators';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../../models/category.model';
import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
interface CategoryVM {
  loading: boolean;
  categories: Category[];
  totalResult: number;
  page: number;
  perPage: number;
}
@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit {
  constructor(
    private categoryService: CategoryService,
    private nzMessageService: NzMessageService
  ) {}
  categoriesVM: CategoryVM = {
    categories: [],
    loading: true,
    page: 1,
    perPage: 12,
    totalResult: 0,
  };
  categories!: Category[];
  loadingCategories: boolean = true;
  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this.categoryService
      .getAllCategory()
      .pipe(take(1))
      .subscribe((res: any) => {
        if (res.status === 'SUCCESS') {
          this.categories = res.categories as Category[];
          this.categoriesVM.categories = res.categories as Category[];
          this.categoriesVM.totalResult = res.totalResult;
        } else {
          this.nzMessageService.error(res.message);
        }
        this.categoriesVM.loading = false;
        this.loadingCategories = false;
      });
  }
  onPageIndexChange() {
    this.getAllCategories()
  }

}
