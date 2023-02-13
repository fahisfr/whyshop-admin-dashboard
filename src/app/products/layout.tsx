"use client";
import styles from "./css.module.css";
import { AiFillDelete, AiOutlineEdit } from "react-icons/ai";
import NavBar from "@/components/navBar/NavBar";
import Image from "next/image";
import { Product } from "@/helper/interface";
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
    <div className={styles.products_container}>
      <div className={styles.left}>
        <ProductsFilterBar
          products={data?.products}
          setProducts={setProducts}
        />
        <div className={styles.products_table_wrapper}>
          <table className={styles.table}>
            <thead className={styles.thead}>
              <tr>
                <th>Image</th>
                <th>name</th>
                <th>category</th>
                <th>price</th>
                <th>total quantity</th>
                <th></th>
              </tr>
            </thead>
            <tbody className={styles.tbody}>
              {isLoading ? (
                <TableBodySkeleton colCount={6} />
              ) : (
                products.map((product: Product, index: number) => {
                  return (
                    <tr key={index}>
                      <td>
                        <div className={styles.pt_img_wrapper}>
                          <Image
                            fill
                            alt=""
                            objectFit="contain"
                            src={`${BACKEND_URL}/images/${product.imageName}.jpg`}
                            className={styles.pt_img}
                          />
                        </div>
                      </td>
                      <td>
                        <span className={styles.name}>{product.name}</span>
                      </td>
                      <td>
                        <span className={styles.category}>
                          {product.category}
                        </span>
                      </td>
                      <td>
                        <span className={styles.price}>₹{product.price}</span>
                      </td>
                      <td>
                        <span className={styles.quantity}>
                          {product.quantity}
                        </span>
                      </td>
                      <td>
                        <div className={styles.btn_wrapper}>
                          <Link href={`/products/${product.name}`}>
                            <button className={styles.btn}>
                              <AiOutlineEdit className={styles.icon_edit} />
                            </button>
                          </Link>

                          <button className={styles.btn}>
                            <AiFillDelete className={styles.icon_delete} />
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