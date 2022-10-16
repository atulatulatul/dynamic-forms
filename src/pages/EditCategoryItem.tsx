import { find } from "lodash";
import { useParams } from "react-router-dom";
import AddEditCategoryItemForm from "../components/CategoryItem/AddEditCategoryItemForm";
import { useDynamicFormContext } from "../contexts/DynamicFormContext";
import PageNotFound from "./PageNotFound";

const EditCategoryItem = () => {
  const { categoryId, categoryItemId } = useParams<{
    categoryId: string;
    categoryItemId: string;
  }>();
  const { getCategoryForm } = useDynamicFormContext();

  const categoryForm = getCategoryForm(categoryId);
  if (!categoryForm) return <PageNotFound />;

  const categoryItemToEdit = find(
    categoryForm.items,
    (categoryItem) => categoryItem.id === categoryItemId
  );

  if (categoryItemId && !categoryItemToEdit) return <PageNotFound />;

  return (
    <AddEditCategoryItemForm
      categoryForm={categoryForm}
      categoryItemToEdit={categoryItemToEdit}
    />
  );
};

export default EditCategoryItem;
