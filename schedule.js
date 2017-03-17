


function inputSchedule(name,time,days){    //input a class, time and days into a schedule
  this.name = name;
  this.time = time;
  this.days = days;
  
  this.tab = new Array(16);
  
  for(i = 0;i<10;i++){
    this.tab[i] = new Array(5);
  }
  
  for(i = 0;i<10;i++){   //sets up a schedule array from 8:00-17:00
    //document.write("<br>");
      for(j=0;j<5;j++){
        this.tab[i][j] = "|----------|";
        //document.write(this.tab[i][j]);
      }
  }
  
  
  
}

var da = ["Monday","Wednesday","Friday"];

var v = new inputSchedule("Biology","13:00",da);


function createSchedule(schedObject){    //creates schedule based on the inputted schedule object
  dd = new Array();
  var t=0;
  for(i = 0;i<schedObject.days.length;i++){
      if(schedObject.days[i]==="Monday"){
        dd[i]=0;
      }
    
      if(schedObject.days[i]==="Tuesday"){
        dd[i]=1;
      }
    
      if(schedObject.days[i]==="Wednesday"){
        dd[i]=2;
      }
    
      if(schedObject.days[i]==="Thursday"){
        dd[i]=3;
      }
    
      if(schedObject.days[i]==="Friday"){
        dd[i]=4;
      }
  }
  
  if(schedObject.time==="8:00"){
    t = 0;
  }
  
  if(schedObject.time==="9:00"){
    t = 1;
  }
  
  if(schedObject.time==="10:00"){
    t = 2;
  }
  
  if(schedObject.time==="11:00"){
    t = 3;
  }
  
  if(schedObject.time==="12:00"){
    t = 4;
  }
  
  if(schedObject.time==="13:00"){
    t = 5;
  }
  
  if(schedObject.time==="14:00"){
    t = 6;
  }
  
  if(schedObject.time==="15:00"){
    t = 7;
  }
  
  if(schedObject.time==="16:00"){
    t = 8;
  }
  
  if(schedObject.time==="17:00"){
    t = 9;
  }
  
  for(i = 0;i<schedObject.days.length;i++){
    console.log(t);
    console.log(dd[i]);
    console.log("next");
    schedObject.tab[t][dd[i]]=schedObject.name;
  }
  
  for(i = 0;i<10;i++){
    document.write("<br>");
      for(j=0;j<5;j++){
        
        document.write(schedObject.tab[i][j]);
      }
  }
  
  console.log(dd[2]);
}

var c = new createSchedule(v);

console.log("Working");