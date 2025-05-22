import React, { useState } from 'react';
import './App.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function PasswordStrengthIndicator() {
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function evaluatePasswordStrength(password) {                              
    let score = 0;

    if (!password) return '';
    if (password.length > 8) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/\d/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    switch (score) {
      case 0:
      case 1:
      case 2:
        return "Weak";
      case 3:
        return "Medium";
      case 4:
      case 5:
        return "Strong";
      default:
        return "";
    }
  }

  return (
    <div className="password-container">
      <div className="input-wrapper">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          value={password}
          onChange={(event) => {
            const value = event.target.value;
            setPassword(value);
            setStrength(evaluatePasswordStrength(value));
          }}
        />
        <button
          type="button"
          className="toggle-visibility"
          onClick={() => setShowPassword(!showPassword)}
        >
          <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
        </button>
      </div>

      <div className="strength-indicator">
        <div className={`strength ${strength.toLowerCase()}`}></div>
        <small>Password strength: {strength}</small>
      </div>
    </div>
  );
}

export default PasswordStrengthIndicator;
