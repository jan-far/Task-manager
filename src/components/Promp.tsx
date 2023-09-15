import React, {SetStateAction, Dispatch} from 'react';
import {
  Center,
  Button,
  Text,
  ButtonText,
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogContent,
  AlertDialogHeader,
  Heading,
  AlertDialogCloseButton,
  Icon,
  CloseCircleIcon,
  AlertDialogBody,
  AlertDialogFooter,
  ButtonGroup,
} from '@gluestack-ui/themed';

interface IPrompt {
  removeTask: () => void;
  message?: string;
  showAlertDialog: boolean;
  setShowAlertDialog: Dispatch<SetStateAction<boolean>>;
}

const Prompt = ({
  message,
  showAlertDialog,
  setShowAlertDialog,
  removeTask,
}: IPrompt) => {
  return (
    <Center h={300}>
      <AlertDialog
        isOpen={showAlertDialog}
        onClose={() => {
          setShowAlertDialog(false);
        }}>
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <AlertDialogHeader>
            <Heading fontSize="$lg">Remove Task</Heading>
            <AlertDialogCloseButton>
              <Icon as={CloseCircleIcon} p="$3" />
            </AlertDialogCloseButton>
          </AlertDialogHeader>
          <AlertDialogBody>
            <Text fontSize="$sm">
              {message ?? 'Are you sure you want to delete this Task?'}
            </Text>
          </AlertDialogBody>
          <AlertDialogFooter>
            <ButtonGroup>
              <Button
                mr="$4"
                onPress={() => {
                  setShowAlertDialog(false);
                }}>
                <ButtonText>Cancel</ButtonText>
              </Button>
              <Button
                bg="$error600"
                onPress={() => {
                  removeTask();
                  setTimeout(() => setShowAlertDialog(false), 500);
                }}>
                <ButtonText>Delete</ButtonText>
              </Button>
            </ButtonGroup>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Center>
  );
};

export default Prompt;
