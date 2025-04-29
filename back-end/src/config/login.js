import { json } from "body-parser";
import React, { useEffect, useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://locahost:5000/auth/set-cookie",
        { username },
        { withCredentials: true }
      );
      console.log(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return <div></div>;
};

export default Login;

const CookiesConsent = () => {
  const [showPopup, setShowPopup] = useState(false);
  useEffect(() => {
    const consentGive = localStorage.getItem("cookieConsent");
    if (!consentGive) {
      setShowPopup(true);
    }
  }, []);
  const handleAccept = () => {
    localStorage.setItem("cookieConsent", true);
    setShowPopup(false);
  };
  const handleReject = () => {
    localStorage.setItem("cookieConsent", false);
    alert(
      "vous avez refus les cookies , certaines fonctionnalites peuvent etre limitees"
    );
  };

  return (
    showPopup && (
      <div className="cookies-popus">
        <p>
          Ce site utilise des cookies pour ameliorer votre experience .
          Acceptez-vous les cookies ?
        </p>
        <button onClick={handleAccept}>accepter</button>
        <button onClick={handleReject}>refuser</button>
      </div>
    )
  );
};

// handle accept v2 ;

const handleAccept = async () => {
  localStorage.setItem("cookiesConsent");
  await fetch("http://localhsot:5000/api/tracker-consent"),
    {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ consent: true }),
    };
  setShowPopup(false);
};
