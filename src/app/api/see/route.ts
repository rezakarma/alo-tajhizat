// import { NextApiRequest, NextApiResponse } from 'next';
// import prisma from "../../../prisma/client";
// import { PrismaClient, Prisma } from '@prisma/client';

// type ProductBrandEvent = {
//     type: 'created' | 'updated' | 'deleted';
//     data: Prisma.ProductBrandCreateManyInput | Prisma.ProductBrandUpdateInput | Prisma.ProductBrandWhereUniqueInput;
//   };
  
//   type EventType = 'productBrand';
  
//   const prisma = new PrismaClient();
  
//   export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     res.setHeader('Content-Type', 'text/event-stream');
//     res.setHeader('Cache-Control', 'no-cache');
//     res.setHeader('Connection', 'keep-alive');
  
//     const changeStream = prisma.$connect().then(() => {
//       return prisma.$subscribe(EventType).on('data', (event) => {
//         const allBrands = prisma.productBrand.findMany();
//         allBrands.then((brands) => {
//           res.write(`data: ${JSON.stringify(brands)}\n\n`);
//         });
//       });
//     });
  
//     changeStream.catch((error) => {
//       console.log('Error: ', error);
//     });
  

//   changeStream.catch((error) => {
//     console.log('Error: ', error);
//   });

//   req.socket.on('close', () => {
//     prisma.$disconnect();
//     res.end();
//   });
// }

//------------------------------------------
// import prisma from "../../../prisma/client";
// import { PrismaClient, Prisma } from '@prisma/client';

// import { NextResponse } from "next/server";
// import { NextApiRequest, NextApiResponse } from 'next';

// import { MongoClient } from "mongodb";


// const uri = process.env.DATABASE_URL; // Replace with your MongoDB connection string
// const client = new MongoClient(uri);

// export async function GET(req: NextApiRequest, res: NextApiResponse) {
//   const productBrandStream = client.db("mydb").collection("productBrand").watch();

//   productBrandStream.on("change", (change) => {
//     if (change.operationType === "update" || change.operationType === "insert" || change.operationType === "delete") {
//       res.write(`data: ${JSON.stringify(change.fullDocument)}\n\n`);
//     }
//   });

//   req.on("close", () => {
//     productBrandStream.close();
//   });

//   return new NextResponse(null, {
//     status: 200,
//     headers: {
//       "Content-Type": "text/event-stream",
//       "Cache-Control": "no-cache",
//       Connection: "keep-alive",
//     },
//   });
// }


import { NextRequest, NextResponse } from "next/server";
import { Server as SSEServer } from "ws";


export async function GET() {

  const sseServer = new SSEServer({ noServer: true });
  
  sseServer.on("connection", (ws) => {
    ws.on("message", async (data) => {
      const body = JSON.parse(data.toString()); // Convert the Buffer to a string
      
      switch (body.event) {
        case "add":
          sendEventToSSEClients("new", body.data);
          break;
          case "update":
            sendEventToSSEClients("update", body.data);
            break;
            case "delete":
              sendEventToSSEClients("delete", body.data);
              break;
            }
          });
        });
        
        function sendEventToSSEClients(event: string, data: any) {
          sseServer.clients.forEach((client) => {
            if (client.readyState === client.OPEN) {
              client.send(
                JSON.stringify({
          event: event,
          data: data,
        })
      );
    }
  });
}
}

export const config = {
  matcher: "/api/see/route",
};