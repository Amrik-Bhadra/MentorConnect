import express, { Request, Response } from 'express';
const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";

// routes import
import authRoute from "./routes/auth.route";
import profileRoute from "./routes/profile.route";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH'],
    credentials: true
}));
app.use(cookieParser());

// route middlewares
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/profile', profileRoute);


app.get('/', (req: Request, res: Response) => {
    res.send('Hello World');
});

export default app;