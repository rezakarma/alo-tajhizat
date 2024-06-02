const ProductInfosTable = (props) => {
    return ( 
        <div className="flex flex-col gap-5">
                    {props.infos.map((item,index) => (
                    <div className="flex gap-5" key={index}>
                      <div className="w-1/5 bg-gray-200 rounded-lg flex justify-center text-center items-center font-bold text-lg">
                        <span className="">{item.title}</span>
                      </div>
                      <div className="w-4/5 bg-gray-100 px-3 rounded-lg flex items-center">
                        <span>{item.value}</span>
                      </div>
                    </div>
                    ))}
                  </div>
     );
}
 
export default ProductInfosTable;