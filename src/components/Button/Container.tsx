import React, { PropsWithChildren, useEffect, useRef, useState } from "react";
import { Button, View, TouchableOpacity, Text, Image } from "react-native";

function CompButton({
  onPress,
  title,
  theme,
  icon,
}: PropsWithChildren<{
  onPress: () => void;
  title: string;
  theme: "primary" | "soft" | "dark";
  icon?: "google" | "apple";
}>) {

  const themeStyle = {
    primary: {
        buttonStyle: {
            backgroundColor: "blue",
        },
        textStyle: {
            color: "white",
            fontWeight: "500" as "500",
        }
    },
    soft: {
        buttonStyle: {
            backgroundColor: "white",
        },
        textStyle: {
            color: "black",
            fontWeight: "500" as "500"
        }
    },
    dark: {
        buttonStyle: {
            backgroundColor: "black",
        },
        textStyle: {
            color: "white",
            fontWeight: "500" as "500",
        }
    },
  };

  const iconImg = {
    google: {
        image: require("../../../assets/google_icon.png"),
        style: { width: 40, height: 40}
    },
    apple: {
        image: require("../../../assets/apple_icon.png"),
        style: { width: 34, height: 40}
    }
  };

  return (
    <TouchableOpacity
      style={{
        width: "80%",
        height: 74,
        borderRadius: 10.7,
        justifyContent: "center",
        gap: icon && 10,
        alignItems: "center",
        ...themeStyle[theme].buttonStyle,
        flexDirection: "row",
      }}
      onPress={() => console.log("teste") }
    >
      {icon && (
        <Image
          style={iconImg[icon].style}
          source={iconImg[icon].image}
        />
      )}

      <Text
        style={{
          fontFamily: "Work Sans",
          fontSize: 20.53,
          ...themeStyle[theme].textStyle
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

export { CompButton as Button };
