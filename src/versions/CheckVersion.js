import React, { useEffect, useState } from "react";
import { BaseLayout, Button } from "../components";
import { firestore } from "../firebase";
import { querySnapshotToArray } from "../utils";
import { withConfiguration } from "../hoc";
import App from "../App";

const CheckVersion = () => {
  const [version] = useState("0.0.1");
  const [isLastVersion, setIsLastVersion] = useState(true);

  useEffect(() => {
    const unsubscribeVersion = firestore
      .collection("versions")
      .onSnapshot((snapshot) => {
        const versionsArray = querySnapshotToArray(snapshot);
        const lastVersion = versionsArray[0].versionNumber;

        setIsLastVersion(version === lastVersion);
      });
    return () => unsubscribeVersion();
  });

  return isLastVersion ? (
    <App />
  ) : (
    <BaseLayout>
      <h1>Check version</h1>
      <Button onClick={() => window.location.reload(true)}>Refresh</Button>
    </BaseLayout>
  );
};

export default withConfiguration(CheckVersion);
