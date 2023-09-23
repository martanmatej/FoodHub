import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const InitScreen = ({ navigation }) => {
  const [datepickerVisibleFrom, setDatepickerVisibleFrom] = useState(false);
  const [datepickerVisibleTo, setDatepickerVisibleTo] = useState(false);
  const [fromTime, setFromTime] = useState(new Date());
  const [toTime, setToTime] = useState(new Date());

  const handleFromTimeChange = (selectedTime) => {
    setDatepickerVisibleFrom(false);
    if (selectedTime !== undefined) {
      setFromTime(selectedTime);
    }
  };

  const handleToTimeChange = (selectedTime) => {
    setDatepickerVisibleTo(false);
    if (selectedTime !== undefined) {
      setToTime(selectedTime);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        style={styles.wholeView}
        colors={["rgba(211,57,57, 1)", "rgba(255,255,255, 0)"]}
      >
        <View style={styles.row}>
          <Text style={styles.titles}>Od</Text>
          <Text style={styles.titles}>Do</Text>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.buttonTime}
            onPress={() => {
              setDatepickerVisibleFrom(true);
            }}
          >
            <Text style={styles.timeCount}>
              {fromTime.getHours()}:{fromTime.getMinutes()}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonTime}
            onPress={() => {
              setDatepickerVisibleTo(true);
            }}
          >
            <Text style={styles.timeCount}>
              {toTime.getHours()}:{toTime.getMinutes()}
            </Text>
          </TouchableOpacity>
        </View>

        <DateTimePickerModal
          isVisible={datepickerVisibleFrom}
          date={fromTime}
          mode="time"
          is24Hour={true}
          display="default"
          onConfirm={(a) => handleFromTimeChange(a)}
          onCancel={() => setDatepickerVisibleFrom(false)}
        />

        <DateTimePickerModal
          isVisible={datepickerVisibleTo}
          date={toTime}
          mode="time"
          is24Hour={true}
          display="default"
          onConfirm={(a) => handleToTimeChange(a)}
          onCancel={() => setDatepickerVisibleTo(false)}
        />
        <TouchableOpacity style={styles.confirmButton} onPress={() => {
          navigation.navigate("Settings",{
            fromTime: fromTime,
            toTime: toTime,
          });
        }}>
          <Text style={styles.confirmText}>Confirm</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

export default InitScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wholeView: {
    width: "100%",
    height: "100%",
  },
  buttonTime: {
    width: "30%",
    height: "80%",
    backgroundColor: "#1E90FF",
    marginTop: "10%",
    marginLeft: "13%",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  timeCount: {
    color: "white",
    fontSize: 36,
    fontFamily: "semiBold",
    textAlign: "center",
    paddingTop: "15%",
    paddingBottom: "15%",
  },
  titles: {
    fontSize: 32,
    fontFamily: "semiBold",
    marginTop: "50%",
    marginLeft: "24%",
  },
  confirmText: {
    color: "white",
    fontFamily: "semiBold",
    fontSize: 22,
  },
  confirmButton: {
    width: "30%",
    height: "7%",
    backgroundColor: "#1E90FF",
    borderRadius: 15,
    textAlign: "center",
    paddingTop: "4%",
    paddingLeft: "5%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,

    marginTop: '55%',
    marginLeft: '55%'
  },
  row: {
    display: "flex",
    flexDirection: "row",
  },
});
