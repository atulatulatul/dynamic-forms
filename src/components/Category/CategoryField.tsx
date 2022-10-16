import { Box, FormLabel, Input } from "@chakra-ui/react";
import { isNull } from "lodash";
import { ChangeEvent, useState } from "react";
import { CategoryFormField, FormFieldTypes } from "../../lib/Category";
import CategoryFieldTypeSelector from "./CategoryFieldTypeSelector";

export const CategoryTextField = ({
  isDisabled = false,
  value,
  label,
  onChange,
}: {
  isDisabled?: boolean;
  value?: string;
  label?: string | null;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <>
      {label && <FormLabel>{label}</FormLabel>}
      <Input
        type="text"
        borderTopRightRadius={0}
        borderBottomRightRadius={0}
        disabled={isDisabled}
        onChange={onChange}
        value={value}
      />
    </>
  );
};

const CategoryField = ({
  value,
  fieldType,
  fieldId,
  onAnyValueChange,
}: {
  value?: string | null;
  fieldType?: FormFieldTypes | null;
  fieldId: string;
  onAnyValueChange: (formValue: CategoryFormField) => void;
}) => {
  const [fieldCategory, setFieldCategory] = useState<
    FormFieldTypes | null | undefined
  >(fieldType);

  const onChange = (
    formValue: string | null,
    selectedCategory: FormFieldTypes
  ) => {
    if (selectedCategory) {
      onAnyValueChange({
        id: fieldId,
        value: formValue,
        fieldType: selectedCategory,
      });
    }
  };

  return (
    <Box display="flex">
      <CategoryTextField
        isDisabled={!fieldCategory}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          onChange(event.currentTarget.value, fieldCategory!);
        }}
        value={value ?? ""}
      />

      <Box w={150}>
        <CategoryFieldTypeSelector
          onCategoryFieldTypeSelection={(selectedCategory) => {
            setFieldCategory(selectedCategory);
            onChange(null, selectedCategory);
          }}
          defaultValue={isNull(fieldType) ? undefined : fieldType}
        />
      </Box>
    </Box>
  );
};

export default CategoryField;
