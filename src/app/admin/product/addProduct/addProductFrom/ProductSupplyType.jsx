import React from "react";

const ProductSupplyType = ({
  stateSell,
  stateRent,
  dispatch,
  rentCheckbox,
  sellCheckbox,
  register,
  productPriceRent,
  productPriceSell,
  errors,
  isPending,
}) => {
  const classOfInput = `border-2 rounded-full h-10 px-6 drop-shadow-lg text-gray-800
  focus:outline-none  focus:ring-1 
  focus:drop-shadow-[0_4px_8px_rgba(0,147,171,0.15)] dark:bg-gray-300 `;

  const okInputClass = `border-primary focus:border-primary focus:ring-primaryLight ${classOfInput}`;
  const errorInputClass = `${classOfInput} border-red-500 focus:border-red-500 focus:ring-red-500`;

  return (
    <div className="flex flex-col  md:flex-row ">
      <div className="m-4 ">
        <label
          htmlFor="category"
          className="block text-gray-700 text-base font-bold mb-2 dark:text-primaryYellow"
        >
          دسته بندی:
        </label>
        <div className="flex md:justify-evenly  font-semibold text-lg">
          <input
            disabled={isPending}
            type="checkbox"
            id="sellCheckbox"
            {...register(sellCheckbox)}
            // checked={stateSell}
            class="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-primary transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-5 before:w-5 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-primary before:opacity-0 before:transition-opacity checked:border-primary checked:bg-primary checked:before:bg-primary hover:before:opacity-10 "
            onChange={() => dispatch({ type: "TOGGLE_SELL" })}
          />

          <label className="mr-2" htmlFor="sellCheckbox">فروش</label>
        </div>
        <div className="flex md:justify-around  font-semibold text-lg">
          <input
            disabled={isPending}
            type="checkbox"
            id="rentCheckbox"
            {...register(rentCheckbox)}
            // checked={stateRent}
            class="before:content[''] peer relative h-4 w-4 ml-2 cursor-pointer appearance-none rounded-md border border-primary transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-5 before:w-5 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-primary before:opacity-0 before:transition-opacity checked:border-primary checked:bg-primary checked:before:bg-primary hover:before:opacity-10 "
            onChange={() => dispatch({ type: "TOGGLE_RENT" })}
          />

          <label className="mr-2" htmlFor="rentCheckbox">اجاره</label>
        </div>
      </div>

      {stateSell && (
        <div className="m-4">
          <label
            htmlFor="productPriceSell"
            className="block text-gray-700 text-base font-bold mb-2 dark:text-primaryYellow"
          >
            قیمت (فروش):
          </label>
          <input
          disabled={isPending}
            type="number"
            id="productPriceSell"
            className={errors.productPriceSell ? errorInputClass : okInputClass}
            placeholder="قیمت محصول را وارد کنید"
            {...register(productPriceSell)}
            // onChange={(e) =>
            //   dispatch({
            //     type: "SET_NEW_PRICE_SEll",
            //     payload: e.target.value,
            //   })
            // }
          />
          {errors.productPriceSell?.message && (
            <p className="text-red-500">{errors.productPriceSell?.message}</p>
          )}
        </div>
      )}

      {stateRent && (
        <div className="m-4">
          <label
            htmlFor="productPriceRent"
            className="block text-gray-700 text-base font-bold mb-2 dark:text-primaryYellow"
          >
            قیمت (اجاره):
          </label>
          <input
          disabled={isPending}
            type="number"
            id="productPriceRent"
            className={errors.productPriceRent ? errorInputClass : okInputClass}
            placeholder="قیمت اجاره محصول را وارد کنید"
            {...register(productPriceRent)}
            // onChange={(e) =>
            //   dispatch({
            //     type: "SET_NEW_PRICE_RENT",
            //     payload: e.target.value,
            //   })
            // }
          />
          {errors.productPriceRent?.message && (
            <p className="text-red-500">{errors.productPriceRent?.message}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductSupplyType;
