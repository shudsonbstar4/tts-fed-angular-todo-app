// Code goes here

//Initialize your angular module for your ToDo app. Since the app is small, we only need one module. The first param (a string) is the name of your module, while the second param (the empty array) will contain string names of any dependencies you're using (i.e., other JS libraries and plugins used in conjunction with Angular). For example, if we wanted to use Angular UI Boostrap, we'd include the link to the script in our HTML head and then say in our script: angular.module('myApp', ['ui.bootstrap'])
angular.module('myApp', []) //No semi-colon since we're hanging the controller and factory off the module and chaining them together, hence the dots at the beginning of them. If we put a semi-colon, we're essentially closing the statement and then the controller and factory won't know which module they're part of.

//The controller function is the function that encapsulates your entire page/section. 
.controller('MainCtrl', function($scope, ToDoList){ //The first param is the name of the ctrl as a string; second parameter is an anonymous function that will be run when the page is loaded and 'MainCtrl' is referenced. In that function, we can pass in services (i.e., the $scope service which lets us reference the view and set variable values in the controller which the view will read from) as well as factories (for manipulating data). This is called dependency injection.

  //Factory
  ToDoList.getItems().then(function(data){ //Call the getItems() method on the ToDoList factory object. The .then method is what is called a promise - it's the method that's run when the http call to the endpoint is successfully completed and data is returned. Inside, we pass it a function which catches that data (thus the data variable) and then we can assign that response to a $scope variable which will allow us to print those items out on the view 
    $scope.items = data;
  })
  
  $scope.addItem = function(item){ //$scope exposes the function to the view
    var newItem = angular.copy(item); //We use angular.copy to create a deep copy of the object; this way we create a new "id" for it as well, since Angular assigns each variable its own "id" to keep track of them on the view (with that double binding we talked about). If we were to leave this without copying it, then if we added another item, it would just overwrite the first item, thus only 'updating' the data for the same row over and over. 
    $scope.items.push(newItem); //Push the new item into the items array
  };
  
  $scope.deleteItem = function($index){ 
    $scope.items.splice($index, 1); //Splice is a method used on an array that takes the index of an item as the first parameter and then splices out the number of items you pass as the second parameter. In this case, we only want to delete one item so it's 1
  };
  
})

//Factory and API Call
.factory("ToDoList", function($http){ //HTTP service allows us to port in data (or create, update, or delete) data to the server/database over HTTP; you will need to have the code on a server/server running (hence why we use Plnkr for this and you won't be able to make this work on your desktop without firing up localhost. You can do this easily by starting a server on your computer; see here: http://lifehacker.com/start-a-simple-web-server-from-any-directory-on-your-ma-496425450)
  return { //Return an object so that when ToDoList is hit, it will return the object with this method. This is a way of saving this function for later and sharing it between controllers
    getItems: function(){ //Method as a property of an object
      var promise = $http.get('items.json') //Save the http call to a variable so we can return it; this way we can get that data back when referencing it later
      .then(function(res){
        return res.data; //return the data caught by the promise
      })
      return promise; //return the promise
    }
  }
})
