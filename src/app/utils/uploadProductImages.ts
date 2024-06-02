
import { toast } from "sonner";

const UploadProductImages = async(image, folder,existKey) => {
   
        console.log('run 2')
    
        // const result =await uploadImage(image[0])
        // console.log(result)
        const formData = new FormData();
        formData.append("file", image[0]);
        formData.append("folder", folder);
        if(existKey !== ''){
          formData.append("existKey", existKey);
        }
        try {
          const result = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });
    
          if (result.ok) {
            const response = await result.json();
            if (response.error) {
              console.log(response.error);
              // dispatch({
              //   type: "SET_ERROR",
              //   payload:
              //     "در هنگام بارگذاری عکس ها مشکلی پیش امده است ، لطفا مجدد تلاش کنید",
              // });
              toast.error("در هنگام بارگذاری عکس ها مشکلی پیش امده است ، لطفا مجدد تلاش کنید")
              return response;
            } else if (response.success) {
              console.log(response.success);
              // dispatch({ type: "SET_SUCCESS", payload: "عکس ها بارگذاری شداند" });
              return response;
            }
          } else {
            // dispatch({
            //   type: "SET_ERROR",
            //   payload: "در ارتباط با سرور خطایی رخ داده است لطفا مجدد تلاش کنید",
            // });
            toast.error("در ارتباط با سرور خطایی رخ داده است لطفا مجدد تلاش کنید")
            console.log(result);
            return;
          }
        } catch (error) {
          // dispatch({
          //   type: "SET_ERROR",
          //   payload:
          //     "در بارگذاری عکس ها خطایی رخ داده است لطفا بعدا مجدد تلاس کنید",
          // });
          toast.error("در ارتباط با سرور خطایی رخ داده است لطفا مجدد تلاش کنید")
    
        }
}
 
export default UploadProductImages;