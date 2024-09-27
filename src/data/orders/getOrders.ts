import { buildQueryString } from "@/app/utils/buildQueryString";
import { Status, UserRole } from "@prisma/client";
import { useInfiniteQuery } from "@tanstack/react-query";

const GetOrders = (
  type: UserRole,
  status: Status | null,
  username: string | null
) => {
  const fetchOrders = async ({ pageParam }) => {
    const url = type === "USER" ? "/api/order" : "/api/order/admin";
    const params = {
      cursor: pageParam,
      status,
      username,
    };
    const queryString = buildQueryString(params);
    console.log(`${url}?${queryString}`, "  check this");
    const result = await fetch(`${url}?${queryString}`);
    console.log(result, " heree");
    if (!result.ok) {
      throw new Error("در هنگام ارتباط با سرور خطایی رخ داده است");
    }
    const response = await result.json();
    if (response.error) {
      throw new Error(response.error);
    }
    console.log(response, " res here");
    return response;
  };

  const query = useInfiniteQuery({
    queryKey: ["order", status, username],
    queryFn: fetchOrders,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.nextCursor;
    },
  });

  return query;
};

export default GetOrders;
