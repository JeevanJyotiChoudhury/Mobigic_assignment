import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser, authState } = useContext(AuthContext);
const navigate=useNavigate()
  const handleLogin = async () => {

     fetch("https://gold-relieved-cormorant.cyclic.app/user/login", {
       method: "POST",
       body: JSON.stringify({userName, password }),
       headers: { "Content-Type": "application/json" },
     })
       .then((res) => res.json())
       .then((el) => {
         loginUser(el.token);
         alert(el.msg)
         navigate("/dashboard")
       })
       .catch((err) => {
         console.log(err);
       });
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("userToken");
    if (storedToken) {
      loginUser(storedToken);
    }
  }, [loginUser]);

   if (authState.token) {
     return <Navigate to="/dashboard" />;
   }
  return (
    <div>
      <h2>Login</h2>
      <label>
        Username:
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
