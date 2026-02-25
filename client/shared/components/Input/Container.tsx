import React from "react";
import { Input, InputField, InputSlot, InputIcon } from "@/components/ui/input";
import { AlertCircleIcon, MailIcon, LockIcon } from "@/components/ui/icon";
import type { VariantProps } from "@gluestack-ui/nativewind-utils";
import { TextInput, type StyleProp, type ViewStyle } from "react-native";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlErrorIcon,
} from "@/components/ui/form-control";

type IInputFieldProps = VariantProps<typeof InputField>;
interface PropsInput {
  placeholder?: string;
  value: string;
  icon?: "mail" | "alert" | "lock";
  handleChange: (text: string) => void;
  keyboardType?: IInputFieldProps["keyboardType"];
  type?: "text" | "password";
  required?: boolean;
  isValid?: boolean;
  errorMessage?: string;
  style?: StyleProp<ViewStyle>;
}

function CompInput({
  placeholder,
  value,
  handleChange,
  icon,
  keyboardType,
  required,
  isValid = true,
  errorMessage,
  type,
  style,
}: IInputFieldProps & PropsInput) {
  const renderIcon = () => {
    switch (icon) {
      case "mail":
        return <MailIcon />;
      case "alert":
        return <AlertCircleIcon />;
      case "lock":
        return <LockIcon />;
      default:
        return null;
    }
  };

  return (
    <FormControl
      isInvalid={!isValid}
      size="md"
      isDisabled={false}
      isReadOnly={false}
      isRequired={required}
      focusable={true}
    >
      <Input
        size="lg"
        style={{
          height: 50,
          backgroundColor: "white",
          borderRadius: 10,
          paddingHorizontal: 10,
          marginVertical: 5,
        }}
      >
        {icon && (
          <InputSlot>
            <InputIcon style={{ color: "black" }}>{renderIcon()}</InputIcon>
          </InputSlot>
        )}

        <InputField
          placeholder={placeholder}
          value={value}
          onChangeText={handleChange}
          keyboardType={keyboardType}
          type={type}
          style={{ color: "black", zIndex: 1, bottom: 32 }}
        />
      </Input>

      {!isValid && errorMessage && (
        <FormControlError>
          <FormControlErrorText style={{ color: "red", fontSize: 13 }}>*{errorMessage}</FormControlErrorText>
        </FormControlError>
      )}
    </FormControl>
  );
}

export { CompInput as Input };
