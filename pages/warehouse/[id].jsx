import { useRouter } from "next/router";
import Warehouse from "../../components/Warehouse";

export default function WarehousePage() {
  const router = useRouter();
  return (
    <div>
      {JSON.stringify(router.query)}
      <Warehouse create id={router.query.id} />
    </div>
  );
}
