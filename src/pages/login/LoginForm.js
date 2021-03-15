import React, { useGlobal } from "reactn";
import { Button, Form, FormContainer, Input } from "../../components/form";
import { colors } from "../../constants/colors";
import { Divider, notification } from "antd";
import { useForm } from "react-hook-form";
import { auth, firestore } from "../../firebase";
import { firebaseAuthenticationError } from "../../firebase/auth";
import { useHistory } from "react-router-dom";
import { object, string } from "yup";
import { querySnapshotToArray, useI18n } from "../../utils";
import { get } from "lodash";

export const LoginForm = () => {
  const validationSchema = object().shape({
    email: string().required().email(),
    password: string().required(),
  });

  const [globalIsLoadingUser, setGlobalIsLoadingUser] = useGlobal(
    "isLoadingUser"
  );
  const [globalIsLoadingCreateUser] = useGlobal("isLoadingCreateUser");
  const [globalIsLoadingFacebookAuth] = useGlobal("isLoadingFacebookAuth");
  const {
    register,
    errors,
    handleSubmit,
    clearError,
    triggerValidation,
  } = useForm({
    validationSchema,
    reValidateMode: "onSubmit",
  });

  const history = useHistory();
  const i18n = useI18n();

  const emailRegisteredWithProvider = async (email) => {
    const userQuerySnapshot = await firestore
      .collection("users")
      .where("email", "==", email)
      .get();

    if (userQuerySnapshot.empty) return false;

    const user = querySnapshotToArray(userQuerySnapshot)[0];

    const provider = get(user, "providerData[0].providerId", null);

    return provider !== "password";
  };

  const onLoginError = async (error, email) => {
    let errorMessage;
    errorMessage = firebaseAuthenticationError[error.code];

    const isEmailRegisteredWithProvider = await emailRegisteredWithProvider(
      email
    );
    if (isEmailRegisteredWithProvider)
      errorMessage = "Email is register with another provider";

    await setGlobalIsLoadingUser(false);

    notification["error"]({
      message: "Login error",
      description: errorMessage,
    });
  };

  const onSubmitLogin = async (data) => {
    try {
      await setGlobalIsLoadingUser(true);
      await auth.signInWithEmailAndPassword(data.email, data.password);
    } catch (error) {
      await onLoginError(error, data.email);
    }
    return history.push("/home");
  };

  return (
    <FormContainer>
      <h2>{i18n(["general", "login"])}</h2>
      <Form
        onSubmit={handleSubmit(onSubmitLogin)}
        autoComplete="on"
        clearError={clearError}
        triggerValidation={triggerValidation}
      >
        <Input
          error={errors.email}
          type="email"
          ref={register}
          name="email"
          className="ant-input"
          placeholder={i18n(["login", "email"])}
        />
        <Input
          error={errors.password}
          type="password"
          autoComplete="on"
          ref={register}
          name="password"
          className="ant-input"
          placeholder={i18n(["login", "password"])}
        />
        <Button
          loading={globalIsLoadingUser}
          disabled={
            globalIsLoadingUser ||
            globalIsLoadingCreateUser ||
            globalIsLoadingFacebookAuth
          }
          type="primary"
          htmlType="submit"
          color={colors.primary}
          width="100%"
        >
          {i18n(["general", "login"])}
        </Button>
      </Form>
      <Divider />
    </FormContainer>
  );
};
