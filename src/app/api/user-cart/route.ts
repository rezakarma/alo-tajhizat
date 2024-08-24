import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../prisma/client";
import { auth } from "@/auth";
import { cartSchema } from "@/schema";
export async function GET(request: NextRequest) {
  const session = await auth();

  if (!session.user) {
    return NextResponse.json({
      error: "برای داشتن سبد خرید لطفا وارد حساب کاربری خود شود",
    });
  }

  const userId = session.user.id;

  const userCart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      products: {
        include: {
          product: {
            select: {
              id: true,
              title: true,
              description: true,
              rentPrice: true,
              images: true,
            },
          },
        },
      },
    },
  });

  return NextResponse.json(userCart);
}

export async function POST(request: NextRequest, response: NextResponse) {
  console.log('this is rquest of add product to cart:', request)
  const body = await request.json();
  console.log('this is body of add cart: ', body)
  const validation = cartSchema.safeParse(body);
  if (!validation.success) {
    console.log(validation.error.erros);
    return NextResponse.json(validation.error.errors);
  }

  const session = await auth();

  if (!session.user) {
    return NextResponse.json({
      error: "برای داشتن سبد خرید لطفا وارد حساب کاربری خود شود",
    });
  }

  const userId = session.user.id;

  const cartExist = await prisma.cart.findUnique({
    where: { userId: userId },
  });

  const product = await prisma.product.findUnique({
    where: { id: body.productId },
  });

  if (!product) {
    return NextResponse.json({ error: "محصول مورد نظر یافت نشد" });
  }

  

  if (body.actionType === "ADD") {
    if (cartExist) {
      const productInCart = await prisma.productInCart.findFirst({
        where: { cartId: cartExist.id, productId: product.id },
      });
      if (productInCart) {
        const updatedProductInCart = await prisma.productInCart.update({
          where: { id: productInCart.id },
          include: {
            product: {
              select: {
                id: true,
                title: true,
                description: true,
                rentPrice: true,
                images: true,
              },
            },
          },
          data: {
            count: {
              increment: 1,
            },
          },
        });
        return NextResponse.json({
          success: "محصول با موفقیت به سبد خرید اضافه شسد",
          product: updatedProductInCart,
        });
      } else {
        // const updatedCart = await prisma.cart.update({
        //   where: { id: cartExist.id },
        //   data: {
        //     products: {
        //       create: {
        //         productId: body.productId,
        //       },
        //     },
        //   },
        // });
        const newProductInCart = await prisma.productInCart.create({
          data: {
            cartId: cartExist.id,
            productId: body.productId,
          },
          include: {
            product: {
              select: {
                id: true,
                title: true,
                description: true,
                rentPrice: true,
                images: true,
              },
            },
          },
        });
        return NextResponse.json({
          success: "محصول با موفقیت به سبد خرید اضافه شسد",
          product: newProductInCart,
        });
      }
    } else {
      const newCart = await prisma.cart.create({
        data: {
          userId: userId,

          products: {
            create: {
              productId: body.productId,
            },
          },
        },
        include: {
          products: {
            include: {
              product: {
                select: {
                  id: true,
                  title: true,
                  description: true,
                  rentPrice: true,
                  images: true,
                },
              },
            },
          },
        },
      });
      return NextResponse.json({
        success: "محصول با موفقیت به سبد خرید اضافه شسد",
        product: newCart.products[0],
      });
    }
  } else if (body.actionType === "REMOVE") {
    const productInCart = await prisma.productInCart.findFirst({
      where: { cartId: cartExist.id, productId: product.id },
    });
    if (cartExist) {
      if (productInCart) {
        if (productInCart.count > 1) {
          const updatedProductInCart = await prisma.productInCart.update({
            where: { id: productInCart.id },
            data: {
              count: {
                decrement: 1,
              },
            },
            include: {
              product: {
                select: {
                  id: true,
                  title: true,
                  description: true,
                  rentPrice: true,
                  images: true,
                },
              },
            },
          });
          return NextResponse.json({
            success: "محصول با موفقیت از سبد خرید کم شد",
            product: updatedProductInCart,
          });
        } else if (productInCart.count === 1) {
          const deletedProductInCart = await prisma.productInCart.delete({
            where: { id: productInCart.id },
            include: {
              product: {
                select: {
                  id: true,
                  title: true,
                  description: true,
                  rentPrice: true,
                  images: true,
                },
              },
            },
          });
          return NextResponse.json({
            success: "محصول با موفقیت از سبد خرید کم شد",
            product: deletedProductInCart,
          });
        }
      } else {
        return NextResponse.json({
          error: "این محصول در سبد خرید موجود نیست",
        });
      }
    } else {
      return NextResponse.json({
        error: "شما هنوز سبد خرید ایجاد نکردید",
      });
    }
  }
}

// if(cart){
//     if(add){
//         if(product){
//             increace 1
//         } else {
//             create productInCart for cart
//         }
//     } else if(remove) {
//         if(product){
//             if(product.count > 1){
//                 increment product count 1
//             } else if(product.count === 1){
//                 delete productInCart
//             }
//         } else {
//             return error
//         }
//     }
// } else {
//     if(add) {
//         create cart
//         create prodct in cart
//     } else if(remove) {
//         return error
//     }
// }

// //---------------------

// if(add){
//     if(cart) {
//         increace count 1
//     }else {
//         create productInCart
//     }
// }else if(remove) {
//     if(cart) {
//         if(product){
//             if(product.count > 1) {
//                 increace count 1
//             } else if(product.count === 1) {
//                 delete product
//             }
//         }else {
//             return error
//         }
//     }else (
//         return error
//     )
// }
