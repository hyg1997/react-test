import { useHistory, useParams } from "react-router-dom";
import React, { useEffect, useState } from "reactn";
import { assign, get } from "lodash";
import { Controller, useForm } from "react-hook-form";
import createUserErrors from "./createUserErrors";
import { colors } from "../../../constants/colors";
import { firestore } from "../../../firebase";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Switch,
} from "../../../components/form";
import { useI18n } from "../../../utils";
import { notification } from "antd";
import { boolean, object, string } from "yup";
import moment from "moment";

export const User = () => {
  const { userId } = useParams();

  const validationSchema = object().shape({
    firstName: string().required(),
    lastName: string().required(),
    email: string().required().email(),
    bornDate: string().required().nullable(),
    isAdmin: boolean().required(),
  });

  const history = useHistory();
  const [user, setUser] = useState(null);
  const [isLoadingCreateUser, setIsLoadingCreateUser] = useState(false);
  const {
    register,
    errors,
    handleSubmit,
    control,
    triggerValidation,
    clearError,
  } = useForm({
    validationSchema,
    reValidateMode: "onSubmit",
  });

  const i18n = useI18n();

  useEffect(() => {
    const fetchUser = async (userId) => {
      if (userId === "new") {
        const userRef = firestore.collection("users").doc();
        return setUser({ id: userRef.id, createAt: new Date() });
      }

      const user = await firestore.collection("users").doc(userId).get();

      if (user.exists)
        return setUser({
          ...user.data(),
          isAdmin: user.data().roleCode === "admin",
        });

      return history.goBack();
    };

    fetchUser(userId);
  }, [userId, history]);

  const onCreateUserError = (error) => {
    const description = createUserErrors[error.message];

    notification["error"]({
      message: "Create user error",
      description,
    });
  };

  const setUserToFirestore = async (user) =>
    firestore.collection("users").doc(user.id).set(user, { merge: true });

  const submitValues = async (data) => {
    try {
      setIsLoadingCreateUser(true);

      const userData = mapUserData(data);

      userData.roleCode = userData.isAdmin ? "admin" : "standard";

      delete userData.isAdmin;

      await setUserToFirestore(userData);

      return history.goBack();
    } catch (error) {
      onCreateUserError(error);
      setIsLoadingCreateUser(false);
    }
  };

  const mapUserData = (data) =>
    assign({}, user, data, { updateAt: new Date() });

  return (
    <Form
      onSubmit={handleSubmit(submitValues)}
      triggerValidation={triggerValidation}
      clearError={clearError}
    >
      <Input
        error={errors.firstName}
        required
        label={`${i18n(["user", "firstName"])}:`}
        disabled={!user}
        ref={register}
        name="firstName"
        className="ant-input"
        placeholder={i18n(["user", "firstName"])}
        type="text"
        defaultValue={get(user, "firstName", "")}
      />
      <Input
        error={errors.lastName}
        required
        label={`${i18n(["user", "lastName"])}:`}
        disabled={!user}
        ref={register}
        name="lastName"
        className="ant-input"
        placeholder={i18n(["user", "lastName"])}
        type="text"
        defaultValue={get(user, "lastName", "")}
      />
      <Input
        error={errors.email}
        required={userId === "new"}
        label={`${i18n(["user", "email"])}:`}
        disabled={!user || userId !== "new"}
        ref={register}
        name="email"
        className="ant-input"
        placeholder={i18n(["user", "email"])}
        type="text"
        defaultValue={get(user, "email", "")}
      />
      <Controller
        key={get(user, "bornDate", "bornDate")}
        name="bornDate"
        control={control}
        defaultValue={get(user, "bornDate", null) && moment(user.bornDate)}
        as={
          <DatePicker
            error={errors.bornDate}
            label={`${i18n(["user", "bornDate"])}:`}
            required
          />
        }
      />
      <Controller
        key={get(user, "isAdmin", "isAdmin")}
        name="isAdmin"
        control={control}
        defaultValue={get(user, "isAdmin", false)}
        as={
          <Switch
            error={errors.isAdmin}
            label={`${i18n(["user", "isAdmin"])}:`}
            required
          />
        }
      />
      <Button
        loading={isLoadingCreateUser}
        type="primary"
        htmlType="submit"
        color={colors.primary}
      >
        {i18n(["user", "save"])}
      </Button>
      <Button disabled={isLoadingCreateUser} onClick={() => history.goBack()}>
        {i18n(["user", "cancel"])}
      </Button>
    </Form>
  );
};
