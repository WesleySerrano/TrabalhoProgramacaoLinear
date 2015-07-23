var boxCounter=0;
var comboBoxCounter = 0;
var numberOfVariables;
var numberOfRestrictions;

function isInteger(n)
{
  return Number(n)==n && n%1===0;
}

function makeComboBox()
{
  var inputString="";
  inputString+="<select id=restriction"+(++comboBoxCounter)+">";
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
  numberOfVariables = Number(document.getElementById("inputBox"+(boxCounter-1)).value);
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
  numberOfRestrictions = Number(document.getElementById("inputBox"+(boxCounter-1)).value);

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
	inputString+="<button type=\"button\" onclick=\"makeMatrix()\">Next Step</button>";
	document.getElementById("restrictions").innerHTML=inputString;
  }
  else
  {
 	alert("Insira um numero inteiro.");	
  }
}

function makeMatrix()
{
    var A = [];
	var b = [];
    var numberOfSlackVariables = 0;
    var numberOfArtificialVariables = 0;
	
	for(var i = 1; i <= numberOfRestrictions; i++)
	{
	   var line = [];
       var restrictionBox = document.getElementById("restriction"+i);
	   var restriction = restrictionBox.options[restrictionBox.selectedIndex].text;
	   var bValue =  document.getElementById("restrictionRHSBox"+i).value;
	   
	   for(var j = 1; j <= numberOfVariables; j++)
	   {
	     var boxID = "restrictionBox"+i+j;
		 var element = Number(document.getElementById(boxID).value);
	      line.push(element);
	   }
	  for(var k = 1;k <= numberOfSlackVariables;k++)
	  {
		 line.push(0);
	  }
	   
	  if(restriction === "<=")
	  {
		 line.push(1);
		 numberOfSlackVariables++;
	  }
	  else if(restriction === ">=")
	  {
		 line.push(-1);
		 numberOfSlackVariables++;
	  }
	  A.push(line);
	  b.push(bValue);
	} 

    for(var i = 0; i < A.length; i++)	
    {
	   for(var j=numberOfVariables+numberOfSlackVariables; j > A[i].length;)
	   {
	      A[i].push(0);
	   }
	}

	for(var i=0; i < numberOfRestrictions; i++)
	{
       var restrictionBox = document.getElementById("restriction"+(i+1));
	   var restriction = restrictionBox.options[restrictionBox.selectedIndex].text;
	
	   if(restriction === ">=")
	   {
	       for(var j=1; j <= numberOfArtificialVariables;j++)
		   {
		      A[i].push(0);
		   }
	      A[i].push(1);
		  numberOfArtificialVariables++;
	   }
	}

    for(var i = 0; i < A.length; i++)	
    {
	   for(var j=numberOfVariables+numberOfSlackVariables+numberOfArtificialVariables; j > A[i].length;)
	   {
	      A[i].push(0);
	   }
	}
	
    dataShow(A,b);	
}

function dataShow(A,b)
{
    var text = "<table>";
	
	for(var i = 0; i < A.length; i++)
	{
	   text+= "<tr>"
	   for(var j = 0; j < A[i].length; j++)
	   {
	     text+="<td>";
		 text+= A[i][j];
	     text+="</td>";
	   }
	   text+="</tr>";
	}
	
	text += "</table>";	
	document.getElementById("dataShow").innerHTML=text;
}