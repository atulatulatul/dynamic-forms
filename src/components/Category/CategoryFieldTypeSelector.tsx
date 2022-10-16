import { Select } from "@chakra-ui/react";
import { ChangeEvent } from "react";
import { CATEGORY_FORM_FIELDS, FormFieldTypes } from "../../lib/Category";

interface CategoryFieldTypeSelectorProps {
  onCategoryFieldTypeSelection: (selectedCategory: FormFieldTypes) => void;
  defaultValue?: FormFieldTypes;
}

const CategoryFieldTypeSelector = ({
  onCategoryFieldTypeSelection,
  defaultValue,
}: CategoryFieldTypeSelectorProps) => {
  const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onCategoryFieldTypeSelection(event.target.value as FormFieldTypes);
  };

  return (
    <Select
      onChange={onChange}
      value={defaultValue}
      placeholder={"Type"}
      borderTopLeftRadius={0}
      borderBottomLeftRadius={0}
    >
      {Object.entries(CATEGORY_FORM_FIELDS).map(
        ([formFieldType, formFieldName]) => (
          <option key={formFieldType} value={formFieldType}>
            {formFieldName}
          </option>
        )
      )}
    </Select>
  );
};

export default CategoryFieldTypeSelector;
