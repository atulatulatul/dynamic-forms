import { Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import CategoryAddEditForm from "../components/Category/CategoryForm";
import PageHeader from "../components/Shared/PageHeader";
import PageHeading from "../components/Shared/PageHeading";
import { useDynamicFormContext } from "../contexts/DynamicFormContext";
import PageNotFound from "./PageNotFound";

const EditCategory = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { getCategoryForm } = useDynamicFormContext();
  const categoryForm = getCategoryForm(categoryId);

  if (!categoryForm) return <PageNotFound />;

  return (
    <Box maxW={800} mx="auto">
      <PageHeader leftChild={<PageHeading heading="Edit Category" />} />
      <CategoryAddEditForm categoryFormDefaultValue={categoryForm} />
    </Box>
  );
};

export default EditCategory;
