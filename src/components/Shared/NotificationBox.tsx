import { Alert, AlertIcon, AlertStatus } from "@chakra-ui/react";

interface NotificationBoxProps {
  type?: AlertStatus;
  message?: string;
}

const NotificationBox = ({
  type,
  message = "Oops! Nothing here",
}: NotificationBoxProps) => {
  return (
    <Alert status={type} borderRadius={8}>
      <AlertIcon />
      {message}
    </Alert>
  );
};

export default NotificationBox;
