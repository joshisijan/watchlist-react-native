import React from "react";
import { StyleSheet, Text, View, Modal } from "react-native";
import { Feather } from "@expo/vector-icons";
import * as color from "../colors";
import { Button } from "react-native-elements";
import { back } from "../navigationRef";

const ModalMessage = ({
  title,
  message,
  type,
  modalActive,
  onDone,
  goBack = false,
  navigation,
}) => {
  return (
    <View>
      <Modal animationType='slide' transparent={true} visible={modalActive}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalIcon}>
              {type ? (
                type === 0 ? (
                  <Feather name='alert-triangle' size={28} color={color.grey} />
                ) : (
                  <Feather name='message-square' size={28} color={color.grey} />
                )
              ) : (
                <Feather name='alert-triangle' size={28} color={color.grey} />
              )}
            </View>
            <Text style={styles.modalTitle}>{title}</Text>
            <Text style={styles.modalMessage}>{message}</Text>
            <Button
              title='Okay'
              buttonStyle={styles.modalButton}
              onPress={() => {
                if (goBack) {
                  back();
                } else onDone(false);
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalMessage;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: color.greyMask,
  },
  modalView: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignSelf: "stretch",
    margin: 15,
  },
  modalIcon: {
    marginBottom: 5,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "capitalize",
    color: color.grey,
    margin: 10,
  },
  modalMessage: {
    color: color.grey,
    marginHorizontal: 10,
    textAlign: "justify",
  },
  modalButton: {
    marginTop: 20,
    paddingHorizontal: 20,
    backgroundColor: color.green,
    borderRadius: 0,
  },
});
