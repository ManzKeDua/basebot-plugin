const fetch = require('node-fetch');
const { FormData, Blob } = require('formdata-node');
const fileTypeFromBuffer = require('file-type').fileTypeFromBuffer;
module.exports = async function (content) {
const { ext, mime } = (await fileTypeFromBuffer(content)) || {};
const blob = new Blob([content.toArrayBuffer()], { type: mime });
const formData = new FormData();
formData.append("file", blob, "upload." + ext);
const response = await fetch("https://file.io", {
method: "POST",
body: formData,
});
const data = await response.json();
return data.link;
}