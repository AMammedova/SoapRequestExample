
function soapRequest(){
    let pincode=document.getElementById("pinCode");
    let complaintNumber=document.getElementById("complaintNumber")
    var div=document.createElement("div");
    var textdiv=document.createElement("div");
    var datediv=document.createElement("div");
    var filediv=document.createElement("div");
    filediv.id="responFile"
    datediv.id="responDate"
    textdiv.id="responText";
    div.id="response"
    var url = "https://insure.a-group.az/InsureAzSvc/GeneralComplaintSvc.asmx";
    var xhr = new XMLHttpRequest();
xhr.open("POST", url);

xhr.setRequestHeader("Content-Type", "text/xml");

xhr.onreadystatechange = function () {
if (xhr.readyState === 4 ) {
console.log(xhr.status);
console.log(xhr.responseXML);
var xmlResponse =xhr.responseXML.documentElement;
console.log(xmlResponse)

 var fullNodeList = xmlResponse.getElementsByTagName("GetComplaintStatusResult");
console.log(fullNodeList)

for (var i=0; i < fullNodeList.length; i++)
{
    var eachnode = new Option();
  eachnode= fullNodeList[i].childNodes[0].nodeValue;
  var xmlDoc = $.parseXML(eachnode),
      $xml = $(xmlDoc);

      console.log($xml)
  var textList=xmlDoc.getElementsByTagName("Text");
  var dateList=xmlDoc.getElementsByTagName("Date");
  var fileList=xmlDoc.getElementsByTagName("File");
  
  for(let i=0;i<textList.length;i++){
    console.log(textList.item(i).innerHTML)
   var firstText=textList.item(i).innerHTML;
   var prop=`
   <h4>${firstText}</h4>
`
textdiv.innerHTML+=prop;
 div.appendChild(textdiv);
  }
  for(let i=0;i<dateList.length;i++){
    var dateText=dateList.item(i).innerHTML;
    var dateProp=`
    <h4>${dateText}</h4>
    `
    datediv.innerHTML+=dateProp;
    div.appendChild(datediv);
  }
  for(let i=0;i<fileList.length;i++){
    var fileText=fileList.item(i).innerHTML;
    var fileProp=`
    <a href="${fileText}">File</a>
    `
    filediv.innerHTML+=fileProp;
  
    
  }
  document.body.appendChild(div);
  document.body.appendChild(filediv);
  
}

}};

var data = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-
instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
<soap:Body>
<GetComplaintStatus xmlns="http://tempuri.org/">
<pinCode>${pincode.value}</pinCode>
<complaintNumber>${complaintNumber.value}</complaintNumber>
<userName>AQWeb</userName>
<password>@QWeb</password>
</GetComplaintStatus>
</soap:Body>
</soap:Envelope>
`;

xhr.send(data);
}