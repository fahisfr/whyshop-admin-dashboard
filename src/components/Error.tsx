import { errorHandler } from "@/helper/errorHandler";
import React from "react";

export default function Error({ error }) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="p-4 flex flex-col items-center gap-2">
        <h2 className=" text-center text-lg">{errorHandler(error).message}</h2>
      </div>
    </div>
  );
}
