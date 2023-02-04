import styles from "./css.module.css";
import React, { useEffect, useState } from "react";
import { Product } from "@/helper/interface";
import Select from "@/components/select/Select";
import { AiOutlineSearch } from "react-icons/ai";

const options = [
  { value: "all", label: "all" },
  { value: "vegetables", label: "vegetables" },
  { value: "fruits", label: "fruits" },
  { value: "sweets", label: "fweets" },
];

interface FilterBarProps {
  products: Product[];
  setFilteredProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

export default function ProductsFilterBar({
  products,
  setFilteredProducts,
}: FilterBarProps) {
  const [searchText, setSearchText] = useState<string>("");
  const [selecedCategory, setSelecedCategory] = useState<string>("all");
  useEffect(() => {
    let newProducts = products;

    if (selecedCategory !== "all") {
      newProducts = products.filter((product) => {
        return product.category === selecedCategory;
      });
    }
    if (searchText) {
      newProducts = newProducts.filter((product) => {
        return product.name
          .toLocaleLowerCase()
          .includes(searchText.toLocaleLowerCase());
      });
    }
    setFilteredProducts(newProducts);
  }, [searchText, selecedCategory, products]);

  return (
    <div className={styles.filter}>
      <div className={styles.select_wrapper}>
        <Select options={options} onSelect={setSelecedCategory} />
      </div>
      <div className={styles.search}>
        <input
          placeholder="Search..."
          onChange={(e) => setSearchText(e.target.value)}
        />
        <AiOutlineSearch className={styles.icon_search} />
      </div>
      <button className={styles.add_product_btn}>Add Product</button>
    </div>
  );
}
