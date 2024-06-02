import PrimaryButton from "@/components/button/primaryButton";
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";

const ProductInfosOrderCard = () => {
    return ( 
        <Card className="w-9/12 mx-14 my-5  lg:mx-0 lg:max-w-[350px] lg:w-1/4 h-fit sticky top-10 dark:bg-slate-800">
        <CardHeader className="flex gap-3">
          <Image
            alt="nextui logo"
            radius="lg"
            src="https://cdn.discordapp.com/attachments/1159570679620964383/1191687343304884366/camera.webp?ex=65a65853&is=6593e353&hm=9c632389fadbf0e73835dd78dfbf10d96a919e9e22ddebc243734dc15378e642&"
            
            className=" w-[100px] h-[100px] object-cover"
          />
          <div className="flex flex-col">
            <p className="text-lg font-bold">NextUI</p>
            <p className="">nextui.org</p>
          </div>
        </CardHeader>
        <Divider className="h-[2px] rounded-full w-[96%] m-auto"/>
        <CardBody className="text-right gap-3">
            <span className="text-xl font-bold">ارسال از:</span>
          <p className="text-lg">دفتر مرکزی الو تجهیزات</p>
          <div className="flex text-2xl font-bold gap-3">
            <span className="text-primary">قیمت:</span>
            <span>500000 <span>تومان</span></span>
          </div>
            <PrimaryButton className='font-bold text-lg bg-primary text-white px-5 py-2 mx-3 rounded-full hover:scale-105 hover:bg-primaryDark transition-all' title="افزودن به سبد خرید"/>
        </CardBody>
        <Divider/>
        <CardFooter>
          <Link
            isExternal
            showAnchorIcon
            href="/equipment-rental"
          >
            مشاهده محصولات دیگر
          </Link>
        </CardFooter>
      </Card>
     );
}
 
export default ProductInfosOrderCard;