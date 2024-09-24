import 'dotenv/config'
import express from "express";
import connectToDb from "./services/DB/dbService.js";
import router from "./routes/router.js";
import cors from "./middlewares/cors.js";
import { handleError } from "./utils/handleErrors.js";
import chalk from "chalk";
import logRequests from "./services/morgan/loggerService.js";
import currentTime from "./utils/timeFormats.js";

const PORT = 8181;

const app = express();
app.use(cors);
app.use(express.json());
app.use(logRequests());
app.use(express.static('./public'));

app.get('/', (req, res) => {
  const myPassword = '123456';
  res.send(process.env.MY_PASSWORD);
})

// custom middleware
// app.use((req, res, next) => {
//   console.log('New Request has been Received');
//   console.log(
//     currentTime()
//   );
//   next();
// });

app.use(router);

// global error middleware
app.use((err, req, res, next) => {
  return handleError(res, 500, 'Internal Server Error');
})

app.listen(PORT, async () => {
  console.log(chalk.yellow('Server is listening to port ' + PORT));
  await connectToDb();
})