import React from "react";

import dynamic from "next/dynamic";

const ContactUsDynamic = dynamic(
  () => import("../components/ContactUs/contactUs"),
  {
    ssr: false,
  }
);

export default class ContactUs extends React.Component {
  render() {
    return (
      <div className="contactus-page">
        <ContactUsDynamic />
      </div>
    );
  }
}
