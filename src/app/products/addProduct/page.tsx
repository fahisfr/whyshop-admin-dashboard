"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Select from "@/components/Select";
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
    <div className="fixed w-full h-full left-0 top-0 z-32 flex items-center bg-gray-400 bg-opacity-50 justify-center backdrop-blur">
      <div className="w-[50rem] max-h-90% overflow-auto p-8 rounded-lg flex gap-5 bg-white">
        <div className="w-80 flex">
          <div
            onDrop={handleOnDrop}
            className="w-full h-full relative cursor-pointer flex items-center justify-center border border-gray-400 text-gray-500"
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
        <form className="flex-grow flex flex-col gap-3">
          <div className="flex flex-col">
            <label className="text-base font-medium">Name</label>
            <input
              className="rounded-md border border-gray-400 h-10 px-3 text-base outline-none"
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
            />
          </div>
          <div className="flex flex-col">
            <label className="text-base font-medium">Price</label>
            <input
              className="rounded-md border border-gray-400 h-10 px-3 text-base outline-none"
              value={newProductInfo.price}
              name="price"
              type="number"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-base font-medium">Quantity</label>
            <input
              className="rounded-md border border-gray-400 h-10 px-3 text-base outline-none"
              name="quantity"
              type="number"
              onChange={handleChange}
              value={newProductInfo.quantity}
            />
          </div>
          <div className="flex items-center justify-end gap-3 pt-2">
            <Link href="/products">
              <button className="rounded-md px-4 py-2 bg-red-500 text-white font-medium outline-none hover:bg-red-600 transition-colors duration-200">
                Cancel
              </button>
            </Link>

            <button
              className={`rounded-md px-4 py-2  bg-primary text-white font-medium outline-none   ${
                btnLoading && "opacity-50 pointer-events-none"
              }`}
            >
              <span className="btn-text ">Add</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
