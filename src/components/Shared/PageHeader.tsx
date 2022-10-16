import { Box, Divider } from "@chakra-ui/react";
import theme from "../../theme/theme";

interface PageHeaderProps {
  leftChild?: React.ReactNode;
  rightChild?: React.ReactNode;
}

const PageHeader = ({ leftChild, rightChild }: PageHeaderProps) => {
  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        {leftChild}
        {rightChild}
      </Box>
      <Divider
        my={4}
        borderBottomWidth={2}
        borderColor={theme.colors.customMagicBlue}
        borderRadius={2}
        opacity={1}
      />
    </>
  );
};

export default PageHeader;
