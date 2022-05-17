import { useRouter } from "next/router";

const WarehouseList = ({ warehouses, deleteWarehouse }) => {
  const router = useRouter();
  return (
    <div className="warehouse-list">
      <button onClick={() => router.push("/")}>Back to Items</button>
      <br />
      LIST OF WAREHOUSES:
      <br />
      <br />
      {warehouses.map((warehouse, i) => (
        <div className="warehouse-list-item" key={warehouse._id}>
          WAREHOUSE #{i + 1}:
          <div className="warehouse-list-item-name">Name: {warehouse.name}</div>
          <div className="warehouse-list-item-location">
            Location: {warehouse.location}
          </div>
          <button
            onClick={() => {
              router.push(`/warehouse/${warehouse._id}`);
            }}
          >
            Edit
          </button>
          <button
            onClick={() => {
              deleteWarehouse(warehouse._id);
            }}
          >
            Delete
          </button>
          <br />
          <br />
        </div>
      ))}
      <button onClick={() => router.push("/warehouse/create")}>
        Create New Warehouse
      </button>
    </div>
  );
};

export default WarehouseList;
