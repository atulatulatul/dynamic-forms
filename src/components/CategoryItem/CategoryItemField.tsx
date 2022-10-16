import { Checkbox, FormLabel, Input } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { ChangeEvent, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  CategoryFormField,
  CategoryItemFormValue,
  FormFieldTypes,
} from "../../lib/Category";

const StyledDatePicker = styled(DatePicker)`
  border: 1px solid #e2e8f0;
  padding: 5px;
  borderradium: 10px;
  outline-color: #345ba6;
`;

const CategoryItemTextField = ({
  label,
  onChange,
  defaultValue,
}: {
  defaultValue?: string | null;
  label?: string | null;
  onChange: (event: string) => void;
}) => {
  return (
    <>
      {label && <FormLabel>{label}</FormLabel>}
      <Input
        type="text"
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          onChange(event.currentTarget.value);
        }}
        defaultValue={defaultValue ?? ""}
      />
    </>
  );
};

const CategoryItemNumberField = ({
  defaultValue,
  label,
  onChange,
}: {
  defaultValue?: string | null;
  label?: string | null;
  onChange: (event: string) => void;
}) => {
  return (
    <>
      {label && <FormLabel>{label}</FormLabel>}
      <Input
        type="number"
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          onChange(event.currentTarget.value);
        }}
        defaultValue={defaultValue ?? ""}
      />
    </>
  );
};

const CategoryItemCheckboxField = ({
  defaultChecked = false,
  label,
  onChange,
}: {
  defaultChecked?: boolean | null;
  label?: string | null;
  onChange: (isChecked: boolean) => void;
}) => {
  return (
    <Checkbox
      defaultChecked={defaultChecked ?? false}
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.currentTarget.checked);
      }}
    >
      {label}
    </Checkbox>
  );
};

const CategoryItemDateField = ({
  label,
  onChange,
  defaultValue,
}: {
  defaultValue?: Date | null;
  label?: string | null;
  onChange: (date: Date) => void;
}) => {
  // const [startDate, setStartDate] = useState(new Date());
  const [date, setDate] = useState<Date | undefined>(
    defaultValue ? new Date(defaultValue) : undefined
  );

  return (
    <>
      {label && <FormLabel>{label}</FormLabel>}

      <StyledDatePicker
        selected={date}
        onChange={(date: Date) => {
          setDate(date);
          onChange(date);
        }}
      />
    </>
  );
};

interface CategoryItemFieldProps {
  defaultValue?: CategoryItemFormValue;
  categoryFormField: CategoryFormField;
  onFormValueChange: (formValue: CategoryItemFormValue) => void;
}

const CategoryItemField = ({
  categoryFormField,
  onFormValueChange,
  defaultValue,
}: CategoryItemFieldProps) => {
  const onChange = (formValue: CategoryItemFormValue) => {
    onFormValueChange(formValue);
  };

  const FIELD_TYPE_COMPONENT_MAPPING: Record<FormFieldTypes, JSX.Element> = {
    TEXT: (
      <CategoryItemTextField
        onChange={onChange}
        label={categoryFormField.value}
        defaultValue={defaultValue as string | undefined}
      />
    ),
    DATE: (
      <CategoryItemDateField
        label={categoryFormField.value}
        onChange={onChange}
        defaultValue={defaultValue as Date | undefined | null}
      />
    ),
    NUMBER: (
      <CategoryItemNumberField
        label={categoryFormField.value}
        onChange={onChange}
        defaultValue={defaultValue as string | undefined}
      />
    ),
    CHECKBOX: (
      <CategoryItemCheckboxField
        label={categoryFormField.value}
        onChange={onChange}
        defaultChecked={defaultValue as boolean | undefined | null}
      />
    ),
  };

  return (
    <>
      {categoryFormField.fieldType &&
        FIELD_TYPE_COMPONENT_MAPPING[categoryFormField.fieldType]}
    </>
  );
};

export default CategoryItemField;
