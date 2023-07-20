import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const EmailVerify = () => {
  const [flag, setFlag] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    const verification = async () => {
      try {
        const res = await axios.put(
          `http://localhost:8090/api/auth/verify-email/${id}`
        );
        if (res && res.status === 200) {
          setFlag(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    verification();
  }, []);
  return (
    <div>{flag ? <h1>Email verified</h1> : <h1>Email not verified</h1>}</div>
  );
};

export default EmailVerify;
