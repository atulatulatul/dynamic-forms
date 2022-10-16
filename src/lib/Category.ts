export type FormFieldTypes = "DATE" | "TEXT" | "CHECKBOX" | "NUMBER";

export const CATEGORY_FORM_FIELDS: Record<FormFieldTypes, string> = {
  TEXT: "Text",
  NUMBER: "Number",
  CHECKBOX: "Checkbox",
  DATE: "Date",
};

export interface CategoryFormField {
  id: string;
  value: string | null;
  fieldType: FormFieldTypes | null;
}

export interface CategoryForm {
  id: string;
  titleId: string;
  categoryName: string;
  formFields: CategoryFormField[];
}
