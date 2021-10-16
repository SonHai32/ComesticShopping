import {
  CustomDynamicForm,
  CustomForm,
  DynamicFormControl,
} from './../../types/custom-form.type';
import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'dashboard-custom-form',
  templateUrl: './custom-form.component.html',
  styleUrls: ['./custom-form.component.scss'],
})
export class CustomFormComponent implements OnInit {
  @Input('currentFormList') currentFormList: CustomForm[] = [];
  @Input('currentDynamicFormList') currentDynamicFormList: CustomDynamicForm[] =
    [];
  @Input('currentFormGroup') currentFormGroup!: FormGroup;
  @Output('addChildDynamicForm') addChildDynamicForm =
    new EventEmitter<string>();
  @Output('removeChildDynamicForm') removeChildDynamicForm = new EventEmitter<{
    fieldName: string;
    control: DynamicFormControl;
  }>();
  @Output('inputChange') inputChange = new EventEmitter<{
    formControlName: string;
    value: string;
  }>();

  constructor() {}

  ngOnInit(): void {}

  handleAddChildDynamicForm(fieldName: string, event?: MouseEvent) {
    if (event) {
      event.preventDefault();
    }

    this.addChildDynamicForm.emit(fieldName);
  }
  handleRemoveChildDynamicForm(
    fieldName: string,
    control: DynamicFormControl,
    event?: MouseEvent
  ) {
    if (event) {
      event.preventDefault();
    }
    this.removeChildDynamicForm.emit({ fieldName, control });
  }

  handleInputChange(formControlName: string, value: string) {
    this.inputChange.emit({ formControlName, value });
  }

}
