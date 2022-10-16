import { Flex } from "@chakra-ui/react";
import { useDynamicFormContext } from "../../contexts/DynamicFormContext";
import useRedirect, { RedirectLocation } from "../../hooks/useRedirect";
import { CategoryForm } from "../../lib/Category";
import CardEditDeleteButton from "../Shared/CardEditDeleteButton";

interface CategoryCardProps {
  categoryForm: CategoryForm;
}

const CategoryCard = ({ categoryForm }: CategoryCardProps) => {
  const { deleteCategoryForm } = useDynamicFormContext();
  const { redirect } = useRedirect();

  const onDeleteClick = () => {
    deleteCategoryForm(categoryForm.id);
  };

  const onEditClick = () => {
    redirect(RedirectLocation.editCategory(categoryForm.id));
  };

  return (
    <Flex p={5} bg="gray.200" borderRadius={10} justifyContent="space-between">
      {categoryForm.categoryName}
      <CardEditDeleteButton
        onDeleteClick={onDeleteClick}
        onEditClick={onEditClick}
        elementName={categoryForm.categoryName}
      />
    </Flex>
  );
};

export default CategoryCard;
