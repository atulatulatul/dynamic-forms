import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import CategoryItemCard from "../components/CategoryItem/CategoryItemCard";
import NotificationBox from "../components/Shared/NotificationBox";
import PageHeader from "../components/Shared/PageHeader";
import PageHeading from "../components/Shared/PageHeading";
import { useDynamicFormContext } from "../contexts/DynamicFormContext";

const CategoryItems = () => {
  const { categoryForms } = useDynamicFormContext();

  return (
    <>
      <PageHeader leftChild={<PageHeading heading="Forms & Submissions" />} />

      <Accordion defaultIndex={[0]} allowMultiple>
        {categoryForms.map((categoryForm) => {
          return (
            <AccordionItem key={categoryForm.id} my={4} border="none">
              <Box>
                <AccordionButton
                  bg="#E2E8F0"
                  borderRadius={10}
                  _expanded={{ bg: "gray.200", border: "none" }}
                >
                  <Box
                    flex="1"
                    textAlign="left"
                    py={3}
                    fontSize={18}
                    fontWeight={600}
                    color="gray.700"
                  >
                    {categoryForm.categoryName}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </Box>

              <AccordionPanel>
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
                  <Box my={4}>
                    <NotificationBox
                      type="error"
                      message="No response added yet"
                    />
                  </Box>
                )}
              </AccordionPanel>
            </AccordionItem>
          );
        })}
      </Accordion>

      {categoryForms.length === 0 && (
        <NotificationBox
          type="error"
          message="Let's start by creating a form"
        />
      )}
    </>
  );
};

export default CategoryItems;
