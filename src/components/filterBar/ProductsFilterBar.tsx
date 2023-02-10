import styles from "./css.module.css";
import React, { useEffect, useState } from "react";
import { Product } from "@/helper/interface";
import Select from "@/components/select/Select";
import { AiOutlineSearch } from "react-icons/ai";
import Link from "next/link";

const options = [
  { value: "all", label: "all" },
  { value: "vegetables", label: "vegetables" },
  { value: "fruits", label: "fruits" },
  { value: "sweets", label: "fweets" },
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
    <div className={styles.filter}>
      <div className={styles.select_wrapper}>
        <Select
          options={options}
          onSelect={setSelecedCategory}
          defaultOptionIndex={1}
        />
      </div>
      <div className={styles.search}>
        <input
          placeholder="Search..."
          onChange={(e) => setSearchText(e.target.value)}
        />
        <AiOutlineSearch className={styles.icon_search} />
      </div>
      <Link href="/products/addProduct">
        <button className={styles.add_product_btn}>Add Product</button>
      </Link>
    </div>
  );
}
