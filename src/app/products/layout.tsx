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
import Confirmeation from "@/components/Confirmeation";

const BACKEND_URL = process.env.BACKEND_URL;

interface Props {
  children: React.ReactNode;
}
interface DeleteProduct {
  confirm: boolean;
  productInfo: Product;
}

export default function Page({ children }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [deleteProduct, setDeleteProduct] = useState<DeleteProduct>({
    confirm: false,
    productInfo: {
      name: "",
      _id: "",
      price: 0,
      quantity: 0,
      category: "",
      imageName: "",
    },
  });
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
    <>
      <ProductsFilterBar products={data?.products} setProducts={setProducts} />
      <div className="overflow-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Total Quantity</th>
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
                      <div className=" inline-block bg-green-500 text-white px-2 py-1 rounded-[10px]">
                        <span className="  text-sm capitalize ">
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
                          <button className="px-1 py-[6px] border border-green-600 text-green-600 rounded hover:bg-green-600 hover:text-white transition duration-300">
                            <AiOutlineEdit className="text-lg  " />
                          </button>
                        </Link>

                        <button
                          onClick={() => {
                            setDeleteProduct({
                              confirm: true,
                              productInfo: product,
                            });
                          }}
                          className=" p-1  border border-red-600  text-red-600 rounded hover:bg-red-600 hover:text-white transition duration-300"
                        >
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
      {deleteProduct.confirm && (
        <Confirmeation
          onConfirm={() => {
            alert("hello");
          }}
          title={`to delete ${deleteProduct.productInfo.name}`}
          confirmationText={`delete-${deleteProduct.productInfo.name}`}
          onClose={() =>
            setDeleteProduct({
              confirm: false,
              productInfo: {
                name: "",
                _id: "",
                price: 0,
                quantity: 0,
                category: "",
                imageName: "",
              },
            })
          }
        />
      )}
      {children}
    </>
  );
}

export function Skeleton() {
  return (
    <div className="w-full h-full flex flex-col gap-4 overflow-auto">
      <ProductFilterSkeleton />
      <div className="max-h-full  bg-theme-primary rounded-md  overflow-auto shadow">
        <table className="table">
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
