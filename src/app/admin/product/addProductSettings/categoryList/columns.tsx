"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import EditBrand from "../editBrand/editBrand";
import EditCategory from "../editCategory/editCategory";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Category = {
  id: string;
  persianName: string;
  englishName: string;
};

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "id",
    // header: "id",
    header: () => <div className="text-right">id</div>,
  },
  {
    accessorKey: "persianName",
    header: ({ column }) => {
      return (
        <div className="text-right">
          <Button
            variant="ghost"
            className="text-right"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            اسم فارسی
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "englishName",
    header: ({ column }) => {
      return (
        <div className="text-right">
          <Button
            variant="ghost"
            className="text-right"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            اسم اینگلیسی
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const categoryId = row.original.id;
      const deleteCategory = async () => {
        const result = await fetch("/api/productCategory", {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ categoryId: categoryId }),
        });
        if (!result.ok) {
          toast.error(
            "در ارتباط با سرور خطایی رخ داده ، لطفا بعدا مجددا امتحان کنید"
          );
        }
        const response = await result.json();
        if (response.success) {
          toast.success(response.success);
          return;
        } else if (response.error) {
          toast.error(response.error);
          return;
        }
      };

      return (
        <Dialog>
          <AlertDialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="z-10 flex flex-col bg-white"
              >
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                
                <AlertDialogTrigger>
                  <DropdownMenuItem>حذف دسته بندی</DropdownMenuItem>
                </AlertDialogTrigger>
                <DialogTrigger>
                  <DropdownMenuItem>ویرایش دسته بندی</DropdownMenuItem>
                </DialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  آیا شما از حذف برند {row.original.englishCategory} مطعن هستید؟
                </AlertDialogTitle>
                <AlertDialogDescription className="text-right">
                  این کار باعث میشود تمام محصولاتی که از این دسته بندی استفاده میکنند
                  نیاز به بروزرسانی داشته باشند
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>انصراف</AlertDialogCancel>
                <AlertDialogAction onClick={deleteCategory}>
                  حذف دسته بندی
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-right mr-8">
                برورسانی دسته بندی
              </DialogTitle>
              <DialogDescription className="text-right mr-8">
                شما میتوانید اطلاعات فعلی دسته بندی را تغییر تغییر دهید.
              </DialogDescription>
            </DialogHeader>
            <EditCategory category={row.original} />
          </DialogContent>
        </Dialog>
      );
    },
  },
];
