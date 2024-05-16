// ==UserScript==
// @name        Pet Protector
// @namespace   Phoenix115115, forked from Etryn
// @description Protects your Neopets by hiding them at the Lab Ray, Rainbow Fountain, etc.
// @match       *://*www.neopets.com/quickref.phtml
// @match       *://*www.neopets.com/lab2.phtml
// @match       *://*www.neopets.com/pool/
// @match       *://*www.neopets.com/iteminfo.phtml?obj_id=*
// @match       *://*www.neopets.com/pound/abandon.phtml
// @match       *://*www.neopets.com/petpetlab.phtml
// @grant       none
// @require     http://code.jquery.com/jquery-3.6.0.min.js
// @require     http://code.jquery.com/ui/1.12.1/jquery-ui.min.js
// @grant       none
// @version     2.0
// ==/UserScript==

/* global $ */

// Modify PETNAME with the names of the pets you want to protect (properly spelled and capitalized!)
var pets = ["PetName1", "PetName2", "PetName3", "PetPet1", "PetPet2", "PetPet3"];

// List of Dangerous Items that can alter pet color/species
var dangerousItems = [
	"Morphing Potion",
	"Magical",
	"Transmogrification Potion",
	"Flask of Rainbow Fountain Water",
	"Mysterious Swirly Potion",
	"8-bit Power-Up Potion",
	"Turnip Tonic",
	"Potato Potion",
	"Kaleideonegg",
	"Witchy Negg",
	"Vortex Negg",
	"Plaid Negg",
	"Vengeful Scroll",
	"One-Use Robotification Zappermajig",
	"Glowing Jelly"
];

// Set hidePet to an empty function
var hidePet = function () {};

// Set hidePet based on web address
if (window.location.pathname.match("lab2")) { //fixed
    hidePet = function(index,petName) {
        $('input[value="'+petName+'"]').parent().empty();
    };
} else if (window.location.pathname.match("pool")) { //Still doing duplicate thing, but not in a way that threatens protected pets so not a priority to fix
    hidePet = function(index,petName) {
        $('INPUT[value="'+petName+'"]').parent().parent().empty();
    };
}
// else if (window.location.pathname.match("iteminfo")) { //not working
//    var isDangerous = false
//    $.each(dangerousItems,function(index,itemName) {
//        if($('td:contains("'+itemName+'")').length > 0) {
//            isDangerous = true;
//        }
//    });
//    if(isDangerous) {
//        hidePet = function(index,petName) {
//            $('option[value*="'+petName+'"]').empty();
//        };
//    }
//}
else if (window.location.pathname.match("abandon")) { //fixed
    hidePet = function(index,petName) {
        $('button[data-petname="'+petName+'"]').parent().empty();
    };
} else if (window.location.pathname.match("petpetlab")) { //fixed
    hidePet = function(index,petName) {
        $('table table td:contains("'+petName+'")').empty();
    };
}
//else if (window.location.pathname.match("quickref")) { //IDK what this is for, this is the pet lookup. Can this be used to change a pet's species?
//    $('a[href*="convert_pet"]').parent().empty();
//}

// Hide the pets!
$.each(pets,hidePet);
