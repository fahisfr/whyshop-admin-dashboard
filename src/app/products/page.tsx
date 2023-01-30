"use client";
import styles from "./css.module.css";
import { AiFillDelete, AiOutlineSearch, AiOutlineEdit } from "react-icons/ai";
import NavBar from "@/components/navBar/NavBar";
import Image from "next/image";
import { Product as ProductInterface } from "@/helper/interface";
import Product from "@/components/product/Product";
import { useEffect, useState } from "react";

const BACKEND_URL = process.env.BACKEND_URL;
export default function page() {
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [product, setProduct] = useState<ProductInterface>();
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
      {product?.name && <Product product={product} />}
      <div className={styles.pt_left}>
        <div className={styles.pt_filter}>
          <div className={styles.select_wrapper}>
            {/* <Select options={options} className={styles.pt_select} /> */}
          </div>
          <div className={styles.pt_search}>
            <input />
            <AiOutlineSearch />
          </div>
        </div>

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
              {products.map((product, index) => {
                return (
                  <tr
                    onClick={() => {
                      setProduct(product);
                    }}
                  >
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
                      <h4 className={styles.name}>{product.name}</h4>
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
                        <button className={styles.btn}>
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
