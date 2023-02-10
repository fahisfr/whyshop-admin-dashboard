import React from "react";
import styles from "./css.module.css";
import { RxDashboard } from "react-icons/rx";
import { GrShop } from "react-icons/gr";
import { BsFillCartPlusFill } from "react-icons/bs";
import Link from "next/link";
export default function NavBar() {
  return (
    <div className={styles.navbar_container}>
      <div className={styles.nb_top}>
        <h1 className={styles.nb_title}>WhyShop Admin</h1>
      </div>
      <div className={styles.nb_center}>
        <Link href={"/"}>
          <div className={styles.nb_group}>
            <RxDashboard className={styles.nb_icon} />{" "}
            <span className={styles.nb_text}>DashBoard</span>
          </div>
        </Link>
        <Link href="/products">
          <div className={styles.nb_group}>
            <GrShop className={styles.nb_icon} />
            <span className={styles.nb_text}>Products</span>
          </div>
        </Link>
        <Link href="/orders">
          <div className={styles.nb_group}>
            <BsFillCartPlusFill className={styles.nb_icon} />
            <span className={styles.nb_text}>Orders</span>
          </div>
        </Link>
        <div className={styles.nb_group}>
          <BsFillCartPlusFill className={styles.nb_icon} />
          <span className={styles.nb_text}>Censaled Orders</span>
        </div>
      </div>
      <div></div>
    </div>
  );
}
