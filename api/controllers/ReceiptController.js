import fs from "fs";
import pdf from "pdf-creator-node";
import path from "path";
import options from "../helpers/OrderOptions.js";
import Orders from "../models/OrderModel.js";

export const receiptview = (req, res, next) => {
  res.render("OrderReceipt");
};

export const generatePdf = async (req, res, next) => {
  const html = fs.readFileSync(
    path.join(__dirname, "../components/template.html"),
    "utf-8"
  );
  const filename = Math.random() + "_doc" + ".pdf";
  let array = [];

  await Orders.find({})
    .sort({ cheatedAt: -1 })
    .forEach((d) => {
      const prod = {
        name: d.name,
        description: d.description,
        unit: d.unit,
        quantity: d.quantity,
        price: d.price,
        imgurl: d.imgurl,
      };
      array.push(prod);
    });

  const document = {
    html: html,
    data: {
      products: obj,
    },
    path: "./docs/" + filename,
  };
  pdf
    .create(document, options)
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
  const filepath = "http://localhost:3000/docs/" + filename;

  res.render("download", {
    path: filepath,
  });
};

// module.exports = {
//   receiptview,
//   generatePdf,
// };
