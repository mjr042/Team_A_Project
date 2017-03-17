var title;
var question;
var options = new Array();




function initializePoll(title,question,options){  //method to initialize the poll with user inputted data
	this.title = title;
	this.question = question;
	this.options = options;   //arrayt that holds the options the user entered
	this.votes =0;       //creates a new total votes variable
	var a = options.length;
	this.count=new Array(4);	//creates a new vote count variable that lines of with the options
  
	for(i = 0; i<a;i++){
		this.count[i]=0;
	}
  
  
    
}




function updateVotes(output,initObject){   //method to update the votes after voting
  
	for(i = 0;i<initObject.options.length;i++){
		console.log("Here")
		if(output===initObject.options[i]){    //if the option voted is the same as this option in the array, update this options vote
			initObject.count[i] +=1;
      
			initObject.votes += 1;
      
		}
	}
}


var testtt = ["a","b","c","d"];

var newPoll = new initializePoll("test","Does this work",testtt);
var newPoll2 = new initializePoll("test123","Does this work",testtt);

var v = updateVotes("a",newPoll);


 
console.log(newPoll2.title);
console.log(newPoll.title);
console.log(newPoll.count[0]);