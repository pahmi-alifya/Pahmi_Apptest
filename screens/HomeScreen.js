import {
  Box,
  Fab,
  Image,
  Icon,
  VStack,
  Heading,
  Skeleton,
  Stack,
} from "native-base";
import React, { useEffect, useLayoutEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import { connect } from "react-redux";

import { FontAwesome, Feather } from "@expo/vector-icons";
import { SwipeListView } from "react-native-swipe-list-view";
import { useIsFocused } from "@react-navigation/core";

import { heightPercentageToDP as hp } from "react-native-responsive-screen";

// actions
import { getContact, deleteContact } from "../redux/actions/contact";

const HomeScreen = ({
  navigation,
  loading,
  contacts,
  getContact,
  deleteContact,
}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "KONTAK",
      headerTransparent: true,
    });
  }, [navigation]);

  const isFocused = useIsFocused();

  useEffect(() => {
    getContact();
  }, [navigation]);

  const onDeleteContact = (id) => {
    deleteContact(id);
  };

  if (loading) {
    return (
      <VStack space={5} width="100%" mt={hp("13%")} px={5}>
        <Skeleton startColor="#bfbfbf" endColor="#a6a6a6" height="50px" />
        <Skeleton
          startColor="#bfbfbf"
          endColor="#a6a6a6"
          height="50px"
          mt={-2}
        />
        <Skeleton
          startColor="#bfbfbf"
          endColor="#a6a6a6"
          height="50px"
          mt={-2}
        />
      </VStack>
    );
  }

  console.log(contacts);

  return (
    <SafeAreaView style={styles.container}>
      <SwipeListView
        data={contacts}
        previewRowKey={"0"}
        previewOpenValue={-40}
        previewOpenDelay={3000}
        ListEmptyComponent={() => (
          <Heading textAlign="center" mt={3}>
            Data Kosong
          </Heading>
        )}
        renderItem={({ item, index }) => (
          <TouchableHighlight
            style={styles.row}
            key={index}
            underlayColor="#e1fcf0"
            onPress={() => navigation.navigate("Contact", { id: item?.id })}
          >
            <View style={styles.contact}>
              <Image
                size="16"
                rounded="full"
                source={{
                  uri:
                    item?.photo !== "N/A"
                      ? item?.photo
                      : "http://cdn.onlinewebfonts.com/svg/img_569204.png",
                }}
                alt="image"
              />
              <View style={styles.person}>
                <Text style={styles.fullName}>
                  {item?.firstName ?? "" + " " + item?.lastName ?? ""}
                </Text>
                <Text style={styles.age}>{`${item?.age} Tahun`}</Text>
              </View>
            </View>
          </TouchableHighlight>
        )}
        renderHiddenItem={({ item, index }) => (
          <View style={styles.rowBack}>
            <TouchableOpacity
              style={[styles.backRightBtn, styles.backRightBtnRight]}
              onPress={() => onDeleteContact(item?.id)}
            >
              <VStack alignItems={"center"}>
                <Feather name="trash-2" size={24} color="white" />
                <Text style={styles.backTextWhite}>Hapus</Text>
              </VStack>
            </TouchableOpacity>
          </View>
        )}
        rightOpenValue={-75}
      />
      <Box position="relative" h={50} w="100%">
        <Fab
          position="absolute"
          renderInPortal={isFocused ? true : false}
          onPress={() => navigation.navigate("Contact")}
          style={{ backgroundColor: "#22d48a" }}
          size="sm"
          icon={
            <Icon
              color="white"
              as={<FontAwesome name="plus" />}
              size="sm"
              style={{ paddingLeft: 3 }}
            />
          }
        />
      </Box>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    marginTop: hp("10%"),
    backgroundColor: "white",
  },
  row: {
    backgroundColor: "white",
  },
  contact: {
    flexDirection: "row",
    height: hp("11%"),
    paddingLeft: hp("2%"),
    paddingTop: hp("2%"),
  },
  person: {
    flexDirection: "column",
    alignItems: "flex-start",
    paddingLeft: hp("2%"),
  },
  fullName: {
    textAlign: "center",
    justifyContent: "center",
    fontSize: 18,
    paddingTop: 5,
  },
  age: {
    fontSize: 14,
    paddingTop: 10,
    color: "#878787",
  },
  hiddenButton: {
    backgroundColor: "red",
    alignItems: "flex-end",
    height: hp("11%"),
  },
  backTextWhite: {
    color: "#FFF",
  },
  rowFront: {
    alignItems: "center",
    backgroundColor: "#CCC",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    justifyContent: "center",
    height: hp("11%"),
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "red",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    width: 75,
    // paddingBottom: -hp("15%"),
  },
  backRightBtnRight: {
    backgroundColor: "red",
    right: 0,
  },
});

const mapStateToProps = ({ common, contact }) => {
  const { loading } = common;
  const { contacts } = contact;
  return {
    loading,
    contacts,
  };
};

export default connect(mapStateToProps, {
  getContact,
  deleteContact,
})(HomeScreen);
