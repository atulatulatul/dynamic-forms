import { Box, Flex, Text } from "@chakra-ui/react";
import { MdMenu } from "react-icons/md";

interface Props {
  onClick: () => void;
}

const MenuButton = ({ onClick }: Props) => {
  return (
    <Box cursor="pointer" transition="0.3s" onClick={onClick}>
      <Flex align="center">
        <Box as={MdMenu} size="32px" mr={2} />
        <Text textTransform="uppercase" fontWeight={600}>
          Menu
        </Text>
      </Flex>
    </Box>
  );
};

export default MenuButton;
