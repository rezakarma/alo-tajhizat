"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { newVerification } from "@/actions/new-verifdication";
import ErrorForm from '@/components/formValidateMessages/formError'
import SuccessForm from '@/components/formValidateMessages/formSuccess'

const NewVerificationForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const onSubmit = useCallback(() => {
    console.log(token);
    if (!token) {
      setError("توکن ارائه نشده است");
      return;
    }
    newVerification(token).then((data) => {
      setSuccess(data.success);
      setError(data.error);
    }).catch(()=>{
        setError('خطایی رخ داده!')
    });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <>
      <h3 className="text-xl font-semibold">در حال تایید ایمیل شما</h3>
      {!success && !error && <BeatLoader />}
      <div className=" w-fit">
      <SuccessForm message={success}/>
      <ErrorForm message={error}/>
      </div>
      <Link
        className="font-semibold text-gray-500 w-fit hover:text-primaryLight transition-all "
        href="/login"
      >
        بازگشت به صفحه ورود
      </Link>
    </>
  );
};

export default NewVerificationForm;
