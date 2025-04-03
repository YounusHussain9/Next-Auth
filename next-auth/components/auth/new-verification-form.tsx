"use client";
import React, { useCallback, useEffect, useState } from "react";
import CardWrapper from "./card-wrapper";
import { useSearchParams } from "next/navigation";
import { newVerificationToken } from "@/actions/new-verification";
import FormError from "../form-error";
const NewVerificationForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const onSubmit = useCallback(() => {
    if (!token) {
      setError("Token missing");
      return;
    }
    newVerificationToken(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong");
      });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);
  return (
    <CardWrapper
      headerLabel="Cofirming your verification"
      backButtonLabel="Back to Login"
      backButtonHref="/auth/login"
    >
      <div className="flex items-center justify-center w-full"></div>
      <FormError message={error} />
    </CardWrapper>
  );
};

export default NewVerificationForm;
