import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCog, faThList, faHome } from "@fortawesome/free-solid-svg-icons";
import TinderCard from "react-tinder-card";
import { LinearGradient } from "expo-linear-gradient";
import * as axios from 'react-native-axios';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';


const MainScreen = ({ route, navigation }) => {
  const temp = require("../imgs/temp.jpg");
  

  const [restaurants, setRestaurants] = useState<[]>(null);

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    const fetchData = () => {
      fetch("http://20.93.5.89:8080/restaurant", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((test) => {
          if (!test.ok) {
            throw console.error("aaa");
          } else {
            return test.json();
          }
        })
        .then((data) => {
          setRestaurants(data);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    fetchData();

    
  });


  const initialRestaurants = [
    {
      name: "Restaurant 1",
      image: temp,
      cuisine: "AMERICAN",
    },
    {
      name: "Restaurant 2",
      image: temp,
      cuisine: "CZECH",
    },
  ];

  const [lastDirection, setLastDirection] = useState<string>("");

  const outOfFrame = (name: string) => {
  };

  /*const notificationSub =async () => {
    await Notifications.setNotificationChannelAsync('matchFound', {
      name: 'FoodHub notifikace',
      importance: ''
    });
  }*/

  const playNotification =async () => {
    await Notifications.scheduleNotificationAsync({content: {
      title: 'Máš match!',
    },trigger: {
      second: 3,
      channelId: 'matchFound'
    }})
  }

  const sendSwipeData = (id: number) => {
		const data = {
			userId: global.userId,
			restauraceId: id,
			time_from: null,
			time_until: null,
		};

		axios
			.post("http://20.93.5.89:8080/swipe", data)
			.then((response) => {
				console.log("Swipe data sent successfully:", response.data);
			})
			.catch((error) => {
				console.error(error);
			});
      console.log(data)
	};

	const swiped = (direction: string, id: number) => {
		if (direction === "right") {
			sendSwipeData(id);
		}
	};

  return (
    <LinearGradient
      style={styles.container}
      colors={["rgba(211,57,57, 1)", "rgba(255,255,255, 0)"]}
    >
      <View style={styles.upperView}>
        {restaurants?.map((restaurant) => {
          return (
            <TinderCard
              preventSwipe={["up", "down"]}
              className="swipe"
              key={restaurant?.name}
              onSwipe={(dir) => swiped(dir, restaurant?.id)}
            >
              <View style={styles?.card}>
                <ImageBackground
                  source={{uri: `data:image/webp;base64,${restaurant.img_path}`}}
                  style={styles?.cardImage}
                >
                  <Text style={styles?.photoTitle}>{restaurant?.name}  /  {restaurant?.avg_rating?.toFixed(1)}</Text>
                  <Text style={styles?.photoDescribe}>
                    {restaurant?.address}
                  </Text>
                </ImageBackground>
              </View>
            </TinderCard>
          );
        })}
      </View>
      <View style={styles.lowerView}>
        <Text style={{ color: "#2F2F2F" }}>aa</Text>
      </View>
      <View style={styles.menu}>
        <TouchableOpacity style={styles.iconTouchable} onPress={ () => {
        }}>
          <FontAwesomeIcon icon={faHome} size={36} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconTouchable} onPress={() => {
          navigation.navigate("Init")
        }}>
          <FontAwesomeIcon icon={faThList} size={36} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconTouchable}
          onPress={() => {
            navigation.navigate("Settings");
          }}
        >
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
export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  upperView: {
    width: "100%",
    height: "0%",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "blue",
  },
  lowerView: {
    width: "100%",
    height: "1%",
    backgroundColor: "#2F2F2F",
  },
  menu: {
    width: "100%",
    marginTop: "190%",
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
  photoTitle: {
    paddingLeft: "6%",
    marginTop: "159%",
    display: "flex",
    flexDirection: "row",
    fontSize: 32,
    color: "white",
    fontFamily: "bold",
    shadowColor: "#000",
    shadowOffset: {
      width: 4,
      height: 12,
    },
    shadowOpacity: 0.7,
    shadowRadius: 18.0,

    elevation: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.2)'
  },
  photoDescribe: {
    paddingLeft: "6%",
    paddingTop: "1%",
    fontSize: 26,
    color: "white",
    fontFamily: "semiBold",
    shadowColor: "#000",
    shadowOffset: {
      width: 4,
      height: 12,
    },
    shadowOpacity: 0.7,
    shadowRadius: 18.0,

    elevation: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.2)'

  },
  distance: {
    color: "white",
    fontSize: 24,
    marginLeft: "6%",
    marginTop: "1%",
    fontFamily: "semiBold",
    shadowColor: "#000",
    shadowOffset: {
      width: 4,
      height: 12,
    },
    shadowOpacity: 0.7,
    shadowRadius: 18.0,

    elevation: 24,
  },
  card: {
    position: "absolute",
    backgroundColor: "#fff",
    width: "100%",
    height: 750,
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 20,
    borderRadius: 20,
    resizeMode: "cover",
    paddingBottom: 0,
  },
  cardImage: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    borderRadius: 20,
  },
  cardTitle: {
    position: "absolute",
    bottom: 0,
    margin: 10,
    color: "#fff",
  },
  infoText: {
    height: 28,
    justifyContent: "center",
    display: "flex",
    zIndex: -100,
  },
});
