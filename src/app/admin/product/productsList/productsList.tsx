import { useEffect, useState } from "react";
import { Products, columns } from "./columns";
import { DataTable } from "../../../../components/ui/data-table";

async function getData(): Promise<Products[]> {
  // Fetch data from your API here.
  const result = await fetch("/api/products");
  if (!result.ok) {
    return [];
  }
  const response = await result.json();
  console.log("response2 ", response);
  const data = response.map((item) => ({
    id: item.id,
    title: item.title,
    status: item.status,
    images: item.images[0],
    model: item.model,
    category: item.categoryName,
    brand: item.brandName,
    supplyType: item.supplyType,
    sellPrice: item.sellPrice,
    rentPrice: item.rentPrice,
  }));

  return data;
}

export default async function ProductsList() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data =await getData();
      setData(data);
    };
    fetchData()
  }, []);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
