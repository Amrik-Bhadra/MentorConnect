import path from 'path';
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(process.cwd(), 'server', '.env') });

import app from './app';
import { connectToDB } from './config/db';

const port = process.env.PORT || 5000;

// connectToDB().then(() => {
//     app.listen(port, () => { 
//         console.log(`✅ Server listening to port ${port}`) 
//     });
// }).catch(error => {
//     console.error("❌ Failed to connect to database. Server not started.", error);
//     process.exit(1);
// });

console.log(port);

connectToDB();

app.listen(port, () => { 
        console.log(`✅ Server listening to port ${port}`) 
    });
