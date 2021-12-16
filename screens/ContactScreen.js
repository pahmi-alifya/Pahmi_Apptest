import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import { connect } from "react-redux";

import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Button, FormControl, Image, Input, VStack } from "native-base";
import * as ImagePicker from "expo-image-picker";

// actions
import {
  postCreateContact,
  putUpdateContact,
  getDetailContact,
} from "../redux/actions/contact";
import { ResponseModal } from "../components/ResponseModal";

import * as Yup from "yup";
import { useFormik } from "formik";

const ContactScreen = ({
  navigation,
  route,
  loading,
  detaiLContact,
  postCreateContact,
  putUpdateContact,
  getDetailContact,
}) => {
  const id = route?.params?.id;
  useLayoutEffect(() => {
    navigation.setOptions({
      title: id ? "UBAH KONTAK" : "TAMBAH KONTAK",
    });
  }, [navigation]);

  const [image, setImage] = useState(null);
  const [permission, setPermission] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(false);
  const [data, setData] = useState(false);

  useEffect(() => {
    async function getPermission() {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Tidak memiliki izin untuk mengakses file!");
          setPermission(false);
        }
      }
    }
    getPermission();
  }, []);

  useEffect(() => {
    if (id) {
      getDetailContact(id);
    } else {
      setEdit(true);
    }
  }, [navigation, route?.name]);
  // console.log(detaiLContact);

  const pickImage = async () => {
    if (permission) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [10, 10],
        quality: 1,
      });

      if (!result.cancelled) {
        setImage(result.uri);
      }
    }
  };

  const { handleChange, handleSubmit, values, errors, isValid } = useFormik({
    initialValues: id ? { ...detaiLContact } : {},
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      firstName: Yup.string()
        .matches(/^[a-zA-Z.\-/,'\s]+$/, "Format tidak valid")
        .required("Nama depan harap diisi"),
      lastName: Yup.string()
        .matches(/^[a-zA-Z.\-/,'\s]+$/, "Format tidak valid")
        .required("Nama belakang harap diisi"),
      age: Yup.number().required("Umur tidak boleh kosong"),
    }),
    onSubmit: (values) => {
      const params = { ...values, age: parseInt(values?.age, 10) };
      delete params?.id;
      onFinish(params);
    },
  });

  const onFinish = (values) => {
    let data = { ...values };

    const formData = new FormData();
    Object.keys(data).map((e) => {
      if (e !== "photo") {
        if (data[e] !== null) {
          if (e === "age") {
            formData.append(e, parseInt(data[e], 10));
          } else {
            formData.append(e, data[e]);
          }
        }
      }
    });
    if (image) {
      formData.append("photo", {
        uri: image,
        type: "image/jpeg",
        name: "imagequu.jpg",
      });
    }

    if (id) {
      putUpdateContact(id, formData).then((data) => {
        setShowModal(true);
        setImage(null);
        setData(data);
        setEdit(false);
      });
    } else {
      postCreateContact(formData).then((data) => {
        setShowModal(true);
        setImage(null);
        setData(data);
        setEdit(false);
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ResponseModal
        showModal={showModal}
        setShowModal={(value) => setShowModal(value)}
        isClose
        linkTo="Home"
        isEdit={id ? true : false}
        {...data}
      />
      <View style={styles.background}>
        <VStack space="3" alignItems="center" mt={-20}>
          <Image
            size={100}
            resizeMode={"cover"}
            key={image ?? detaiLContact?.photo + "image"}
            borderRadius={100}
            backgroundColor={"white"}
            source={{
              uri: image
                ? image
                : detaiLContact?.photo !== "N/A"
                ? detaiLContact?.photo ??
                  "http://cdn.onlinewebfonts.com/svg/img_569204.png"
                : "http://cdn.onlinewebfonts.com/svg/img_569204.png",
            }}
            alt="Foto"
          />
          <Button
            style={{ borderColor: "#22d48a", borderRadius: 50 }}
            variant="outline"
            size="sm"
            mt={1}
            onPress={edit ? pickImage : () => setEdit(true)}
          >
            <Text fontSize="sm" bold style={styles.textButton}>
              {edit ? "Buka Galeri" : "Edit"}
            </Text>
          </Button>
          <FormControl
            isRequired
            isInvalid={"firstName" in errors}
            isDisabled={!edit}
          >
            <FormControl.Label _text={{ bold: true }}>
              Nama Depan
            </FormControl.Label>
            <Input
              placeholder="Nama Depan"
              defaultValue={values?.firstName}
              onChangeText={handleChange("firstName")}
            />
            <FormControl.ErrorMessage
              _text={{ fontSize: "xs", color: "error.500", fontWeight: 500 }}
            >
              {errors.firstName}
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl
            isRequired
            isInvalid={"lastName" in errors}
            isDisabled={!edit}
          >
            <FormControl.Label _text={{ bold: true }}>
              Nama Belakang
            </FormControl.Label>
            <Input
              defaultValue={values?.lastName}
              placeholder="Nama Belakang"
              onChangeText={handleChange("lastName")}
            />
            <FormControl.ErrorMessage
              _text={{ fontSize: "xs", color: "error.500", fontWeight: 500 }}
            >
              {errors.lastName}
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl
            isRequired
            isInvalid={"age" in errors}
            isDisabled={!edit}
          >
            <FormControl.Label _text={{ bold: true }}>Umur</FormControl.Label>
            <Input
              placeholder="Umur"
              onChangeText={handleChange("age")}
              keyboardType="numeric"
              maxLength={2}
              defaultValue={values?.age?.toString()}
            />
            <FormControl.ErrorMessage
              _text={{ fontSize: "xs", color: "error.500", fontWeight: 500 }}
            >
              {errors.age}
            </FormControl.ErrorMessage>
          </FormControl>
        </VStack>
        {edit && (
          <>
            <Button
              onPress={handleSubmit}
              mt="5"
              colorScheme={"tertiary"}
              isLoading={loading}
              isLoadingText="Proses"
              isDisabled={!isValid}
              _loading={{
                bg: "success",
                _text: {
                  color: "coolGray.700",
                },
              }}
            >
              Simpan
            </Button>
            <Button
              onPress={() => setEdit(false)}
              mt="5"
              colorScheme={"danger"}
              isLoading={loading}
              _loading={{
                bg: "error.500",
                _text: {
                  color: "coolGray.700",
                },
              }}
            >
              Batal
            </Button>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#22d48a",
    flex: 1,
  },
  background: {
    backgroundColor: "white",
    padding: hp("3%"),
    top: hp("12%"),
    height: hp("100%"),
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingBottom: hp("7%"),
  },
  textButton: {
    color: "#22d48a",
    fontWeight: "bold",
    letterSpacing: 2,
    paddingHorizontal: 5,
  },
});

const mapStateToProps = ({ common, contact }) => {
  const { loading } = common;
  const { detaiLContact } = contact;
  return {
    loading,
    detaiLContact,
  };
};

export default connect(mapStateToProps, {
  getDetailContact,
  postCreateContact,
  putUpdateContact,
})(ContactScreen);
