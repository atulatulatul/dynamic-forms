import { Heading } from "@chakra-ui/react";

interface PageHeadingProps {
  heading: string;
}

const PageHeading = ({ heading }: PageHeadingProps) => {
  return <Heading>{heading}</Heading>;
};

export default PageHeading;
