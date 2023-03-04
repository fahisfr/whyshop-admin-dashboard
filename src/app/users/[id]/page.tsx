"use client";
import React, { useState } from "react";
import axios from "@/helper/axios";
import { useQuery } from "react-query";
import Select from "@/components/Select";
import { useRouter } from "next/navigation";
import { User } from "@/helper/interface";
import { roles } from "@/helper/selectOptions";
import { useAppContext } from "@/helper/context";
import Confirmation from "@/components/Confirmeation";
interface PageProps {
  params: {
    id: string;
  };
}

interface Conformation {
  trigger: boolean;
  role: string;
}

export default function Page({ params: { id } }: PageProps) {
  const { triggerSidePopUpMessage } = useAppContext();
  const router = useRouter();
  const [conformation, setConformation] = useState<Conformation>({
    trigger: false,
    role: "",
  });
  const fetchUser = async () => {
    const { data } = await axios.get(`/admin/user/${id}`);
    return data;
  };

  const { isLoading, isError, data } = useQuery(["user", id], fetchUser);

  if (isLoading) {
    return <div>Loading</div>;
  } else if (isError) {
    return <div>Error</div>;
  }

  const user = data.user;
  const changeRole = async () => {
    
    const { data } = await axios.put("/admin/user/change-role", {
      role: user.role,
      id: user._id,
    });

    if (data.status === "ok") {
      triggerSidePopUpMessage(false, data.message);
    } else if (data.status === "error") {
      triggerSidePopUpMessage(true, data.message);
    }
  };
  return (
    <div className=" fixed inset-0 z-[101]  overflow-auto">
      <div className="  flex min-h-screen p-4 items-center justify-center ">
        <div
          className=" fixed  inset-0 backdrop-blur-sm  bg-black/10 "
          onClick={() => router.back()}
        ></div>
        <div className=" relative  w-full max-w-[30rem] bg-theme-primary rounded-sm p-6 flex gap-2 flex-col  shadow-lg  ">
          <div className="">
            <label>Id</label>
            <input className="pt-input" value={user._id} disabled={true} />
          </div>
          <div className="">
            <label>Role</label>
            <Select
              options={roles}
              backgroundColor=" "
              defaultOptionIndex={roles.findIndex(
                (role) => role.value === user.role
              )}
              onSelect={(role) => {
                setConformation({
                  trigger: true,
                  role,
                });
              }}
            />
          </div>
          <div className="">
            <label>Number</label>
            <input className="pt-input" value={user.number} disabled={true} />
          </div>
          <div>
            <label>CreateAt</label>
            <input className="pt-input" value={user.createAt} disabled={true} />
          </div>{" "}
        </div>
      </div>
      {conformation.trigger && (
        <Confirmation
          onClose={() => {
            setConformation({ trigger: false, role: "" });
          }}
          onConfirm={changeRole}
          title={`to give ${user.number} ${conformation.role} role`}
          confirmationText={`give-${conformation.role}`}
        />
      )}
    </div>
  );
}
