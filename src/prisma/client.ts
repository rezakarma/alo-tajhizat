// import { PrismaClient } from '@prisma/client'

// const prismaClientSingleton = () => {
//   return new PrismaClient()
// }

// declare global {
//   var prisma: undefined | ReturnType<typeof prismaClientSingleton>
// }

// const prisma = globalThis.prisma ?? prismaClientSingleton()

// export default prisma

// if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma

// import { PrismaClient } from '@prisma/client';

// let prisma: PrismaClient;

// if (process.env.NODE_ENV === 'production') {
//   prisma = new PrismaClient();
// } else {
//   if (!global.prisma) {
//     global.prisma = new PrismaClient();
//   }
//   prisma = global.prisma;
// }

// export default prisma;




// import { PrismaClient } from "@prisma/client";

// declare global {
// 	var prisma: PrismaClient | undefined;
// }

// const prisma = global.prisma || new PrismaClient({ log: ["info"] });
// if (process.env.NODE_ENV !== "production") global.prisma = prisma;

// export default prisma;



// import { PrismaClient } from "@prisma/client";

// declare global {
//   var prisma: PrismaClient | undefined;
// }

// const prisma = globalThis.prisma || new PrismaClient();

// export default prisma


// if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;



import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;