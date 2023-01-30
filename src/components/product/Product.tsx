import React, { useState } from "react";
import css from "./css.module.css";
import Image from "next/image";
import { imageUrl } from "@/helper/axios";
import { Product as ProductInterface } from "@/helper/interface";

export default function Product({ product }: { product: ProductInterface }) {
  const [btnLoading, setBtnLoading] = useState(false);
  return (
    <div className={css.product_container}>
      <div className={css.body}>
        <div className={css.pt_left}>
          <div className={css.img_wrapper}>
            <Image
              fill
              alt=""
              objectFit="contain"
              src={`${imageUrl}/${product.imageName}.jpg`}
            />
          </div>
        </div>
        <div className={css.pt_info}>
          <label className={css.pt_label}>Name</label>
          <div className={css.pt_group}>
            <input className={css.pt_input} value={product.name} />
          </div>{" "}
          <label className={css.pt_label}>Price</label>
          <div className={css.pt_group}>
            <input className={css.pt_input} value={product.price} />
          </div>{" "}
          <label className={css.pt_label}>Quntitiy</label>
          <div className={css.pt_group}>
            <input className={css.pt_input} value={product.quantity} />
          </div>
          <div className={`${css.pt_bottom} ${btnLoading && "btn-loading"}`}>
            <button className={css.cancel_btn}>Cancel</button>
            <button className={`${css.save_btn} btn`}>
              <span className="btn-text">Save</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
