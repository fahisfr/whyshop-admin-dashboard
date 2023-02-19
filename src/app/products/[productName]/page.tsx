"use client";
import React, { useRef, useState } from "react";
import css from "../css.module.css";
import Img from "next/image";
import { imageUrl } from "@/helper/axios";
import { Product, Image } from "@/helper/interface";
import Select from "@/components/Select";
import { BiImageAdd } from "react-icons/bi";
import axios from "@/helper/axios";
import { useQuery } from "react-query";
import { useRouter } from "next/navigation";
import { getContext } from "@/helper/context";

const options = [
  { value: "Vegetable", label: "Vegetable" },
  { value: "fruits", label: "Fruits" },
  { value: "sweets", label: "Fweets" },
];

interface PageProps {
  params: {
    productName: string;
  };
}

export default function Page({ params: { productName } }: PageProps) {
  const router = useRouter();
  const { state, dispatch, reducerActionTypes } = getContext();
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [product, setProduct] = useState<Product>({
    _id: "",
    name: "",
    price: 0,
    quantity: 0,
    category: "",
    imageName: "",
  });
  const [btnLoading, setBtnLoading] = useState(false);
  const [newImage, setnewImage] = useState<Image>({
    file: null,
    preview: "",
  });

  const fetchProduct = async () => {
    const { data } = await axios.get(`/product/${productName}`);
    return data;
  };
  const { isLoading, isError, data } = useQuery(
    ["product", productName],
    fetchProduct,
    {
      onSuccess: (res) => {
        setProduct(res.product);
      },
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({
      ...product,
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

  const saveNow = async (e: React.MouseEvent<HTMLElement>) => {
    setBtnLoading(true);
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("category", product.category);
    formData.append("price", product.price.toString());
    formData.append("quantity", product.quantity.toString());

    if (newImage.file) {
      formData.append("image", newImage.file);
    }
    const { data } = await axios.put(
      `/admin/product/edit-product/${product._id}`,
      formData
    );

    if (data.status === "ok") {
      triggerSidePopUpMessage(false, data.message);
    } else if (data.status === "error") {
      triggerSidePopUpMessage(true, data.message);
    }
    setBtnLoading(false);
  };

  const triggerSidePopUpMessage = (error: boolean, message: string) => {
    dispatch({
      type: reducerActionTypes.TRIGGER_SIDE_POPUP_MESSAGE,
      payload: { error, message },
    });
  };

  if (isLoading || isError) {
    return <Skeleton />;
  }

  return (
    <div className="fixed w-full h-full top-0 left-0 z-[30] flex items-center justify-center bg-black bg-opacity-25">
      <div className="w-[50rem] max-w-95% overflow-auto p-8 rounded-lg flex gap-8  bg-white">
        <div className="w-80 flex-shrink-0">
          <div
            className="h-full border-2 border-gray-300 rounded-lg flex items-center justify-center cursor-pointer relative"
            onClick={() => imageInputRef.current?.click()}
          >
            <BiImageAdd className="text-4xl" />
            <Img
              fill
              alt=""
              objectFit="contain"
              src={
                newImage.preview
                  ? newImage.preview
                  : `${imageUrl}/${product.imageName}`
              }
            />
            <input
              type="file"
              ref={imageInputRef}
              accept="image/*"
              onChange={handleImageInputRefChange}
              className="hidden"
            />
          </div>
        </div>
        <div className=" flex-grow flex flex-col  gap-3">
          <div className="">
            <label className="">Name</label>
            <input
              className="pt-input"
              value={product.name}
              name="name"
              onChange={handleChange}
            />
          </div>
          <div className="">
            <label className="">Category</label>
            <Select options={options} onSelect={(value: string) => {}} />
          </div>
          <div className="">
            <label className="">Price</label>
            <input
              className="pt-input"
              value={product.price}
              name="price"
              type="number"
              onChange={handleChange}
            />
          </div>
          <div className="">
            <label className="">Quantity</label>
            <input
              className="pt-input"
              name="quantity"
              type="number"
              onChange={handleChange}
              value={product.quantity}
            />
          </div>
          <div className=" flex gap-4 justify-end">
            <button
              className="px-4 py-2 rounded-lg bg-red-500 text-white "
              onClick={() => {
                router.push("/products");
              }}
            >
              Cancel
            </button>
            <button
              onClick={saveNow}
              className={`${
                btnLoading ? "opacity-50 cursor-wait" : ""
              } px-4 py-2 rounded-lg bg-primary text-white `}
            >
              <span className="btn-text">Save</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Skeleton() {
  return (
    <div className={css.product_container}>
      <div className={css.body}>
        <div className={css.pt_img}>
          <div className={`${css.img_wrapper} `}>
            <div className="wh-full skeleton"></div>
          </div>
        </div>
        <div className={css.pt_info}>
          <div className={css.pt_group}>
            <label className={css.pt_label}>Name</label>
            <div className={`${css.pt_input} skeleton`}></div>
          </div>
          <div className={css.pt_group}>
            <label>Category</label>
            <div className={`${css.pt_input} skeleton`}></div>
          </div>
          <div className={css.pt_group}>
            <label className={css.pt_label}>Price</label>
            <div className={`${css.pt_input} skeleton`}></div>
          </div>{" "}
          <div className={css.pt_group}>
            <label className={css.pt_label}>Quntitiy</label>
            <div className={`${css.pt_input} skeleton`}></div>
          </div>
          <div className={`${css.pt_bottom}`}>
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
