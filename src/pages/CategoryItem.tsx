import { Box, Button } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import PageHeader from "../components/Shared/PageHeader";
import PageHeading from "../components/Shared/PageHeading";
import { useDynamicFormContext } from "../contexts/DynamicFormContext";
import useRedirect, { RedirectLocation } from "../hooks/useRedirect";
import PageNotFound from "./PageNotFound";

const CategoryItem = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { redirect } = useRedirect();
  const { getCategoryForm } = useDynamicFormContext();
  const categoryForm = getCategoryForm(categoryId);

  if (!categoryForm) return <PageNotFound />;

  return (
    <Box mx="auto">
      <PageHeader
        leftChild={<PageHeading heading="Category item" />}
        rightChild={
          <Button
            onClick={() => {
              redirect(RedirectLocation.createItem(categoryId));
            }}
          >
            Add Item
          </Button>
        }
      />
    </Box>
  );
};

export default CategoryItem;
