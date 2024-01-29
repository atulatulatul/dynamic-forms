import { Box, Flex, Image } from "@chakra-ui/react";
import { MdCategory, MdCircle, MdTableView } from "react-icons/md";
import { useDynamicFormContext } from "../../contexts/DynamicFormContext";
import Logo from "../../images/df-logo.png";
import LeftMenuLink from "./LeftMenuLink";

const MenuSpacer = () => {
  return <Box height="1px" my={2} bg="gray.300" />;
};

const LeftNavigationDrawer = () => {
  const { categoryForms } = useDynamicFormContext();

  return (
    <Box
      pos="sticky"
      pt={2}
      top={0}
      bg="gray.50"
      h="100vh"
      borderRight="1px solid"
      borderColor="gray.300"
      overflowY="auto"
      zIndex={5}
    >
      <Box>
        <NavDrawerHeader />
        <MenuSpacer />
        <LeftMenuLink
          label="Forms"
          to="/"
          icon={<MdCategory size="20px" />}
          exact
        />
        <MenuSpacer />
        <LeftMenuLink
          label="Forms & Submissions"
          to="/items"
          icon={<MdTableView size="20px" />}
          exact
        />
        <MenuSpacer />

        {categoryForms.map((categoryForm) => {
          return (
            <LeftMenuLink
              label={categoryForm.categoryName}
              to={`/item/${categoryForm.id}`}
              icon={<MdCircle size="10px" />}
              exact
              key={categoryForm.id}
            />
          );
        })}
      </Box>
    </Box>
  );
};

const NavDrawerHeader = () => {
  return (
    <Flex justifyContent="center">
      <Image src={Logo} width={150} />
    </Flex>
  );
};

export default LeftNavigationDrawer;
