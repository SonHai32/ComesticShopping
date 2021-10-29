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
  data2: { edited: boolean; data: ProductGroup }[] = [
    {
      edited: false,
      data: {
        _id: 'dddddddddddddddddddddd',
        group_id: 'san-pham-ban-chay',
        title: 'Sản phẩm bán chạy',
      },
    },
    {
      edited: false,
      data: {
        _id: 'dsads',
        group_id: '',
        title: 'asdasdasd',
      },
    },
  ];

  validateForm!: FormGroup;
  formEditData: { data: ProductGroup; index: number }[] = [];
  newFormData: ProductGroup[] = [];
  checked = false;
  indeterminated = false;
  setOfCheckedData = new Set<string>();
  submitFormBtn = false;
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
    const groupID =
      this.validateForm.controls[`product-group-id-${index}`].value;
    const groupTitle =
      this.validateForm.controls[`product-group-title-${index}`].value;
    if (!(data.group_id === groupID)) {
      if (data._id) {
        this.data2.forEach((val) => {
          if (val.data._id === data._id) {
            val.data.group_id = groupID;
            val.data.title = groupTitle;
          }
        });
      } else {
        const isDuplicated = this.newFormData.some((val: ProductGroup) => {
          return val.title === data.title;
        });
        if (!isDuplicated) {
          this.newFormData.push({ group_id: groupID, title: groupTitle });
        } else {
          return;
        }
      }
      this.data2[index].data = data;
      this.data2[index].edited = true;

      if (this.formEditData.some((val) => val.index === index)) {
        this.formEditData = this.formEditData.map((val) => {
          return { ...val, data };
        });
      } else {
        this.formEditData.push({ data, index });
      }
      this.submitFormVisible();
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

  submitFormVisible(): void {
    const isFormEdit =
      this.data2.some((val) => {
        return val.edited;
      }) || this.newFormData.length > 0;
    if (isFormEdit) {
      this.submitFormBtn = true;
    }
  }

  onCheckedChange(id: string, checked: boolean): void {
    this.updateChekedChange(id, checked);
    this.refreshCheckedChange();
  }

  updateChekedChange(id: string, checked: boolean): void {
    if (checked) {
      this.setOfCheckedData.add(id);
    } else {
      this.setOfCheckedData.delete(id);
    }
  }

  refreshCheckedChange(): void {
    this.indeterminated = this.data2.some((val) => {
      return val.data._id && this.setOfCheckedData.has(val.data._id);
    });

    this.checked = this.data2.every((val) => {
      return val.data._id && this.setOfCheckedData.has(val.data._id);
    });

  }
}
