import React, { PropsWithChildren, useEffect, useRef, useState } from "react";
import { Button, View, TouchableOpacity, Text, Image } from "react-native";
import GoogleIcon from "../../../../assets/google_icon.png";
import AppleIcon from "../../../../assets/apple_icon.png";

function CompButton({
  onPress,
  title,
  theme,
  icon,
  type
}: PropsWithChildren<{
  onPress: () => void;
  title: string;
  theme: "primary" | "soft" | "dark";
  icon?: "google" | "apple";
  type?: "small"
}>) {

  const themeStyle = {
    primary: {
        buttonStyle: {
            backgroundColor: "#0098FF",
        },
        textStyle: {
            color: "white",
            fontWeight: "600" as "600",
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
    }
  };

  const typeButton = {
    small: {
      buttonStyle: {
        width: "40%" as "40%",
        height: 40
      },
      textStyle: {
        fontSize: 13
      }
    },
  }

  const iconImg = {
    google: {
        image: GoogleIcon,
        style: { width: 40, height: 40}
    },
    apple: {
        image: AppleIcon,
        style: { width: 34, height: 40}
    }
  };

  return (
    <TouchableOpacity
      style={{
        width: "80%",
        height: 64,
        borderRadius: 10.7,
        justifyContent: "center",
        gap: icon && 10,
        alignItems: "center",
        ...themeStyle[theme].buttonStyle,
        ...(type ? typeButton[type].buttonStyle : {}),
        flexDirection: "row",
      }}
      onPress={onPress}
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
          ...themeStyle[theme].textStyle,
          ...(type ? typeButton[type].textStyle : {}),
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

export { CompButton as Button };
