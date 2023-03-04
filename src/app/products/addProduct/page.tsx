"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Select from "@/components/Select";
import { BiImageAdd } from "react-icons/bi";
import axios from "axios";
import { Image as Img } from "@/helper/interface";
import Link from "next/link";
import { useRouter } from "next/navigation";
const options = [
  { value: "Vegetable", label: "Vegetable" },
  { value: "fruits", label: "Fruits" },
  { value: "sweets", label: "Fweets" },
];

export default function Page() {
  const router = useRouter();
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

  const addProduct = async (e) => {
    e.preventDefault();
    setLoading(!btnLoading);
    return false;
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
    e.preventDefault();
  };

  return (
    <div className="fixed  inset-0 z-50 overflow-auto  ">
      <div className=" flex min-h-full items-center justify-center p-4">
        <div
          className="fixed  inset-0 bg-black/10 backdrop-blur bg-"
          onClick={() => router.push("/products")}
        ></div>
        <div className=" w-full max-w-[50rem] bg-white dark:bg-theme-secondary  relative  p-8 rounded-lg flex gap-5  -sm:flex-col">
          <div
            onDrop={handleOnDrop}
            onDragOver={(e) => {
              console.log("file on top");
            }}
            className="w-80 flex  rounded-md -sm:w-full"
          >
            <div
              className="w-full h-full border-dotted border-2  cursor-pointer flex items-center justify-center  border-gray-400 text-gray-500  -sm:h-60"
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
                value={newProductInfo.name}
                name="name"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-base font-medium">Category</label>
              <Select
                options={options}
                onSelect={(value: string) => {}}
                placeHolder="Select Category..."
                backgroundColor="bg-theme-secondary"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-base font-medium">Price</label>
              <input
                className="pt-input"
                value={newProductInfo.price}
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
                value={newProductInfo.quantity}
              />
            </div>
            <div className={`${btnLoading && "btn-loading"}`}>
              <button
                onClick={addProduct}
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
