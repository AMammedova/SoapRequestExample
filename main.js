
function soapRequest(){
    let pincode=document.getElementById("pinCode");
    let complaintNumber=document.getElementById("complaintNumber")
    let resTex=document.querySelector(".resText")
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
      $value= $xml.find("Text");
      console.log($value)
      var text=$value;
      console.log(text.text())
      resTex.innerHTML=text.text()
     for(let i=0;i<$value.length;i++){
      console.log($value[i]);
     }

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