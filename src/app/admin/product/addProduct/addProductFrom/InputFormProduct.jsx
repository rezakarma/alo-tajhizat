

const InputFormProduct = ({prodTitle, prodDescription,prodModel, register,errors,product,isPending}) => {

  const classOfInput = `border-2 rounded-full w-11/12 h-10 px-6 drop-shadow-lg text-gray-800
  focus:outline-none  focus:ring-1 
  focus:drop-shadow-[0_4px_8px_rgba(0,147,171,0.15)] dark:bg-white`;

  
  const okInputClass = `border-primary focus:border-primary focus:ring-primaryLight ${classOfInput}`;
  const errorInputClass = `${classOfInput} border-red-500 focus:border-red-500 focus:ring-red-500`;
  
  const classOfTextArea = `h-32 shadow-xl resize-none appearance-none border-solid border-2 border-primaryLight rounded-xl dark:bg-gray-300 w-[100%] md:w-[20rem] py-2 px-3 hover:border-primaryLight hover:ring-1 hover:ring-primaryLight hover:ring-offset-1 hover:ring-offset-primaryLight/[.1] text-gray-700 leading-tight focus:outline-none focus:shadow-outline  transition-all duration-300`
  const errorTextAreaClass = `${classOfTextArea} border-red-500 focus:border-red-500 focus:ring-red-500`;



 
  return (
    <div>
      <div className="flex flex-wrap m-5">
        <div className="m-4">
          <label
            htmlFor="productName"
            className="block text-gray-700 text-base font-bold mb-2 dark:text-primaryYellow"
          >
            نام محصول:
          </label>
          <input
          disabled={isPending}
            type="text"
            id="productName"
            className={errors.productName ? errorInputClass : okInputClass}
            placeholder="نام محصول را وارد کنید"
            {...register(prodTitle)} 
            defaultValue={product.prodTitle}
          />
          {errors.title?.message && <p className="text-red-500">{errors.title?.message}</p>}
        </div>


        <div className="m-4">
          <label
            htmlFor="productModel"
            className="block text-gray-700 text-base font-bold mb-2 dark:text-primaryYellow"
          >
            مدل محصول:
          </label>
          <input
          disabled={isPending}
            type="text"
            id="productModel"
            className={errors.productName ? errorInputClass : okInputClass}
            placeholder="مدل محصول را وارد کنید"
            {...register(prodModel)} 
            defaultValue={product.prodModel}
          />
          {errors.model?.message && <p className="text-red-500">{errors.model?.message}</p>}
        </div>
       

        <div className="m-4">
          <label
            htmlFor="message"
            className="block text-gray-700 text-base font-bold mb-2 dark:text-primaryYellow"
          >
            توضیحات:
          </label>
          <textarea
          disabled={isPending}
            id="message"
            className={errors.productMessage ? errorTextAreaClass : classOfTextArea}            
            rows="4"
            placeholder="درباره محصول"
            {...register(prodDescription)}
          >
          </textarea>
             {errors.description?.message && <p className="text-red-500">{errors.description?.message}</p>}
        </div>
      </div>
    </div>
  );
};

export default InputFormProduct;

const useFormProduct = () => {
  return {
    prodTitle: "productName",
    prodDescription: "productMessage",
  };
};
