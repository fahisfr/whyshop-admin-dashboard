import React, {  useRef, useState } from "react";
import css from "./css.module.css";
import Image from "next/image";
import { imageUrl } from "@/helper/axios";
import { Product as ProductInterface } from "@/helper/interface";
import Select from "../select/Select";
import { BiImageAdd } from "react-icons/bi";
const options = [
  { value: "Vegetable", label: "Vegetable" },
  { value: "fruits", label: "Fruits" },
  { value: "sweets", label: "Fweets" },
];

interface Image {
  file: File | null;
  preview: string;
}

export default function Product({ product }: { product: ProductInterface }) {
  const imageInputRef = useRef<HTMLInputElement>();
  const [newProductInfo, setNewProductInfo] = useState({
    name: product.name,
    category: product.category,
    price: product.price,
    quantity: product.quantity,
  });
  const [newImage, setnewImage] = useState<Image>({
    file: null,
    preview: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewProductInfo({
      ...newProductInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageInputRefChange = (
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

  const [btnLoading, setBtnLoading] = useState(false);

  return (
    <div className={css.product_container}>
      <div className={css.body}>
        <div className={css.pt_img}>
          <div
            className={css.img_wrapper}
            onClick={() => {
              imageInputRef.current?.click();
            }}
          >
            {" "}
            <BiImageAdd className={css.icon_img_add} />
            <Image
              fill
              alt=""
              objectFit="contain"
              src={
                newImage.preview
                  ? newImage.preview
                  : `${imageUrl}/${product.imageName}.jpg`
              }
            />{" "}
            <input
              type="file"
              ref={imageInputRef}
              onChange={handleImageInputRefChange}
              style={{ display: "none" }}
            />
          </div>
        </div>
        <div className={css.pt_info}>
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
            <Select options={options} onSelect={(value: string) => {}} />
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
