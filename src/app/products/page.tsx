"use client";
import styles from "./css.module.css";
import { AiFillDelete, AiOutlineEdit } from "react-icons/ai";
import NavBar from "@/components/navBar/NavBar";
import Image from "next/image";
import { Product as ProductInterface } from "@/helper/interface";
import { useEffect, useState } from "react";
import ProductsFilterBar from "@/components/filterBar/ProductsFilterBar";

const BACKEND_URL = process.env.BACKEND_URL;
export default function Page() {
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductInterface[]>(
    []
  );

  useEffect(() => {
    async function fetchData() {
      const res = await (
        await fetch(`${BACKEND_URL}/api/product/all-products`)
      ).json();

      setProducts(await res.products);
    }
    fetchData();
  }, []);

  return (
    <div className={styles.products_container}>
      <NavBar />
      <div className={styles.left}>
        <ProductsFilterBar
          products={products}
          setFilteredProducts={setFilteredProducts}
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
              {filteredProducts.map((product, setFilteredProductsex) => {
                return (
                  <tr>
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
                        <button
                          className={styles.btn}
                          onClick={() => {
                            setProduct(product);
                          }}
                        >
                          <AiOutlineEdit className={styles.icon_edit} />
                        </button>
                        <button className={styles.btn}>
                          <AiFillDelete className={styles.icon_delete} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
