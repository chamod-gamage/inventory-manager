import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Warehouse = ({ create, id }) => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [edit, setEdit] = useState(!!create);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        await fetch(
          `${
            process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
          }/api/warehouse/${id}`
        )
          .then((res) => res.json())
          .then((data) => {
            setName(data.name || "");
            setLocation(data.location || "");
          });
      }
    };
    fetchData();
  }, []);

  const createWarehouse = async ({ name, location }) => {
    await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
      }/api/warehouse/create`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          location,
        }),
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
        router.push("/warehouse");
      })
      .catch((e) => {
        setError("Error creating warehouse");
      });
  };

  return (
    <div className="warehouse-list">
      Name
      <input
        disabled={!edit}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      Location
      <input
        disabled={!edit}
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <br />
      <button
        onClick={async () => {
          if (edit) {
            await createWarehouse({ name, location });
          }
        }}
      >
        Save
      </button>
      {error && <div>{error}</div>}
    </div>
  );
};

export default Warehouse;
