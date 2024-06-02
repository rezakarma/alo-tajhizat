"use client";

import { ColumnDef } from "@tanstack/react-table";
import {Image} from "@nextui-org/react";
import { MoreHorizontal } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import {ScrollShadow} from "@nextui-org/scroll-shadow";
import { Button } from "@/components/ui/button"
import { useDisclosure } from "@nextui-org/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import EditProducts from "../editProduct/editProduct";
import AddProductForm from "../addProduct/addProductFrom/AddProductForm";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Products = {
  id: string;
  title: string;
  status: "ACTIVE" | "INACTIVE";
  images: string;
  model: string;
  category: string;
  brand: string;
  supplyType: string;
  sellPrice: number;
  rentPrice: number;
};

export const columns: ColumnDef<Products>[] = [
  {
    accessorKey: "images",
    header: () => <div className="text-right">عکس</div>,
    cell: ({ row }) => {
      const imagwKey = row.getValue("images");
      const imagelink=  `${process.env.NEXT_PUBLIC_IMAGES_ENDPOINT}/${imagwKey}`   

      return   <Image
      shadow="sm"
      radius="lg"
      alt=""
      className=" h-[80px] w-[80px] object-fill"
      src={imagelink}
    />
    },
  },
  {
    accessorKey: "title",
    header: "اسم",
  },
  {
    accessorKey: "id",
    header: "id",
  },
  {
    accessorKey: "status",
    header: "وضعیت",
  },
  {
    accessorKey: "model",
    header: "مدل",
  },
  {
    accessorKey: "category",
    header: "دسته بندی",
  },
  {
    accessorKey: "brand",
    header: "برند",
  },
  {
    accessorKey: "supplyType",
    header: () => <div className="text-right">نوع عرضه</div>,
    cell: ({ row }) => {
      const supplyType = row.getValue("supplyType");
      let value;
      switch (supplyType) {
        case "SELL":
          return "فروش";
        case "RENT":
          return "اجاره";
        case "SELL_RENT":
          return "خرید و فروش";
      }
      

      return <div className="text-right font-medium">{value}</div>;
    },
  },
  {
    accessorKey: "sellPrice",
    header: "قیمت فروش",
  },
  {
    accessorKey: "rentPrice",
    header: "قیمت اجاره",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const productId = row.original.id
      const handleItemClick = (event) => {
        event.preventDefault();
        // Do something when an item is clicked
      };
      return (
        <Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="z-10 bg-white">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DialogTrigger asChild>
                <DropdownMenuItem>ویرایش محصول</DropdownMenuItem>
              </DialogTrigger>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
        <DialogContent className="w-full max-w-md max-h-[80%] overflow-y-auto md:h-auto md:max-w-xl">
            <DialogHeader>
              <DialogTitle>ویرایش دستگاه</DialogTitle>
            </DialogHeader>
        {/* <ScrollArea className="h-[50%]"> */}
        {/* <ScrollShadow  className="w-full h-[50%]"> */}
            <AddProductForm productId={productId}/>
            {/* </ScrollShadow> */}
          {/* </ScrollArea> */}
          </DialogContent>
              </Dialog>
      )
    },
  },
];
