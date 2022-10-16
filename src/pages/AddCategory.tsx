import { Box } from "@chakra-ui/react";
import CategoryAddEditForm from "../components/Category/CategoryForm";
import PageHeader from "../components/Shared/PageHeader";
import PageHeading from "../components/Shared/PageHeading";

const AddCategory = () => {
  return (
    <Box maxW={800} mx="auto">
      <PageHeader leftChild={<PageHeading heading="Add Category" />} />
      <CategoryAddEditForm />
    </Box>
  );
};

export default AddCategory;
