import React from "react";

export default function ErrroMessage({ error }) {
  if (error) {
    switch (error.type) {
      case "required":
        return <p>This is required</p>;
      case "minLength":
        return <p>Your last name need minmium 8 charcaters</p>;
      case "pattern":
        return <p>Enter a valid email address</p>;
      case "validate":
        return <p>Email is already used</p>;
      default:
        return null;
    }
  }

  return null;
}
