import { isNumberValid } from './../../../../utils/custom-regex.util';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { take, map, mergeMap, tap } from 'rxjs/operators';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../../models/category.model';
import {
  CustomDynamicForm,
  CustomForm,
  DynamicFormControl,
  ErrorTooltipsFuntion,
  nzGridColType,
} from '../../../types/custom-form.type';
import { Product } from '../../../../models/product.model';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { textToSlug } from 'src/app/utils/text-to-slug.util';
import { isUrlValid } from 'src/app/utils/custom-regex.util';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'dashboard-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
  providers: [CurrencyPipe],
})
export class ProductCreateComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private nzMessageService: NzMessageService,
    private currencyPipe: CurrencyPipe
  ) {}

  currentRoute: string = 'create';
  currentProduct!: Product;
  formList: CustomForm[] = [];
  dynamicFormList: CustomDynamicForm[] = [];
  validateForm!: FormGroup;
  categoriesSelectData!: Category[];
  categoriesSelectDataLoading: boolean = true;
  categorySelected: any = null;
  defaultnzGridColType: nzGridColType = {
    nzXxl: 12,
    nzXl: 12,
    nzLg: 12,
    nzMd: 24,
    nzSm: 24,
    nzXs: 24,
    nzSpan: 24,
  };

  listOfProductColorFormControl: DynamicFormControl[] = [];
  listOfProductSizeFormControl: DynamicFormControl[] = [];
  listOfProductImageFormControl: DynamicFormControl[] = [
    {
      id: 0,
      controlInstance: 'image0',
      value: null,
    },
    {
      id: 1,
      controlInstance: 'image1',
      value: null,
    },
    {
      id: 2,
      controlInstance: 'image2',
      value: null,
    },
    {
      id: 3,
      controlInstance: 'image3',
      value: null,
    },
  ];

  ngOnInit(): void {
    this.currentRoute = this.activatedRoute.snapshot.url[0].path;
    this.categoryService
      .getAllCategory()
      .pipe(take(1))
      .subscribe((res: any) => {
        if (res.status === 'SUCCESS') {
          this.categoriesSelectData = res.categories as Category[];
        } else {
          this.nzMessageService.error(res.message);
        }
        this.categoriesSelectDataLoading = false;
      });

    this.activatedRoute.params
      .pipe(
        map((param) => param.id),
        tap((val) => {
          if (!val) {
            this.initForm();
          }
        }),
        mergeMap((id) => this.productService.getProductByID(id ? id : ''))
      )
      .subscribe((val: any) => {
        if (val.status === 'SUCCESS') {
          this.currentProduct = val.product as Product;
          this.categorySelected = this.currentProduct.category;
          this.initForm();
        } else {
          this.initForm();
        }
      });
  }

  categoryCompareSlug = (o1: Category, o2: Category) =>
    o1 && o2 ? o1.slug === o2.slug : o1 === o2;

  initForm() {
    this.initListDynamicControl();
    this.initValidateForm();
    this.initValidateDynamicForm();
    this.initDynamicFormList();
    this.initFormList();
  }

  initValidateForm() {
    this.validateForm = this.fb.group({
      name: [
        this.currentProduct?.name ? this.currentProduct.name : null,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(150),
        ],
      ],
      description: [
        this.currentProduct?.description
          ? this.currentProduct.description
          : null,
        [Validators.required],
      ],
      original_price: [
        this.currentProduct?.original_price
          ? this.currentProduct.original_price
          : null,
        [Validators.required, this.productPriceValidators],
      ],
      sell_price: [
        this.currentProduct?.sell_price ? this.currentProduct.sell_price : null,
        [Validators.required, this.productPriceValidators],
      ],
      display_price: new FormControl(
        {
          value: this.currentProduct?.display_price
            ? this.currentProduct.display_price
            : null,
          disabled: true,
        },
        [Validators.required, this.productPriceValidators]
      ),
      profit: new FormControl(
        {
          value: this.currentProduct?.profit
            ? this.currentProduct.profit
            : null,
          disabled: true,
        },
        [Validators.required, this.productPriceValidators]
      ),
      discount: [
        this.currentProduct?.discount >= 0
          ? this.currentProduct.discount
          : null,
        [Validators.required, this.productDiscountValidator],
      ],
      rating: [
        this.currentProduct?.rating >= 0 ? this.currentProduct.rating : null,
        [Validators.required, this.productRatingValidator],
      ],
      quantity: [
        this.currentProduct?.quantity ? this.currentProduct.quantity : null,
        [Validators.required, this.productAmountvalidators],
      ],
      slug: new FormControl(
        {
          value: this.currentProduct?.slug ? this.currentProduct.slug : null,
          disabled: true,
        },
        [Validators.required]
      ),
      brand: [
        this.currentProduct?.quantity ? this.currentProduct.quantity : null,
        [Validators.required],
      ],
      display_image: [
        this.currentProduct?.display_image
          ? this.currentProduct.display_image
          : null,
        [Validators.required, this.productImagesValidator],
      ],
    });
  }

  initListDynamicControl() {
    if (this.currentProduct) {
      if (this.currentProduct.images_list) {
        this.listOfProductImageFormControl = [];
        this.currentProduct.images_list.forEach(
          (value: string, key: number) => {
            this.listOfProductImageFormControl.push({
              id: key,
              controlInstance: `image${key}`,
              value,
            });
          }
        );
      }
      if (this.currentProduct.sizes) {
        this.listOfProductSizeFormControl = [];
        this.currentProduct.sizes.forEach((value: string, key: number) => {
          this.listOfProductSizeFormControl.push({
            id: key,
            controlInstance: `size${key}`,
            value,
          });
        });
      }
      if (this.currentProduct.colors) {
        this.listOfProductColorFormControl = [];
        this.currentProduct.colors.forEach((value: string, key: number) => {
          this.listOfProductColorFormControl.push({
            id: key,
            controlInstance: `color${key}`,
            value,
          });
        });
      }
    }
  }

  initValidateDynamicForm() {
    if (this.listOfProductImageFormControl) {
      this.listOfProductImageFormControl.forEach((val) => {
        this.validateForm.addControl(
          val.controlInstance,
          new FormControl(val.value, [
            Validators.required,
            this.productImagesValidator,
          ])
        );
      });
    }
    if (this.listOfProductColorFormControl) {
      this.listOfProductColorFormControl.forEach((val: DynamicFormControl) => {
        this.validateForm.addControl(
          val.controlInstance,
          new FormControl(val.value, [Validators.required])
        );
      });
    }
    if (this.listOfProductSizeFormControl) {
      this.listOfProductSizeFormControl.forEach((val: DynamicFormControl) => {
        this.validateForm.addControl(
          val.controlInstance,
          new FormControl(val.value, [Validators.required])
        );
      });
    }
  }

  initDynamicFormList() {
    this.dynamicFormList = [
      {
        fieldName: 'image',
        buttonName: 'Thêm hình ảnh',
        formLabel: 'Hình ảnh',
        placeHolder: 'Nhập link hình ảnh',
        listOfForm: this.listOfProductImageFormControl,
        errorTooltips: this.getProductImagesErrorTooltips,
      },
      {
        fieldName: 'color',
        buttonName: 'Thêm màu sắc',
        formLabel: 'Màu sắc cỡ',
        placeHolder: 'Thêm màu sắc',
        listOfForm: this.listOfProductColorFormControl,
        errorTooltips: this.getProductColorErrorTooltips,
      },
      {
        fieldName: 'size',
        buttonName: 'Thêm kích cỡ',
        formLabel: 'Kích cỡ',
        placeHolder: 'Nhập kích cỡ',
        listOfForm: this.listOfProductSizeFormControl,
        errorTooltips: this.getProductSizeErrorTooltips,
      },
    ];
  }

  initFormList() {
    this.formList = [
      {
        formLabel: 'Tên sản phẩm',
        placeholder: 'Nhập tên sản phẩm',
        formControlName: 'name',
        errorTooltips: this.getProductErrorToolTips,
        gridCol: {
          nzXxl: 24,
          nzXl: 24,
          nzLg: 24,
          nzMd: 24,
          nzSm: 24,
          nzXs: 24,
          nzSpan: 24,
        },
      },
      {
        formLabel: 'Slug',
        placeholder: 'Slug được tạo tự động theo tên sản phẩm',
        formControlName: 'slug',
        errorTooltips: this.getProductErrorToolTips,
        gridCol: {
          nzXxl: 24,
          nzXl: 24,
          nzLg: 24,
          nzMd: 24,
          nzSm: 24,
          nzXs: 24,
          nzSpan: 24,
        },
      },
      {
        formLabel: 'Thông tin sản phẩm',
        placeholder: 'Nhập thông tin sản phẩm',
        formControlName: 'description',
        errorTooltips: this.productErrorTooltips,
        gridCol: {
          nzXxl: 24,
          nzXl: 24,
          nzLg: 24,
          nzMd: 24,
          nzSm: 24,
          nzXs: 24,
          nzSpan: 24,
        },
      },
      {
        formLabel: 'Giá gốc sản phẩm',
        placeholder: 'Nhập giá gốc sản phẩm',
        formControlName: 'original_price',
        type: 'number',
        errorTooltips: this.productErrorTooltips,
        gridCol: this.defaultnzGridColType,
      },
      {
        formLabel: 'Giá bán sản phẩm',
        placeholder: 'Nhập giá bán sản phẩm',
        formControlName: 'sell_price',
        type: 'number',
        errorTooltips: this.productErrorTooltips,
        gridCol: this.defaultnzGridColType,
      },
      {
        formLabel: 'Giá Hiển thị',
        placeholder: 'Giá hiển thị của sản phẩm',
        formControlName: 'display_price',
        type: 'number',
        errorTooltips: this.productErrorTooltips,
        gridCol: this.defaultnzGridColType,
      },
      {
        formLabel: 'Lợi nhuận',
        placeholder: 'Lợi nhuận sản phẩm',
        formControlName: 'profit',
        type: 'number',
        errorTooltips: this.productErrorTooltips,
        gridCol: this.defaultnzGridColType,
      },
      {
        formLabel: 'Số lượng sản phẩm',
        placeholder: 'Nhập số lượng sản phẩm',
        formControlName: 'quantity',
        type: 'number',
        errorTooltips: this.productErrorTooltips,
        gridCol: this.defaultnzGridColType,
      },
      {
        formLabel: 'Thương hiệu',
        placeholder: 'Nhập thương hiệu',
        formControlName: 'brand',
        errorTooltips: this.productErrorTooltips,
        gridCol: this.defaultnzGridColType,
      },
      {
        formLabel: 'Đánh giá sản phẩm',
        placeholder: 'Nhập đánh giá sản phẩm',
        formControlName: 'rating',
        type: 'number',
        errorTooltips: this.productErrorTooltips,
        gridCol: this.defaultnzGridColType,
        icon: {
          theme: 'outline',
          type: 'star',
        },
      },
      {
        formLabel: 'Chiết khấu sản phẩm',
        placeholder: 'Nhập chiết khẩu sản phẩm',
        formControlName: 'discount',
        type: 'number',
        errorTooltips: this.productErrorTooltips,
        gridCol: this.defaultnzGridColType,
        icon: {
          theme: 'outline',
          type: 'percentage',
        },
      },
      {
        formLabel: 'Hình ảnh hiển thị',
        placeholder: 'Nhập link ảnh hiển thị sản phẩm sản phẩm',
        formControlName: 'display_image',
        errorTooltips: this.getProductImagesErrorTooltips,
        gridCol: {
          ...this.defaultnzGridColType,
          nzXxl: 24,
          nzXl: 24,
          nzLg: 24,
        },
      },
    ];
  }

  productErrorTooltips: ErrorTooltipsFuntion = (formControlName): string => {
    const productPriceToolTips = (): string => {
      if (this.validateForm.controls.hasOwnProperty(formControlName)) {
        if (this.validateForm.controls[formControlName].hasError('required')) {
          return 'Vui lòng nhập giá sản phẩm';
        } else if (
          this.validateForm.controls[formControlName].hasError('notNumber')
        ) {
          return 'Giá tiền không hợp lệ';
        } else if (
          this.validateForm.controls[formControlName].hasError('isNegative')
        ) {
          return 'Giá tiền không được thấp hơn 0';
        }
      }
      return '';
    };

    const productRatingTooltip = (): string => {
      if (this.validateForm.controls.hasOwnProperty(formControlName)) {
        if (this.validateForm.controls[formControlName].hasError('required')) {
          return 'Vui lòng nhập đánh giá sản phẩm';
        } else if (
          this.validateForm.controls[formControlName].hasError('notNumber')
        ) {
          return 'Đánh giá không hợp lệ';
        } else if (
          this.validateForm.controls[formControlName].hasError('outOfRange')
        ) {
          return 'Đánh giá phải từ 0 - 5 ';
        }
      }
      return '';
    };

    const productNameTooltips = (): string => {
      if (this.validateForm.controls.hasOwnProperty(formControlName)) {
        if (this.validateForm.controls[formControlName].hasError('required')) {
          return 'Vui lòng nhập tên sản phẩm !';
        } else if (
          this.validateForm.controls[formControlName].hasError('minlength')
        ) {
          return 'Tên sản phẩm phải trên 5 kí tự';
        } else if (
          this.validateForm.controls[formControlName].hasError('maxlength')
        ) {
          return 'Tên sản phẩm phải dưới 150 kí tự';
        }
      }
      return '';
    };

    const productDiscountTooltips = (): string => {
      if (this.validateForm.controls.hasOwnProperty(formControlName)) {
        if (this.validateForm.controls[formControlName].hasError('required')) {
          return 'Vui lòng nhập chiết khấu';
        } else if (
          this.validateForm.controls[formControlName].hasError('notNumber')
        ) {
          return 'Chiết khấu không hợp lệ';
        } else if (
          this.validateForm.controls[formControlName].hasError('outOfRange')
        ) {
          return 'Chiết khẩu phải từ 0 - 100 %';
        }
      }
      return '';
    };

    const productAmountTooltips = (): string => {
      if (this.validateForm.controls.hasOwnProperty(formControlName)) {
        if (this.validateForm.controls[formControlName].hasError('required')) {
          return 'Vui lòng nhập số lượng sản phẩm ';
        } else if (
          this.validateForm.controls[formControlName].hasError('notNumber')
        ) {
          return 'Số lượng sản phẩm không hợp lệ ';
        } else if (
          this.validateForm.controls[formControlName].hasError('isNegative')
        ) {
          return 'Số lượng sản phẩm phẩm không được < 0';
        }
      }
      return '';
    };

    const productDescriptionTooltips = (): string => {
      if (this.validateForm.controls.hasOwnProperty(formControlName)) {
        if (this.validateForm.controls[formControlName].hasError('required'))
          return 'Vui lòng nhập thông tin sản phẩm';
      }
      return '';
    };
    const productBrandTooltips = (): string => {
      if (this.validateForm.controls.hasOwnProperty(formControlName)) {
        if (this.validateForm.controls[formControlName].hasError('required'))
          return 'Vui lòng nhập thương hiệu';
      }
      return '';
    };
    switch (formControlName) {
      case 'name':
        return productNameTooltips();
      case 'sell_price':
        return productPriceToolTips();
      case 'original_price':
        return productPriceToolTips();
      case 'discount':
        return productDiscountTooltips();
      case 'rating':
        return productRatingTooltip();
      case 'quantity':
        return productAmountTooltips();
      case 'description':
        return productDescriptionTooltips();
      case 'brand':
        return productBrandTooltips();
      default:
        return '';
    }
  };

  clearData() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].setValue(null);
      this.validateForm.controls[i].markAsUntouched();
    }
  }

  addNewProduct(product: Product) {
    this.productService
      .insertProduct(product as Product)
      .subscribe((res: any) => {
        if (res.status === 'SUCCESS') {
          // this.clearData();
          this.nzMessageService.success('Thêm thành công');
        } else {
          this.nzMessageService.error(`Có lỗi xảy ra: ${res.message}`);
        }
      });
  }

  updateProduct(product: Product) {
    this.productService
      .updateProduct(product as Product)
      .subscribe((res: any) => {
        if (res.status === 'SUCCESS') {
          this.nzMessageService.success('Cập nhật thành công');
        } else {
          this.nzMessageService.error(`Có lỗi xảy ra: ${res.message}`);
        }
      });
  }

  submit() {
    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(i)) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }
    if (this.validateForm.valid) {
      let product: { [s: string]: any } = {};
      const colors: string[] = [];
      const sizes: string[] = [];
      const images_list: string[] = [];
      for (const i in this.validateForm.controls) {
        if (
          i.trim().toUpperCase().includes('IMAGE') &&
          !i.includes('display')
        ) {
          images_list.push(this.validateForm.controls[i].value);
        } else if (i.trim().toUpperCase().includes('COLOR')) {
          colors.push(this.validateForm.controls[i].value);
        } else if (i.trim().toUpperCase().includes('SIZE')) {
          sizes.push(this.validateForm.controls[i].value);
        } else {
          product[i] = this.validateForm.controls[i].value;
        }
      }
      product['colors'] = colors;
      product['sizes'] = sizes;
      product['images_list'] = images_list;
      if (this.categorySelected) {
        product['category'] = this.categorySelected as Category;
        if (this.currentRoute === 'edit') {
          this.updateProduct({
            ...product,
            _id: this.currentProduct._id,
          } as Product);
        } else if (this.currentRoute === 'create') {
          this.addNewProduct(product as Product);
        }
      } else {
        this.nzMessageService.warning('Vui lòng chọn danh mục');
      }
    }
  }

  productPriceValidators = (c: FormControl): { [s: string]: boolean } => {
    if (!c.value) {
      return { required: true };
    } else {
      if (!isNumberValid(c.value)) return { notNumber: true };
      else if (Number(c.value) < 0) {
        return { isNegative: true };
      }
    }
    return {};
  };
  productAmountvalidators = (c: FormControl): { [s: string]: boolean } => {
    if (!c.value) {
      return { required: true };
    } else {
      if (!isNumberValid(c.value)) return { notNumber: true };
      else if (Number(c.value) < 0) {
        return { isNegative: true };
      }
    }
    return {};
  };
  productDiscountValidator = (c: FormControl): { [s: string]: boolean } => {
    if (!c.value) {
      return { required: true };
    } else if (!isNumberValid(c.value)) {
      return { notNumber: true };
    } else if (Number(c.value) >= 100 || Number(c.value) < 0) {
      return { outOfRange: true };
    }
    return {};
  };

  productRatingValidator = (c: FormControl): { [s: string]: boolean } => {
    if (!c.value) {
      return { required: true };
    } else if (!isNumberValid(c.value)) {
      return { notNumber: true };
    } else if (Number(c.value) > 5 || Number(c.value) < 0) {
      return { outOfRange: true };
    }

    return {};
  };

  productImagesValidator = (c: FormControl): { [s: string]: boolean } => {
    if (!c.value) {
      return { required: true };
    } else if (!isUrlValid(c.value)) {
      return { notUrl: true };
    }
    return {};
  };

  getProductErrorToolTips: ErrorTooltipsFuntion = (
    formControlName: string
  ): string => {
    const productPriceToolTips = (): string => {
      if (this.validateForm.controls.hasOwnProperty(formControlName)) {
        if (this.validateForm.controls[formControlName].hasError('required')) {
          return 'Vui lòng nhập giá sản phẩm';
        } else if (
          this.validateForm.controls[formControlName].hasError('notNumber')
        ) {
          return 'Giá tiền không hợp lệ';
        } else if (
          this.validateForm.controls[formControlName].hasError('isNegative')
        ) {
          return 'Giá tiền không được thấp hơn 0';
        }
      }
      return '';
    };

    const productRatingTooltip = (): string => {
      if (this.validateForm.controls.hasOwnProperty(formControlName)) {
        if (this.validateForm.controls[formControlName].hasError('required')) {
          return 'Vui lòng nhập đánh giá sản phẩm';
        } else if (
          this.validateForm.controls[formControlName].hasError('notNumber')
        ) {
          return 'Đánh giá không hợp lệ';
        } else if (
          this.validateForm.controls[formControlName].hasError('outOfRange')
        ) {
          return 'Đánh giá phải từ 0 - 5 ';
        }
      }
      return '';
    };

    switch (formControlName) {
      case 'name':
        if (this.validateForm.controls.hasOwnProperty(formControlName)) {
          if (
            this.validateForm.controls[formControlName].hasError('required')
          ) {
            return 'Vui lòng nhập tên sản phẩm !';
          } else if (
            this.validateForm.controls[formControlName].hasError('minlength')
          ) {
            return 'Tên sản phẩm phải trên 5 kí tự';
          } else if (
            this.validateForm.controls[formControlName].hasError('maxlength')
          ) {
            return 'Tên sản phẩm phải dưới 50 kí tự';
          }
        }
        return '';
      case 'display_price':
        return productPriceToolTips();
      case 'original_price':
        return productPriceToolTips();
      case 'discount':
        if (this.validateForm.controls.hasOwnProperty(formControlName)) {
          if (
            this.validateForm.controls[formControlName].hasError('required')
          ) {
            return 'Vui lòng nhập chiết khấu';
          } else if (
            this.validateForm.controls[formControlName].hasError('notNumber')
          ) {
            return 'Chiết khấu không hợp lệ';
          } else if (
            this.validateForm.controls[formControlName].hasError('outOfRange')
          ) {
            return 'Chiết khẩu phải từ 0 - 100 %';
          }
        }
        return '';
      case 'rating':
        return productRatingTooltip();
      default:
        return '';
    }
  };

  getProductColorErrorTooltips: ErrorTooltipsFuntion = (
    formControlName: string
  ): string => {
    if (this.validateForm.controls.hasOwnProperty(formControlName)) {
      if (this.validateForm.controls[formControlName].hasError('required')) {
        return 'Vui lòng nhập màu sắc';
      }
    }
    return '';
  };

  getProductSizeErrorTooltips: ErrorTooltipsFuntion = (
    formControlName: string
  ): string => {
    if (this.validateForm.controls.hasOwnProperty(formControlName)) {
      if (this.validateForm.controls[formControlName].hasError('required')) {
        return 'Vui lòng nhập size';
      }
    }
    return '';
  };

  getProductImagesErrorTooltips: ErrorTooltipsFuntion = (
    formControlName: string
  ): string => {
    if (this.validateForm.controls.hasOwnProperty(formControlName)) {
      if (this.validateForm.controls[formControlName].hasError('required')) {
        return 'Vui lòng nhập link hình ảnh';
      } else if (
        this.validateForm.controls[formControlName].hasError('notUrl')
      ) {
        return 'Link ảnh không hợp lệ';
      }
    }
    return '';
  };

  addProductField(fieldName: string) {
    let id = 0;
    if (fieldName === 'color') {
      id =
        this.listOfProductColorFormControl.length > 0
          ? this.listOfProductColorFormControl[
              this.listOfProductColorFormControl.length - 1
            ].id + 1
          : 0;
    } else if (fieldName === 'size') {
      id =
        this.listOfProductSizeFormControl.length > 0
          ? this.listOfProductSizeFormControl[
              this.listOfProductSizeFormControl.length - 1
            ].id + 1
          : 0;
    } else {
      id =
        this.listOfProductImageFormControl.length > 0
          ? this.listOfProductImageFormControl[
              this.listOfProductImageFormControl.length - 1
            ].id + 1
          : 0;
    }
    const control: DynamicFormControl = {
      id,
      controlInstance: `product${fieldName + id}`,
      value: null,
    };

    const index =
      fieldName === 'color'
        ? this.listOfProductColorFormControl.push(control)
        : fieldName === 'size'
        ? this.listOfProductSizeFormControl.push(control)
        : this.listOfProductImageFormControl.push(control);
    if (fieldName === 'image') {
      this.validateForm.addControl(
        this.listOfProductImageFormControl[index - 1].controlInstance,
        new FormControl(null, [
          Validators.required,
          this.productImagesValidator,
        ])
      );
    } else {
      this.validateForm.addControl(
        fieldName === 'color'
          ? this.listOfProductColorFormControl[index - 1].controlInstance
          : this.listOfProductSizeFormControl[index - 1].controlInstance,
        new FormControl(null, [Validators.required])
      );
    }
  }

  removeChildDynamicForm(fieldname: string, control: DynamicFormControl) {
    if (!fieldname) {
      return;
    }
    let flag: boolean = false;
    switch (fieldname) {
      case 'size':
        {
          const index = this.listOfProductSizeFormControl.indexOf(control);
          if (index >= 0) {
            this.listOfProductSizeFormControl.splice(index, 1);
            flag = true;
          } else return;
        }
        break;
      case 'color':
        {
          const index = this.listOfProductColorFormControl.indexOf(control);
          if (index >= 0) {
            this.listOfProductColorFormControl.splice(index, 1);
            flag = true;
          } else return;
        }
        break;
      case 'image':
        {
          if (this.listOfProductImageFormControl.length > 4) {
            const index = this.listOfProductImageFormControl.indexOf(control);
            this.listOfProductImageFormControl.splice(index, 1);
            flag = true;
          } else return;
        }
        break;
      default:
        return;
    }
    if (
      flag &&
      this.validateForm.controls.hasOwnProperty(control.controlInstance)
    ) {
      this.validateForm.removeControl(control.controlInstance);
    }
  }

  onFormInputChange(form: { formControlName: string; value: string }) {
    if (form.formControlName === 'name')
      this.validateForm.controls['slug'].setValue(textToSlug(form.value));
    else if (
      form.formControlName === 'sell_price' ||
      form.formControlName === 'discount'
    ) {
      const sell_price = this.validateForm.controls['sell_price'].value;
      const discount = this.validateForm.controls['discount'].value;
      if (!sell_price) return;
      if (!discount && this.validateForm.controls['sell_price'].valid)
        this.setDisplayPriceValue(sell_price);
      else if (
        this.validateForm.controls['sell_price'].valid &&
        this.validateForm.controls['discount'].valid
      )
        this.setDisplayPriceValue(this.caclDisplayPrice(sell_price, discount));
      else return;
    } else if (form.formControlName === 'display_price') {
      const originalPrice = this.validateForm.controls['original_price'].value;
      const displayPrice = this.validateForm.controls['display_price'].value;
      if (originalPrice && displayPrice)
        this.setProfit(this.calcProfit(displayPrice, originalPrice));
      else this.setProfit(0);
    } else return;
  }

  caclDisplayPrice(sellPrice: number, discount: number): number {
    const x = Math.floor((sellPrice * discount) / 100);
    return sellPrice - x;
  }
  setDisplayPriceValue(value: number): void {
    this.validateForm.controls['display_price'].setValue(value);
  }

  calcProfit(displayPrice: number, originalPrice: number) {
    return displayPrice - originalPrice;
  }
  setProfit(profit: number) {
    this.validateForm.controls['profit'].setValue(profit);
  }
}
