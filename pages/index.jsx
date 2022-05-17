import { useRouter } from "next/router";
import ItemList from "../components/ItemList";
import { useState, useEffect } from "react";

export default function ItemListPage() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      await fetch(
        `${process.env.BASE_URL || "http://localhost:3000"}/api/item/getAll`
      )
        .then((res) => res.json())
        .then((data) => {
          setItems(data);
        });
    };
    fetchData();
  }, []);

  const deleteItem = async (id) => {
    await fetch(
      `${process.env.BASE_URL || "http://localhost:3000"}/api/item/${id}/delete`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(res);
        } else {
          return res.json();
        }
      })
      .then((data) => {
        setItems(items.filter((item) => item._id !== id));
      })
      .catch((err) => {
        setError(err);
      });
  };

  return (
    <div>
      <ItemList items={items} deleteItem={deleteItem} />
      {error}
    </div>
  );
}
