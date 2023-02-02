"use client";
import styles from "./css.module.css";
import { AiFillDelete, AiOutlineSearch, AiOutlineEdit } from "react-icons/ai";
import NavBar from "@/components/navBar/NavBar";
import Image from "next/image";
import { Product as ProductInterface } from "@/helper/interface";
import Product from "@/components/product/Product";
import { useEffect, useState } from "react";
import Select from "@/components/select/Select";
import AddProduct from "@/components/product/AddProduct";
const options = [
  { value: "Vegetable", label: "Vegetable" },
  { value: "fruits", label: "Fruits" },
  { value: "sweets", label: "Fweets" },
];

const BACKEND_URL = process.env.BACKEND_URL;
export default function page() {
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [product, setProduct] = useState<ProductInterface>();
  const [addProduct, setAddProduct] = useState<boolean>(false);
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
      {product && <Product product={product} />}
      {addProduct && <AddProduct />}
      <div className={styles.left}>
        <div className={styles.filter}>
          <div className={styles.select_cotegory}>
            <Select options={options} placeHolder="select Catgory" />
          </div>

          <div className={styles.search}>
            <input placeholder="Search..." />
            <AiOutlineSearch className={styles.icon_search} />
          </div>
          <button
            onClick={() => setAddProduct(true)}
            className={styles.add_product_btn}
          >
            Add Product
          </button>
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
