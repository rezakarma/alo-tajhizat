import ProductsOrder from "./productOrdering";
// import ProductsFiltering from "./productsFiltering";

import dynamic from 'next/dynamic'
import ProductsContainer from "./productsContainer/productContainer";
 
const ProductsFiltering = dynamic(() => import('./filteringSection/productsFiltering'), { ssr: false })

const ProductsMain = () => {
    return ( 
        <div className="w-9/12 mx-auto xl:w-[100%] flex flex-col justify-center items-center">
            <ProductsOrder/>
            <div className="xl:w-[100%] flex justify-evenly items-center">
            <ProductsContainer/>
            <ProductsFiltering/>
            </div>
        </div>
     );
}
 
export default ProductsMain;