import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { map, take, tap } from 'rxjs/operators';
import { textToSlug } from 'src/app/utils/text-to-slug.util';
import { ProductGroup } from './../../../models/product-group.model';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ProductGroupService } from '../../services/product-group.service';
import { Subscription, combineLatest, of } from 'rxjs';

@Component({
  selector: 'app-product-groups',
  templateUrl: './product-groups.component.html',
  styleUrls: ['./product-groups.component.scss'],
})
export class ProductGroupsComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private productGroupService: ProductGroupService,
    private modal: NzModalService,
    private message: NzMessageService
  ) {}

  productGroupData: { edited: boolean; isNew: boolean; data: ProductGroup }[] =
    [];
  validateForm: FormGroup = this.fb.group({});
  newFormData: ProductGroup[] = [];
  currentPageIndex = 1;
  pageSize = 10;
  checked = false;
  indeterminated = false;
  setOfCheckedData = new Set<string>();
  submitUpdateBtn = false;
  submitAddBtn = false;
  dataLoading = false;
  itemUpdateCount = 0;
  itemNewCount = 0;
  subscriptions = new Subscription();
  ngOnInit(): void {
    this.getProductGroupList();
  }
  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getProductGroupList(): void {
    this.dataLoading = true;
    this.subscriptions.add(
      this.productGroupService
        .getProductGroupList()
        .pipe(
          tap(() => {
            console.log('fetch');
          }),
          take(1),
          map((res: any) => {
            return (res.product_groups as ProductGroup[]).map(
              (val: ProductGroup) => {
                return { edited: false, isNew: false, data: val };
              }
            );
          })
        )
        .subscribe(
          (val) => {
            this.productGroupData = val;
            this.dataLoading = false;
            this.refreshSubmitBtn();
          },
          (error) => {
            if (error) {
              this.message.error(error.message);
            }
          }
        )
    );
    this.refreshSubmitBtn();
  }

  getProductGroupIndex(currentIndex: number): number {
    return currentIndex + this.pageSize * (this.currentPageIndex - 1);
  }

  addEditable(
    currentIndex: number,
    groupIDValue: string,
    groupTitleValue: string
  ): void {
    const index = this.getProductGroupIndex(currentIndex);
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

  isEditable(currentIndex: number): boolean {
    const index = this.getProductGroupIndex(currentIndex);
    return (
      this.isFormControlExisted(`product-group-title-${index}`) &&
      this.isFormControlExisted(`product-group-id-${index}`)
    );
  }

  isFormControlExisted(controlName: string): boolean {
    return this.validateForm.controls.hasOwnProperty(controlName);
  }

  getErrorTooltips(currentIndex: number, formType: 'id' | 'title'): string {
    const index = this.getProductGroupIndex(currentIndex);
    const idForm = `product-group-id-${index}`;
    const titleForm = `product-group-title-${index}`;
    if (this.isFormControlExisted(idForm) && formType === 'id') {
      if (this.validateForm.controls[idForm].hasError('required')) {
        return 'Vui lòng nhập mã nhóm sản phẩm';
      }
    }
    if (this.isFormControlExisted(titleForm) && formType === 'title') {
      if (this.validateForm.controls[titleForm].hasError('required')) {
        return 'Vui lòng nhập tên nhóm sản phẩm';
      }
    }
    return '';
  }

  onRadioChange(currentIndex: number, isNew: boolean): void {
    const index = this.getProductGroupIndex(currentIndex);
    if (!isNew) {
      this.productGroupData[index].edited = true;
    } else {
      return;
    }
  }

  saveForm(data: ProductGroup, currentIndex: number): void {
    const index = this.getProductGroupIndex(currentIndex);
    const productGroupIdControl = `product-group-id-${index}`;
    const productGroupTitleControl = `product-group-title-${index}`;
    const isFormValid =
      this.validateForm.controls[productGroupTitleControl].valid;

    if (isFormValid) {
      const groupID = this.validateForm.controls[productGroupIdControl].value;
      const groupTitle =
        this.validateForm.controls[productGroupTitleControl].value;

      console.log('hihih');
      if (data.group_id === groupID) {
        this.hideEditableForm(index);
      } else {
        if (data._id) {
          this.productGroupData[index].edited = true;
          this.productGroupData[index].data = {
            ...this.productGroupData[index].data,
            group_id: groupID,
            title: groupTitle,
          };
        } else {
          this.productGroupData[index].data = {
            group_id: groupID,
            title: groupTitle,
            status: data.status,
          };
        }
      }

      this.refreshSubmitBtn();
      this.hideEditableForm(index);
    } else {
      this.validateForm.controls[productGroupTitleControl].markAsDirty();
      this.validateForm.controls[
        productGroupTitleControl
      ].updateValueAndValidity();
    }
  }

  hideEditableForm(index: number): void {
    this.validateForm.removeControl(`product-group-id-${index}`);
    this.validateForm.removeControl(`product-group-title-${index}`);
  }

  onProductGroupTitleChange(value: string, currentIndex: number): void {
    const index = this.getProductGroupIndex(currentIndex);
    const formControlName = `product-group-id-${index}`;
    this.validateForm.controls[formControlName].setValue(textToSlug(value));
  }

  refreshSubmitBtn(): void {
    this.submitUpdateBtn = this.productGroupData.some(
      (val) => val.edited && val.data.title !== ''
    );
    this.submitAddBtn = this.productGroupData.some(
      (val) => val.isNew && val.data.title !== ''
    );
    this.itemNewCount = this.productGroupData.filter(
      (val) => val.isNew && val.data.title !== ''
    ).length;
    this.itemUpdateCount = this.productGroupData.filter(
      (val) => val.edited && val.data.title !== ''
    ).length;
  }

  onCheckedChange(id: string, checked: boolean): void {
    this.updateChekedChange(id, checked);
    this.refreshCheckedChange();
  }

  onAllItemChecked(checked: boolean): void {
    this.productGroupData.forEach((val) => {
      if (val.data._id) {
        if (checked) {
          this.setOfCheckedData.add(val.data._id);
        } else {
          this.setOfCheckedData.clear();
        }
      }
    });
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
    this.checked = this.productGroupData.every((val) => {
      return val.data._id && this.setOfCheckedData.has(val.data._id);
    });

    this.indeterminated =
      this.productGroupData.some((val) => {
        return val.data._id && this.setOfCheckedData.has(val.data._id);
      }) && !this.checked;
  }

  addNewForm(): void {
    this.productGroupData = [
      {
        edited: false,
        isNew: true,
        data: { group_id: '', title: '', status: false },
      },
      ...this.productGroupData,
    ];
    // tslint:disable-next-line: forin
    for (const i in this.validateForm.controls) {
      this.validateForm.removeControl(i);
    }
    this.currentPageIndex = 1;
  }

  removeNewForm(currentIndex: number): void {
    const index = this.getProductGroupIndex(currentIndex);
    this.productGroupData = this.productGroupData.filter((val, i) => {
      return i !== index;
    });
    this.refreshSubmitBtn();
  }

  showUpdateConfirmBox(): void {
    this.modal.confirm({
      nzTitle: `Bạn có muốn cậP nhật ${this.itemUpdateCount} nhóm sản phẩm`,
      nzOkText: 'Xác nhận',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.onUpdateConfirmed().then(() => void 0),
      nzCancelText: 'Huỷ',
      nzOnCancel: () => {
        return;
      },
    });
  }

  showAddNewConfirmBox(): void {
    this.modal.confirm({
      nzTitle: `Bạn có muốn thêm ${this.itemNewCount} nhóm sản phẩm`,
      nzOkText: 'Xác nhận',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.onAddNewConfirmed().then(() => void 0),
      nzCancelText: 'Huỷ',
      nzOnCancel: () => {
        return;
      },
    });
  }

  onAddNewConfirmed(): Promise<any> {
    const listNewData: ProductGroup[] = this.productGroupData
      .filter((val) => val.isNew && val.data.group_id !== '')
      .map((val) => ({ ...val.data }));
    return this.productGroupService
      .insertProductGroup(listNewData)
      .pipe(
        take(1),
        tap((res) => {
          if (res.status === 'FAIL') {
            this.message.error(res.message);
          } else {
            this.message.success(res.message);
            this.getProductGroupList();
          }
        })
      )
      .toPromise();
  }

  onUpdateConfirmed(): Promise<any> {
    const listDataUpdate: ProductGroup[] = this.productGroupData
      .filter((val) => val.edited && val.data.group_id !== '')
      .map((val) => ({ ...val.data }));

    return this.productGroupService
      .updateProductGroups(listDataUpdate)
      .pipe(
        take(1),
        tap((res) => {
          if (res.status === 'FAIL') {
            this.message.error(res.message);
          } else {
            this.productGroupData = this.productGroupData.map((val) => {
              return {
                ...val,
                edited: false,
              };
            });
            this.refreshSubmitBtn();
            this.message.success(res.message);
          }
        })
      )
      .toPromise();
  }

  showDeleteConfirmBox(productGroupID?: string): void {
    this.modal.confirm({
      nzTitle: `Bạn có muốn xoá ${
        productGroupID ? 1 : this.setOfCheckedData.size
      } nhóm sản phẩm`,
      nzOkText: 'Xác nhận',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.onDeleteConfirmed(productGroupID).then(() => void 0),
      nzCancelText: 'Huỷ',
      nzOnCancel: () => {
        return;
      },
    });
  }

  onDeleteConfirmed(productGroupID?: string): Promise<any> {
    const listID: string[] = productGroupID
      ? [productGroupID]
      : this.productGroupData
          .filter(
            (data) => data.data._id && this.setOfCheckedData.has(data.data._id)
          )
          .map((val) => (val.data._id ? val.data._id : ''));

    return this.productGroupService
      .deleteProductGroup(listID)
      .pipe(
        take(1),
        tap((res) => {
          if (res.status === 'SUCCESS') {
            this.message.success(res.message);
            if (productGroupID) {
              this.productGroupData = this.productGroupData.filter(
                (val) => val.data._id !== productGroupID
              );
              this.setOfCheckedData.delete(productGroupID);
            } else {
              this.productGroupData = this.productGroupData.filter(
                (val) =>
                  val.data._id && !this.setOfCheckedData.has(val.data._id)
              );
              this.setOfCheckedData.clear();
            }
            this.refreshCheckedChange();
          } else {
            this.message.error(res.message);
          }
        })
      )
      .toPromise();
  }
}
