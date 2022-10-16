import { Box, Heading } from "@chakra-ui/react";
import { Fragment } from "react";
import CategoryItemCard from "../components/CategoryItem/CategoryItemCard";
import NotificationBox from "../components/Shared/NotificationBox";
import PageHeader from "../components/Shared/PageHeader";
import PageHeading from "../components/Shared/PageHeading";
import { useDynamicFormContext } from "../contexts/DynamicFormContext";

const CategoryItems = () => {
  const { categoryForms } = useDynamicFormContext();

  return (
    <>
      <PageHeader leftChild={<PageHeading heading="Items" />} />
      {categoryForms.map((categoryForm) => {
        return (
          <Fragment key={categoryForm.id}>
            <Heading size="xl" my={4}>
              {categoryForm.categoryName}
            </Heading>
            {categoryForm.items.map((categoryItem) => (
              <Box my={4} key={categoryItem.id}>
                <CategoryItemCard
                  titleId={categoryForm.titleId}
                  categoryItem={categoryItem}
                  categoryId={categoryForm.id}
                />
              </Box>
            ))}
            {categoryForm.items.length === 0 && (
              <NotificationBox type="error" message="No items added yet." />
            )}
          </Fragment>
        );
      })}
      {categoryForms.length === 0 && (
        <NotificationBox type="error" message="Nothing to show." />
      )}
    </>
  );
};

export default CategoryItems;
