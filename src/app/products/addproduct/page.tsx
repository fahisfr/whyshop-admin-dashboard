"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Select from "@/components/Select";
import { BiImageAdd } from "react-icons/bi";
import axios from "../../../helper/axios";
import { Image as Img } from "@/helper/interface";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
const options = [
  { value: "Vegetable", label: "Vegetable" },
  { value: "fruits", label: "Fruits" },
  { value: "sweets", label: "Fweets" },
];

export default function Page() {
  const router = useRouter();

  const imageInputRef = useRef<HTMLInputElement>(null);
  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: 0,
    quantity: 0,
  });
  const [newImage, setnewImage] = useState<Img>({
    file: null,
    preview: "",
  });

  const addProductFn = async () => {
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("category", product.category);
    formData.append("price", product.price.toString());
    formData.append("quantity", product.quantity.toString());

    if (newImage.file) {
      formData.append("image", newImage.file);
    }
    const { data } = await axios.post("/admin/product/add-product", formData);

    return data;
  };

  const addProduct = useMutation({ mutationFn: addProductFn });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({
      ...product,
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

  return (
    <div className="fixed  inset-0 z-50 overflow-auto  ">
      <div className=" flex min-h-full items-center justify-center p-4">
        <div
          className="fixed  inset-0 bg-black/10 backdrop-blur bg-"
          onClick={() => router.push("/products")}
        ></div>
        <div className=" w-full max-w-[50rem] bg-white dark:bg-theme-secondary  relative  p-8 rounded-lg flex gap-5  -sm:flex-col">
          <div className="w-80 flex  rounded-md -sm:w-full">
            <div
              className="w-full h-full flex items-center justify-center  relative  border-dotted border-2  cursor-pointer  border-gray-400 text-gray-500  -sm:h-60"
              onClick={() => {
                imageInputRef.current?.click();
              }}
            >
              {newImage.preview ? (
                <Image fill alt="" objectFit="contain" src={newImage.preview} />
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <BiImageAdd className="text-2xl" />
                  <span>Drag-drop or click here to choose a file</span>
                </div>
              )}
              <input
                type="file"
                ref={imageInputRef}
                onChange={handleImageInputRefOneChange}
                className="hidden"
              />
            </div>
          </div>
          <div className="flex-grow flex flex-col gap-3">
            <div className="flex flex-col">
              <label className="text-base font-medium">Name</label>
              <input
                className="pt-input"
                value={product.name}
                name="name"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-base font-medium">Category</label>
              <Select
                options={options}
                onSelect={(option) => {
                  setProduct({ ...product, category: option.value });
                }}
                placeHolder="Select Category..."
                backgroundColor="bg-theme-secondary"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-base font-medium">Price</label>
              <input
                className="pt-input"
                value={product.price}
                name="price"
                type="number"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-base font-medium">Quantity</label>
              <input
                className="pt-input"
                name="quantity"
                type="number"
                onChange={handleChange}
                value={product.quantity}
              />
            </div>
            <div className={`${addProduct.isLoading && "btn-loading"}`}>
              <button
                onClick={() => addProduct.mutate()}
                className={` btn rounded-md px-4 py-2 w-full h-10 bg-primary text-white font-medium outline-none `}
              >
                <span className="btn-text ">Add</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
