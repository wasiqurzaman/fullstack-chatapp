import fs from "fs";
import fsPromises from "fs/promises";
import path from "path";
import { format } from "date-fns";
import { v4 as uuid } from "uuid";

const __dirname = import.meta.dirname;

async function logEvent(message, fileName) {
  const dateTime = `${format(new Date(), "dd-MM-yyyy\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}`;
  console.log(logItem);

  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    await fsPromises.appendFile(path.join(__dirname, "..", "logs", fileName), logItem);
  } catch (err) {
    console.log(err);
  }
}

export default function requestLogger(req, res, next) {
  console.log("Body:", req.body);
  console.log("Headers", req.headers);
  console.log("-------------------------");
  const log = `method: ${req.method}\tpath: ${req.path}\torigin: ${req.headers.origin}\n`;
  logEvent(log, "requestLogs.txt");
  console.log("-------------------------");
  next();
}