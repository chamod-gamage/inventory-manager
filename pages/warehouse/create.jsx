import { useRouter } from "next/router";
import Warehouse from "../../components/Warehouse";

export default function WarehouseCreatePage() {
  const router = useRouter();
  return (
    <div>
      <button
        onClick={() => {
          router.push("/warehouse");
        }}
      >
        Back
      </button>
      <br />
      Enter Warehouse Details
      <br />
      <Warehouse create />
    </div>
  );
}
