import { useRouter } from "next/router";
import WarehouseList from "../../components/WarehouseList";
import { useState, useEffect } from "react";

export default function WarehouseListPage() {
  const [warehouses, setWarehouses] = useState([]);
  const [error, setError] = useState("");
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      await fetch(
        `${
          process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
        }/api/warehouse/getAll`
      )
        .then((res) => res.json())
        .then((data) => {
          setWarehouses(data);
        });
    };
    fetchData();
  }, []);

  const deleteWarehouse = async (id) => {
    await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
      }/api/warehouse/${id}/delete`
    )
      .then(async (res) => {
        if (!res.ok) {
          console.log(res);
          throw new Error((await res.json()).message);
        } else {
          return res.json();
        }
      })
      .then((data) => {
        setError("");
        setWarehouses(warehouses.filter((warehouse) => warehouse._id !== id));
      })
      .catch((err) => {
        setError("Error with deleting warehouse: " + err);
      });
  };

  return (
    <div>
      <WarehouseList
        warehouses={warehouses}
        deleteWarehouse={deleteWarehouse}
      />
      {error}
    </div>
  );
}
