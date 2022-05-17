import { useRouter } from "next/router";
import Item from "../../components/Item";

export default function WarehouseCreatePage() {
  const router = useRouter();
  return (
    <div>
      <button
        onClick={() => {
          router.push("/");
        }}
      >
        Back
      </button>
      <br />
      Update Item Details
      <Item create id={router.query.id} />
    </div>
  );
}
