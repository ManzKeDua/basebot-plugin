const fetch = require('node-fetch');
const FormData = require('form-data');
const fileTypeFromBuffer = require('file-type').fileTypeFromBuffer;
/**
* Upload image to telegra.ph
* Supported mimetype:
* - `image/jpeg`
* - `image/jpg`
* - `image/png`
* @param {Buffer} buffer Image Buffer
*/
module.exports = async function(buffer) {
const { ext } = await fileTypeFromBuffer(buffer);
let form = new FormData();
form.append('file', buffer, 'tmp.' + ext);
const response = await fetch("https://cdn.meitang.xyz/upload", {
method: "POST",
body: form,
});
const data = await response.json();
if (!response.ok) {
throw new Error(data.error || 'Failed to upload file');
}
return data.file.url;
};