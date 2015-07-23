var boxCounter=0;
var numberOfVariables;
var numberOfRestrictions;

function isInteger(n)
{
  return Number(n)==n && n%1===0;
}

function makeComboBox()
{
  var inputString="";
  inputString+="<select>";
  inputString+="<option value=\"=\"> = </option>";
  inputString+="<option value=\">=\"> >= </option>";
  inputString+="<option value=\"<=\"> <= </option>";
  inputString+="</select>";

  return inputString;
}

function initialize()
{
	var inputString = "Numero de variaveis: <input type=\"text\" id=\"inputBox"+boxCounter+"\" value=\"\" />";
	inputString +=" <button type=\"button\" onclick=\"beginEquation()\">Next Step</button>";
	document.getElementById("init").innerHTML+=inputString;
}

function beginEquation()
{
  var variableCounter = 1;
  boxCounter=1;
  numberOfVariables = document.getElementById("inputBox"+(boxCounter-1)).value;
  document.getElementById("problem").innerHTML=" ";
  document.getElementById("restrictions").innerHTML=" ";

  if(isInteger(numberOfVariables))
  {
	  var inputString = "Z = ";
	  var i;
	  
	  for(i=1;i<=numberOfVariables;i++)
	  {
	    inputString+="<input type=\"text\" id=\"variableBox"+i+"\" value=\"\"/>";
	    inputString+=" X"+variableCounter+" 	";
	    variableCounter++;
	  }

	 document.getElementById("problem").innerHTML=inputString;
	 document.getElementById("restrictionsInput").innerHTML="Numero de restricoes: <input type=\"text\" id=\"inputBox"+boxCounter+"\" value=\"\" /> <button type=\"button\" onclick=\"beginRestrictions()\">Next Step</button>";
	 boxCounter++;
 }
 else
 {
 	alert("Insira um numero inteiro.");
 }
}

function beginRestrictions()
{
  numberOfRestrictions = document.getElementById("inputBox"+(boxCounter-1)).value;

  if(isInteger(numberOfRestrictions))
  {
    var inputString="<table>";
	 
	var i;
    for(i=1;i<=numberOfRestrictions;i++)
    {
      inputString+="<tr>";

      var j;
      for(j=1;j<=numberOfVariables;j++)
      {
         inputString+="<td>";
	     inputString+="<input type=\"text\" id=\"restrictionBox"+i+j+"\" value=\"\"/>";
	     inputString+=" X"+j+" 	";
         inputString+="</td>";
      }


      inputString+="<td>";
      inputString+=makeComboBox();
      inputString+="</td>";
      
      inputString+="<td>";
      inputString+=" <input type=\"text\" id=\"restrictionRHSBox"+i+"\" value=\"\"/>";
      inputString+="</td>";
    }

	inputString+="</table>"
	inputString+="<button type=\"button\" onclick=\"dataShow()\">Next Step</button>";
	document.getElementById("restrictions").innerHTML=inputString;
  }
  else
  {
 	alert("Insira um numero inteiro.");	
  }
}

function dataShow()
{
    var text = "<table>";
	
	for(var i = 1; i <= numberOfRestrictions; i++)
	{
	   text+= "<tr>"
	   for(var j = 1; j <= numberOfVariables; j++)
	   {
	     var boxID = "restrictionBox"+i+j;
	     text+="<td>";
		 text+= document.getElementById(boxID).value;
	     text+="</td>";
	   }
	   text+="</tr>";
	}
	
	text += "</table>";	
	document.getElementById("dataShow").innerHTML=text;
}