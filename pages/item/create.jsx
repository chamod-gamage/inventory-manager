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
      Enter Item Details
      <Item create />
    </div>
  );
}
