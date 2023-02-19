"use client";
import { Product } from "@/helper/interface";
import { AiFillDelete, AiOutlineEdit } from "react-icons/ai";
import Image from "next/image";
import { useState } from "react";
import ProductsFilterBar from "@/components/filterBar/ProductsFilterBar";
import axios from "@/helper/axios";
import { useQuery } from "react-query";
import TableBodySkeleton from "@/components/skeleton/TableBody";
import Link from "next/link";

const BACKEND_URL = process.env.BACKEND_URL;
export default function Page({ children }: { children: React.ReactNode }) {
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

  return (
    <div className="flex h-full">
      <div className="flex-grow bg-secondary flex flex-col gap-4">
        <ProductsFilterBar
          products={data?.products}
          setProducts={setProducts}
        />
        <div className="max-h-full bg-white rounded-md overflow-auto">
          <table className="w-full table table-auto">
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
                <th className=""></th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <TableBodySkeleton colCount={6} />
              ) : (
                products.map((product: Product, index: number) => {
                  return (
                    <tr
                      key={index}
                      className="border-b border-frost-gray hover:bg-gray-100"
                    >
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
                        <span className="text-sm font-medium ">
                          {product.name}
                        </span>
                      </td>
                      <td>
                        <span className="text-xs bg-green-500 text-white font-medium px-2 py-1 rounded">
                          {product.category}
                        </span>
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
                        <div className="flex">
                          <Link href={`/products/${product.name}`}>
                            <button className="mr-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300">
                              <AiOutlineEdit className="text-lg icon_edit" />
                            </button>
                          </Link>

                          <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300">
                            <AiFillDelete className="text-lg icon_delete" />
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
      </div>
      {children}
    </div>
  );
}
