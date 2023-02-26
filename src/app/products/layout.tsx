"use client";
import { Product } from "@/helper/interface";
import { AiFillDelete, AiOutlineEdit } from "react-icons/ai";
import Image from "next/image";
import { useState } from "react";
import ProductsFilterBar, {
  Skeleton as ProductFilterSkeleton,
} from "@/components/filterBar/ProductsFilterBar";
import axios from "@/helper/axios";
import { useQuery } from "react-query";
import TableBodySkeleton from "@/components/skeleton/TableBody";
import Link from "next/link";

const BACKEND_URL = process.env.BACKEND_URL;

interface Props {
  children: React.ReactNode;
}

export default function Page({ children }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const fetchProducts = async () => {
    const { data } = await axios.get("/product/all-products");
    return data;
  };

  const { isError, isLoading, data } = useQuery(["products"], fetchProducts, {
    onSuccess: (result) => {
      if (result.status === "ok") {
        setProducts(result.products);
      }
    },
  });

  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <div className="w-full h-full flex flex-col gap-4 overflow-auto">
      <ProductsFilterBar products={data?.products} setProducts={setProducts} />
      <div className="max-h-full bg-white rounded-md  overflow-auto">
        <table className="w-full h-full table-auto">
          <thead>
            <tr>
              <th className="text-left text-uppercase font-semibold text-xs border-b-2 border-frost-gray pb-2">
                Image
              </th>
              <th className="text-left text-uppercase font-semibold text-xs border-b-2 border-frost-gray pb-2">
                Name
              </th>
              <th className="text-left text-uppercase font-semibold text-xs border-b-2 border-frost-gray pb-2">
                Category
              </th>
              <th className="text-left text-uppercase font-semibold text-xs border-b-2 border-frost-gray pb-2">
                Price
              </th>
              <th className="text-left text-uppercase font-semibold text-xs border-b-2 border-frost-gray pb-2">
                Total Quantity
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <TableBodySkeleton colCount={6} />
            ) : (
              products.map((product: Product, index: number) => {
                return (
                  <tr key={index} className="border-b border-frost-gray">
                    <td>
                      <div className="relative w-16 h-16 ">
                        <Image
                          fill
                          alt=""
                          objectFit="contain"
                          src={`${BACKEND_URL}/images/${product.imageName}`}
                          className="pt_img"
                        />
                      </div>
                    </td>
                    <td>
                      <span className=" capitalize text-sm font-bold">
                        {product.name}
                      </span>
                    </td>
                    <td>
                      <div className=" inline-block bg-green-500 px-2 py-1 rounded-[10px]">
                        <span className=" text-white text-sm capitalize ">
                          {product.category}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span className="text-sm font-medium price">
                        ₹{product.price}
                      </span>
                    </td>
                    <td>
                      <span className="text-sm font-medium ">
                        {product.quantity}
                      </span>
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <Link href={`/products/${product.name}`}>
                          <button className=" px-1 py-[6px] border border-green-600 text-green-600 rounded hover:bg-green-600 hover:text-white transition duration-300">
                            <AiOutlineEdit className="text-lg  " />
                          </button>
                        </Link>

                        <button className=" p-1  border border-red-600  text-red-600 rounded hover:bg-red-600 hover:text-white transition duration-300">
                          <AiFillDelete className="text-lg  " />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      {children}
    </div>
  );
}

export function Skeleton() {
  return (
    <div className="w-full h-full flex flex-col gap-4 overflow-auto">
      <ProductFilterSkeleton />
      <div className="max-h-full bg-white rounded-md  overflow-auto">
        <table className="w-full h-full table-auto">
          <thead>
            <tr>
              <th className="text-left text-uppercase font-semibold text-xs border-b-2 border-frost-gray pb-2">
                Image
              </th>
              <th className="text-left text-uppercase font-semibold text-xs border-b-2 border-frost-gray pb-2">
                Name
              </th>
              <th className="text-left text-uppercase font-semibold text-xs border-b-2 border-frost-gray pb-2">
                Category
              </th>
              <th className="text-left text-uppercase font-semibold text-xs border-b-2 border-frost-gray pb-2">
                Price
              </th>
              <th className="text-left text-uppercase font-semibold text-xs border-b-2 border-frost-gray pb-2">
                Total Quantity
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <TableBodySkeleton colCount={6} />
          </tbody>
        </table>
      </div>
    </div>
  );
}
