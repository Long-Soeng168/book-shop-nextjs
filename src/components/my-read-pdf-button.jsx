'use client'
import React from "react";
import { Button } from "./ui/button";
import { BookOpenTextIcon } from "lucide-react";
import { BOOK_PDF_URL } from "@/config/env";

const MyReadPdfButton = ({ product }) => {
  const handleReadClick = () => {
    const pdfUrl = `${BOOK_PDF_URL}${product?.file}`;
    localStorage.setItem("pdfUrl", pdfUrl); // Save pdfUrl to localStorage
    window.location.href = "/pdf-viewer"; // Redirect to the PDF viewer page
  };

  return (
    <>
      <Button
        onClick={handleReadClick}
        className="w-full"
        variant="destructive"
      >
        <BookOpenTextIcon /> Read
      </Button>
    </>
  );
};

export default MyReadPdfButton;
