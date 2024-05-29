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

// src/controller/getCollaboratorName.ts
var getCollaboratorName_exports = {};
__export(getCollaboratorName_exports, {
  getCollaboratorName: () => getCollaboratorName
});
module.exports = __toCommonJS(getCollaboratorName_exports);

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
          resolve({ message: "No Collaborator found" });
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getCollaboratorName
});
