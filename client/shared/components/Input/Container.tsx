import React from "react";
import { Input, InputField, InputSlot, InputIcon } from "@/components/ui/input";
import { AlertCircleIcon, MailIcon, LockIcon } from "@/components/ui/icon";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlErrorIcon,
} from "@/components/ui/form-control";

interface PropsInput {
  placeholder: string;
  value: string;
  icon?: "mail" | "alert" | "lock";
  handleChange: (text: string) => void;
  type?: "text" | "password";
  required?: boolean;
  isValid?: boolean;
  errorMessage?: string;
}

function CompInput({
  placeholder,
  value,
  handleChange,
  icon,
  type,
  required,
  isValid,
  errorMessage,
}: PropsInput) {
  const renderIcon = () => {
    switch (icon) {
      case 'mail':
        return <MailIcon />;
      case 'alert':
        return <AlertCircleIcon />;
      case 'lock':
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
      style={{
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 35,
      }}
    >
      <Input
        style={{
          borderRadius: 12,
          height: 63,
          gap: 5,
          backgroundColor: "white",
          paddingLeft: 10,
        }}
        className="my-1"
        size={"lg"}
      >
        {icon && (
          <InputSlot style={{ backgroundColor: "white", height: "100%" }}>
            <InputIcon>
              {renderIcon()}
            </InputIcon>
          </InputSlot>
        )}

        <InputField
          placeholder={placeholder}
          value={value}
          onChangeText={(text) => handleChange(text)}
          type={type}
        />
      </Input>

      <FormControlError style={{position: "absolute", bottom: -30}}>
        <FormControlErrorIcon key={errorMessage}>
          <AlertCircleIcon />
        </FormControlErrorIcon>
        <FormControlErrorText>{errorMessage}</FormControlErrorText>
      </FormControlError>

    </FormControl>
  );
}

export { CompInput as Input };
