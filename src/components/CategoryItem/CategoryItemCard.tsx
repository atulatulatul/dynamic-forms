import { Flex } from "@chakra-ui/react";
import { useDynamicFormContext } from "../../contexts/DynamicFormContext";
import useRedirect, { RedirectLocation } from "../../hooks/useRedirect";
import { CategoryItemForm } from "../../lib/Category";
import CardEditDeleteButton from "../Shared/CardEditDeleteButton";

interface CategoryItemCardProps {
  categoryId: string;
  titleId: string;
  categoryItem: CategoryItemForm;
}

const CategoryItemCard = ({
  categoryId,
  titleId,
  categoryItem,
}: CategoryItemCardProps) => {
  const { redirect } = useRedirect();
  const { deleteCategoryItem } = useDynamicFormContext();

  const onDeleteClick = () => {
    deleteCategoryItem({
      categoryFormId: categoryId,
      categoryItemFormId: categoryItem.id,
    });
  };

  const onEditClick = () => {
    redirect(RedirectLocation.editCategoryItem(categoryId, categoryItem.id));
  };

  return (
    <Flex p={5} bg="gray.200" borderRadius={10} justifyContent="space-between">
      {categoryItem.formFields[titleId]?.toString() ?? "<NO TITLE>"}
      <CardEditDeleteButton
        onDeleteClick={onDeleteClick}
        onEditClick={onEditClick}
        elementName={categoryItem.formFields?.[titleId]?.toString()}
      />
    </Flex>
  );
};

export default CategoryItemCard;
