import React from "react";
import { Input, InputField, InputSlot, InputIcon } from "@/components/ui/input";
import { AlertCircleIcon, MailIcon, LockIcon } from "@/components/ui/icon";
import type { VariantProps } from '@gluestack-ui/nativewind-utils';
import type { StyleProp, ViewStyle } from 'react-native';
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
  keyboardType?: "text" | "numeric" ;
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
  isValid,
  errorMessage,
  style
}: IInputFieldProps & PropsInput) {
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
      focusable={true}
      style={{
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 35,
        borderRadius:12
      }}
    >
      <Input
        style={[
          {        
            gap: 5,
            backgroundColor: "white",
            paddingLeft: 10,
          },
          style,
        ]}
        focusable
        className="my-1"
        size={"lg"}
      >
        {icon && (
          <InputSlot style={{ backgroundColor: "white", height: "100%" }}>
            <InputIcon style={{ color: "black" }}>
              {renderIcon()}
            </InputIcon>
          </InputSlot>
        )}

        <InputField
          placeholder={placeholder}
          value={value}
          onChangeText={(text) => handleChange(text)}
          keyboardType={keyboardType}
          style={{ color: "black", height: "100%", width: "100%", fontFamily:"Work Sans", fontSize:15 }}
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
