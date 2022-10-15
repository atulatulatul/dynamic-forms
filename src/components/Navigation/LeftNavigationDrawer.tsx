import { Box, Text } from "@chakra-ui/react";
import { MdCategory } from "react-icons/md";
import LeftMenuLink from "./LeftMenuLink";

const MenuSpacer = () => {
  return <Box height="1px" my={2} bg="gray.300" />;
};

const LeftNavigationDrawer = () => {
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
          label="Add Category"
          to="/"
          icon={<MdCategory size="20px" />}
          exact
        />
        <MenuSpacer />
        <LeftMenuLink
          label="All Categories"
          to="/categories"
          icon={<MdCategory size="20px" />}
        />
        <MenuSpacer />
      </Box>
    </Box>
  );
};

const NavDrawerHeader = () => {
  return (
    <Box textAlign="center">
      <Text fontWeight={600} fontSize={30}>
        Forms
      </Text>
    </Box>
  );
};

export default LeftNavigationDrawer;
