import ProductsOrder from "./productOrdering";
// import ProductsFiltering from "./productsFiltering";
import { Pagination } from "@nextui-org/react";
import dynamic from "next/dynamic";
import ProductsContainer from "./productsContainer/productContainer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";
import { filteringAction } from "@/store/filtering-slice";
import { productsActions } from "@/store/products-slice";
import { toast } from "sonner";

const ProductsFiltering = dynamic(
  () => import("./filteringSection/productsFiltering"),
  { ssr: false }
);

const ProductsMain = () => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [products, setProducts] = useState({ products: null, count: 0 });

  // useEffect(() => {
  //   const page = searchParams.get("page");
  //   if (page) {
  //     pageChangeHandler(parseInt(page));
  //   }
  // }, []);

  const queryParams = useSelector((state) => state.filtering.queryParams);

  const readQuery = useSelector((state) => state.filtering.readQuery);
  useEffect(() => {
    if (readQuery) {
    }
    const page = searchParams.get("page");
    if (page) {
      setCurrentPage(parseInt(page));
    }
  }, [readQuery]);

  useEffect(() => {
    const queryParams = searchParams.toString();
    const getProducts = async (queryParams) => {
      const result = await fetch(`/api/products?${queryParams}`);
      if (!result.ok) {
        toast.error("در ارتباط با سرور خطایی رخ داده است");
        return;
      }
      const response = await result.json();
      setProducts(response);
      dispatch(productsActions.setProducts(response.products));
      setTotalPage(Math.ceil(response.count / 2));
    };
    getProducts(queryParams);
  }, [searchParams]);

  const pageChangeHandler = (page) => {
    if (!isNaN(page) && page <= totalPage) {
      console.log(page, " page run");
      dispatch(
        filteringAction.updateQueryParams({
          key: "page",
          value: page.toString(),
        })
      );
      setCurrentPage(page);
    }
  };

  return (
    <div className="w-9/12 mx-auto xl:w-[100%] flex flex-col justify-center items-center">
      <ProductsOrder productsCount={products.count} />
      <div className="xl:w-[100%] flex justify-evenly items-start">
        <div className="flex flex-col justify-between items-center gap-10">
          <ProductsContainer products={products.products} />
          {products.products?.length > 0 && (
            <Pagination
              showControls
              color="primary"
              total={totalPage}
              size="lg"
              initialPage={currentPage}
              page={currentPage}
              classNames={{
                wrapper: "ltr-element",
              }}
              onChange={pageChangeHandler}
            />
          )}
          {/* <Pagination
        total={10}
        size="lg"
        color="primary"
        page={currentPage}
        onChange={pageChangeHandler}

      /> */}
        </div>
        <ProductsFiltering />
      </div>
    </div>
  );
};

export default ProductsMain;
