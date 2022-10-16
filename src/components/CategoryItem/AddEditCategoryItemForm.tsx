import { Box, Button } from "@chakra-ui/react";
import { find } from "lodash";
import { CategoryForm, CategoryFormField } from "../../lib/Category";
import PageHeading from "../Shared/PageHeading";
import CategoryItemField from "./CategoryItemField";

interface AddEditCategoryItemFormProps {
  categoryForm: CategoryForm;
}

const AddEditCategoryItemForm = ({
  categoryForm,
}: AddEditCategoryItemFormProps) => {
  return (
    <Box maxW={800} mx="auto">
      <form>
        <Box>{JSON.stringify(categoryForm)}</Box>
        <FormTitle
          titleId={categoryForm.titleId}
          formFields={categoryForm.formFields}
        />

        {categoryForm.formFields.map((formField) => {
          return (
            <Box key={formField.id} my={4}>
              <CategoryItemField categoryFormField={formField} />
            </Box>
          );
        })}

        <Box textAlign="center">
          <Button>Save</Button>
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
