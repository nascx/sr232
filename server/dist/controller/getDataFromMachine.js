"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

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

// src/controller/getDataFromMachine.ts
var getDataFromMachine_exports = {};
__export(getDataFromMachine_exports, {
  listenForData: () => listenForData
});
module.exports = __toCommonJS(getDataFromMachine_exports);
var import_serialport = require("serialport");
var import_parser_readline = __toESM(require_dist2());
var path = "COM3";
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
      if (arr.length > 13) {
        res.status(200).json({ left: arr[8], right: arr[12] });
        console.log(arr);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  listenForData
});
