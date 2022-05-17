import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Item = ({ create, id }) => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [warehouseId, setWarehouseId] = useState(null);
  const [warehouses, setWarehouses] = useState([]);
  const [edit, setEdit] = useState(!!create);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      await fetch(
        `${
          process.env.BASE_URL || "http://localhost:3000"
        }/api/warehouse/getAll`
      )
        .then((res) => res.json())
        .then((data) => {
          setWarehouses(data);
          if (!id) setWarehouseId(data[0]._id || null);
        });
      if (id) {
        await fetch(
          `${
            process.env.BASE_URL || "http://localhost:3000"
          }/api/item/${id}/get`
        )
          .then((res) => res.json())
          .then((data) => {
            setName(data.name || "");
            setQuantity(data.quantity || "");
            setWarehouseId(data.warehouse._id || null);
          });
      }
    };
    fetchData();
  }, []);

  const putItem = async (body) => {
    const { name, quantity, warehouseId, id } = body;
    await fetch(
      `${process.env.BASE_URL || "http://localhost:3000"}/api/${
        id ? `item/${id}/update` : `warehouse/item/${warehouseId}/create`
      }`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(res);
        } else {
          return res.json();
        }
      })
      .then((data) => {
        setEdit(false);
        router.push("/");
      })
      .catch((e) => {
        setError("Error creating item: " + JSON.stringify(e));
      });
  };

  return (
    <div className="item-list">
      Name
      <input
        disabled={!edit}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      Quantity
      <input
        disabled={!edit}
        type={"number"}
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <br />
      {/* {JSON.stringify(warehouses)} */}
      Warehouse
      <select
        value={warehouseId}
        onChange={(e) => setWarehouseId(e.target.value)}
        placeholder="Select a warehouse"
      >
        {warehouses.map((warehouse) => (
          <option key={warehouse._id} value={warehouse._id}>
            {warehouse.name}
          </option>
        ))}
      </select>
      <br />
      <button
        onClick={async () => {
          if (edit && name.length && quantity > 0 && warehouseId) {
            putItem({ name, quantity, warehouseId, id });
          }
        }}
      >
        Save
      </button>
      <br />
      {error && <div>{error}</div>}
    </div>
  );
};

export default Item;
