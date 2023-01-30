import Image from "next/image";
import css from "./page.module.css";
import NavBar from "@/components/navBar/NavBar";

// async function getOrders() {
//   const res = await fetch("http://localhost:4000/api/order/get-orders");

//   return res.json();
// }

export default async function Home() {
  // const data = await getOrders();
  // console.log(data);

  return (
    <div className={css.home_container}>
      <NavBar />
    </div>
  );
}
