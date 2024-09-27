import SearchBarWithBtn from "@/components/utils/searchBars/searcBarWithBtn";
import ProductHeader from "./productHeader/productHeader";
import Navbar from "@/components/header/navbar/navbar";
import ProductFeaturesSection from "./productHeader/productFeaturesSection";
import ProductInfos from "./productInfos/productInfos";
import ProductSuggestion from "./productSuggestion";
import { Footer } from "@/components/footer/footer";
export const dynamicParams = true;
export async function generateStaticParams() {
  // const result = await fetch(
  //   `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/get-products-id`
  // );
  // if (!result.ok) {
  //   return [];
  // }
  // const response = await result.json();
  // return response;

  return []
}

async function getProduct(params) {
  console.log(params.id, " this is the id");
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products/${params.id}`,
    { cache: "no-store" }
  );
  if (!result.ok) {
    return [];
  }
  console.log(result, " this is result of product fetch");
  console.log(result.headers, "headers");
  console.log(result.status, "status");
  console.log(result.statusText, "status text");
  const response = await result.json();
  return response;
}

const ProductPage = async ({ params }) => {
  const product = await getProduct(params);
  console.log(product, "this is the fetched product");
  return (
    <>
      <div className="h-full w-[100%]">
        <div className="hidden lg:h-[65px] lg:min-h-fit lg:w-[100%] lg:z-10 lg:bg-white dark:bg-darkBg lg:flex lg:justify-center lg:items-center lg:shadow-lg">
          <Navbar />
        </div>
        <SearchBarWithBtn />
        <div>
          <ProductHeader
            description={product.description}
            rentPrice={product.rentPrice}
            brand={product.brand.englishBrand}
            model={product.model}
            images={product.images}
            title={product.title}
            details={product.details}
          />
        </div>
      </div>
      <div className="lg:h-full lg:w-full">
        <ProductInfos
          description={product.description}
          details={product.details}
          img={product.images[0]}
          title={product.title}
          brand={product.brand.englishBrand}
          model={product.model}
          rentPrice={product.rentPrice}
        />
      </div>
      <div className="lg:h-full lg:w-full lg:flex lg:justify-center lg:mt-10">
        <ProductSuggestion categoryId={product.category.id} />
      </div>
      <Footer />
    </>
  );
};

export default ProductPage;
