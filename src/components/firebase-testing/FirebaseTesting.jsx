import { useEffect } from "react";

import { firestore } from "../../firebase/firebase";

const FirebaseTesting = () => {
  // Example of arra-contains
  useEffect(() => {
    firestore
      .collection("testing")
      .where("users", "array-contains", "ram")
      .onSnapshot((d) => {
        debugger;
      });
  }, []);

  return "s";
};

export default FirebaseTesting;
