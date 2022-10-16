import {
  ToastPositionWithLogical,
  useToast as useChakraToast,
} from "@chakra-ui/react";
import { useCallback } from "react";

const TOAST_DISPLAY_DURATION = 5000; // Milliseconds
const TOAST_POSITION: ToastPositionWithLogical = "bottom-right";

// TODO: create a new custom toast component (as the close button isn't alligned to the toast heading in chakra's toast)
// Pass that created custom toast component to the useToast (option name: "render").
// Reference: https://chakra-ui.com/docs/components/toast/props (search for "render" prop)
const useToast = () => {
  const toast = useChakraToast();

  const showSuccessToast = useCallback(
    (title: string, description?: string) => {
      toast({
        title,
        description,
        status: "success",
        duration: TOAST_DISPLAY_DURATION,
        isClosable: true,
        position: TOAST_POSITION,
      });
    },
    [toast]
  );

  const showErrorToast = useCallback(
    (
      title: string = `Ooops! Something went wrong.`,
      description: string = `Please try again.`
    ) => {
      toast({
        title,
        description,
        status: "error",
        duration: TOAST_DISPLAY_DURATION,
        isClosable: true,
        position: TOAST_POSITION,
      });
    },
    [toast]
  );

  return {
    showSuccessToast,
    showErrorToast,
  };
};

export default useToast;
