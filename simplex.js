function findPivotColumn(matrix)
{
   var  pivotColumn = 0;
   var min = matrix[0][pivotColumn];
   
   for(var i = 1; i < matrix.length-1; i++)
   {
      if(matrix[0][i] < min)
	  {
	     min = matrix[0][i];
		 pivotColumn = i;
	  }
   }
   
   if(min >= 0)
   {
      pivotColumn = -1;
   }
   
   return pivotColumn;
}

function findPivotRow(matrix,pivotColumn)
{
  var pivotRow = -1;
  var minReason = -1;
  
   for(var i = 1; i < matrix.length; i++)
   {
     var lastColumnIndex = matrix.length-1;
     if(matrix[i][pivotColumn] != 0)
	 {
        var reason = matrix[i][lastColumnIndex]/A[i][pivotColumn];
		if((reason > 0 && reason < minReason) || minReason < 0)
		{
		   minReason = reason;
		   pivotRow = i;
		}
	 }
   }
   
   if(minReason == -1)
   {
       pivotRow = -1;
   }
  
  return pivotRow;
}

function pivot(matrix,pivotColumn, pivotRow)
{
   var pivot = A[pivotRow][pivotColumn];
   
   for(var i = 0; i < matrix[0].length; i++)
   {
       A[pivotRow][j] /= pivot;
   }
   
   for(var i = 0; i < A.length; i++)
   {
      if(i != pivotRow)
	  {		
		for(var j = 0; j < costs.length; j++)
		{
		   A[i][j] -= multiplier*A[pivotRow][j];
		}
	  }
   }
   
   return matrix;
}

function solve(matrix)
{
   while(42)
   {
     var pivotColumn = findPivotColumn(matrix);   

     if(pivotColumn < 0)
     {
	     //Optimal base
	     break;
	 }

     var pivotRow = 	findPivotRow(matrix); 
	 
	 if(pivotRow < 0)
	 {
	    //Unbounded problem
		break;
	 }
	 
	 matrix = pivot(matrix,pivotColumn,pivotRow);
	 
	 printIteration(matrix);
   }
}