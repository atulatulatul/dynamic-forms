import { Box, Button } from "@chakra-ui/react";
import { find, isEmpty, some, values } from "lodash";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { useDynamicFormContext } from "../../contexts/DynamicFormContext";
import useRedirect, { RedirectLocation } from "../../hooks/useRedirect";
import useToast from "../../hooks/useToast";
import {
  CategoryForm,
  CategoryFormField,
  CategoryItemForm,
  CategoryItemFormField,
  CategoryItemFormValue,
} from "../../lib/Category";
import PageHeading from "../Shared/PageHeading";
import CategoryItemField from "./CategoryItemField";

interface AddEditCategoryItemFormProps {
  categoryForm: CategoryForm;
  categoryItemToEdit?: CategoryItemForm;
}

const AddEditCategoryItemForm = ({
  categoryForm,
  categoryItemToEdit,
}: AddEditCategoryItemFormProps) => {
  const { addCategoryItem, editCategoryItem } = useDynamicFormContext();
  const { showErrorToast } = useToast();
  const { redirect } = useRedirect();
  const { categoryItemId } = useParams<{ categoryItemId: string }>();

  const [categoryItemForm, setCategoryItemForm] = useState<
    CategoryItemFormField | undefined
  >(categoryItemToEdit?.formFields);

  const onFormValueChange = (
    formValue: CategoryItemFormValue,
    fieldId: string
  ) => {
    setCategoryItemForm((prevCategoryItemForm) => ({
      ...prevCategoryItemForm,
      [fieldId]: formValue,
    }));
  };

  const onFormSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    // At least one value is mandatory
    const isFormEmpty =
      values(categoryItemForm).length === 0 ||
      some(values(categoryItemForm), !isEmpty);

    if (isFormEmpty) return showErrorToast("Error", "All fields are mandatory");

    // If form is to be edited
    if (categoryItemId) {
      editCategoryItem({
        categoryFormId: categoryForm.id,
        categoryItemId,
        formFields: categoryItemForm!,
      });

      redirect(RedirectLocation.categoryItemListing(categoryForm.id));
      return;
    }

    addCategoryItem(categoryForm.id, {
      id: uuid(),
      categoryId: categoryForm.id,
      formFields: categoryItemForm!, // Can't go undefined
    });

    redirect(RedirectLocation.categoryItemListing(categoryForm.id));
  };

  return (
    <Box maxW={800} mx="auto">
      <form onSubmit={onFormSubmit}>
        <PageHeading
          heading={`${categoryItemId ? "Edit" : "Create"} Item
            ${
              categoryItemForm?.[categoryForm.titleId]
                ? " - " + categoryItemForm?.[categoryForm.titleId]?.toString()!
                : ""
            }`}
        />

        {categoryForm.formFields.map((formField) => {
          return (
            <Box key={formField.id} my={4}>
              <CategoryItemField
                categoryFormField={formField}
                onFormValueChange={(formValue: CategoryItemFormValue) =>
                  onFormValueChange(formValue, formField.id)
                }
                defaultValue={categoryItemToEdit?.formFields?.[formField.id]}
              />
            </Box>
          );
        })}

        <Box textAlign="center">
          <Button type="submit">Save</Button>
        </Box>
      </form>
    </Box>
  );
};

const FormTitle = ({
  titleId,
  formFields,
}: {
  titleId: string;
  formFields: CategoryFormField[];
}) => {
  const titleField = find(formFields, (formField) => formField?.id === titleId);

  if (!titleField?.value) return null;

  return <PageHeading heading={titleField?.value} />;
};

export default AddEditCategoryItemForm;
