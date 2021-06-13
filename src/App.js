import { useRef } from "react";
import "./App.css";
import firebase from "./firebase/firebase";

function App() {
  const verifyButtonRef = useRef();
  const statusLabel = useRef();

  // For Recaptcha
  const setUpRecaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier("re-c", {
      size: "invisible",
      callback: (response) => {
        console.log(response);
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        console.log("Hello");
        verifyNumber();
      },
    });
  };

  const verifyNumber = (event) => {
    event.preventDefault();
    setUpRecaptcha();

    const [phone] = event.target.elements;

    const phoneNumber = phone.value;
    console.log(phoneNumber);

    const appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        console.log("S");

        const code = window.prompt("Enter OTP: ");
        confirmationResult
          .confirm(code)
          .then((result) => {
            // User signed in successfully.
            const user = result.user;
            console.log("Success");
            // verifyButtonRef.current.disable = true;

            // ...
          })
          .catch((error) => {
            // User couldn't sign in (bad verification code?)
            // ...
            console.log("error");
            statusLabel.current.innerHTML = "Wrong OTP!";
          });

        // ...
      })
      .catch((error) => {
        // Error; SMS not sent
        statusLabel.current.innerHTML =
          "Please refersh the page and regenerate OTP!";
      });
  };

  return (
    <div className="App">
      <form onSubmit={verifyNumber}>
        <div id="re-c"></div>
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder="e.g. +918912198076"
          maxLength="13"
        />

        <button type="submit" ref={verifyButtonRef}>
          Sent OTP
        </button>
      </form>
      <p ref={statusLabel}></p>
    </div>
  );
}

export default App;
