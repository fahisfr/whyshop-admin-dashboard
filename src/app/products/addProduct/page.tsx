"use client";
import React, { useRef, useState } from "react";
import css from "../css.module.css";
import Image from "next/image";
import Select from "@/components/select/Select";
import { BiImageAdd } from "react-icons/bi";
import axios from "axios";
import { Image as Img } from "@/helper/interface";
import Link from "next/link";
const options = [
  { value: "Vegetable", label: "Vegetable" },
  { value: "fruits", label: "Fruits" },
  { value: "sweets", label: "Fweets" },
];

export default function Page() {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [btnLoading, setLoading] = useState<boolean>(false);
  const [newProductInfo, setNewProductInfo] = useState({
    name: "",
    category: "",
    price: 0,
    quantity: 0,
  });
  const [newImage, setnewImage] = useState<Img>({
    file: null,
    preview: "",
  });

  const addProduct = async () => {
    const { data } = await axios.post("/product/add-product");
    if (data.status === "ok") {
    } else if (data.status === "error") {
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewProductInfo({
      ...newProductInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageInputRefOneChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        setnewImage({ file, preview: reader.result });
      }
    };

    reader.readAsDataURL(file);
  };

  const handleOnDrop = (e: React.DragEvent<HTMLDivElement>) => {
    console.log(e.dataTransfer.files);
  };

  return (
    <div className={css.product_container}>
      <div className={css.body}>
        <div className={css.pt_img}>
          <div
            onDrop={handleOnDrop}
            className={css.img_wrapper}
            onClick={() => {
              imageInputRef.current?.click();
            }}
          >
            {newImage.preview ? (
              <Image fill alt="" objectFit="contain" src={newImage.preview} />
            ) : (
              <div className={css.drop_file}>
                <BiImageAdd className={css.icon_img_add} />
                <span>Drag-drop or click herer to choose a file</span>
              </div>
            )}
            <input
              type="file"
              ref={imageInputRef}
              onChange={handleImageInputRefOneChange}
              style={{ display: "none" }}
            />
          </div>
        </div>
        <form className={css.pt_info}>
          <div className={css.pt_group}>
            <label className={css.pt_label}>Name</label>
            <input
              className={css.pt_input}
              value={newProductInfo.name}
              name="name"
              onChange={handleChange}
            />
          </div>
          <div className={css.pt_group}>
            <label>Category</label>
            <Select
              options={options}
              onSelect={(value: string) => {}}
              placeHolder="Select Catgeory..."
            />
          </div>
          <div className={css.pt_group}>
            <label className={css.pt_label}>Price</label>
            <input
              className={css.pt_input}
              value={newProductInfo.price}
              name="price"
              type="number"
              onChange={handleChange}
            />
          </div>{" "}
          <div className={css.pt_group}>
            <label className={css.pt_label}>Quntitiy</label>
            <input
              className={css.pt_input}
              name="quntitiy"
              type="number"
              onChange={handleChange}
              value={newProductInfo.quantity}
            />
          </div>
          <div className={`${css.pt_bottom} ${btnLoading && "btn-loading"}`}>
            <Link href="/products">
              <button className={css.cancel_btn}>Cancel</button>
            </Link>

            <button className={`${css.save_btn} btn`}>
              <span className="btn-text">Add</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
