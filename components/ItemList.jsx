import { useRouter } from "next/router";

const ItemList = ({ items, deleteItem }) => {
  const router = useRouter();

  return (
    <div className="warehouse-list">
      <button onClick={() => router.push("/warehouse/create")}>
        Create New Warehouse
      </button>
      <button onClick={() => router.push(`/item/create`)}>
        Create New Inventory Item
      </button>
      <button onClick={() => router.push(`/warehouse`)}>
        List of Warehouses
      </button>
      <br />
      LIST OF ITEMS:
      <br />
      <br />
      {items.map((item, i) => (
        <div className="item-list-item" key={item._id}>
          ITEM #{i + 1}:
          <div className="item-list-item-name">Name: {item.name}</div>
          <div className="item-list-item-name">Quantity: {item.quantity}</div>
          <div className="item-list-item-location">
            Warehouse: {item.warehouse.name}
          </div>
          <button
            onClick={() => {
              router.push(`/item/${item._id}`);
            }}
          >
            Edit
          </button>
          <button
            onClick={() => {
              deleteItem(item._id);
            }}
          >
            Delete
          </button>
          <br />
        </div>
      ))}
    </div>
  );
};

export default ItemList;
