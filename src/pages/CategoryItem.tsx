import { Box, Button } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import CategoryItemCard from "../components/CategoryItem/CategoryItemCard";
import NotificationBox from "../components/Shared/NotificationBox";
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
      {categoryForm.items.map((categoryItem) => (
        <Box my={4} key={categoryItem.id}>
          <CategoryItemCard
            categoryId={categoryForm.id}
            titleId={categoryForm.titleId}
            categoryItem={categoryItem}
          />
        </Box>
      ))}

      {categoryForm.items.length === 0 && (
        <NotificationBox
          type="error"
          message="You haven't added any item to this category yet."
        />
      )}
    </Box>
  );
};

export default CategoryItem;
