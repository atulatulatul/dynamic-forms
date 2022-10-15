import { Box, BoxProps, Flex, Text } from "@chakra-ui/react";
import React from "react";
import theme from "../../theme/theme";

interface Props extends BoxProps {
  active: boolean;
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const LinkContent = ({ active, label, icon, children, ...props }: Props) => {
  return (
    <Box
      w="100%"
      px={4}
      py={2}
      borderRadius={10}
      transition="0.3s"
      bg={active ? theme.colors.customMagicBlue : "#FCFCFC"}
      color={active ? "white" : theme.colors.customMagicBlue}
      _hover={{
        background: active ? theme.colors.customMagicBlue : "#eaecec",
      }}
      {...props}
    >
      <Flex align="center" justify="space-between">
        <Flex align="center">
          <Flex w="25px" justify="center">
            {icon}
          </Flex>
          <Text fontFamily="heading" ml={4} fontWeight={500}>
            {label}
          </Text>
        </Flex>

        {children}
      </Flex>
    </Box>
  );
};

export default LinkContent;
