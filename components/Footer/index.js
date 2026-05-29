import React, { useState } from "react";
import Button from "../Button"; // Button bileşeninin yolu
import ContactModal from "../ContactModal"; // ContactModal bileşeninin yolu
import data from "../../data/portfolio.json"; // portfolio.json dosyasının yolu

const Footer = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <>
      <div className="mt-10 laptop:mt-40 p-2 laptop:p-0">
        <h1 className="tablet:m-10 text-2xl text-bold">Contact.</h1>
        <div className="tablet:m-10 mt-2 text-xl laptop:text-3xl w-full laptop:w-3/5">
          <p>Ready to work together? Let's connect!</p>
          <div className="mt-5">
            <Button type="primary" onClick={() => setIsContactModalOpen(true)}>
              Get in Touch
            </Button>
          </div>
        </div>
        <div className="mt-10">
          <p className="text-center text-sm opacity-50">
            © {new Date().getFullYear()} {data.name}. All rights reserved.
          </p>
        </div>
      </div>
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </>
  );
};

export default Footer;