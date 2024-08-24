export enum typeOfRequest {
  single,
  multiple,
}
const GetCategoryTypes = async (
  id: string | string[] | [],
  type: typeOfRequest
) => {
  if (type === typeOfRequest.single) {
    const result = await fetch(`/api/get-category-types/${id}`);
    if (!result.ok) {
      return null;
    }
    const response = await result.json();
    return response;
  } else if (type === typeOfRequest.multiple) {
    const result = await fetch("/api/get-category-types", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({categoryIds: id}),
    });
    if (!result.ok) {
        return [];
      }
      const response = await result.json();
      return response;
  }
};

export default GetCategoryTypes;
