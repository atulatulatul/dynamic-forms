import { Box, Button, Flex, FormLabel, Select } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { useDynamicFormContext } from "../../contexts/DynamicFormContext";
import useRedirect, { RedirectLocation } from "../../hooks/useRedirect";
import useToast from "../../hooks/useToast";
import { CategoryForm, CategoryFormField } from "../../lib/Category";
import CategoryField, { CategoryTextField } from "./CategoryField";

const getDefaultCategoryFormValue = () => ({
  id: uuid(),
  value: null,
  fieldType: null,
});

interface CategoryFormProps {
  categoryFormDefaultValue?: CategoryForm;
}

const CategoryAddEditForm = ({
  categoryFormDefaultValue,
}: CategoryFormProps) => {
  const { addCategoryForm, editCategoryForm } = useDynamicFormContext();
  const { redirect } = useRedirect();
  const { showErrorToast } = useToast();
  const { categoryId } = useParams<{ categoryId: string }>();

  const [formFields, setFormFields] = useState<CategoryFormField[]>(
    categoryFormDefaultValue?.formFields ?? [
      {
        ...getDefaultCategoryFormValue(),
      },
    ]
  );

  const [categoryName, setCategoryName] = useState<string | undefined>(
    categoryFormDefaultValue?.categoryName
  );

  const [titleId, setTitleId] = useState<string | undefined>(
    categoryFormDefaultValue?.titleId
  );

  const addCategoryField = () => {
    setFormFields((prevForms) => [...prevForms, getDefaultCategoryFormValue()]);
  };

  const onFormSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (!categoryName) {
      return showErrorToast("Error", "Please enter category name");
    }
    if (!titleId) {
      return showErrorToast("Error", "Please select title field");
    }

    // check if the category is being edited
    if (categoryId) {
      editCategoryForm(categoryId, {
        id: uuid(),
        titleId: titleId,
        categoryName: categoryName!,
        formFields,
      });
      redirect(RedirectLocation.categoryListing());
      return;
    }

    addCategoryForm({
      id: uuid(),
      titleId: titleId,
      categoryName: categoryName!,
      formFields,
    });
    redirect(RedirectLocation.categoryListing());
  };

  const onFormFieldValueChange = (
    formValues: CategoryFormField,
    index: number
  ) => {
    const formFieldValues = [...formFields];
    formFieldValues[index] = formValues;
    setFormFields([...formFieldValues]);
  };

  return (
    <form onSubmit={onFormSubmit}>
      <FormLabel>Name</FormLabel>

      <Box mb={4}>
        <CategoryTextField
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setCategoryName(event.currentTarget.value);
          }}
          value={categoryName}
        />
      </Box>

      <FormLabel>Title Field</FormLabel>
      <Box mb={4}>
        <Select
          onChange={(event: ChangeEvent<HTMLSelectElement>) => {
            setTitleId(event.target.value);
          }}
          placeholder="Select Title"
          defaultValue={titleId}
        >
          {formFields.map((formField) => {
            return (
              formField.value && (
                <option value={formField.id} key={formField.id}>
                  {formField.value}
                </option>
              )
            );
          })}
        </Select>
      </Box>

      <Flex gap={2} alignItems="end">
        <Box width="90%">
          {formFields.map((formField, index) => {
            return (
              <Box mb={4} key={formField.id}>
                <CategoryField
                  fieldId={formField.id}
                  onAnyValueChange={(formValues: CategoryFormField) => {
                    onFormFieldValueChange(formValues, index);
                  }}
                  value={formField.value}
                  fieldType={formField.fieldType}
                />
              </Box>
            );
          })}
        </Box>
        <Box>
          <Button onClick={addCategoryField} bg="green.600" mb={4}>
            Add Field
          </Button>
        </Box>
      </Flex>

      <Box textAlign="center" mt={4}>
        <Button mt={4} width="50%" type="submit">
          Save Category
        </Button>
      </Box>
    </form>
  );
};

export default CategoryAddEditForm;
