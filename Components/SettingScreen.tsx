import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCog, faThList, faHome } from "@fortawesome/free-solid-svg-icons";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import * as axios from "react-native-axios";
import AsyncStorage from '@react-native-async-storage/async-storage';


export const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('initShow');
      if (value !== null) {
        // value previously stored
      }
    } catch (e) {
      // error reading value
    }
  };

  export const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('initShow', value);
    } catch (e) {
      console.error(e)
    }
  };



const SettingScreen = ({route, navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [showNick, setShowNick] = useState(false);
  const [title, setTitle] = useState("Login");
  const [showRegister, setShowRegister] = useState(true);
  const {toTime, fromTime} = route.params;


  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      nickname: "",
    },
  });

  const onSubmit  = (data: any) => {
    console.log(data);
    const postData = async () => {
      try {
        const url = "http://20.93.5.89:8080/login";
        const dataToSend = {
          password: data.password,
          email: data.email,
        };

        console.log("LOGIN::: " + JSON.stringify(dataToSend));

        const response = await axios.post(url, dataToSend);
        console.log('RESPONSE:: ' + response)

        if (response.status === 200) {
          console.log("Data successfully posted:", response.data);
          global.userId = response.data.userId;
          global.userId = response.data.userId;
          
        } else {
          console.error("Failed to post data:", response.statusText);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };
    switch(title){
        case "Login":
        console.log("AAAAA: ")    
        postData()
            break;
        case "Register":
            onRegister(data)   
    }
    navigation.navigate(('Init'));
    setModalVisible(!modalVisible);
    setShowRegister(true);
  };

  const onRegister = (data) => {
    console.log(data);
    const postData = async () => {
      try {
        const url = "http://20.93.5.89:8080/register";
        const dataToSend = {
          password: data.password,
          email: data.email,
          nickname: data.nickname,
        };


        const response = await axios.post(url, dataToSend);

        if (response.status === 200) {
          console.log("Data successfully posted:", response.data);
        } else {
          console.error("Failed to post data:", response.statusText);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };
    postData();
    setModalVisible(!modalVisible);
    setTitle("Login");
    setShowNick(false)
    setShowRegister(true);
  };

  return (
    <LinearGradient
      style={styles.container}
      colors={["rgba(211,57,57, 1)", "rgba(255,255,255, 0)"]}
    >
      <Modal
        style={{ backgroundColor: "blue", width: "100%", height: "100%" }}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalView}>
          <Text style={styles.titleModal}>{title}</Text>
          <View style={styles.formView}>
            {showNick && (
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholder="Nick"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    style={styles.formText}
                    placeholderTextColor={"black"}
                  />
                )}
                name="nickname"
              />
            )}
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="E-mail"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style={styles.formText}
                  placeholderTextColor={"black"}
                />
              )}
              name="email"
            />
            {errors.email && (
              <Text style={{ marginLeft: "6%" }}>This is required.</Text>
            )}
            <Controller
              control={control}
              rules={{
                maxLength: 20,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Password"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style={styles.formText}
                  placeholderTextColor={"black"}
                  id="password"
                  secureTextEntry={true}
                />
              )}
              name="password"
            />
            {errors.password && (
              <Text style={{ marginLeft: "6%" }}>This is required.</Text>
            )}
            <Button title="Submit" onPress={handleSubmit(onSubmit)} />

            <View style={styles.row}>
              {showRegister && (
                <TouchableOpacity
                  onPress={() => {
                    setTitle("Register");
                    setShowRegister(false);
                    setShowNick(true);
                  }}
                >
                  <Text style={styles.registerText}>Register</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                onPress={() => {
                  setTitle("Login");
                  setShowNick(false);
                  setShowRegister(true);
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.registerText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.upperView}>
        <Text style={styles.title}>Settings</Text>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.menu}>
        <TouchableOpacity
          style={styles.iconTouchable}
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <FontAwesomeIcon icon={faHome} size={36} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconTouchable}
          onPress={() => {
            navigation.navigate('Init')
          }}
        >
          <FontAwesomeIcon icon={faThList} size={36} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconTouchable} onPress={() => {}}>
          <FontAwesomeIcon
            icon={faCog}
            size={36}
            style={{ color: "#2F2F2F" }}
          />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  modalView: {
    width: "80%",
    height: "60%",
    backgroundColor: "white",
    marginLeft: "10%",
    marginTop: "40%",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,

    elevation: 13,
  },
  loginButtonModal: {
    marginLeft: "6%",
    width: "88%",
    backgroundColor: "#1E90FF",
    borderRadius: 15,
    marginTop: "8%",
    height: "12%",
  },
  loginButtonModalText: {
    fontSize: 24,
    fontFamily: "semiBold",
    textAlign: "center",
    color: "white",
    paddingTop: "1%",
  },
  formView: {
    marginTop: "20%",
  },
  titleModal: {
    fontSize: 32,
    fontFamily: "bold",
    color: "black",
    marginLeft: "6%",
    marginTop: "6%",
  },
  registerText: {
    fontSize: 18,
    fontFamily: "regular",
    color: "#1E90FF",
    marginLeft: "16%",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    marginTop: "2%",
    alignItems: "center",
    marginLeft: "20%",
  },
  formText: {
    color: "black",
    backgroundColor: "#d8d8d8",
    width: "88%",
    marginLeft: "6%",
    height: "16%",
    fontSize: 22,
    borderRadius: 15,
    marginBottom: "3%",
  },
  container: {
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontFamily: "bold",
    marginLeft: "6%",
    marginTop: "25%",
    color: "white",
    textDecorationColor: "black",
    textDecorationLine: "underline",
  },
  loginButton: {
    marginLeft: "6%",
    width: "88%",
    backgroundColor: "#1E90FF",
    borderRadius: 15,
    marginTop: "8%",
    height: "8%",
  },
  loginButtonText: {
    fontSize: 28,
    fontFamily: "semiBold",
    textAlign: "center",
    color: "white",
    paddingTop: "3%",
  },
  menu: {
    width: "100%",
    marginTop: "1%",
    height: "9%",
    display: "flex",
    flexDirection: "row",
    alignContent: "space-between",
    justifyContent: "center",
    backgroundColor: "F6F6F6",
  },
  icon: {
    color: "#2F2F2F",
    marginRight: "15%",
  },
  iconTouchable: {
    marginTop: "2%",
  },
  upperView: {
    width: "100%",
    height: "88%",
    display: "flex",
  },
});
