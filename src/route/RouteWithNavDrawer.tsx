import {
  Box,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Route, RouteProps, useLocation } from "react-router-dom";
import LeftNavigationDrawer from "../components/Navigation/LeftNavigationDrawer";
import MenuButton from "../components/Shared/MenuButton";

const RouteWithNavDrawer: React.FC<RouteProps> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();

  useEffect(() => {
    onClose();
  }, [location, onClose]);

  return (
    <Flex>
      <Box
        display={["none", "none", "block", "block", "block"]}
        minW={["230px", "230px", "230px", "260px", "265px"]}
      >
        <LeftNavigationDrawer />
      </Box>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <LeftNavigationDrawer />
        </DrawerContent>
      </Drawer>

      <PageWrapper>
        <Box display={["block", "block", "none", "none", "none"]} mb={12}>
          <MenuButton onClick={onOpen} />
        </Box>

        <Route {...props} />
      </PageWrapper>
    </Flex>
  );
};

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box px={[6, 6, 12, 16, 20]} py={[6, 6, 16, 16, 16]} w="100%" bg="white">
      {children}
    </Box>
  );
};

export default RouteWithNavDrawer;
