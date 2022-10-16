import { Checkbox, FormLabel, Input } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { ChangeEvent, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CategoryFormField, FormFieldTypes } from "../../lib/Category";
import { CategoryTextField } from "../Category/CategoryField";

const StyledDatePicker = styled(DatePicker)`
  border: 1px solid #e2e8f0;
  padding: 5px;
  borderradium: 10px;
  outline-color: #345ba6;
`;

const CategoryNumberField = ({
  onChange,
  label,
}: {
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  label?: string | null;
}) => {
  return (
    <>
      {label && <FormLabel>{label}</FormLabel>}
      <Input
        type="number"
        borderTopRightRadius={0}
        borderBottomRightRadius={0}
        onChange={onChange}
      />
    </>
  );
};

const CategoryCheckboxField = ({
  defaultChecked = false,
  label,
}: {
  defaultChecked?: boolean;
  label?: string | null;
}) => {
  return <Checkbox defaultChecked={defaultChecked}>{label}</Checkbox>;
};

const CategoryDateField = ({ label }: { label?: string | null }) => {
  // const [startDate, setStartDate] = useState(new Date());
  const [date, setDate] = useState<Date>();

  return (
    <>
      {label && <FormLabel>{label}</FormLabel>}

      <StyledDatePicker
        selected={date}
        onChange={(date: Date) => setDate(date)}
      />
    </>
  );
};

interface CategoryItemFieldProps {
  categoryFormField: CategoryFormField;
}

const CategoryItemField = ({ categoryFormField }: CategoryItemFieldProps) => {
  const onChange = () => {
    console.log("This is changed");
  };

  const FIELD_TYPE_COMPONENT_MAPPING: Record<FormFieldTypes, JSX.Element> = {
    TEXT: (
      <CategoryTextField onChange={onChange} label={categoryFormField.value} />
    ),
    DATE: <CategoryDateField label={categoryFormField.value} />,
    NUMBER: <CategoryNumberField label={categoryFormField.value} />,
    CHECKBOX: <CategoryCheckboxField label={categoryFormField.value} />,
  };

  return (
    <>
      {categoryFormField.fieldType &&
        FIELD_TYPE_COMPONENT_MAPPING[categoryFormField.fieldType]}
    </>
  );
};

export default CategoryItemField;
