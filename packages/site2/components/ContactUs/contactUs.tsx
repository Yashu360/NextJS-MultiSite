import React from "react";
import { Formio } from "@formio/react";
import { useEffect } from "react";

export default function ContactUsForm() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      Formio.createForm(
        document.getElementById("formio"),
        "https://erfpjgyxkyegbvv.form.io/contactus"
      );
    }
  }, []);

  return (
    <div className="contactUsContainer">
      <h1>Contact US</h1>
      <div id="formio"></div>
    </div>
  );
}
