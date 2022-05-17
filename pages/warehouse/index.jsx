import { useRouter } from "next/router";
import WarehouseList from "../../components/WarehouseList";
import { useState, useEffect } from "react";

export default function WarehouseListPage() {
  const [warehouses, setWarehouses] = useState([]);
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

  return (
    <div>
      <WarehouseList warehouses={warehouses} />
    </div>
  );
}
