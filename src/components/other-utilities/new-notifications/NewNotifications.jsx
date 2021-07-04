import { useEffect, useState } from "react";
import { firestore } from "../../../firebase/firebase";

import "./new-notifications.css";

const AllNotifications = () => {
  const [notis, setNotis] = useState([]);

  useEffect(() => {
    const unsubs = firestore.collection("notifications").onSnapshot((d) => {
      setNotis(d.docs.map((noti) => ({ id: noti.id, ...noti.data() })));

      d.forEach(
        (dd) => !dd.data().rendered && dd.ref.update({ rendered: true })
      );
    });

    return unsubs;
  }, []);

  return (
    <div className="notis">
      {notis.map((noti) => (
        <p key={noti.id}>{noti.msg}</p>
      ))}
    </div>
  );
};

const NewNotifications = () => {
  const [show, setShow] = useState(false);
  const [newCount, setNewCount] = useState(0);

  useEffect(() => {
    firestore
      .collection("notifications")
      .where("rendered", "==", false)
      .onSnapshot((d) => {
        setNewCount(d.size);
      });
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center new-notifications">
      <button
        onClick={() => setShow(!show)}
        className={`btn btn-danger${newCount !== 0 ? " new-noti" : ""}`}
      >
        show {newCount ? newCount : null}
      </button>
      {show && <AllNotifications />}
    </div>
  );
};

export default NewNotifications;
