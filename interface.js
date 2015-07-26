var boxCounter=0;
var comboBoxCounter = 0;
var numberOfVariables;
var numberOfRestrictions;
var iterationCounter = 0;

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
	  var inputString = "Min Z = ";
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
	document.getElementById("dataShow").innerHTML = "";
    var A = [];
	var b = [];
	var costs = [];
    var numberOfSlackVariables = 0;
    var numberOfArtificialVariables = 0;
	
	for(var i = 1; i <= numberOfRestrictions; i++)
	{
	   var line = [];
       var restrictionBox = document.getElementById("restriction"+i);
	   var restriction = restrictionBox.options[restrictionBox.selectedIndex].text;
	   var bValue =  Number(document.getElementById("restrictionRHSBox"+i).value);
	   
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
	
	var matrix = [[]];
	for(var i=1; i <= numberOfVariables; i++)
	{
	   matrix[0].push(-Number(document.getElementById("variableBox"+i).value));
	}
		
	for(var i = 1; i <= numberOfSlackVariables; i++)
	{
	  matrix[0].push(0);
	}
	matrix[0].push(0);
	
	for(var i = 0; i < A.length; i++)
	{
	   matrix.push(A[i]);
	   matrix[i+1].push(b[i]);
	}	
	
	solve(matrix,numberOfSlackVariables);
}

function showMatrix(matrix)
{
  var text = "<table>";
  
  for(var i = 0; i< matrix.length; i++)
  {
     text += "<tr>";
	 
	 for(var j = 0; j < matrix[i].length; j++)
	 {
		  text += "<td>";
		  text += matrix[i][j];
		  text += "</td>";
	 }
	 
     text += "</tr>";
  }
  
  text += "</table>";
	document.getElementById("dataShow").innerHTML+=text;
}


function showBasicVariables(basicVariables)
{
   var text = "Variaveis basicas:"
   for(var i = 0; i< basicVariables.length; i++)
   {
      text +=" X"+(basicVariables[i]+1);
   }
   text += "<br><br>";
	document.getElementById("dataShow").innerHTML+=text;
}

function showSolution(variablesValues)
{
   var text = "Solucao:"
   for(var i = 0; i< variablesValues.length; i++)
   {
      text +=" X"+(i+1) + " = " + variablesValues[i];
   }
   text += "<br><br>";
	document.getElementById("dataShow").innerHTML+=text;
}


function dataShow(A,b,numberOfSlackVariables,numberOfArtificialVariables)
{
    var text = "<table>";
	
	if(numberOfArtificialVariables>0)
	{ 
	    text+="<tr>";
	    for(var j = 0;j < numberOfVariables+numberOfSlackVariables; j++)
		{
		  text += "<td>";
		  text += 0;
		  text += "</td>";
		}
		
	    for(var j = 0;j < numberOfArtificialVariables; j++)
		{
		  text += "<td>";
		  text += -1;
		  text += "</td>";
		}
	}
	
	else
	{
	    text+="<tr>";
	    for(var j = 1;j <= numberOfVariables; j++)
		{
		  text += "<td>";
		  text += -Number(document.getElementById("variableBox"+j).value);
		  text += "</td>";
		}
		
	    for(var j = 1;j <= numberOfSlackVariables; j++)
		{
		  text += "<td>";
		  text += 0;
		  text += "</td>";
		}
	}
	 
	text += "<td>";
	text += 0;
	text += "</td>";
    text+="</tr>";
	
	for(var i = 0; i < A.length; i++)
	{
	   text+= "<tr>"
	   for(var j = 0; j < A[i].length; j++)
	   {
	     text+="<td>";
		 text+= A[i][j];
	     text+="</td>";
	   }
	     text+="<td>";
		 text+= b[i];
	     text+="</td>";
	   text+="</tr>";
	}
	
	text += "</table>";	
	document.getElementById("dataShow").innerHTML=text;
}