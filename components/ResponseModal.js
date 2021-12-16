import React from "react";
import { Button, Modal, NativeBaseProvider, Text, VStack } from "native-base";
import { Colors } from "../constants/style";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";

export const ResponseModal = (props) => {
  const navigation = useNavigation();
  return (
    <>
      <Modal
        isOpen={props.showModal}
        onClose={() => props.setShowModal(false)}
        size="lg"
      >
        <Modal.Content>
          <Modal.Body>
            <VStack space="3" padding={5} alignItems="center" mb={5}>
              {/* <Text
                bold
                fontSize="md"
                color={
                  props.status === true ? Colors.primaryDark : Colors.danger
                }
                mb={5}
                letterSpacing={1}
                textAlign="center"
              >
                {props.message}
              </Text> */}
              <Text fontSize="xl" textAlign="center" color={"black"} my={2}>
                {props.message}
              </Text>
              <Button
                colorScheme={"tertiary"}
                px={10}
                borderRadius={50}
                onPress={() => navigation.replace(props?.linkTo)}
              >
                <Text color={Colors.white} bold letterSpacing={1}>
                  Oke
                </Text>
              </Button>
            </VStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default () => {
  return (
    <NativeBaseProvider>
      <ResponseModal />
    </NativeBaseProvider>
  );
};
