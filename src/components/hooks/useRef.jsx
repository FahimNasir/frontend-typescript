import React, { useRef } from "react";

const FormWithFocus = () => {
  // Create refs for each input field
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);

  const handleKeyDown = (e, nextRef) => {
    // Move focus to the next input when the user presses Enter
    if (e.key === "Enter") {
      e.preventDefault();
      nextRef.current.focus();
    }
  };

  return (
    <form>
      <label>
        First Name:
        <input
          type="text"
          ref={firstNameRef}
          onKeyDown={(e) => handleKeyDown(e, lastNameRef)}
        />
      </label>
      <br />

      <label>
        Last Name:
        <input
          type="text"
          ref={lastNameRef}
          onKeyDown={(e) => handleKeyDown(e, emailRef)}
        />
      </label>
      <br />

      <label>
        Email:
        <input
          type="email"
          ref={emailRef}
          onKeyDown={(e) => handleKeyDown(e, firstNameRef)}
        />
      </label>
    </form>
  );
};

export default FormWithFocus;
