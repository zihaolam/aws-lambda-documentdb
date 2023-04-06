const fs = require("fs");

const readSslCert = () => new Promise((resolve, reject) => {
    fs.readFile(__dirname +'/rds-combined-ca-bundle.pem', function (err, data) {
        if (err) return reject(err);
        resolve(data.toString())
    });
})

module.exports = readSslCert