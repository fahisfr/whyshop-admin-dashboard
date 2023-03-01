"use client";
import React, { useState } from "react";
import axios from "@/helper/axios";
import { useQuery } from "react-query";
import Select from "@/components/Select";
import { useRouter } from "next/navigation";
import { User } from "@/helper/interface";
interface PageProps {
  params: {
    id: string;
  };
}

const options = [
  {
    label: "SuperAdmin",
    value: "superAdmin",
  },
  {
    label: "User",
    value: "user",
  },
  {
    label: "Admin",
    value: "admin",
  },
  {
    label: "TestAdmin",
    value: "testAdmin",
  },
];

interface Conformation {
  trigger: boolean;
  role: string;
}

export default function Page({ params: { id } }: PageProps) {
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

  return (
    <div className=" fixed inset-0 z-[101]  overflow-auto">
      <div className="  flex min-h-screen p-4 items-center justify-center ">
        <div
          className=" fixed  inset-0 backdrop-blur-sm  bg-black/10 "
          onClick={() => router.back()}
        ></div>
        <div className=" relative  w-full max-w-[30rem] rounded-sm p-6 flex gap-2 flex-col  shadow-lg    bg-theme-primary ">
          <div className="">
            <label>Id</label>
            <input className="pt-input" value={user._id} disabled={true} />
          </div>
          <div className="">
            <label>Role</label>
            <Select
              options={options}
              defaultOptionIndex={options.findIndex(
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
        <Conf
          setTrigger={setConformation}
          role={conformation.role}
          userInfo={user}
        />
      )}
    </div>
  );
}

interface ConfProps {
  setTrigger: React.Dispatch<React.SetStateAction<Conformation>>;
  role: string;
  userInfo: User;
}

function Conf({ setTrigger, role, userInfo }: ConfProps) {
  const passText = `give-${role}`;
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setBtnLoading(true);
      const { data } = await axios.put("/admin/user/change-role", {
        role,
        id: userInfo._id,
      });
      setBtnLoading(false);

      if (data.status === "ok") {
        alert("success");
        setTrigger(false);
      } else if (data.status === "error") {
        alert(data.message);
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className=" fixed inset-0 z-[102]  overflow-auto">
      <div className="  flex min-h-screen p-4 items-center justify-center ">
        <div
          className=" fixed  inset-0  bg-black/30 "
          onClick={() =>
            setTrigger({
              trigger: false,
              role: "",
            })
          }
        ></div>
        <div className=" max-w-lg  w-full bg-theme-primary p-6  border border-gray-300 rounded-sm flex-col relative text-center">
          <h2>
            Please Enter <span className=" font-extrabold ">{passText}</span>
          </h2>
          <form className="w-full mt-4 " onSubmit={onSubmit}>
            <input
              className="pt-input "
              placeholder={passText}
              pattern={passText}
            />
            <div className={`btn ${btnLoading && "btn-loading"}`}></div>
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
