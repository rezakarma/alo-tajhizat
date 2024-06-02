const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  products: [{
      brand: "sony",
      model: "alpha 7 R3",
      persianTitle:'دوربین بدون ایینه مدل سونی الفا 7 ار 3',
      category: "camera",
      images: ["https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1670426607/Croma%20Assets/Imaging/Camera%20and%20Camcorders/Images/211200_3_f1q3br.png", "2", "3"],
    },
    {
      brand: "nikon",
      model: "d5600",
      persianTitle:'دوربین اینه ای نیکون سری d5600',
      category: "camera",
      images: ["https://www.nikon.nl/globalassets/digizuite/102646-en-d5600_afp_18_55_vr_frt34l.png/",],
    },
    {
      brand: "sigma",
      model: "24-70mm f/2.8",
      persianTitle:'لنز سیگما 24-70 میلی متری و f2.8 DG OS HSM Art Lens',
      category: "camera",
      images: ["https://www.ormsdirect.co.za/cdn/shop/products/sigma-24-70mm-f2-8-dg-os-hsm-art-lens-canon-ef-front.webp?v=1678047653&width=800", "2", "3"],
    }
  ]
  
}


const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getAllProducts(state) {
      return state;
    },
    getOneCategory(state, action) {},
  },
});

export const productsActions = productsSlice.actions;

export default productsSlice;
