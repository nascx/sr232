var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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

// src/controller/sendResults.ts
var sendResults_exports = {};
__export(sendResults_exports, {
  sendResultsRouter: () => sendResultsRouter
});
module.exports = __toCommonJS(sendResults_exports);
var import_express = __toESM(require("express"));

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  sendResultsRouter
});
