import { useParams } from "react-router-dom";
import AddEditCategoryItemForm from "../components/CategoryItem/AddEditCategoryItemForm";
import { useDynamicFormContext } from "../contexts/DynamicFormContext";
import PageNotFound from "./PageNotFound";

const AddCategoryItem = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { getCategoryForm } = useDynamicFormContext();

  const categoryForm = getCategoryForm(categoryId);
  if (!categoryForm) return <PageNotFound />;

  return <AddEditCategoryItemForm categoryForm={categoryForm} />;
};

export default AddCategoryItem;
