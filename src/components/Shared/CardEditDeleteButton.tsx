import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  HStack,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import { MdDelete, MdModeEdit } from "react-icons/md";

interface CardEditDeleteButtonProps {
  elementName?: string;
  onDeleteClick: () => void;
  onEditClick: () => void;
}

const CardEditDeleteButton = ({
  elementName,
  onDeleteClick,
  onEditClick,
}: CardEditDeleteButtonProps) => {
  const {
    isOpen: isConfirmBoxOpen,
    onOpen: openConfirmBox,
    onClose: closeConfirmBox,
  } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <HStack spacing={2}>
        <IconButton
          icon={<MdModeEdit />}
          aria-label="edit"
          size="xs"
          rounded="full"
          _hover={{
            bg: "gray.600",
          }}
          onClick={onEditClick}
        />

        <IconButton
          icon={<MdDelete />}
          aria-label="remove"
          colorScheme="red"
          color="white"
          size="xs"
          rounded="full"
          onClick={openConfirmBox}
        />
      </HStack>

      <AlertDialog
        blockScrollOnMount={false}
        isCentered
        leastDestructiveRef={cancelRef}
        isOpen={isConfirmBoxOpen}
        onClose={closeConfirmBox}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Category
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete <strong>{elementName}</strong>?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={closeConfirmBox}
                size="sm"
                fontWeight={400}
              >
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={onDeleteClick}
                ml={3}
                size="sm"
                fontWeight={400}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default CardEditDeleteButton;
