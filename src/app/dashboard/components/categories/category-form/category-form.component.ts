import { textToSlug } from '../../../../utils/text-to-slug.util';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { take, map, mergeMap, tap, combineAll } from 'rxjs/operators';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../../models/category.model';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import {
  CustomDynamicForm,
  CustomForm,
  ErrorTooltipsFuntion,
} from '../../../types/custom-form.type';
import { Component, OnInit } from '@angular/core';
import { Subscription, combineLatest } from 'rxjs';

@Component({
  selector: 'dashboard-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryCreateComponent implements OnInit {
  formValidate!: FormGroup;
  categories!: Category[];
  formList: CustomForm[] = [];
  dynamicFormList: CustomDynamicForm[] = [];
  cateListLoadingStatus: boolean = false;
  canLoadCate: boolean = true;
  subCateSelected!: Category;
  currentRoute: string = '';
  subscriptions: Subscription = new Subscription();
  currentCategory!: Category;
  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private nzMessageService: NzMessageService,
    private activatedRoute: ActivatedRoute,
    private nzModalService: NzModalService
  ) {}
  getAllCategories() {
    this.cateListLoadingStatus = true;
    this.categoryService.getAllCategory().subscribe((val: any) => {
      if (val.status === 'SUCCESS') {
        const categories = val.categories as Category[];
        this.categories = categories;
        this.cateListLoadingStatus = false;
      } else {
        this.cateListLoadingStatus = false;
      }
    });
  }

  initCategories() {
    this.activatedRoute.params
      .pipe(
        map((param) => param.id),
        mergeMap((id: string | null) =>
          this.categoryService.getAllCategory().pipe(
            take(1),
            tap((res: any) => {
              if (res.status === 'SUCCESS') {
                this.categories = res.categories as Category[];
                this.cateListLoadingStatus = false;
              }
            }),
            mergeMap(() => this.categoryService.getCategoryDetail(id ? id : ''))
          )
        ),
        map((res: any) => {
          if (res.status === 'SUCCESS') {
            return res.category as Category;
          } else return null;
        })
      )
      .subscribe((currentCategory: Category | null) => {
        if (currentCategory) {
          this.currentCategory = currentCategory;
          this.categories = this.categories.filter(
            (category: Category) => category.slug !== currentCategory.slug
          );
          if (currentCategory.sub_category) {
            this.subCateSelected = currentCategory.sub_category;
          }
        }

        this.initFormValidate();
      });
  }

  initFormValidate() {
    this.formValidate = this.fb.group({
      name: [
        this.currentCategory ? this.currentCategory.name : null,
        Validators.required,
      ],
      slug: new FormControl(
        {
          value: this.currentCategory ? this.currentCategory.slug : null,
          disabled: true,

        },
        [Validators.required]
      ),
      // slug: [
      //   this.currentCategory ? this.currentCategory.slug : null,
      //   Validators.required,
      // ],
    });
  }

  selectCategoyCompareFn = (o1: Category, o2: Category) =>
    o1 && o2 ? o1.slug === o2.slug : o1 === o2;

  ngOnInit(): void {
    this.currentRoute = this.activatedRoute.snapshot.url[0].path;
    this.initCategories();
  }

  getErrorTooltips = (controlName: string): string => {
    if (this.formValidate.controls.hasOwnProperty(controlName)) {
      if (this.formValidate.controls[controlName].hasError('required')) {
        // return 'Vui lòng nhập tên danh mục';
        if (controlName === 'name') {
          return 'Vui lòng nhập tên danh mục';
        } else {
          return 'Vui lòng nhập slug';
        }
      }
    }
    return '';
  };

  onCategoryNameChange(value: string) {
    this.formValidate.controls['slug'].setValue(textToSlug(value));
  }

  insertCategory(category: Category) {
    console.log(category);
    this.categoryService
      .insertCategory({ ...category })
      .pipe(take(1))
      .subscribe((val: any) => {
        if (val.status === 'SUCCESS') {
          this.nzMessageService.success('Thêm thành công');
          this.initCategories();
          this.clearForm();
        } else {
          this.nzMessageService.error(`Thêm thất bại: ${val.message}`);
        }
      });
  }

  updateCategory(categoryID: string, category: Category) {
    console.log(category);
    this.categoryService
      .updateCategory(categoryID, category)
      .pipe(take(1))
      .subscribe((res: any) => {
        if (res.status === 'SUCCESS') {
          this.nzMessageService.success('Cập nhật thành công');
        } else {
          this.nzMessageService.error(`Thêm thất bại: ${res.message}`);
        }
      });
  }

  formSubmit() {
    for (const i in this.formValidate.controls) {
      this.formValidate.controls[i].markAsDirty();
      this.formValidate.controls[i].updateValueAndValidity();
    }
    if (this.formValidate.valid) {
      let category: Category = {
        slug: this.formValidate.controls['slug'].value,
        name: this.formValidate.controls['name'].value,
      };
      if (this.subCateSelected) {
        category = { ...category, sub_category: this.subCateSelected };
      }
      if(this.currentCategory){
        category = {...this.currentCategory, ...category}
      }
      if (this.currentRoute === 'edit') {
        this.nzModalService.confirm({
          nzTitle: 'Vui lòng xác nhận',
          nzContent: `<b style="color: red;">Bạn có chắn chắn muốn cập nhật danh mục này </b>`,
          nzOkText: 'Đồng Ý',
          nzOkType: 'primary',
          nzOkDanger: true,
          nzOnOk: () => {
            if (this.currentCategory._id) {
              return this.updateCategory(this.currentCategory._id, category);
            }
            return;
          },
          nzCancelText: 'Huỷ',
        });
      } else {
        this.insertCategory(category);
      }
    }
  }

  clearForm() {
    for (const i in this.formValidate.controls) {
      this.formValidate.controls[i].setValue(null);
      this.formValidate.controls[i].markAsPending();
    }
  }
}
