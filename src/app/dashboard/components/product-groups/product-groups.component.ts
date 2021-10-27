import { textToSlug } from 'src/app/utils/text-to-slug.util';
import { ProductGroup } from './../../../models/product-group.model';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-groups',
  templateUrl: './product-groups.component.html',
  styleUrls: ['./product-groups.component.scss'],
})
export class ProductGroupsComponent implements OnInit {
  constructor(private fb: FormBuilder) {}
  validateForm!: FormGroup;
  editCache: { [key: string]: { edit: boolean; data: ProductGroup } } = {};
  formEditData: { data: ProductGroup; index: number }[] = [];

  data2: ProductGroup[] = [
    {
      _id: 'dsads',
      group_id: 'san-pham-ban-chay',
      title: 'Sản phẩm bán chạy',
    },
    {
      _id: 'dsadsa',
      group_id: '',
      title: '',
    },
  ];

  startEdit(id: string): void {
    this.editCache[id].edit = true;
  }

  ngOnInit(): void {
    this.initFormValidate();
  }

  initFormValidate(): void {
    this.validateForm = this.fb.group({
      dasd: new FormControl(null, [Validators.required]),
    });
  }

  addEditable(
    index: number,
    groupIDValue: string,
    groupTitleValue: string
  ): void {
    this.validateForm.addControl(
      `product-group-title-${index}`,
      new FormControl(groupTitleValue, [Validators.required])
    );
    this.validateForm.addControl(
      `product-group-id-${index}`,
      new FormControl({ value: groupIDValue, disabled: true }, [
        Validators.required,
      ])
    );
  }

  isEditable(index: number): boolean {
    return (
      this.isFormControlExisted(`product-group-title-${index}`) &&
      this.isFormControlExisted(`product-group-id-${index}`)
    );
  }

  isFormControlExisted(controlName: string): boolean {
    return this.validateForm.controls.hasOwnProperty(controlName);
  }

  getErrorTooltips(index: number, formType: 'id' | 'title'): string {
    const idForm = `product-group-id-${index}`;
    const titleForm = `product-group-title-${index}`;
    if (this.isFormControlExisted(idForm) && formType === 'id') {
      if (this.validateForm.controls[idForm].hasError('required')) {
        return 'Vui lòng nhập mã nhóm sản phẩm';
      }
    }
    if (this.isFormControlExisted(titleForm) && formType === 'title') {
      if (this.validateForm.controls[titleForm].hasError('required')) {
        return 'Vui lòng nhậP tên nhóm sản phẩm';
      }
    }
    return '';
  }

  saveForm(data: ProductGroup, index: number): void {
    if (data._id) {
      const groupID =
        this.validateForm.controls[`product-group-id-${index}`].value;
      const groupTitle =
        this.validateForm.controls[`product-group-title-${index}`].value;
      this.data2.forEach((val) => {
        if (val._id === data._id) {
          val.group_id = groupID;
          val.title = groupTitle;
        }
      });
    }
    this.data2[index] = data;
    if (this.formEditData.some((val) => val.index === index)) {
      this.formEditData = this.formEditData.map((val) => {
        return { ...val, data };
      });
    } else {
      this.formEditData.push({ data, index });
    }
    this.hideEditableForm(index);
  }

  hideEditableForm(index: number): void {
    this.validateForm.removeControl(`product-group-id-${index}`);
    this.validateForm.removeControl(`product-group-title-${index}`);
  }

  onProductGroupTitleChange(value: string, index: number): void {
    const formControlName = `product-group-id-${index}`;
    this.validateForm.controls[formControlName].setValue(textToSlug(value));
  }
}
