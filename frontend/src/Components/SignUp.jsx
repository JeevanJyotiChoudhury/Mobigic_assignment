import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  // const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const response = await fetch(
        "https://gold-relieved-cormorant.cyclic.app/user/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userName, password }),
        }
      );

      if (response.ok) {
        // navigate("/login");
      } else {
        const data = await response.json();
        alert(data.error)
        // navigate("/login");
      }
    } catch (error) {
      alert(error.message)
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
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
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
};

export default SignUp;
