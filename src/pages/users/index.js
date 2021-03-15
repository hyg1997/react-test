import React, { Fragment, useEffect, useState } from "reactn";
import { useHistory } from "react-router-dom";
import { firestore } from "../../firebase";
import { querySnapshotToArray } from "../../utils";
import { List, ListContent, ListItem } from "../../components/list";
import { useGlobal } from "reactn";

export const Users = () => {
  const history = useHistory();
  const [users, setUsers] = useState([]);
  const [globalUser] = useGlobal("user");

  useEffect(() => {
    fetchUsers();
  }, []);

  const renderRow = (
    { index, isScrolling, isVisible, key, style },
    listData
  ) => {
    const user = listData[index];

    return (
      <ListItem style={{ ...style }} key={index}>
        <ListContent onClick={() => history.push(`/users/${user.id}`)}>
          {`${user.firstName} ${user.lastName} (${user.email})`}
        </ListContent>
      </ListItem>
    );
  };

  const fetchUsers = async () => {
    const users = await firestore.collection("users").get();

    const usersArray = querySnapshotToArray(users).filter(
      (user) => user.id !== globalUser.id
    );

    setUsers(usersArray);
  };

  return (
    <Fragment>
      <List data={users} renderRow={renderRow} />
    </Fragment>
  );
};
