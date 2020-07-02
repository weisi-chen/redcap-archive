const program = require('commander'); 
const fs = require('fs');
var http = require('http');
var md = require('./exportmetadata');
var dt = require('./exportdata');
var ins = require('./exportPDF');

program 
  .version("0.1.0")
  .description("An application that calls REDCap API to export metadata (JSON), data (CSV), and instruments (PDF)" ) 
  .option("-t,  --token <token>", "API token for this REDCap project") 

program.parse(process.argv); 

const token = program.token; 

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write("REDCap token for this project is: " + token);
  res.write("Metadata of this project is: " + md.exportMetadata(token));
  res.write("Data of this project is: " + dt.exportData(token));
  res.write("PDF instruments for this project are: " + ins.exportPDF(token));
  res.end();
}).listen(8080);
