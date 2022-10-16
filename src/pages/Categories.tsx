import { Box, Button } from "@chakra-ui/react";
import CategoryCard from "../components/Category/CategoryCard";
import NotificationBox from "../components/Shared/NotificationBox";
import PageHeader from "../components/Shared/PageHeader";
import PageHeading from "../components/Shared/PageHeading";
import { useDynamicFormContext } from "../contexts/DynamicFormContext";
import useRedirect, { RedirectLocation } from "../hooks/useRedirect";

const AddCategory = () => {
  const { categoryForms } = useDynamicFormContext();
  const { redirect } = useRedirect();

  const redirectToAddCategoryPage = () => {
    redirect(RedirectLocation.createCategory());
  };

  return (
    <>
      <PageHeader
        leftChild={<PageHeading heading="Categories" />}
        rightChild={
          <Button onClick={redirectToAddCategoryPage}>Add Category</Button>
        }
      />

      <Box mt={4}>
        {categoryForms.map((categoryForm) => (
          <Box key={categoryForm.id} mb={4}>
            <CategoryCard categoryForm={categoryForm} />
          </Box>
        ))}

        {categoryForms.length === 0 && (
          <NotificationBox
            type="error"
            message="You haven't added any category yet."
          />
        )}
      </Box>
    </>
  );
};

export default AddCategory;
