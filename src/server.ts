import { Server } from "http";
import mongoose from "mongoose";
import app from "./app"; 
import config from "./app/config";


let server: Server;


async function main() {
    try {
        await mongoose.connect(config.database_url as string);
        app.listen(config.port, () => {
            console.log(`Example app listening on port ${config.port}`)
        })
  
    } catch (error) {
        console.log(error);
  
    }
  
  }
  main()


  process.on('unhandledRejection', () => {
    console.log(`😈 unahandledRejection is detected , shutting down ...`);
    if (server) {
      server.close(() => {
        process.exit(1);
      });
    }
    process.exit(1);
  });
  
  process.on('uncaughtException', () => {
    console.log(`😈 uncaughtException is detected , shutting down ...`);
    process.exit(1);
  });
