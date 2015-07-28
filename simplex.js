var basicVariables;

function findPivotColumn(matrix)
{
   var  pivotColumn = 0;
   var max = matrix[0][pivotColumn];
   
   for(var i = 1; i < matrix[0].length-1; i++)
   {
      if(matrix[0][i] > max && matrix[0][i] > 0)
	  {
	     max = matrix[0][i];
		 pivotColumn = i;
	  }
   }
   
   if(max <= 0)
   {
      pivotColumn = -1;
   }
   
   return pivotColumn;
}

function findPivotRow(matrix,pivotColumn,justGotIn)
{
  var pivotRow = -1;
  var minReason = Number.POSITIVE_INFINITY;
  
   for(var i = 1; i < matrix.length; i++)
   {
     var lastColumnIndex = matrix[0].length-1;
     if(matrix[i][pivotColumn] != 0 && i!=justGotIn)
	 {
	     var b = matrix[i][lastColumnIndex];
	     var y = matrix[i][pivotColumn];
        var reason = b/parseFloat(y);
		if((reason >= 0 && reason < minReason) || minReason < 0)
		{
		   minReason = reason;
		   pivotRow = i;
		}
	 }
   }
   
   if(minReason == Number.POSITIVE_INFINITY)
   {
       pivotRow = -1;
   }
  
  return pivotRow;
}

function pivot(matrix,pivotColumn, pivotRow)
{
   var pivot = matrix[pivotRow][pivotColumn];
   
   for(var i = 0; i < matrix[0].length; i++)
   {
       matrix[pivotRow][i] /= parseFloat(pivot);
   }
   
   for(var i = 0; i < matrix.length; i++)
   {
      if(i != pivotRow)
	  {		
        var multiplier = matrix[i][pivotColumn];
		for(var j = 0; j < matrix[0].length; j++)
		{
		   matrix[i][j] -= multiplier*matrix[pivotRow][j];
		}
	  }
   }
   
   return matrix;
}

function findBasicVariables(matrix,phaseOne)
{
    var basicVariables = [];
	
    for(var onePosition = 1; onePosition < matrix.length; onePosition++)
	{
	   for(var i = 0; i < matrix[0].length-1; i++)
	   {
	       var basicVariable = true;
	       if(matrix[onePosition][i] == 1 && (matrix[0][i] == 0 || (phaseOne && matrix[0][i] == -1)))
		   {
		      for(var j = 1; j < matrix.length; j++)
			  {
			     if(j != onePosition)
				 {
				    if(matrix[j][i] != 0)
					{
					  basicVariable = false;
					  break;
					}
				 }
			  }
			  
			  if(basicVariable) basicVariables.push(i);
		   }
	   }
	}
	
	return basicVariables;
}

function solve(matrix,phaseOne)
{
   basicVariables = findBasicVariables(matrix,false);
   var variablesValues = [];
   var justGotIn = 0;
   var iteration = 1;
   
   for (var i = 0; i < matrix[0].length-1; i++)
   {
	  variablesValues.push(0);
   }
   
   while(42)
   {
   	 document.getElementById("dataShow").innerHTML+="Iteracao "+(iteration++);
	 showMatrix(matrix,basicVariables);
	 
     var pivotColumn = findPivotColumn(matrix);   

     if(pivotColumn < 0)
     {
	     //Optimal base
	     break;
	 }

     var pivotRow = 	findPivotRow(matrix,pivotColumn,justGotIn); 
	 justGotIn = pivotRow;
	 if(pivotRow < 0)
	 {
	     alert("Problema com solucao ilimitada!");
	    //Unbounded problem
		break;
	 }
	 
	 document.getElementById("dataShow").innerHTML+= "X"+(basicVariables[pivotRow-1]+1)+" sai da base<br>"
	 document.getElementById("dataShow").innerHTML+= "X"+(pivotColumn+1)+" entra na base<br><br>"
	 
	 matrix = pivot(matrix,pivotColumn,pivotRow);
	 basicVariables[pivotRow-1] = pivotColumn;
   }
   
   var lastColumnIndex = matrix[0].length-1;
   for(var i = 0; i < basicVariables.length; i++)
   {
     var variableIndex = basicVariables[i];
	 
	 variablesValues[variableIndex] = matrix[i+1][lastColumnIndex];
   }
   
   if(phaseOne) showBasicVariables(basicVariables,phaseOne)
   else showSolution(variablesValues);
   
   return matrix;
}