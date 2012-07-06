//
// Diablo 3 Item Generator
// Built by Stephen 'PyroZeroX' Andreou
// Year: 2012
// Technologies: Knockout.JS, jQuery
//

function ItemViewModel() 
{
    //basic item attributes
    self.itemID = ko.observable(); //unimplemented
    self.isSaved = ko.observable(false); //unimplemented

    self.itemName = ko.observable("");
    self.dps = ko.observable(000);
    self.attackSpeed = ko.observable(parseFloat(1.00));
    self.lowerRange = ko.observable(0);
    self.upperRange = ko.observable(0);

    //used to store the returned json, updating some knockout values is nasty.
    //this is really just a shifty work around... (dirty)
    self.myClass = ko.observable();
    self.myRarity = ko.observable();
    self.myPart = ko.observable();
    self.myType = ko.observable();
    self.myEffect = ko.observable();

    //Used for the form, these are the values that don't update very well on json load
    self.selectedClass = ko.observable(new itemRace(""));
    self.selectedEffect = ko.observable(new itemEffect(""));
    self.selectedPart = ko.observable(new itemBodyPart(""));
    self.selectedRarity = ko.observable(new itemRarity(""));
    self.selectedItemType = ko.observable(new itemClassification("",""));

    //more values for the item
    self.life = ko.observable(0);
    self.damage = ko.observable(0);
    self.protection = ko.observable(0);
    self.sellValue = ko.observable(0);

    self.itemLevel = ko.observable(0); //unimplemented
    self.levelRequired = ko.observable(0);
    self.durability = ko.observable(0);
    
    //required class, if required
    self.requiredClass = ko.observableArray([
    new itemRace("Barbarian"),
    new itemRace("Demon Hunter"),
    new itemRace("Wizard"),
    new itemRace("Witch Doctor"),
    new itemRace("Monk")
    ]);

    //hands required for weapons dropdown
    self.bodyPart = ko.observableArray([
    new itemBodyPart("Weapon", "Off Hand"), //not applicable to some items?
    new itemBodyPart("Weapon", "1 Handed"),
    new itemBodyPart("Weapon", "2 Handed"),
    new itemBodyPart("Armor", "Head"),
    new itemBodyPart("Armor", "Shoulders"),
    new itemBodyPart("Armor", "Neck"),
    new itemBodyPart("Armor", "Chest"),
    new itemBodyPart("Armor", "Hands"),
    new itemBodyPart("Armor", "Wrists"),
    new itemBodyPart("Armor", "Waist"),
    new itemBodyPart("Armor", "Legs"),
    new itemBodyPart("Armor", "Feet"),
    new itemBodyPart("Armor", "Finger"),    
    new itemBodyPart("Armor", "Follower")   
    ]);

    //effect dropdown
    self.effect = ko.observableArray([
        new itemEffect("Arcane"),
        new itemEffect("Fire"),
        new itemEffect("Holy"),
        new itemEffect("Poison"),
        new itemEffect("Lightning"),
        new itemEffect("Cold")
    ]);

    //rarity dropdown
    self.rarity = ko.observableArray([
    new itemRarity("Inferior"),
    new itemRarity("Normal"),
    new itemRarity("Superior"),
    new itemRarity("Magic"),
    new itemRarity("Rare"),
    new itemRarity("Legendary"),
    new itemRarity("Set")
    ]);

    //item type dropdown
    self.itemType = ko.observableArray([
    new itemClassification("Weapon", "Sword"),
    new itemClassification("Weapon", "Axe"),
    new itemClassification("Weapon", "Ceremonial Knife"),
    new itemClassification("Weapon", "Dagger"),
    new itemClassification("Weapon", "Fist Weapon"),
    new itemClassification("Weapon", "Mace"),
    new itemClassification("Weapon", "Mighty Weapon"),
    new itemClassification("Weapon", "Daibo"),
    new itemClassification("Weapon", "Polearm"),
    new itemClassification("Weapon", "Spear"),
    new itemClassification("Weapon", "Bow"),
    new itemClassification("Weapon", "Quiver"),
    new itemClassification("Weapon", "Mojo"),
    new itemClassification("Weapon", "Orb"),
    new itemClassification("Weapon", "Crossbow"),
    new itemClassification("Weapon", "Staff"),
    new itemClassification("Weapon", "Wand"),
    new itemClassification("Armor", "Helm"),
    new itemClassification("Armor", "Hat"),
    new itemClassification("Armor", "Spirit Stone"),
    new itemClassification("Armor", "Voodoo Mask"),
    new itemClassification("Armor", "Shoulders"),
    new itemClassification("Armor", "Pauldrons"),
    new itemClassification("Armor", "Amulet"),
    new itemClassification("Armor", "Chest"),
    new itemClassification("Armor", "Cloak"),
    new itemClassification("Armor", "Gauntlet"),
    new itemClassification("Armor", "Gloves"),
    new itemClassification("Armor", "Shield"),
    new itemClassification("Armor", "Bracers"),
    new itemClassification("Armor", "Belt"),
    new itemClassification("Armor", "Mighty Belt"),
    new itemClassification("Armor", "Pants"),
    new itemClassification("Armor", "Boots"),
    new itemClassification("Armor", "Ring")
    ]);

    //special modifiers (magical attributes list)
    self.itemAttributes = ko.observableArray([
    	new itemAttribute("Item Attribute", 0, false)
    ]); //empty default
    
    //attribute functions
    self.setSelectedClass = function(obj)
    {
        self.selectedClass(new itemRace(obj));
    }

    //function called to add a new magical attribute to the item
    self.addAttribute = function()
    {
        self.itemAttributes.push(new itemAttribute("Item Attribute", 0, false));
    }

    //removes a magical attribute from the item
    self.removeAttribute = function(attribute) { self.itemAttributes.remove(attribute); }

    //booleans
    self.isMagic = ko.computed(function(){ return myRarity() ? myRarity().type == 'Magic' : selectedRarity() ? selectedRarity().type == 'Magic' : false }); //returns true if the item is magical
    self.isRare = ko.computed(function(){ return myRarity() ? myRarity().type == 'Rare' : selectedRarity() ? selectedRarity().type == 'Rare' : false }); //returns true if the item is rare
    self.isLegendary = ko.computed(function(){ return myRarity() ? myRarity().type == 'Legendary' : selectedRarity() ? selectedRarity().type == 'Legendary' : false }); //returns true if the item is legendary
    self.isSet = ko.computed(function(){ return myRarity() ? myRarity().type == 'Set' : selectedRarity() ? selectedRarity().type == 'Set' : false }); //returns true if the item is a set item
    self.isWeapon = ko.computed(function(){return myType() ? myType().itemType == 'Weapon' : selectedItemType() ? selectedItemType().itemType == 'Weapon' : false}); //returns true if the item is a weapon
    self.isArmor = ko.computed(function(){return myType() ? myType().itemType == 'Armor' : selectedItemType() ? selectedItemType().itemType == 'Armor' : false}); //returns true if the item is an armor
    self.isTwoHanded = ko.computed(function(){return myType() ? myType().itemType == '2 Handed' : selectedPart() ? selectedPart().part == '2 Handed' : false}); //returns true if the item requires 2 hands
    self.isDBLoaded = ko.observable(false); //boolean value if this item already exists in the database
    

    //stores a calculated string value of the damage range
    self.damageRange = ko.computed(function(){
        return self.lowerRange() + " - " + self.upperRange()
    }, this);


    //reset the current image selection integer if the type changes
    //this helps keep the integer within range
    self.itemTypeChanged = function() {
        currentImageInt(1);
    };

    //current image integer (for image filename)
    self.currentImageInt = ko.observable(1); 

    //max image integer
    //stores the upperbound for the image integer
    //ideally this would know how many images are in each directory, but this will have to do for now...
    //hard coded =(
    self.imageIntMax = ko.computed(function()
    {
        var u = isLegendary() || isSet();
        var type = myType() ? myType().itemType : selectedItemType() ? selectedItemType().itemType : ''; //weapon or armor
        var category = myType() ? myType().itemCategory : selectedItemType() ? selectedItemType().itemCategory : ''; //item category

        if(type == 'Armor')
        {
            switch(category)
            {
                case 'Amulet': if(u){ return 12; } else return 13; break;
                case 'Belt': if(u){ return 9; } else return 6; break;
                case 'Boots': if(u){ return 7; } else return 6; break;
                case 'Bracers': if(u){ return 7; } else return 6; break;
                case 'Chest': if(u){ return 7; } else return 6; break;
                case 'Cloak': if(u){ return 3; } else return 4; break;
                case 'Gloves': if(u){ return 7; } else return 6; break;
                case 'Hat': if(u){ return 3; } else return 4; break;
                case 'Helm': if(u){ return 11; } else return 12; break;
                case 'Mighty Belt': if(u){ return 9; } else return 4; break;
                case 'Pants': if(u){ return 6; } else return 6; break;
                case 'Ring': if(u){ return 8; } else return 17; break;
                case 'Shoulders': if(u){ return 6; } else return 5; break;
                case 'Shield': if(u){return 4} else return 7; break;
                case 'Spirit Stone': if(u){ return 9; } else return 4; break;
                case 'Voodoo Mask': if(u){ return 6; } else return 4; break;
            }
        }
        else if(type == 'Weapon')
        {
            var twohand = isTwoHanded();
            switch(category)
            {
                case 'Axe':
                {
                    if(twohand){ if(u){ return 5; } else return 5; }
                    else{ if(u){ return 4; } else return 7; }
                }
                case 'Bow':  if(u){return 5;} else return 6; break;
                case 'Ceremonial Knife':  if(u){return 7;} else return 4; break;
                case 'Crossbow':
                {
                    if(twohand) { if(u){return 5;} else return 7; }
                    else { if(u){return 2;} else return 8; }
                }
                case 'Dagger': if(u){return 3;} else return 7; break;
                case 'Diabo': if(u){return 6;} else return 4; break;
                case 'Fist Weapon': if(u){return 9;} else return 4; break;
                case 'Mace':
                {
                    if(twohand){ if(u){return 6;} else return 6;}
                    else{ if(u){return 7;} else return 6;}
                }
                case 'Mighty Weapon':
                {
                    if(twohand){ if(u){return 5;} else return 4; }
                    else{ if(u){return 7} else return 4; }
                }
                case 'Mojo': if(u){return 7;} else return 4; break;
                case 'Orb': if(u){return 6;} else return 4; break;
                case 'Polearm': if(u){return 3;} else return 8; break;
                case 'Quiver': if(u){return 7;} else return 5; break;
                case 'Spear': if(u){return 4} else return 5; break;
                case 'Staff': if(u){return 5} else return 7; break;
                case 'Sword':
                {
                    if(twohand){ if(u){return 6;} else return 5; }
                    else{ if(u){return 5;} else return 8; }
                }
                case 'Wand': if(u){return 3} else return 7; break;
            }
        }
        else return 1;
    });

    //function that the >> button calls
    //increments the current image integer by one
    self.incrementImageInt = function() 
    { 
        self.currentImageInt(self.currentImageInt() + 1);
    };

    //function that the << button calls
    //decrements the current image integer by one
    self.decrementImageInt = function() 
    { 
        self.currentImageInt(self.currentImageInt() - 1);
    };

    //computed function which works out the appropriate filename for the item
    self.itemImage = ko.computed(function()
    {
        var prefix = ''; //stores the 2h- or u- (or both) prefixes for 2 handed or legendary+ items
        var type = myType() ? myType().itemType : selectedItemType() ? selectedItemType().itemType : '';
        var category = myType() ? myType().itemCategory : selectedItemType() ? selectedItemType().itemCategory : '';
        if(type == "" || category == "")
        {
            return "#"; //if either is missing, just return a #
        }
        if( isTwoHanded() ){ prefix += '2h-'; } //forced 2h image  || category == 'Bow' || category == 'Diabo' || category == 'Polearm'.. never got this to work
        if( isLegendary() || isSet() ) { prefix += 'u-'; }
        category = category.replace(/\s/g, ""); //strip white space from category
        return "url('img/"+type.toLowerCase() + "/" + category.toLowerCase() + "/" + prefix + category.toLowerCase() + currentImageInt() + ".png') no-repeat";
    });

    self.itemEffectImage = ko.computed(function()
    {
        var effecttype = myEffect() ? myEffect().type : selectedEffect() ? selectedEffect().type : '';
        if(isArmor())
        {
            return "url('img/effects/" + 'armor' + ".png') no-repeat";
        }
        else return "url('img/effects/" + effecttype.toLowerCase() + ".png') no-repeat";
    });
   
    //detailed attributes string
    self.durabilityString = ko.computed(function()
    {
        return this.durability() + '/' + this.durability();
    });

    //save function
    //creates a JSON object from select fields and posts it to a PHP page which handles the database part
    self.save = function()
    {
        //console.log(self.itemName);
        var data = ko.toJSON(
        {
            itemName : self.itemName,
            dps : self.dps,
            attackSpeed : self.attackSpeed,
            lowerRange : self.lowerRange,
            upperRange : self.upperRange,
            selectedClass : self.selectedClass,
            selectedItemType : self.selectedItemType,
            selectedPart: self.selectedPart,
            selectedEffect : self.selectedEffect,
            selectedRarity : self.selectedRarity,
            life : self.life,
            damage : self.damage,
            protection : self.protection,
            sellValue : self.sellValue,
            levelRequired : self.levelRequired,
            durability : self.durability,
            itemAttributes : self.itemAttributes,
            currentImageInt : self.currentImageInt
        });

        $.post('save/index.php', 'data='+encodeURIComponent(data), function(replyData)
        {
            //save success
            var reply = JSON.parse(replyData);
            if(reply.success)
            {
                //if the save is successful, build the social links and set isDBLoaded to true to hide the input form
                var url = 'http://www.d3itembuilder.com/' + '?' + reply.link;
                var twtlink = encodeURIComponent("I just built my own #Diablo 3 item! Check it out here "+url+"");
                $('#tweetlink').attr("href", "https://twitter.com/intent/tweet?text="+twtlink+"&via=PyroZeroX");
                $('#itemlink').attr('href', url);
                $('#itemlink').text(url);
                $('#fblink').attr('share_url', url);
                isDBLoaded(true);
            }
        });
    }


    
}
var vm = new ItemViewModel();
ko.applyBindings(vm);

//Class to represent my item attributes
function itemAttribute(name, value, socket)
{
    var self = this;
    self.attrName = ko.observable(name);
    self.attrValue = ko.observable(value);
    self.socket = ko.observable(socket);
}

//Class to represent my item classification
function itemClassification(type, category)
{
    this.itemType = type;
    this.itemCategory = category;
}

//Class to represent my item rarity
function itemRarity(type)
{
    this.type = type;
}

//Class to represent my item body part
function itemBodyPart(type, part)
{
    this.type = type;
    this.part = part;
}

//Class to represent my item effects
function itemEffect(type)
{
    this.type = type;
}

//Class to represent my item race requirements
function itemRace(itemclass)
{
    this.race = itemclass;
}

function load(query)
{
    //get my json data using the query string as an identifier
    $.post("load/index.php", 'hash='+encodeURIComponent(query), function(replyData)
    {
        //console.log(replyData);
        var parsed = JSON.parse(replyData);
        if(parsed)
        {
            self.isDBLoaded(true);
            //set all the observables
            self.itemName(parsed.itemName);
            self.dps(parsed.dps);
            self.attackSpeed(parseFloat(parsed.attackSpeed));
            self.lowerRange(parsed.lowerRange);
            self.upperRange(parsed.upperRange);
            self.life(parsed.life);
            self.damage(parsed.damage);
            self.protection(parsed.protection);
            self.sellValue(parsed.sellValue);
            self.levelRequired(parsed.levelRequired);
            self.durability(parsed.durability);
            self.currentImageInt(parseInt(parsed.currentImageInt));
            
            //load selected values
            //these are the piggy back variables for them
            self.myClass(parsed.selectedClass);
            self.myRarity(parsed.selectedRarity);
            self.myPart(parsed.selectedPart);
            self.myType(parsed.selectedItemType);
            self.myEffect(parsed.selectedEffect);
            
            //map the attributes
            var mappedAttr = $.map(parsed.itemAttributes, function(at)
            {
                return new itemAttribute(at.attrName, at.attrValue, at.socket);
            });
            self.itemAttributes(mappedAttr);

            //build my social links
            var url = 'http://www.d3itembuilder.com/?' + query;
            var twtlink = encodeURIComponent("I just built my own #Diablo 3 item! Check it out here "+url+"");
            $('#tweetlink').attr("href", "https://twitter.com/intent/tweet?text="+twtlink+"&via=PyroZeroX");
            $('#itemlink').attr('href', url);
            $('#itemlink').text(url);
            $('#fblink').attr('share_url', url);
            $('#fblink').attr('href', 'http://www.facebook.com/sharer.php?u='+url+'&src=sp');
        }
    });
}

//on load event
//check if there is a ?<> param which will be the link to an existing item.
$(document).ready(function()
{
    if(window.location.href.indexOf('?') != -1)
    {
        var terms = window.location.href.slice(window.location.href.indexOf('?') + 1);
        if (terms.length > 0)
        {
            load(terms);    
        }
    }
});