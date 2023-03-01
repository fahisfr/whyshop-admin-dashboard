import React, { useEffect, useState } from "react";
import { Product } from "@/helper/interface";
import Select from "@/components/Select";
import { AiOutlineSearch } from "react-icons/ai";
import Link from "next/link";

const options = [
  { value: "all", label: "All Category" },
  { value: "vegetables", label: "Vegetables" },
  { value: "fruits", label: "Fruits" },
  { value: "sweets", label: "Sweets" },
];

interface FilterBarProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

export default function ProductsFilterBar({
  products,
  setProducts,
}: FilterBarProps) {
  const [searchText, setSearchText] = useState<string>("");
  const [selecedCategory, setSelecedCategory] = useState<string>("all");
  useEffect(() => {
    let productsFiliterd = products;

    if (selecedCategory !== "all") {
      productsFiliterd = products.filter((product) => {
        return product.category === selecedCategory;
      });
    }
    if (searchText) {
      productsFiliterd = productsFiliterd.filter((product) => {
        return product.name
          .toLocaleLowerCase()
          .includes(searchText.toLocaleLowerCase());
      });
    }

    setProducts(productsFiliterd);
  }, [searchText, selecedCategory, products]);

  return (
    <div className="w-full p-3 flex gap-3 bg-theme-primary  flex-shrink-0  justify-evenly   shadow">
      <div className="w-32">
        <Select
          options={options}
          onSelect={setSelecedCategory}
          defaultOptionIndex={0}
        />
      </div>
      <div className="flex flex-grow  items-center   rounded-lg border border-gray-400 pr-2 ">
        <input
          placeholder="Search..."
          className="w-full h-full pl-2  rounded-lg   bg-transparent  outline-none "
          onChange={(e) => setSearchText(e.target.value)}
        />
        <AiOutlineSearch className="  text-2xl text-gray-500" />
      </div>
      <Link href="/products/addProduct">
        <button className="bg-primary h-10 text-sm  rounded-md cursor-pointer  px-3 text-white  ">
          Add Product
        </button>
      </Link>
    </div>
  );
}

export function Skeleton() {
  return (
    <div className="w-full p-3 flex bg-theme-primary gap-3  flex-shrink-0  justify-evenly  ">
      <div className="w-32 h-full skeleton rounded-ls"></div>
      <div className="flex flex-grow  skeleton rounded-lg  pr-2 "></div>
      <button className="w-24 skeleton h-10   rounded-md "></button>
    </div>
  );
}
