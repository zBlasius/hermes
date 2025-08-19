import React, { useRef } from "react";
import { Text, View, Animated, TouchableWithoutFeedback } from "react-native";

type TabsProps = {
  list: String[];
  handleSelectTab: (tab: String) => void;
};

export default function Tabs({ list, handleSelectTab }: TabsProps) {
  const animatedValueA = useRef(new Animated.Value(1)).current;
  const animatedValueB = useRef(new Animated.Value(0)).current;

  //TODO - make it better to accept more than 2 tabs

  const backgroundColorA = animatedValueA.interpolate({
    inputRange: [0, 1],
    outputRange: ["#000000", "#777777"], // Azul → Verde
  });

  const backgroundColorB = animatedValueB.interpolate({
    inputRange: [0, 1],
    outputRange: ["#000000", "#777777"], // Vermelho → Roxo
  });

  const toggleColorA = () => {
    Animated.timing(animatedValueA, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const toggleColorB = () => {
    Animated.timing(animatedValueB, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const removeColorA = () => {
    Animated.timing(animatedValueA, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const removeColorB = () => {
    Animated.timing(animatedValueB, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const setTabColor = (index: number) => {
    //TODO - make it better to accept more than 2 tabs
    if (index == 0) {
      toggleColorA();
      removeColorB();
    } else {
      toggleColorB();
      removeColorA();
    }
  };

  return (
    <View
      style={{
        flexDirection: "row",
        height: 60,
        width: "100%",
        backgroundColor: "#000000",
        zIndex: 3,
      }}
    >
      {list.map((tab, index) => (
        <TouchableWithoutFeedback
          key={index}
          onPress={() => {
            handleSelectTab(tab.replace(/\s/g, ""));
            setTabColor(index);
          }}
        >
          <Animated.View
            key={index}
            style={{
              width: `${100 / list.length}%`,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderTopEndRadius: index == 0 ? 25 : 0,
              borderTopStartRadius: index == 0 ? 0 : 25,
              backgroundColor: index == 0 ? backgroundColorA : backgroundColorB,
            }}
          >
            <Text
              style={{
                color: "white",
                fontFamily: "Work Sans",
                fontWeight: 500,
                fontSize: 20.53,
              }}
            >
              {tab}
            </Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      ))}
    </View>
  );
}
