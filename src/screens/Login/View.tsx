import React from "react";
import { View, Text } from "react-native";
import { Button } from "../../components/Button/Container";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlHelper,
  FormControlHelperText,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
} from "@/components/ui/form-control";

import { Input, InputField } from "@/components/ui/input"
import { VStack } from "@/components/ui/vstack"
import { AlertCircleIcon } from "@/components/ui/icon"

import {
  Checkbox,
  CheckboxIndicator,
  CheckboxLabel,
  CheckboxIcon,
} from "@/components/ui/checkbox";
import { CheckIcon } from "@/components/ui/icon";

export function LoginView() {
  const [inputValue, setInputValue] = React.useState("");
  return (
    <View
      style={{
        width: "100%",
        height: "90%",
        backgroundColor: "red",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 2,
      }}
    >
      <View
        style={{
          backgroundColor: "green",
          width: "100%",
          height: "33%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 16,
        }}
      >
        {/* Buttons container  */}
        <Button
          icon={"google"}
          title="Sign up with Google"
          onPress={() => console.log("SignUp")}
          theme="soft"
        />
        <Button
          icon={"apple"}
          title="Sign up with Apple"
          onPress={() => console.log("SignUp")}
          theme="soft"
        />
      </View>

      <View
        style={{
          backgroundColor: "gray",
          width: "100%",
          height: "6%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            backgroundColor: "gray",
            zIndex: 1,
            paddingLeft: 10,
            paddingRight: 10,
            color: "white",
          }}
        >
          or continue with email{" "}
        </Text>
        <View
          style={{
            backgroundColor: "white",
            width: "80%",
            height: 1,
            position: "absolute",
          }}
        />
      </View>

      <View
        style={{
          backgroundColor: "gray",
          width: "100%",
          height: "27%",
        }}
      >
        <VStack className="w-full max-w-[300px] rounded-md border border-background-200 p-4">
      <FormControl
        isInvalid={false}
        size="md"
        isDisabled={false}
        isReadOnly={false}
        isRequired={false}
      >
        <FormControlLabel>
          <FormControlLabelText>Password</FormControlLabelText>
        </FormControlLabel>
        <Input className="my-1" size={"lg"}>
          <InputField
            type="password"
            placeholder="password"
            value={inputValue}
            onChangeText={(text) => setInputValue(text)}
          />
        </Input>
        <FormControlHelper>
          <FormControlHelperText>
            Must be atleast 6 characters.
          </FormControlHelperText>
        </FormControlHelper>
        <FormControlError>
          <FormControlErrorIcon as={AlertCircleIcon} />
          <FormControlErrorText>
            Atleast 6 characters are required.
          </FormControlErrorText>
        </FormControlError>
      </FormControl>
    </VStack>

        <Checkbox value="checkbox" size="lg" isInvalid={false} isDisabled={false}>
          <CheckboxIndicator>
            <CheckboxIcon as={CheckIcon} />
          </CheckboxIndicator>
          <CheckboxLabel>Label</CheckboxLabel>
        </Checkbox>
      </View>

      <View
        style={{
          backgroundColor: "white",
          width: "100%",
          height: "33%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          title="Login"
          onPress={() => console.log("Login")}
          theme="primary"
        />
      </View>
    </View>
  );
}

export { LoginView as View };
