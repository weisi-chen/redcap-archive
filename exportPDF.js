exports.exportPDF = function (token) {
  const axios = require('axios').default;
  const fs = require('fs');
  const FormData = require('form-data');
  const bodyFormData = new FormData();
  bodyFormData.append('token', token);
  bodyFormData.append('content', 'pdf');
  bodyFormData.append('instrument', '');
  bodyFormData.append('returnFormat', 'json');

  axios.request({
    responseType: 'arraybuffer',
    url: 'https://redcap.research.uts.edu.au/api/',
    method: 'post',
    data: bodyFormData,
    headers: bodyFormData.getHeaders(),
  }).then((result) => {
    const outputFilename = 'instruments.pdf';
    fs.writeFileSync(outputFilename, result.data);
    return outputFilename;
  }).catch(error => {
    console.log(error)
  });
};
