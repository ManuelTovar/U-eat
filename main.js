/*Primitive function of buttons to move the cards to the right and
left of food offered by the different restaurants affiliated with
the page*/

/*The functions consist of acquiring a div element and adding to it
 a style that moves the container of the restaurant menus to the right
and left*/

function MoveRight() {

    var div = document.getElementById("card-container");
    div.setAttribute('style', 'transform: translate(10rem);');

}

function MoveLeft() {

    var div = document.getElementById("card-container");
    div.setAttribute('style', 'transform: translate(-10rem);');

}