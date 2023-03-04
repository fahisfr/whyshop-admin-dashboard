"use client";

import { useState } from "react";
import axios from "@/helper/axios";
import { useQuery } from "react-query";
import UsersFilterBar, {
  Skeleton as UsersFilterBarSkeleton,
} from "@/components/filterBar/UsersFilterBar";
import { User } from "@/helper/interface";
import { AiFillDelete, AiOutlineEdit } from "react-icons/ai";
import Link from "next/link";
import TableBody from "@/components/skeleton/TableBody";

interface Props {
  children: React.ReactNode;
}
export default function page({ children }: Props) {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    const { data } = await axios.get("/admin/all-users");
    return data;
  };

  const { isLoading, isError, data } = useQuery(["users"], fetchUsers);

  if (isLoading ) {
    return <Skeleton />;
  } else if (isError) {
    return <div>{isError}</div>;
  }

  return (
    <>
      <UsersFilterBar users={data.users} setUsers={setUsers} />
      <div className="overflow-auto">
        <table className="table ">
          <thead>
            <tr>
              <th>Number</th>
              <th>Role</th>
              <th>Created</th>
              <th>Orders</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: User, index: number) => {
              return (
                <tr key={index}>
                  <td>{user.number}</td>
                  <td>{user.role}</td>
                  <td>{user.createAt}</td>
                  <td>{user.orders.length}</td>
                  <td>
                    <div className="flex gap-2">
                      <Link href={`/users/${user._id}`}>
                        <button className=" px-1 py-[6px] border border-green-600 text-green-600 rounded hover:bg-green-600 hover:text-white transition duration-300">
                          <AiOutlineEdit className="text-lg  " />
                        </button>
                      </Link>

                      <button className=" p-1  border border-red-600  text-red-600 rounded hover:bg-red-600 hover:text-white transition duration-300">
                        <AiFillDelete className="text-lg  " />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {children}
    </>
  );
}

function Skeleton() {
  return (
    <>
      <UsersFilterBarSkeleton />
      <div className="overflow-auto">
        <table className="table ">
          <thead>
            <tr>
              <th>Number</th>
              <th>Role</th>
              <th>Created</th>
              <th>Orders</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <TableBody colCount={5} />
          </tbody>
        </table>
      </div>
    </>
  );
}
