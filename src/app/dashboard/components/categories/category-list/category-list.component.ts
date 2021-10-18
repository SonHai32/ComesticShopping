import { NzModalService } from 'ng-zorro-antd/modal';
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
    private nzMessageService: NzMessageService,
    private nzModalMessage: NzModalService
  ) {}
  categoriesVM: CategoryVM = {
    categories: [],
    loading: true,
    page: 1,
    perPage: 12,
    totalResult: 0,
  };
  // categories!: Category[];
  categoryChecked: boolean = false;
  indeterminated: boolean = false;
  setOfCategoryChecked = new Set<string>();
  requestLoading: boolean = false;
  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this.categoryService
      .getAllCategory()
      .pipe(take(1))
      .subscribe((res: any) => {
        if (res.status === 'SUCCESS') {
          // this.categories = res.categories as Category[];
          this.categoriesVM.categories = res.categories as Category[];
          this.categoriesVM.totalResult = res.totalResult;
        } else {
          this.nzMessageService.error(res.message);
        }
        this.categoriesVM.loading = false;
        this.requestLoading = false;
      });
  }
  onPageIndexChange() {
    this.getAllCategories();
  }

  onItemChecked(id: string, check: boolean) {
    this.updateItemCheck(id, check);
    this.refreshItemCheckStatus();
  }

  onAllItemChecked(check: boolean) {
    this.categoriesVM.categories.forEach((val) => {
      if (!val._id) return;
      this.updateItemCheck(val._id, check);
    });
    this.refreshItemCheckStatus();
  }

  updateItemCheck(id: string, check: boolean) {
    if (check) this.setOfCategoryChecked.add(id);
    else this.setOfCategoryChecked.delete(id);
  }

  refreshItemCheckStatus() {
    this.categoryChecked = this.categoriesVM.categories.every((val) => {
      return val._id && this.setOfCategoryChecked.has(val._id);
    });
    this.indeterminated = this.categoriesVM.categories.some((val) => {
      return (
        val._id &&
        this.setOfCategoryChecked.has(val._id) &&
        !this.categoryChecked
      );
    });
  }
  deteteConfirmSingleItem(ID: string | undefined, categoryName: string) {
    if (ID) {
      this.nzModalMessage.confirm({
        nzTitle: 'Bạn có chắn muốn xoá danh mục ?',
        nzContent: `<b style="color: red;">${categoryName}</b>`,
        nzOkText: 'Đồng Ý',
        nzOkType: 'primary',
        nzOkDanger: true,
        nzOnOk: () =>
          this.deleteSingleCategory(ID)
            .then((res: any) => {
              if (res.status === 'SUCCESS') {
                this.nzMessageService.success('Xoá thành công');
                this.afterItemDelete(ID);
              } else {
                this.nzMessageService.error(res.message);
              }
            })
            .catch((err) => this.nzMessageService.error(err.message)),
        nzCancelText: 'Huỷ',
      });
    } else {
      this.nzMessageService.warning('Missing product_id');
    }
  }

  deleteConfirmMultipleItem() {
    if (this.setOfCategoryChecked.size > 0) {
      this.nzModalMessage.confirm({
        nzTitle: 'Vui lòng xác nhận',
        nzContent: `<b style="color: red;">Bạn có chắn chắn muốn xoá ${this.setOfCategoryChecked.size} danh mục ?</b>`,
        nzOkText: 'Đồng Ý',
        nzOkType: 'primary',
        nzOkDanger: true,
        nzOnOk: () =>
          this.deleteMultiplecategoy()
            .then((res: any) => {
              if (res.status === 'SUCCESS') {
                this.nzMessageService.success('Xoá thành công');
                this.afterItemDelete();
              } else {
                this.nzMessageService.error(res.message);
              }
              this.requestLoading = false;
            })
            .catch((err) => this.nzMessageService.error(err.message)),

        nzCancelText: 'Huỷ',
      });
    }
  }

  // deleteSingleCategory(ID: string) {
  //   this.requestLoading = true;
  //   this.categoryService
  //     .deleteCategory([ID])
  //     .pipe(take(1))
  //     .subscribe((res: any) => {
  //       if (res.status === 'SUCCESS') {
  //         this.nzMessageService.success('Xoá thành công');
  //         this.afterItemDelete(ID);
  //       } else {
  //         this.nzMessageService.error(res.message);
  //       }

  //       this.requestLoading = false;
  //     });
  // }
  deleteSingleCategory(ID: string) {
    return this.categoryService.deleteCategory([ID]).pipe(take(1)).toPromise();
  }
  deleteMultiplecategoy() {
    return this.categoryService
      .deleteCategory(
        this.categoriesVM.categories
          .filter(
            (val: Category) => val._id && this.setOfCategoryChecked.has(val._id)
          )
          .map((res: Category) => (res._id ? res._id : ''))
          .filter((res: string) => res)
      )
      .pipe(take(1))
      .toPromise();
    // .subscribe((res: any) => {
    //   if (res.status === 'SUCCESS') {
    //     this.nzMessageService.success('Xoá thành công');
    //     this.afterItemDelete();
    //   } else {
    //     this.nzMessageService.error(res.message);
    //   }
    //   this.requestLoading = false;
    // });
  }

  afterItemDelete(id?: string) {
    if (!id) {
      this.categoriesVM.categories = this.categoriesVM.categories.filter(
        (val: Category) => val._id && !this.setOfCategoryChecked.has(val._id)
      );
    } else
      this.categoriesVM.categories = this.categoriesVM.categories.filter(
        (val: Category) => val._id && val._id !== id
      );

    this.setOfCategoryChecked.clear();
  }
}
