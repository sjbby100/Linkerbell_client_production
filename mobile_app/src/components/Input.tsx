import React from "react";
import { LoginValue } from "../models/LoginTypes";
import { style } from "../styles/SigninStyles/StyleIndex";
import { InputForm } from "../styles/Input";
import { InputWrapper } from "../styles/InputWrapper";
import { isEmail } from "../core/utils/emailValidate";
const { SubText } = style;

type stringOrNull = string | null;
type InputProps = {
  name: string;
  onChange: React.Dispatch<React.SetStateAction<LoginValue>>;
  value: LoginValue;
};
type err = {
  email: stringOrNull;
  password: stringOrNull;
  [key: string]: null | string;
};

const Input = ({ name, onChange, value }: InputProps): JSX.Element => {
  const inputTitle = name === "email" ? "이메일" : "패스워드";
  const placeholderKeyword = `${inputTitle}${name === "email" ? "을" : "를"}`;

  const renderSubText = (err: err): JSX.Element => {
    let text = inputTitle;
    if (name in err) {
      if (name === "email" && err[name] === `wrong ${name}`) {
        text = "이메일 형식이 잘못되었습니다";
        return <SubText danger={true}>{text}</SubText>;
      }
    }
    return <SubText>{text}</SubText>;
  };

  const validateEmail = () => {
    if (name === "email" && value.email.length !== 0) {
      const err = { ...value.err };
      if (!isEmail(value.email)) {
        err.email = "wrong email";
      } else {
        delete err.email;
      }
      onChange({ ...value, err });
    }
  };
  const initValidateEmail = () => {
    const err = { ...value.err };
    if (name === "email" && err.email === "wrong email") {
      delete err.email;
    }
    onChange({ ...value, err });
  };

  return (
    <InputWrapper>
      {renderSubText(value.err)}
      <InputForm
        placeholder={`${placeholderKeyword} 입력해주세요`}
        onChangeText={(val) => onChange({ ...value, [name]: val })}
        onFocus={() => initValidateEmail()}
        onBlur={() => validateEmail()}
        secureTextEntry={name === "password" ? true : false}
      ></InputForm>
    </InputWrapper>
  );
};

export default Input;
