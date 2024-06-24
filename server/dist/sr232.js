var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/@serialport/parser-delimiter/dist/index.js
var require_dist = __commonJS({
  "node_modules/@serialport/parser-delimiter/dist/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.DelimiterParser = void 0;
    var stream_1 = require("stream");
    var DelimiterParser = class extends stream_1.Transform {
      includeDelimiter;
      delimiter;
      buffer;
      constructor({ delimiter, includeDelimiter = false, ...options }) {
        super(options);
        if (delimiter === void 0) {
          throw new TypeError('"delimiter" is not a bufferable object');
        }
        if (delimiter.length === 0) {
          throw new TypeError('"delimiter" has a 0 or undefined length');
        }
        this.includeDelimiter = includeDelimiter;
        this.delimiter = Buffer.from(delimiter);
        this.buffer = Buffer.alloc(0);
      }
      _transform(chunk, encoding, cb) {
        let data = Buffer.concat([this.buffer, chunk]);
        let position;
        while ((position = data.indexOf(this.delimiter)) !== -1) {
          this.push(data.slice(0, position + (this.includeDelimiter ? this.delimiter.length : 0)));
          data = data.slice(position + this.delimiter.length);
        }
        this.buffer = data;
        cb();
      }
      _flush(cb) {
        this.push(this.buffer);
        this.buffer = Buffer.alloc(0);
        cb();
      }
    };
    exports2.DelimiterParser = DelimiterParser;
  }
});

// node_modules/@serialport/parser-readline/dist/index.js
var require_dist2 = __commonJS({
  "node_modules/@serialport/parser-readline/dist/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ReadlineParser = void 0;
    var parser_delimiter_1 = require_dist();
    var ReadlineParser2 = class extends parser_delimiter_1.DelimiterParser {
      constructor(options) {
        const opts = {
          delimiter: Buffer.from("\n", "utf8"),
          encoding: "utf8",
          ...options
        };
        if (typeof opts.delimiter === "string") {
          opts.delimiter = Buffer.from(opts.delimiter, opts.encoding);
        }
        super(opts);
      }
    };
    exports2.ReadlineParser = ReadlineParser2;
  }
});

// src/sr232.ts
var import_express2 = __toESM(require("express"));
var import_dotenv2 = require("dotenv");
var import_cors = __toESM(require("cors"));

// src/config/db.ts
var import_mysql = __toESM(require("mysql"));
var import_dotenv = require("dotenv");
(0, import_dotenv.config)();
var db = import_mysql.default.createConnection({
  host: "10.12.100.14",
  user: "sysweb",
  database: "eletro_check_shoes",
  password: "ZqkNUCy9DnPjGuSG"
});

// src/model/getCollaborator.ts
var searchForCollaboratorByRegistration = async (id) => {
  try {
    return new Promise((resolve, reject) => {
      const q = "SELECT name FROM colab WHERE id = ?";
      db.query(q, [id], (err, data) => {
        if (err) {
          console.log(err);
          reject(err);
        } else if (data && data.length > 0) {
          console.log(data[0].name);
          resolve({ name: data[0].name });
        } else {
          console.log("No collaborator found");
          reject({ message: "No Collaborator found" });
        }
      });
    });
  } catch (error) {
    throw error;
  }
};

// src/controller/getCollaboratorName.ts
var getCollaboratorName = async (req, res) => {
  const { id } = req.query;
  console.log(id);
  try {
    const responseFromDatabase = await searchForCollaboratorByRegistration(id);
    res.status(200).json(responseFromDatabase);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Error retrieving collaborator", details: err });
  }
};

// src/controller/getDataFromMachine.ts
var import_serialport = require("serialport");
var import_parser_readline = __toESM(require_dist2());
var path = "COM4";
var baudRate = 9600;
var port = new import_serialport.SerialPort({ path, baudRate });
var listenForData = async (req, res) => {
  try {
    port.write("on", (err) => {
      if (err) {
        console.error("Error sending command to serial port:", err);
        res.status(500).json({ message: "Error communicating with serial port" });
        return;
      }
      console.log('Command "on" sent successfully');
    });
    const parser = port.pipe(new import_parser_readline.ReadlineParser({ delimiter: "\r\n" }));
    const arr = [];
    for await (const data of parser) {
      arr.push(data);
      if (arr.includes("#RIGHT NG") || arr.includes("#RIGHT OK")) {
        const right = arr.find((r) => {
          if (r === "#RIGHT NG" || r === "#RIGHT OK") {
            return r;
          }
        });
        const left = arr.find((r) => {
          if (r === "#LEFT NG" || r === "#LEFT OK") {
            return r;
          }
        });
        res.status(200).json({ left, right });
        return;
      }
    }
    res.status(200).json({ message: "Received data from serial port (less than 13 items)" });
    port.end(() => {
      console.log("fisished connection");
    });
  } catch (error) {
    console.error("Error during serial port communication:", error);
    res.status(500).json({ message: "Error communicating with serial port" });
  }
};

// src/controller/sendResults.ts
var import_express = __toESM(require("express"));

// src/model/sendResultTestsToDB.ts
var sendResultsTestsToDB = async (id, name, date, result) => {
  try {
    const q = "INSERT INTO results (registration, name, date, result) VALUES (?, ?, ?, ?)";
    const values = [id, name, date, result];
    await db.query(q, values);
    return { message: "Data inserted successfully" };
  } catch (error) {
    console.error("Error inserting data:", error);
    throw error;
  }
};

// src/controller/sendResults.ts
var sendResults = (req, res) => {
  const { registration, name, result } = req.body;
  const date = (/* @__PURE__ */ new Date()).toLocaleDateString("pt-br");
  try {
    const response = sendResultsTestsToDB(registration, name, date, result);
    res.status(200).json(response);
  } catch (error) {
    console.log("Erro ao salvar no banco - Controller");
    res.status(400).json(error);
  }
};
var sendResultsRouter = import_express.default.Router();
sendResultsRouter.post("/", sendResults);

// src/sr232.ts
(0, import_dotenv2.config)();
var server = (0, import_express2.default)();
server.use((0, import_cors.default)());
server.use(import_express2.default.json());
var port2 = 25e3;
server.get("/get-collaborator-name", getCollaboratorName);
server.get("/waiting-test", listenForData);
server.use("/send-results", sendResultsRouter);
server.listen(port2, () => {
  console.log(`Listen in ${port2} port`);
});
