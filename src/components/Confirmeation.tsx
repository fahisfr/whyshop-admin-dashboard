import React, { useState } from "react";

interface Props {
  title: string;
  confirmationText: string;
  onConfirm:  () => void;
  onClose: () => void;
}

export default function Confirmation({
  onClose,
  title,
  onConfirm,
  confirmationText,
}: Props) {
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBtnLoading(true);
     onConfirm();
    setBtnLoading(false);
  };

  return (
    <div className=" fixed inset-0 z-[102]  overflow-auto">
      <div className="  flex min-h-screen p-4 items-center justify-center ">
        <div className=" fixed  inset-0  bg-black/30 " onClick={onClose}></div>
        <div className=" max-w-lg  w-full bg-theme-primary p-6  border border-gray-300 rounded-sm flex-col relative text-center">
          <h2>
            Please Enter
            <span className=" font-extrabold "> {confirmationText} </span>
            {title}
          </h2>
          <form className="w-full mt-4 " onSubmit={onSubmit}>
            <input
              className="pt-input"
              placeholder={confirmationText}
              pattern={confirmationText}
              required
            />
            <div className={` ${btnLoading && "btn-loading"}`}></div>
            <button
              type="submit"
              className="btn w-full mt-4 h-10 bg-primary rounded-sm"
            >
              <span className="btn-text font-bold text-lg">Submit</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
