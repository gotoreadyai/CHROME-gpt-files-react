export interface Option {
  label: string;
  value: string;
}

export interface FieldBase {
  name: string;
  label?: string;
  default?: any;
  condition?: { field: string; value: any }; // Add this line
}

export interface TextField extends FieldBase {
  type: "text" | "email" | "password" | "textarea" | "code";
  required?: boolean;
  props?: any;
}

export interface CheckboxField extends FieldBase {
  type: "checkbox";
  default?: boolean; // Optional default value to specify if the checkbox should be checked initially
  props?: any;
}

export interface CheckboxGroupField extends FieldBase {
  type: "checkbox-group";
  options: Option[];
  props?: any;
}

export interface SelectField extends FieldBase {
  type: "select";
  options: Option[];
  props?: any;
}

export interface EnumField extends FieldBase {
  type: "enum";
  fields: FormField[];
}

export interface GroupField extends FieldBase {
  type: "group";
  fields: FormField[];
}

export interface CodeField extends FieldBase {
  type: "code";

}

export type FormField =
  | TextField
  | CheckboxGroupField
  | EnumField
  | GroupField
  | CheckboxField
  | CodeField
  | SelectField;


export interface FormSchema {
  title?: string;
  submit?: string;
  fields: FormField[];
  
}
