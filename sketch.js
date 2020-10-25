//Create variables here
var d1 , d2;
var database;
var foodStock,foodS;


function preload()
{
  //load images here
  d1 = loadImage("images/dogImg.png");
  d2 = loadImage("images/dogImg1.png");
  
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();

  dog = createSprite(200,300);
  dog.scale=0.2;
  dog.addImage(d1);

  foodStock = database.ref("Food");
  foodStock.on("value",readStock);
  
}


function draw() {  
  background(46, 139, 87);
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(d2);    
  }
  else {
    dog.addImage(d1);
  }
  drawSprites();
  //add styles here
  fill ("black");
  text ("Food Remaining : "+foodS,200,200);
  text ("Press Up arrow to feed the dog",200,50);

}

// Function to read value from database
function readStock(data){
  foodS = data.val();
  }

  // Function to write value in DB

  function writeStock(x){
    if(x<=0){
      x=0
    }
    else{
      x=x-1;
    }
    database.ref("/").update({
      Food:x
    })
  }



