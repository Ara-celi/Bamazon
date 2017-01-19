//Node packages
var mysql = require('mysql');
var inquirer = require('inquirer');

//Bamazon database connection
var connection = mysql.createConnection({
	host: "localhost",
  //port: 9000,
	user: "root",
	password: "",
	database: "Bamazon"
});

//checking connection
connection.connect(function(err){
  if(err){
  	console.log("Error connecting to db: " + err);
  	return;
  	}	
	console.log("Connection established");
});

//display all the items available for sale (id, name, price)
connection.query("SELECT * FROM Products", function(err, rows, fields) {
  if (!err)
    console.log("Items available: ", rows);//
  else
    console.log("Error while performing Query.");
});

var displayItems = function(){
  inquirer.prompt({
    name:"productlist",
    type: "rawlist",
    message: "How would you like to search for your item?",
    choices: [
      "find by item ID",
      "find by product name",
      "search by department",
      "purchase a specific amount"
    ]
  }).then(function(answer){
      switch(answer){
        case "find by item ID";
          itemNumber();
        break;
        
        case "find by product name";
          productName();
        break;

        case "search by department";
          department();
        break;
        
        case "purchase a specific amount";
          quantity();
        break;      
      }
  })
}
//==============================================================

//The app should then prompt users with two messages.
var itemToPurchase = function(){
 	inquirer.prompt({
 		name:"itemNumber",
 		type: "input",
 		message: "What is the ID number of the item you wish to purchase?"
 	}).then(function(answer){
    var query = "SELECT ItemID, ProductName, Price FROM Products WHERE ?";
    connection.query(query, {ItemID:answer.itemNumber}, function(err,res){
        for (var i=0; i<res.length;i++){
          console.log("Item ID: "+res[i].ItemID+"\nProduct: "+res[i].ProductName+"\nPrice: "+res[i].Price+"\n-------\n");
        }
      runSearch();
    })
  })
 };




//  		name:"stockQuantity",
//  		type:"input",
//  		message:"How many units would you like to purchase?"
//     validate: function(value){
//       if(isNaN(value)==false){
//         return true;
//       } else {
//         return false;
//       }
//     }
// }])






// Once the customer has placed the order, your application should check if 
//your store has enough of the product to meet the customer's request.

// If not, the app should log a phrase like Insufficient quantity!, and then  
//prevent the order from going through.
// However, if your store does have enough of the product, 
//you should fulfill the customer's order.

// This means updating the SQL database to reflect the remaining quantity.
// Once the update goes through, show the customer the total cost of their 
//purchase

