function findArtificialColumns(matrix)
{
  var artificialColumns = [];

  for(var i = 0; i <  matrix[0].length-1; i++)
  {
     if(matrix[0][i] == -1) artificialColumns.push(i);
  }
  
  return artificialColumns;
}

function findRowsToAdd(matrix,artificialColumns)
{
   var rowsToAdd = []
   
   for(var i = 0; i < artificialColumns.length; i++)
   {
      var column = artificialColumns[i];
	  
	  for(var j = 0; j < matrix.length; j++)
	  {
	     if(matrix[j][column] == 1) rowsToAdd.push(j);
	  }
   }
   
   return rowsToAdd;
}

function removeArtificialVariablesFromBase(matrix,rowsToAdd)
{
  for(var i = 0; i< rowsToAdd.length; i++)
  {
     var row = rowsToAdd[i];
	 
	 for(var j = 0; j < matrix[0].length; j++)
	 {
	    matrix[0][j] += matrix[row][j];
	 }
  }

  showMatrix(matrix,basicVariables);
  return matrix;
}

function findRowWithOne(matrix,column)
{
   for(var i = 1	; i < matrix.length; i++)
   {
       if(matrix[i][column] == 1) return i;
   }
}

function removeArtificialColumns(matrix,numberOfVariables,numberOfSlackVariables)
{
  var auxMatrix = [];
  var lastColumnIndex = matrix[0].length-1;
  
  for(var i = 0;i < matrix.length;i++)
  {
     auxMatrix.push([]);
     for(var j = 0; j < matrix[0].length; j++)
	 {
	    if(j < numberOfVariables + numberOfSlackVariables) auxMatrix[i].push(matrix[i][j]);
	 }
	 auxMatrix[i].push(matrix[i][lastColumnIndex]);
  }
  
  return auxMatrix;
}

function correctMatrix(matrix,numberOfVariables,numberOfSlackVariables)
{
   matrix = removeArtificialColumns(matrix,numberOfVariables,numberOfSlackVariables);
   showMatrix(matrix,basicVariables);

   for(var i = 0; i < basicVariables.length; i++)
   {
      var column = basicVariables[i];
      var row = findRowWithOne(matrix,column);
	  
	  var multiplier = -matrix[0][column];
	  
	  for(var j = 0; j < matrix[0].length; j++)
	  {
	     matrix[0][j] += multiplier*matrix[row][j];
	  }
   }
   
   showMatrix(matrix,basicVariables);
   return matrix;
}

function solvePhaseOne(matrix)
{  
   document.getElementById("dataShow").innerHTML+="Inicio da Fase I";
   basicVariables = findBasicVariables(matrix,true);
   showMatrix(matrix,basicVariables);
   
   var artificialColumns = findArtificialColumns(matrix);
   var rowsToAdd = findRowsToAdd(matrix,artificialColumns);
   matrix = removeArtificialVariablesFromBase(matrix,rowsToAdd);
   matrix = solve(matrix,true);  
 
   document.getElementById("dataShow").innerHTML+="Inicio da Fase II";
   return matrix;
}