import React from "react";

interface FormErrorProps {
  message?: string;
}
const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;

  return <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
    <div className="size-5 rounded-full"></div>
    {message}
  </div>;
};

export default FormError;
