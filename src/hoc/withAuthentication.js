import React, { useEffect, useGlobal, useState } from "reactn";
import { auth, firestore } from "../firebase";
import { notification } from "antd";
import { get } from "lodash";

export const withAuthentication = (Component) => () => {
  const [, setGlobalUser] = useGlobal("user");
  const [globalRegister, setGlobalRegister] = useGlobal("register");
  const [globalIsLoadingCreateUser, setGlobalIsLoadingCreateUser] = useGlobal(
    "isLoadingCreateUser"
  );
  const [globalIsLoadingUser, setGlobalIsLoadingUser] = useGlobal(
    "isLoadingUser"
  );
  const [createUserError, setCreateUserError] = useState(null);
  const [isUserExists, setIsUserExists] = useState(true);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  useEffect(() => {
    const mapUserRegister = (user) => ({
      id: get(user, "id", null),
      firstName: get(user, "firstName", null),
      lastName: get(user, "lastName", null),
      email: get(user, "email", null),
      bornDate: get(user, "bornDate", null),
      createAt: get(user, "createAt", new Date()),
      updateAt: get(user, "updateAt", new Date()),
    });

    const setUserApi = async (user) => {
      try {
        const mappedUser = mapUserRegister(user);

        await setUserToFirestore(mappedUser);

        return user;
      } catch (error) {
        setCreateUserError(error.message);
      }
    };

    const setUserToFirestore = async (user) =>
      await firestore
        .collection("users")
        .doc(user.id)
        .set(user, { merge: true });

    const fetchUserFromFirestore = async (authUser) => {
      try {
        const userSnapshot = await firestore
          .collection("users")
          .doc(authUser.uid)
          .get();

        setIsUserExists(userSnapshot.exists);

        return userSnapshot.data();
      } catch (error) {
        setCreateUserError(error.message);
      }
    };

    const unsubscribeAuthStateChanged = auth.onAuthStateChanged(
      async (authUser) => {
        if (
          globalIsLoadingCreateUser &&
          get(authUser, "uid", "uid") === get(globalRegister, "id", "id")
        ) {
          const user = await setUserApi(globalRegister);

          await setGlobalRegister(null);
          await setGlobalUser(user);
          await setGlobalIsLoadingCreateUser(false);

          return setIsLoadingAuth(false);
        }

        if (authUser) {
          const user = await fetchUserFromFirestore(authUser);

          await setGlobalUser(user);
          await setGlobalIsLoadingUser(false);

          return setIsLoadingAuth(false);
        }

        if (!authUser && !globalIsLoadingCreateUser && !globalIsLoadingUser) {
          await setGlobalRegister(null);
          await setGlobalUser(null);

          return setIsLoadingAuth(false);
        }
      }
    );
    return () => unsubscribeAuthStateChanged();
  }, [
    globalRegister,
    globalIsLoadingCreateUser,
    globalIsLoadingUser,
    setGlobalIsLoadingUser,
    setGlobalIsLoadingCreateUser,
    setGlobalUser,
    setGlobalRegister,
  ]);

  useEffect(() => {
    if (createUserError) {
      notification["error"]({
        message: "Authentication error",
        description: createUserError,
      });
      auth.currentUser.delete();
      setCreateUserError(false);
    }
  }, [createUserError]);

  useEffect(() => {
    if (!isUserExists) {
      notification["error"]({
        message: "Authentication error",
        description: "There is a problem with your account.",
      });
    }
  }, [isUserExists]);

  return isLoadingAuth ? null : <Component />;
};
