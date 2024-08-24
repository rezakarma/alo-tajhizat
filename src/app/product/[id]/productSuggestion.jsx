import Product from "@/app/equipment-rental/productsSection/productsContainer/product";

import ProductContainerWithScoroll from "@/components/utils/productContainerWithScoroll";

async function getProducts(categoryId) {
  const result = await fetch(
    `http://localhost:3000/api/products?category=${categoryId}`,
    { cache: "no-store" }
  );
  if (!result.ok) {
    return [];
  }
  const response = await result.json();
  console.log(response, ' i want see this')
  return response;
}

const ProductSuggestion = async ({ categoryId }) => {
  const products = await getProducts(categoryId);
  // const productContainerRef = useRef(null);
  // const [currentScrollPosition , setCurrentScrollPosition] = useState(0);
  // const scrollLeft = () => {
  //     if (productContainerRef.current) {
  //         setCurrentScrollPosition(() => productContainerRef.current.scrollLeft)
  //         console.log(productContainerRef.current.scrollLeft);
  //         console.log(currentScrollPosition);

  //         const newScrollPOsition= currentScrollPosition - 250
  //         console.log(newScrollPOsition)
  //         productContainerRef.current.scrollLeft -= 250// Adjust the scroll amount as needed
  //         setCurrentScrollPosition(productContainerRef.current.scrollLeft)
  //     }
  //   };

  //   const scrollRight = () => {
  //     if (productContainerRef.current) {
  //         productContainerRef.current.scrollLeft += 250; // Adjust the scroll amount as needed
  //     }

  //   };

  return (
    // <div className="w-[95%] h-max my-5  rounded-2xl border-3 border-primary shadow-lg flex flex-col items-center justify-center px-5">
    //     <div className="h-[10%] self-start flex flex-col gap-1.5 pt-2">
    //         <h3 className="font-bold text-xl">محصولات دیگر:</h3>
    //         <div className="border-b-4 w-[70%] rounded-full border-primary"></div>
    //     </div>
    //     <div className="w-full h-[90%] flex justify-between gap-2">

    //     <button onClick={scrollRight}>
    //         <RightArrowSvg/>
    //     </button>
    //     <div ref={productContainerRef} className="flex h-full w-[100%] items-center py-5 gap-5 overflow-x-auto snap-x">
    //     <Product className="snap-center"/>
    //     <Product className="snap-center"/>
    //     <Product className="snap-center"/>
    //     <Product className="snap-center"/>
    //     <Product className="snap-center"/>
    //     <Product className="snap-center"/>
    //     <Product className="snap-center"/>
    //     <Product className="snap-center"/>
    //     <Product className="snap-center"/>

    //     </div>
    //     <button onClick={scrollLeft} className="justify-items-end">
    //         <LeftArrowSvg/>
    //     </button>
    //     </div>
    // </div>
    <ProductContainerWithScoroll title="محصولات مشابه">
      {products.products &&
        products.products.map((item) => (
          <Product
            key={item.id}
            className="snap-center"
            id={item.id}
            img={item.images[0]}
            title={item.title}
            price={item.rentPrice}
          />
        ))}
      {/* <Product className="snap-center"/>
               <Product className="snap-center"/>
               <Product className="snap-center"/>
               <Product className="snap-center"/>
               <Product className="snap-center"/>
               <Product className="snap-center"/>
               <Product className="snap-center"/>
               <Product className="snap-center"/>
               <Product className="snap-center"/>
               <Product className="snap-center"/> */}
    </ProductContainerWithScoroll>
  );
};

export default ProductSuggestion;
