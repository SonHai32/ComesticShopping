export type ErrorTooltipsFuntion = (controlName: string) => string;
export type FormRemoveFuntion = (
  control: DynamicFormControl,
  controlname: string,
  event: MouseEvent
  // currentFormList: DynamicFormControl[]
) => void;
export type AddFormControlFuntion = (
  fieldName: string,
  // currentFormList: DynamicFormControl[],
  event: MouseEvent
) => void;

export type FormInputChange = (controlName: string, value: string) => void;

export type DynamicFormControl = {
  id: number;
  controlInstance: string;
  value: string | null;
};

export interface nzGridColType {
  nzXxl: number;
  nzXl: number;
  nzLg: number;
  nzMd: number;
  nzSm: number;
  nzXs: number;
  nzSpan: number;
}
export interface CustomForm {
  formLabel?: string;
  formControlName: string;
  placeholder: string;
  errorTooltips: ErrorTooltipsFuntion;
  inputChange?: FormInputChange,
  gridCol: nzGridColType;
  icon?: {
    theme: 'fill' | 'outline' | 'twotone';
    type: string;
    twotoneColor?: string;
  };
  limit?: number;
  control?: DynamicFormControl;
  type?: string
}

export interface CustomDynamicForm {
  listOfForm: DynamicFormControl[];
  formLabel?: string;
  fieldName: string;
  buttonName: string;
  placeHolder: string;
  errorTooltips: ErrorTooltipsFuntion;
  // removeForm: FormRemoveFuntion;
  // addFormControl: AddFormControlFuntion;
}
