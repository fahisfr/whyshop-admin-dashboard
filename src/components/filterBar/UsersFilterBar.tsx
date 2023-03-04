import React, { useEffect, useState } from "react";
import Select from "../Select";
import { AiOutlineSearch } from "react-icons/ai";
import { User } from "@/helper/interface";
import { roles } from "@/helper/selectOptions";

interface Props {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

export default function UsersFilterBar({ users, setUsers }: Props) {
  const [search, setSearch] = useState<string>("");
  const [filterdRole, setFilterdRole] = useState<string>("all");

  useEffect(() => {
    let filterdUserList = users;
    if (filterdRole !== "all") {
      filterdUserList = filterdUserList.filter(
        (user) => user.role === filterdRole
      );
    }
    if (search) {
      filterdUserList = filterdUserList.filter((user) => {
        return user.number.toString().includes(search);
      });
    }
    setUsers(filterdUserList);
  });

  return (
    <div className=" p-4 rounded flex w-full gap-4 bg-theme-primary">
      <div className=" max-w-lg">
        <Select options={roles} onSelect={setFilterdRole} />
      </div>
      <div className=" flex flex-grow   bg-theme-primary items-center  rounded-lg border border-gray-300 pr-2">
        <input
          className="w-full h-full pl-2  rounded-lg bg-theme-primary  outline-none "
          type="number"
          placeholder="Search number ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <AiOutlineSearch className=" text-2xl" />
      </div>
    </div>
  );
}

export function Skeleton() {
  return (
    <div className=" p-4 rounded flex w-full gap-4 bg-theme-primary">
      <div className=" skeleton h-10  w-24 rounded-lg"></div>
      <div className=" flex flex-grow    rounded-lg border border-gray-300 ">
        <div className="w-full h-full  skeleton  rounded-lg  " />
      </div>
    </div>
  );
}
