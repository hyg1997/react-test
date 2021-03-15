import { Button, Form, FormContainer, Input } from "../../components/form";
import { colors } from "../../constants/colors";
import { Divider, notification } from "antd";
import React, { useGlobal } from "reactn";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { auth } from "../../firebase";
import { object, string } from "yup";
import { useI18n } from "../../utils";

export const RegisterForm = () => {
  const validationSchema = object().shape({
    firstName: string().required(),
    lastName: string().required(),
    email: string().required().email(),
    password: string().required().min(6),
  });

  const [globalIsLoadingCreateUser, setGlobalIsLoadingCreateUser] = useGlobal(
    "isLoadingCreateUser"
  );
  const [globalIsLoadingUser] = useGlobal("isLoadingUser");
  const [, setGlobalRegister] = useGlobal("register");

  const {
    register,
    errors,
    handleSubmit,
    triggerValidation,
    clearError,
  } = useForm({
    validationSchema,
    reValidateMode: "onSubmit",
  });

  const history = useHistory();
  const i18n = useI18n();

  const onRegisterError = (error) => {
    notification["error"]({
      message: "Register error",
      description: error.message,
    });
  };

  const onSubmitRegister = async (user) => {
    try {
      await setGlobalIsLoadingCreateUser(true);

      const result = await auth.createUserWithEmailAndPassword(
        user.email,
        user.password
      );

      const register = mapRegister(user, result);

      await setGlobalRegister(register);
    } catch (error) {
      onRegisterError(error);
      await setGlobalIsLoadingCreateUser(false);
    }
    return history.push("/home");
  };

  const mapRegister = (user, result) => ({
    id: result.user.uid,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    providerData: [result.user.providerData[0]],
  });

  return (
    <FormContainer>
      <h2>{i18n(["register", "register"])}</h2>
      <Form
        onSubmit={handleSubmit(onSubmitRegister)}
        autoComplete="on"
        triggerValidation={triggerValidation}
        clearError={clearError}
      >
        <Input
          error={errors.firstName}
          ref={register}
          name="firstName"
          className="ant-input"
          placeholder={i18n(["register", "firstName"])}
        />
        <Input
          error={errors.lastName}
          ref={register}
          name="lastName"
          className="ant-input"
          placeholder={i18n(["register", "lastName"])}
        />
        <Input
          error={errors.email}
          type="email"
          ref={register}
          name="email"
          className="ant-input"
          placeholder={i18n(["register", "email"])}
        />
        <Input
          error={errors.password}
          type="password"
          autoComplete="on"
          ref={register}
          name="password"
          className="ant-input"
          placeholder={i18n(["register", "password"])}
        />
        <Button
          loading={globalIsLoadingCreateUser}
          disabled={globalIsLoadingUser || globalIsLoadingCreateUser}
          type="primary"
          htmlType="submit"
          color={colors.primary}
          width="100%"
        >
          {i18n(["register", "register"])}
        </Button>
      </Form>
      <Divider />
    </FormContainer>
  );
};
