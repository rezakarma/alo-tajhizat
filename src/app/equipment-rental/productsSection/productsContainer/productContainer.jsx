import Product from "./product";

const ProductsContainer = () => {
    return ( 
        <div className="w-[70%] h-full grid grid-cols-4 gap-4 self-start">
            <Product/>
            <Product/>
            <Product/>
            <Product/>
            <Product/>
            <Product/>
            <Product/>
            <Product/>
        </div>
     );
}
 
export default ProductsContainer;