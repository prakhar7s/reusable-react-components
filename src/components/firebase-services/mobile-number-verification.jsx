import React, { useRef, useState } from "react";
import firebase from "../../firebase/firebase";

import "./mobile-number-verification.css";

const MobileNumberVerification = () => {
  const [confirmationResult, setConfirmationResult] = useState(null);
  const verifyButtonRef = useRef();
  const statusLabel = useRef();
  const otpBox = useRef();
  const otpVerifyButtonRef = useRef();

  const setStatusLabel = (msg, textColor = "red") => {
    statusLabel.current.style.color = textColor;
    statusLabel.current.innerHTML = `***${msg}***`;
  };

  const verifyOTP = () => {
    const code = document.querySelector("#otp-str").value;

    if (!confirmationResult) {
      return;
    }

    confirmationResult
      .confirm(code)
      .then((result) => {
        // User signed in successfully.
        const user = result.user;
        console.log("Success");
        verifyButtonRef.current.disabled = true;

        setStatusLabel("Verified", "green");
        otpVerifyButtonRef.current.disabled = true;

        // ...
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        setStatusLabel("Wrong OTP! Try again!");
      });
  };

  // For Recaptcha
  const setUpRecaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier("re-c", {
      size: "invisible",
      callback: (response) => {
        console.log(response);
        // reCAPTCHA solved, allow signInWithPhoneNumber.
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
        otpBox.current.style.visibility = "visible";
        verifyButtonRef.current.disabled = true;

        setStatusLabel("Check your mobile OTP has been sent!", "green");

        setConfirmationResult(confirmationResult);
      })
      .catch((error) => {
        // Error; SMS not sent
        verifyButtonRef.current.disabled = true;
        if (!statusLabel.current.innerHTML.includes("Wrong OTP! Try again!")) {
          setStatusLabel("Please refersh the page and try again!");
        }
      });
  };

  return (
    <div className="mobile-num-verification">
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
        <div style={{ visibility: "hidden" }} className="otpBox" ref={otpBox}>
          <input id="otp-str" type="text" placeholder="Enter OTP" />
          <button ref={otpVerifyButtonRef} onClick={verifyOTP}>
            Verify
          </button>
        </div>
      </form>
      <p className="status-p" ref={statusLabel}></p>
    </div>
  );
};

export default MobileNumberVerification;
