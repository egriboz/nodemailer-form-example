import { useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showFailureMessage, setShowFailureMessage] = useState(false);

  //   Form validation
  const [errors, setErrors] = useState({});
  function validateEmail(email) {
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.match(regexEmail)) {
      return true;
    } else {
      return false;
    }
  }
  const handleValidation = () => {
    let tempErrors = {};
    let isValid = true;

    if (name.length <= 0) {
      tempErrors["name"] = true;
      isValid = false;
    }
    // if (email.length <= 0) {
    //   tempErrors["email"] = true;
    //   isValid = false;
    // }
    if (!validateEmail(email)) {
      tempErrors["email"] = true;
      isValid = false;
    }

    if (message.length <= 0) {
      tempErrors["message"] = true;
      isValid = false;
    }

    setErrors({ ...tempErrors });
    console.log("tempErrors", tempErrors);
    console.log("errors", errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValidForm = handleValidation();

    let data = {
      name,
      email,
      message,
    };
    if (isValidForm) {
      console.log("Sending...");
      const res = await fetch("/api/mail", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },

        body: JSON.stringify(data),
      }).then((res) => {
        console.log("Response received");
        if (res.status === 200) {
          console.log("Response succeeded!");
          setShowSuccessMessage(true);
          setShowFailureMessage(false);

          setSubmitted(true);
          setName("");
          setEmail("");
          setMessage("");
        } else {
          setShowSuccessMessage(false);
          setShowFailureMessage(true);
        }
      });

      // const { error } = await res.json();
      // if (error) {
      //   console.log("errorerror:", error);
      //   return;
      // }
    }
  };
  return (
    <div className={styles.container}>
      <h1>Contact Form with Next.js and Nodemailer</h1>
      <form onSubmit={handleSubmit} className={styles.main}>
        <div className={styles.inputGroup}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            name="name"
            className={styles.inputField}
          />
          {errors?.name && (
            <p className={styles.errors}>Name cannot be empty.</p>
          )}
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            name="email"
            className={styles.inputField}
          />
          {errors?.email && (
            <p className={styles.errors}>e-mail cannot be empty.</p>
          )}
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="message">Message</label>
          <input
            type="text"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            name="message"
            className={styles.inputField}
          />
          {errors?.message && (
            <p className={styles.errors}>Message cannot be empty.</p>
          )}
        </div>
        <input
          type="submit"
          // onClick={(e) => {
          //   handleSubmit(e);
          // }}
        />
        <div>
          {showSuccessMessage && (
            <p>Thankyou! Your Message has been delivered.</p>
          )}
          {showFailureMessage && (
            <p>Oops! Something went wrong, please try again.</p>
          )}
        </div>
      </form>
    </div>
  );
}
