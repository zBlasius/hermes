import React, { PropsWithChildren } from "react";
import { TouchableOpacity, Text, Image, StyleSheet } from "react-native";
import GoogleIcon from "../../../assets/google_icon.png";
import AppleIcon from "../../../assets/apple_icon.png";

function CompButton({
  onPress,
  title,
  theme,
  icon,
  type,
  style,
}: PropsWithChildren<{
  onPress: () => void;
  title: string;
  theme: "primary" | "soft" | "dark" | "green" | "red";
  icon?: "google" | "apple";
  type?: "small";
  style: any;
}>) {
  const themeStyle = {
    primary: {
      buttonStyle: {
        backgroundColor: "#0098FF",
      },
      textStyle: {
        color: "white",
        fontWeight: "600" as "600",
      },
    },
    soft: {
      buttonStyle: {
        backgroundColor: "white",
      },
      textStyle: {
        color: "black",
        fontWeight: "500" as "500",
      },
    },
    dark: {
      buttonStyle: {
        backgroundColor: "black",
      },
      textStyle: {
        color: "white",
        fontWeight: "500" as "500",
      },
    },
    green: {
      buttonStyle: {
        backgroundColor: "green",
      },
      textStyle: {
        color: "white",
        fontWeight: "500" as "500",
      },
    },
    red: {
      buttonStyle: {
        backgroundColor: "red",
      },
      textStyle: {
        color: "white",
        fontWeight: "500" as "500",
      },
    }
  };

  const typeButton = {
    small: {
      buttonStyle: {
        width: "40%" as "40%",
        height: 40,
      },
      textStyle: {
        fontSize: 13,
      },
    },
  };

  const iconImg = {
    google: {
      image: GoogleIcon,
      style: { width: 40, height: 40 },
    },
    apple: {
      image: AppleIcon,
      style: { width: 34, height: 40 },
    },
  };

  return (
    <TouchableOpacity
      style={[
        styles.circle,
        themeStyle[theme].buttonStyle,
        type ? typeButton[type].buttonStyle : {},
        style,
      ]}
      onPress={onPress}
    >
      {icon && (
        <Image
          style={iconImg[icon].style}
          source={iconImg[icon].image}
        />
      )}

      <Text
        style={[
          styles.circleText,
          themeStyle[theme].textStyle,
          type ? typeButton[type].textStyle : {},
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

export { CompButton as CircleButton };

const styles = StyleSheet.create({
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  circleText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
});
