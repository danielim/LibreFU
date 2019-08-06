// Define dependencies.

var express = require("express");
var multer = require("multer");
var uploadir = "./uploads/";
var app = express();
var port = 3000;

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        "use strict";
        cb(null, uploadir);
    },
    filename: function(req, file, cb) {
        "use strict";
        var filenamearray = file.originalname.split(".");
        if(filenamearray[1]) {
            var fileext = filenamearray.pop();
            cb(null, filenamearray.join() + "-" + Date.now() + "." + fileext);
        } else {
            cb(null, filenamearray.join() + "-" + Date.now());
        }
    }
});

var upload = multer({ storage: storage}).single("filearchive");

// Handling routes.

app.get("/", function(req, res){
    "use strict";
    res.sendFile(__dirname + "/index.html");
});

app.post("/api/single", function(req, res){
    "use strict";
    upload(req, res, function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        console.log(req.file.filename);
        var fileUrl = uploadir + req.file.filename;
        res.send("<a href='" + fileUrl + "'>File uploaded successfully.</a>");
    });
});

// Run the File Upload Server.

app.listen(port, function(){
    "use strict";
    console.log("Working on port " + port);
});
