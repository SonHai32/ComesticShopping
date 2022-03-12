import { CategoryService } from './../../../services/category.service';
import { Category } from './../../../../models/category.model';
import { NzMessageService } from 'ng-zorro-antd/message';
import { map, take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductService } from '../../../services/product.service';
import { Component, OnInit } from '@angular/core';
import {
  NzTableFilterFn,
  NzTableFilterList,
  NzTableQueryParams,
} from 'ng-zorro-antd/table';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CurrencyPipe } from '@angular/common';
import { NzMarks } from 'ng-zorro-antd/slider';

@Component({
  providers: [CurrencyPipe],
  selector: 'dashboard-product',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  productList: Product[] = [];
  totalProduct: number = 0;
  productLoading: boolean = false;
  subscriptions: Subscription = new Subscription();
  pageIndex: number = 1;
  perPage: number = 6;
  productChecked: boolean = false;
  indeterminated: boolean = false;
  setOfProductCheck = new Set<string>();
  listOfCategory: Category[] = [];
  listOfCategoryFilters: NzTableFilterList = [];
  categoryFilterSelected!: Category;
  productFilterName: string = '';
  categoriesSelectData!: Category[];
  categoriesSelectDataLoading: boolean = true;
  sliderProductPrice: any = {
    min: 0,
    max: 5000000,
    value: [0, 5000000],
    marks: {
      0: '0 VND',
      5000000: '5.000.000 VND',
    } as NzMarks,
    valueFormater: (data: number) => {
      return this.pipeCurrency.transform(data, 'VND', 'symbol');
    },
  };
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private modalService: NzModalService,
    private nzMessageService: NzMessageService,
    private pipeCurrency: CurrencyPipe
  ) {}

  ngOnInit(): void {
    this.getProductList();
    this.getCategoryList();
  }
  onQueryParamsChange(params: NzTableQueryParams) {
    this.getProductList();
  }

  getCategoryList() {
    this.categoryService
      .getAllCategory()
      .pipe(take(1))
      .subscribe((res: any) => {
        if (res.status === 'SUCCESS') {
          this.categoriesSelectData = res.categories as Category[];
          this.categoriesSelectDataLoading = false;
          this.listOfCategoryFilters = (res.categories as Category[]).map(
            (val: Category) => {
              return {
                value: val.slug,
                text: val.name,
              };
            }
          );
        }
      });
  }
  productFilterSubmmit() {
    this.getProductList();
  }
  getProductList(): void {
    this.productLoading = true;
    const query: any = {};

    query.priceStart = this.sliderProductPrice.value[0];
    query.priceEnd = this.sliderProductPrice.value[1];
    query.page = this.pageIndex;
    query.perPage = this.perPage;

    if (this.categoryFilterSelected) {
      query.category_slug = this.categoryFilterSelected.slug;
    }
    if (this.productFilterName) {
      query.name = this.productFilterName;
    }

    this.subscriptions.add(
      this.productService
        .getProducts(query)
        .pipe(
          take(1),
          map((res: any) => {
            return {
              products: res.product_list as Product[],
              total_result: res.total_result as number,
            };
          })
        )
        .subscribe((val) => {
          console.log(val);
          this.productList = val.products;
          this.totalProduct = val.total_result;
          this.productLoading = false;
        })
    );
  }

  deteteConfirmSingleItem(ID: string | undefined, productName: string) {
    if (ID) {
      this.modalService.confirm({
        nzTitle: 'Bạn có chắn muốn xoá sản phẩm ?',
        nzContent: `<b style="color: red;">${productName}</b>`,
        nzOkText: 'Đồng Ý',
        nzOkType: 'primary',
        nzOkDanger: true,
        nzOnOk: () => this.deleteSingleProduct(ID),
        nzCancelText: 'Huỷ',
      });
    } else {
      this.nzMessageService.warning('Missing product_id');
    }
  }

  deleteConfirmMultipleItem() {
    if (this.productChecked || this.indeterminated) {
      this.modalService.confirm({
        nzTitle: 'Vui lòng xác nhận',
        nzContent: `<b style="color: red;">Bạn có chắn chắn muốn xoá ${this.setOfProductCheck.size} sản phẩm ?</b>`,
        nzOkText: 'Đồng Ý',
        nzOkType: 'primary',
        nzOkDanger: true,
        nzOnOk: () => this.deleteMultipleProduct(),
        nzCancelText: 'Huỷ',
      });
    }
  }

  deleteSingleProduct(ID: string) {
    this.productService.deleteProduct([ID]).subscribe((res: any) => {
      console.log(res);
      if (res.status === 'SUCCESS') {
        this.nzMessageService.success('Xoá thành công');
        this.productList = this.productList.filter((val) => val._id !== ID);
        this.refreshProductListCount(1);
        this.refreshProductCheckedStatus();
      } else {
        this.nzMessageService.error(`Xoá thất bại.Error: ${res.message}`);
      }
    });
  }

  deleteMultipleProduct(): void {
    const listOfCheckedID = this.productList
      .filter((val: Product) => val._id && this.setOfProductCheck.has(val._id))
      .map((val: Product) => (val._id ? val._id : ''));
    if (listOfCheckedID) {
      this.productService
        .deleteProduct(listOfCheckedID)
        .pipe(take(1))
        .subscribe((res: any) => {
          if (res.status === 'SUCCESS') {
            this.productList = this.productList.filter(
              (val: Product) => val._id && !this.setOfProductCheck.has(val._id)
            );
            this.refreshProductListCount(this.setOfProductCheck.size);
            this.setOfProductCheck.clear();
            this.refreshProductCheckedStatus();
          } else {
            this.nzMessageService.error(res.message);
          }
        });
    } else this.nzMessageService.warning('Không có gì để xoá');
  }

  onProductChecked(id: string, checked: boolean): void {
    this.updateChecked(id, checked);
    this.refreshProductCheckedStatus();
  }

  updateChecked(id: string, checked: boolean): void {
    if (checked) {
      this.setOfProductCheck.add(id);
    } else {
      this.setOfProductCheck.delete(id);
    }
  }

  refreshProductCheckedStatus(): void {
    this.productChecked = this.productList.every(
      (val: Product) => val._id && this.setOfProductCheck.has(val._id)
    );
    this.indeterminated = this.productList.some(
      (val: Product) =>
        val._id && this.setOfProductCheck.has(val._id) && !this.productChecked
    );
  }

  onAllProductChecked(checked: boolean): void {
    this.productList.forEach((val: Product) => {
      if (val._id) {
        this.updateChecked(val._id, checked);
      } else return;
    });
    this.refreshProductCheckedStatus();
  }

  refreshProductListCount(removeSize: number) {
    this.getProductList();
    if (removeSize >= this.perPage) {
      this.productChecked = false;
      this.indeterminated = false;
    }
  }

  categoryFilterFuntion: NzTableFilterFn = (list: string[], item: Product) => {
    return list.some((id) => item.category.slug.indexOf(id) !== -1);
  };

  compareFn = (o1: Category, o2: Category) =>
    o1 && o2 ? o1.slug === o2.slug : o1 === o2;
}
