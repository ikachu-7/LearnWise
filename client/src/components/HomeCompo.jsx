import React from "react";
import { useAuth } from "../context/AuthProvider";
const HomeCompo = () => {
  const [auth, setAuth] = useAuth();
  return (
    <div>
      <pre>{JSON.stringify(auth, null, 4)}</pre>
    </div>
  );
};

export default HomeCompo;
