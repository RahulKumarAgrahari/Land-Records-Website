
import multer from "multer"
import { MongoClient, GridFSBucket } from "mongodb"
import fs from "fs";
import path from "path"
import { Document } from "../models/documents.model.js";

// Multer setup for handling file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


const uploadPdf = async (req, res) => {
    const body = req.body
    console.log(req.file)
    try {
        if (!body.file) return res.status(400).send("No file uploaded.");
        else {
            const doc = await Document.create(body)

            doc.pdf = {
                data: pdfBuffer,
                contentType: "application/pdf"
            }
            doc.save()
            return res.status(404).send("file uploaded.");
        }
    } catch (error) {

    }
}

// app.get("/download/:filename", (req, res) => {
//     const bucket = new GridFSBucket(db, { bucketName: "pdfs" });
//     const downloadStream = bucket.openDownloadStreamByName(req.params.filename);

//     res.set("Content-Disposition", `attachment; filename="${req.params.filename}"`);
//     res.set("Content-Type", "application/pdf");

//     downloadStream.pipe(res).on("error", err => res.status(500).send(err));
// });

// app.listen(3000, () => console.log("Server running on port 3000"));

export { uploadPdf }