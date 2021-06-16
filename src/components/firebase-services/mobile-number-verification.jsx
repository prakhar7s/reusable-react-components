import React, { useRef, useState } from "react";
import firebase from "../../firebase/firebase";

import "./mobile-number-verification.css";

const MobileNumberVerification = () => {
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const statusLabel = useRef();
  const sentOtpButtonRef = useRef();
  const verifyOtpButtonRef = useRef();
  const otpBox = useRef();

  const loaderRef = useRef();

  // Things to do after OTP successfully verified
  const otpVerifiedSuccessfully = () => {
    /*
    1. Notify user with notification
    2. disable verify OTP button
    */
    setStatusLabel("Verified", "green");
    verifyOtpButtonRef.current.disabled = true;
  };

  // Thins to do after OTP sent to the given number
  const otpSentSuccessfully = () => {
    /*
      1. Notify user with notification
      2. Disable sent OTP button
      3. Visible the input field to input OTP
      4. hide the loader

    */

    setStatusLabel("Check your mobile OTP has been sent!", "green");
    sentOtpButtonRef.current.disabled = true;
    otpBox.current.style.visibility = "visible";
    setLoading(false);
  };

  // Utility method for notification
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
        console.log(result);

        otpVerifiedSuccessfully();
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        setStatusLabel("Wrong OTP! Try again!");
      });
  };

  const verifyNumber = (event) => {
    event.preventDefault();
    setUpRecaptcha();

    setLoading(true);

    const number = document.querySelector("#phone-num-inp").value;
    const phoneNumber = `+91${number}`;
    console.log(phoneNumber);

    const appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        setConfirmationResult(confirmationResult);

        otpSentSuccessfully();
      })
      .catch((error) => {
        // Error; SMS not sent
        setLoading(false);
        sentOtpButtonRef.current.disabled = true;
        if (!statusLabel.current.innerHTML.includes("Wrong OTP! Try again!")) {
          setStatusLabel("Please refersh the page and try again!");
        }
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

  return (
    <div className="mobile-num-verification">
      <div>
        <div id="re-c"></div>
        <input
          type="tel"
          id="phone-num-inp"
          name="phone"
          placeholder="e.g. +91**********"
          maxLength="10"
        />

        <button type="button" onClick={verifyNumber} ref={sentOtpButtonRef}>
          Sent OTP
        </button>
        {isLoading && <div ref={loaderRef} className="loading"></div>}

        <div style={{ visibility: "hidden" }} className="otpBox" ref={otpBox}>
          <input id="otp-str" type="text" placeholder="Enter OTP" />
          <button type="button" ref={verifyOtpButtonRef} onClick={verifyOTP}>
            Verify
          </button>
        </div>
      </div>
      <p className="status-p" ref={statusLabel}></p>
    </div>
  );
};

export default MobileNumberVerification;
