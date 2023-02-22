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
    <div className="fixed inset-0 z-[100] overflow-auto">
      <div className=" p-4  min-h-screen    flex items-center justify-center ">
        <div
          className="fixed  inset-0 backdrop-blur-sm  bg-black/10"
          onClick={() => router.push("/products")}
        ></div>
        <div className="  w-full max-w-[50rem]  flex-shrink-0  relative bg-white  p-8 rounded-lg flex gap-8 -sm:flex-col">
          <div className="w-80  flex-shrink-0   -sm:w-full">
            <div
              className="h-full  border border-gray-400 rounded-lg flex items-center justify-center cursor-pointer relative -sm:w-full -sm:h-[15rem]  "
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
            <div>
              <label className="">Name</label>
              <input
                className="pt-input"
                value={product.name}
                name="name"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="">Category</label>
              <Select options={options} onSelect={(value: string) => {}} />
            </div>
            <div>
              <label className="">Price</label>
              <input
                className="pt-input"
                value={product.price}
                name="price"
                type="number"
                onChange={handleChange}
              />
            </div>
            <div>
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
                onClick={saveNow}
                className={`${
                  btnLoading ? "opacity-50 cursor-wait" : ""
                } px-4 py-2 rounded-lg bg-primary text-white w-full `}
              >
                <span className="btn-text">Save</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Skeleton() {
  const router = useRouter();
  return (
    <div className="fixed inset-0  flex items-center justify-center backdrop-blur-sm bg-black/10  ">
      <div
        className="fixed  inset-0"
        onClick={() => router.push("/products")}
      ></div>
      <div className="max-w-[50rem]   relative bg-white overflow-auto p-8 rounded-lg flex gap-8 -sm:flex-col">
        <div className="w-80  flex-shrink-0 -sm:w-full">
          <div className="h-full  border border-gray-400 skeleton rounded-lg -sm:w-full -sm:h-[15rem]  "></div>
        </div>
        <div className=" flex-grow flex flex-col  gap-3">
          <div>
            <div className=" mb-1 w-[20%] h-7 skeleton"></div>
            <div className="skeleton pt-input"></div>
          </div>
          <div>
            <div className=" mb-1 w-[20%] h-7 skeleton"></div>
            <div className="skeleton pt-input"></div>
          </div>
          <div>
            <div className=" mb-1 w-[20%] h-7 skeleton"></div>
            <div className="skeleton pt-input"></div>
          </div>
          <div>
            <div className=" mb-1 w-[20%] h-7 skeleton"></div>
            <div className="skeleton pt-input"></div>
          </div>
          <div className=" flex gap-4 justify-end">
            <div className=" w-[5.5rem] h-10 skeleton rounded-sm"></div>
            <div className=" w-[5.5rem] h-10 skeleton rounded-sm "></div>
          </div>
        </div>
      </div>
    </div>
  );
}
