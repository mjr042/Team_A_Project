var friendList;
var userList;
var everyone;
var currentUser;

function checkPerm(choice){   //takes the permission choice and updates the content accordingly
  
  if(choice === "Me"){
    if(currentUser!="Me"){
      document.write("You do not have permission to view");
    }
    else{
      document.write("Me");
    }
  }
  
  else if(choice === "List"){
    var onList = false
    for(i = 0;i<userList.length;i++){
      if(currentUser===userList[i]){
        onList=true;
      }
      
    }
    
    if(onList===true){
      document.write("here is the content that was posted");
    }
    
    else{
      document.write("You do not have permission to view");
    }
      
    
  }
  
  else if(choice === "Friends"){
    for(i = 0;i<friendList.length;i++){
      
     var onList1 = false
    for(i = 0;i<friendList.length;i++){
      if(currentUser===userList[i]){
        onList=true;
      }
      
    }
    
    if(onList1===true){
      document.write("here is the content that was posted");
    }
    
    else{
      document.write("You do not have permission to view");
    } 
      
      
    }
  }
  
  else{
    document.write("here is the content that was posted");
    
  }
  
}

console.log("It worked");