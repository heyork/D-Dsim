function Race(Name, Modifiers){
	this.name=Name;
	this.modifiers=Modifiers;
	// Modifiers should be an array of ints in this order [str,con,dex,int,wis,char]
}
function Class(Name,initialHP,perLevel){
	this.name=Name;
	this.initialHP=initialHP;
	this.perLevel=perLevel;
}

// 
// Defining Player Object Stuffs
// 

var Classes= [new Class("Cleric",12,5),
				new Class("Fighter",15,6),
				new Class("Paladin",15,6),
				new Class("Ranger",12,5),
				new Class("Rogue",12,5),
				new Class("Warlock",12,5),
				new Class("Warlord",12,5),
				new Class("Wizard",10,4)];

var Races = [new Race("Dragonborn",[2,0,0,0,0,2]),
				new Race("Dwarf", [0,2,0,0,2,0]),
				new Race("Eladrin",[0,0,2,2,0,0]),
				new Race("Elf",[0,0,2,0,2,0]),
				new Race("Half-Elf",[0,2,0,0,0,2]),
				new Race("Halfling",[0,0,2,0,0,2]),
				new Race("Human", [0,0,0,0,0,0]),
				new Race("Tiefling",[0,0,0,2,0,2])];


function fullHP(){
	var classNumber;
	for(var i=0;i<Classes.length;i++){
		if(this.Class.toUpperCase()==Classes[i].name.toUpperCase()){
			classNumber=i;
		}
	};
	
	var base = Number(Classes[classNumber].initialHP); 
	var constit = Number(this.constitution);
	var levs = Number((this.level)-1)
	var mod = Number(Classes[classNumber].perLevel);
	return Number(base+constit)+Number(levs*mod);
}
function isBloodied(){
	if(this.hp<(this.fullHP()/2)){
		return true;
	}
	else{
		return false;
	}
}
function addEXP(amount){
	this.experience+=amount;
}
function rollInitiative(){
	return Number(rollD20())+Number(this.dexterity);
}
function decreaseHP(amount){
	this.hp=this.hp - amount;
}

function Player(name,race,Class,level,strength,constitution,dexterity,intelligence,wisdom,charisma,alignment,gold,experience,powers){
	this.name=name;
	this.race=race;
	this.Class=Class;
	this.level=level;
	this.strength=strength;
	this.constitution=constitution;
	this.dexterity=dexterity;
	this.intelligence=intelligence;
	this.wisdom=wisdom;
	this.charisma=charisma;
	this.alignment=alignment;
	this.gold=gold;
	this.experience=experience;
	this.fullHP=fullHP;
	this.isBloodied=isBloodied;
	this.hp=this.fullHP();
	this.rollInitiative=rollInitiative;
	this.powers=powers;
	this.addEXP=addEXP;
	this.type="player";
	this.decreaseHP=decreaseHP;
}

var Players=[];

// 
// Reading
// Files
// 

(function(){
	if(window.File && window.FileReader && window.FileList && window.Blob) {
		// Great success! All the File APIs are supported.
	}
	else{
		alert('The File APIs are not fully supported in this browser.');
	}

	var fileInput = document.getElementById('playerfileInput');
	var	fileUpload;
	var	results;

	$("#addPlayer").click(function() {
		var file = fileInput.files[0];
		var textType = /text.*/;

		//if (file.type.match(textType)) {
			var reader = new FileReader();
			reader.onload = function(e) {
				fileUpload = reader.result;
				results = fileUpload.split(",");
				// console.log(results);
				var powers=[];
				for(var i = 0; i < results[13]; i++){
					powers[i]=results[14+i];
				}
				Players[Players.length] = new Player(results[0],results[1],results[2],results[3],results[4],results[5],results[6],results[7],results[8],results[9],results[10],results[11],results[12],powers);
				updatePlayerList();	
			}
		reader.readAsText(file);
		// }
		// else{
		// 	alert("You Dummy, that isn't a text file");
		// }
		
	});
})();

// 
// Other Player Things
// 

function updatePlayerList(){
	$("#players").empty();
	for (var i = 0; i < Players.length; i++) {
		$("#players").append("<div class='player'><h4>"+Players[i].name+"</h4><h6>Level "+Players[i].level+" "+Players[i].race+" "+Players[i].Class+"</h6></div>");
	};
}


function Power(Name, classReq, type,level){
	this.name=Name;
	this.classReq=classReq;
	this.level=level;
	this.type=type;
}

var allPlayerPowers = [new Power("Lance of Faith","cleric","At-Will",1),
					new Power("Priest's Shield","cleric","At-Will",1),
					new Power("Righteous Brand","cleric","At-Will",1),
					new Power("Sacred Flame","cleric","At-Will",1),
					new Power("Cause Fear","cleric","Encounter",1),
					new Power("Divine Glow","cleric","Encounter",1),
					new Power("Healing Strike","cleric","Encounter",1),
					new Power("Wrathful Thunder","cleric","Encounter",1),
					new Power("Avenging Flame","cleric","Daily",1),
					new Power("Beacon of Hope","cleric","Daily",1),
					new Power("Cascade of Light","cleric","Daily",1),
					new Power("Guardian of Faith","cleric","Daily",1),
					new Power("Bless","cleric","Utility",2),
					new Power("Cure Light Wounds","cleric","Utility",2),
					new Power("Divine Aid","cleric","Utility",2),
					new Power("Sanctuary","cleric","Utility",2),
					new Power("Shield of Faith","cleric","Utility",2),
					new Power("Blazing Beacon","cleric","Encounter",3),
					new Power("Command","cleric","Encounter",3),
					new Power("Daunting Light","cleric","Encounter",3),
					new Power("Split the Sky","cleric","Encounter",3),
					new Power("Consecrated Ground","cleric","Daily",5),
					new Power("Rune of Peace","cleric","Daily",5),
					new Power("Spiritual Weapon","cleric","Daily",5),
					new Power("Weapon of the Gods","cleric","Daily",5),
					new Power("Bastion of Health","cleric","Utility",6),
					new Power("Cure Sacrifice Wounds","cleric","Utility",6),
					new Power("Divine Vigor","cleric","Utility",6),
					new Power("Holy Lantern","cleric","Utility",6),
					new Power("Awe Strike","cleric","Encounter",7),
					new Power("Break the Spirit","cleric","Encounter",7),
					new Power("Searing Light","cleric","Encounter",7),
					new Power("Strengthen the Faithful","cleric","Encounter",7),
					new Power("Astral Defenders","cleric","Daily",9),
					new Power("Blade Barrier","cleric","Daily",9),
					new Power("Divine Power","cleric","Daily",9),
					new Power("Flame Strike","cleric","Daily",9),
					new Power("Astral Refuge","cleric","Utility",10),
					new Power("Knights of Unyielding Valor","cleric","Utility",10),
					new Power("Mass Cure Light Wounds","cleric","Utility",10),
					new Power("Shielding Word","cleric","Utility",10),
					new Power("Arc of the Righteous","cleric","Encounter",13),
					new Power("Inspiring Strike","cleric","Encounter",13),
					new Power("Mantle of Glory","cleric","Encounter",13),
					new Power("Plague of Doom","cleric","Encounter",13),
					new Power("Holy Spark","cleric","Daily",15),
					new Power("Purifying Fire","cleric","Daily",15),
					new Power("Seal of Warding","cleric","Daily",15),
					new Power("Astral Shield","cleric","Utility",16),
					new Power("Cloak of Peace","cleric","Utility",16),
					new Power("Divine Armor","cleric","Utility",16),
					new Power("Hallowed Ground","cleric","Utility",16),
					new Power("Binding Light","cleric","Encounter",17),
					new Power("Enthrall","cleric","Encounter",17),
					new Power("Sentinal Strike","cleric","Encounter",17),
					new Power("Thunderous Word","cleric","Encounter",17),
					new Power("Fire Storm", "cleric","Daily",19),
					new Power("Holy Wrath","cleric","Daily",19),
					new Power("Indomitable Spirit","cleric","Daily",19),
					new Power("Knight of Glory","cleric","Daily",19),
					new Power("Angel of Eleven Winds","cleric","Utility",22),
					new Power("Clarion Call of the Astral Sea","cleric","Utility",22),
					new Power("Cloud Chariot","cleric","Utility",22),
					new Power("Purify","cleric","Utility",22),
					new Power("Spirit of Health","cleric","Utility",22),
					new Power("Astral Blades of Death","cleric","Encounter",23),
					new Power("Divine Censure","cleric","Encounter",23),
					new Power("Haunting Strike","cleric","Encounter",23),
					new Power("Healing Touch","cleric","Encounter",23),
					new Power("Nimbus of Doom","cleric","Daily",25),
					new Power("Sacred Word","cleric","Daily",25),
					new Power("Seal of Binding","cleric","Daily",25),
					new Power("Seal of Protection","cleric","Daily",25),
					new Power("Punishing Strike","cleric","Encounter",27),
					new Power("Scourge of the Unworthy","cleric","Encounter",27),
					new Power("Sunblast","cleric","Encounter",27),
					new Power("Astral Storm","cleric","Daily",29),
					new Power("Godstrike","cleric","Daily",29),
					new Power("Cleave","fighter","At-Will",1),
					new Power("Reaping Strike","fighter","At-Will",1),
					new Power("Sure Strike","fighter","At-Will",1),
					new Power("Tide of Iron","fighter","At-Will",1),
					new Power("Covering Attack","fighter","Encounter",1),
					new Power("Passing Attack","fighter","Encounter",1),
					new Power("Spinning Sweep","fighter","Encounter",1),
					new Power("Steel Serpent Strike","fighter","Encounter",1),
					new Power("Brute Strike","fighter","Daily",1),
					new Power("Comeback Strike","fighter","Daily",1),
					new Power("Villian's Menace","fighter","Daily",1),
					new Power("Boundless Endurance","fighter","Utility",2),
					new Power("Get Over Here","fighter","Utility",2),
					new Power("No Opening","fighter","Utility",2),
					new Power("Unstoppable","fighter","Utility",2),
					new Power("Armor-Piercing Thrust","fighter","Encounter",3),
					new Power("Crushing Blow","fighter","Encounter",3),
					new Power("Dance of Steel","fighter","Encounter",3),
					new Power("Precise Strike","fighter","Encounter",3),
					new Power("Rain of Blows","fighter","Encounter",3),
					new Power("Sweeping Blow","fighter","Encounter",3),
					new Power("Crack the Shell","fighter","Daily",5),
					new Power("Dizzying Blow","fighter","Daily",5),
					new Power("Rain of Steel","fighter","Daily",5),
					new Power("Battle Awareness","fighter","Utility",6),
					new Power("Defensive Training","fighter","Utility",6),
					new Power("Unbreakable","fighter","Utility",6),
					new Power("Come and Get It","fighter","Encounter",7),
					new Power("Griffon's Wrath","fighter","Encounter",7),
					new Power("Iron Bulwark","fighter","Encounter",7),
					new Power("Reckless Strike","fighter","Encounter",7),
					new Power("Sudden Surge","fighter","Encounter",7),
					new Power("Shift the Battlefield","fighter","Daily",9),
					new Power("Thicket of Blades","fighter","Daily",9),
					new Power("Victorious Surge","fighter","Utility",9),
					new Power("Into the Fray","fighter","Utility",10),
					new Power("Last Ditch Evasion","fighter","Utility",10),
					new Power("Stalwart Guard","fighter","Utility",10),
					new Power("Anvil of Doom","fighter","Encounter",13),
					new Power("Chains of Sorrow","fighter","Encounter",13),
					new Power("Giant's Wake","fighter","Encounter",13),
					new Power("Silverstep","fighter","Encounter",13),
					new Power("Storm of Blows","fighter","Encounter",13),
					new Power("Talon of the Roc","fighter","Encounter",13),
					new Power("Dragon's Fangs","fighter","Daily",15),
					new Power("Serpent Dance Strike","fighter","Daily",15),
					new Power("Unyielding Avalanche","fighter","Daily",15),
					new Power("Iterposing Shield","figher","Utility",16),
					new Power("Iron Weather","fighter","Utility",16),
					new Power("Suprise Step","fighter","Utility",16),
					new Power("Exacting Strike","fighter","Ecnounter",17),
					new Power("Exorcism of Steel","fighter","Encounter",17),
					new Power("Harrying Assault","fighter","Encounter",17),
					new Power("Mountain Breaking Blow","fighter","Encounter",17),
					new Power("Vorpal Tornado","fighter","Encounter",17),
					new Power("Warrior's Challenge","fighter","Encounter",17),
					new Power("Devastation's Wake","fighter","Daily",19),
					new Power("Reaving Strike","fighter","Daily",19),
					new Power("Strike of the Watchful Guard","fighter","Daily",19),
					new Power("Act of Desperation","fighter","Utility",22),
					new Power("No Surrender","fighter","Utility",22),
					new Power("Cage of Chains","fighter","Encounter",23),
					new Power("Fangs of Steel","fighter","Encounter",23),
					new Power("Hack 'n' Slash","fighter","Encounter",23),
					new Power("Paralyzing Strike","fighter","Encounter",23),
					new Power("Skullcrusher","fighter","Encounter",23),
					new Power("Warrior's Urging","fighter","Encounter",23),
					new Power("Reaper's Stance","fighter","Daily",25),
					new Power("Reign of Terror","fighter","Daily",25),
					new Power("Supremecy of Steel","fighter","Daily",25),
					new Power("Adamantine Strike","fighter","Encounter",27),
					new Power("Cruel Reaper","fighter","Encounter",27),
					new Power("Diamond Shield Defense","fighter","Encounter",27),
					new Power("Indomitable Battle Strike","fighter","Encounter",27),
					new Power("Force the Battle","fighter","Daily",29),
					new Power("No Mercy","fighter","Daily",29),
					new Power("Storm of Destruction","fighter","Daily",29),
					new Power("Bolstering Strike","paladin","At-Will",1),
					new Power("Enfeebling Strike","paladin","At-Will",1),
					new Power("Holy Strike","paladin","At-Will",1),
					new Power("Valiant Strike","paladin","At-Will",1),
					new Power("Fearsome Smite","paladin","Encounter",1),
					new Power("Piercing Smite","paladin","Encounter",1),
					new Power("Radiant Smite","paladin","Encounter",1),
					new Power("On Pain of Death","paladin","Daily",1),
					new Power("Paladin's Judgemnt","paladin","Daily",1),
					new Power("Radiant Delirium","paladin","Daily",1),
					new Power("Astral Speech","paladin","Utility",2),
					new Power("Martyr's Blessing","paladin","Utility",2),
					new Power("Sacred Circle","paladin","Utility",2),
					new Power("Arcing Smite","paladin","Encounter",3),
					new Power("Invigorating Smite","paladin","Encounter",3),
					new Power("Rigteous Smite","paladin","Encounter",3),
					new Power("Staggering Smite","paladin","Encounter",3),
					new Power("Hallowed Circle","paladin","Daily",5),
					new Power("Martyr's Retribution","paladin","Daily",5),
					new Power("Sign of Vulnerability","paladin","Daily",5),
					new Power("Divine Bodyguard","paladin","Utility",6),
					new Power("One Heart, One Mind","paladin","Utility",6),
					new Power("Wrath of the Gods","paladin","Utility",6),
					new Power("Beckon Foe","paladin","Encounter",7),
					new Power("Benign Transportation","paladin","Encounter",7),
					new Power("Divine Reverence","paladin","Encounter",7),
					new Power("Thunder Smite","paladin","Encounter",7),
					new Power("Crown of Glory","paladin","Daily",9),
					new Power("One Stands Alone","paladin","Daily",9),
					new Power("Radiant Pulse","paladin","Daily",9),
					new Power("Cleansing Spirit","paladin","Utility",10),
					new Power("Noble Shield","paladin","Utility",10),
					new Power("Turn the Tide","paladin","Utility",10),
					new Power("Entangling Smite","paladin","Encounter",13),
					new Power("Radiant Charge","paladin","Encounter",13),
					new Power("Renewing Smite","paladin","Encounter",13),
					new Power("Whirlwind Smite","paladin","Encounter",13),
					new Power("Bloodied Retribution","paladin","Daily",15),
					new Power("Break the Wall","paladin","Daily",15),
					new Power("True Nemesis","paladin","Daily",15),
					new Power("Angelic Intercession","paladin","Utility",16),
					new Power("Death Ward","paladin","Utility",16),
					new Power("Enervating Smite","paladin","Encounter",17),
					new Power("Fortifying Smite","paladin","Encounter",17),
					new Power("Hand of the Gods","paladin","Encounter",17),
					new Power("Terrifying Smite","paladin","Encounter",17),
					new Power("Corona of Blinding Radiance","paladin","Daily",19),
					new Power("Crusader's Boon","paladin","Daily",19),
					new Power("Righteous Inferno","paladin","Daily",19),
					new Power("Angelic Rescue","paladin","Utility",22),
					new Power("Cleansing Burst","paladin","Utility",22),
					new Power("Gift of Life","paladin","Utility",22),
					new Power("United in Faith","paladin","Utility",22),
					new Power("Here Waits Thy Doom","paladin","Encounter",23),
					new Power("Martyr's Smite","paladin","Encounter",23),
					new Power("Resounding Smite","paladin","Encounter",23),
					new Power("Sublime Transposition","paladin","Encounter",23),
					new Power("Exalted Retribution","paladin","Daily",25),
					new Power("To the Nine Hells with You","paladin","Daily",25),
					new Power("Blinding Smite","paladin","Encounter",27),
					new Power("Brand of Judgement","paladin","Encounter",27),
					new Power("Deific Vengeance","paladin","Encounter",27),
					new Power("Restricitng Smite","paladin","Encounter",27),
					new Power("Stunning Smite","paladin","Encounter",27),
					new Power("Even Hand of Justice","paladin","Daily",29),
					new Power("Powerful Faith","paladin","Daily",29),
					new Power("Careful Attack","ranger","At-Will",1),
					new Power("Hit and Run","ranger","At-Will",1),
					new Power("Nimble Strike","ranger","At-Will",1),
					new Power("Twin Strike","ranger","At-Will",1),
					new Power("Dire Wolverine Strike","ranger","Encounter",1),
					new Power("Evasive Strike","ranger","Encounter",1),
					new Power("Fox's Cunning","ranger","Encounter",1),
					new Power("Two-Fanged Strike","ranger","Encounter",1),
					new Power("Hunter's Bear Trap","ranger","Daily",1),
					new Power("Jaws of the Wolf","ranger","Daily",1),
					new Power("Split the Tree","ranger","Daily",1),
					new Power("Sudden Strike","ranger","Daily",1),
					new Power("Crucial Advice","ranger","Utility",2),
					new Power("Unbalancing Parry","ranger","Utility",2),
					new Power("Yield Ground","ranger","Utility",2),
					new Power("Cut and Run","ranger","Encounter",3),
					new Power("Disruptive Strike","ranger","Encounter",3),
					new Power("Shadow Wasp Strike","ranger","Encounter",3),
					new Power("Thundertusk Boar Strike","ranger","Encounter",3),
					new Power("Excrutiating Shot","ranger","Daily",5),
					new Power("Frenzied Skirmish","ranger","Daily",5),
					new Power("Splintering Shot","ranger","Daily",5),
					new Power("Two-Wolf Pounce","ranger","Daily",5),
					new Power("Evade Ambush","ranger","Utility",6),
					new Power("Skilled Companion","ranger","Utility",6),
					new Power("Weave through the Fray","ranger","Utility",6),
					new Power("Claws of the Griffon","ranger","Encounter",7),
					new Power("Hawk's Talon","ranger","Encounter",7),
					new Power("Spikes of the Manticore","ranger","Encounter",7),
					new Power("Sweeping Whirlwind","ranger","Encounter",7),
					new Power("Attacks on the Run","ranger","Daily",9),
					new Power("Close Quarters Shot","ranger","Daily",9),
					new Power("Spray of Arrows","ranger","Daily",9),
					new Power("Swirling Leaves of Steel","ranger","Daily",9),
					new Power("Expeditious Stride","ranger","Utility",10),
					new Power("Open the Range","ranger","Utility",10),
					new Power("Undaunted Stride","ranger","Utility",10),
					new Power("Armor Splinter","ranger","Encounter",13),
					new Power("Knockdown Shot","ranger","Encounter",13),
					new Power("Pinning Strike","ranger","Encounter",13),
					new Power("Blade Cascade","ranger","Daily",15),
					new Power("Bleeding Wounds","ranger","Daily",15),
					new Power("Confounding Arrows","ranger","Daily",15),
					new Power("Stunning Steel","ranger","Daily",15),
					new Power("Evade the Bow","ranger","Utility",16),
					new Power("Longstrider","ranger","Utility",16),
					new Power("Momentary Respite","ranger","Utility",16),
					new Power("Arrow of Vengenace","ranger","Encounter",17),
					new Power("Cheetah's Rake","ranger","Encounter",17),
					new Power("Triple Shot","ranger","Encounter",17),
					new Power("Two-Weapon Eviscerate","ranger","Encounter",17),
					new Power("Cruel Cage of Steel","ranger","Daily",19),
					new Power("Great Ram Arrow","ranger","Daily",19),
					new Power("Two-in-One Shot","ranger","Daily",19),
					new Power("Wounding Whirlwind","ranger","Daily",19),
					new Power("Forest Ghost","ranger","Utility",22),
					new Power("Hit the Dirt","ranger","Utility",22),
					new Power("Master of the Hunt","ranger","Utility",22),
					new Power("Safe Stride","ranger","Utility",22),
					new Power("Blade Ward","ranger","Encounter",23),
					new Power("Cloak of Thorns","ranger","Encounter",23),
					new Power("Hammer Shot","ranger","Encounter",23),
					new Power("Manticore's Volley","ranger","Encounter",23),
					new Power("Bloodstorm","ranger","Daily",25),
					new Power("Tiger's Reflex","ranger","Daily",25),
					new Power("Death Rend","ranger","Encounter",27),
					new Power("Hall of Arrows","ranger","Encounter",27),
					new Power("Lightning Shot","ranger","Encounter",27),
					new Power("Wandering Tornado","ranger","Enncounter",27),
					new Power("Follow-Up Blow","ranger","Daily",29),
					new Power("Three-In-One Shot","ranger","Daily",29),
					new Power("Weave a Web of Steel","ranger","Daily",29),
					new Power("Deft Strike","rogue","At-Will",1),
					new Power("Piercing Strike","rogue","At-Will",1),
					new Power("Diposta Strike","rogue","At-Will",1),
					new Power("Sly Flourish","rogue","At-Will",1),
					new Power("Dazing Strike","rogue","Encounter",1),
					new Power("King's Castle","rogue","Encounter",1),
					new Power("Positioning Strike","rogue","Encounter",1),
					new Power("Torturous Strike","rogue","Encounter",1),
					new Power("Blinding Barrage","rogue","Daily",1),
					new Power("Easy Target","rogue","Daily",1),
					new Power("Trick Strike","rogue","Daily",1),
					new Power("Fleeting Ghost","rogue","Utility",2),
					new Power("Great Leap","rogue","Utility",2),
					new Power("Master of Deceit","rogue","Utility",2),
					new Power("Tumble","rogue","Utility",2),
					new Power("Bait and Switch","rogue","Encounter",3),
					new Power("Setup Strike","rogue","Encounter",3),
					new Power("Topple Over","rogue","Encounter",3),
					new Power("Trickster's Blade","rogue","Encounter",3),
					new Power("Clever Riposte","rogue","Daily",5),
					new Power("Deep Cut","rogue","Daily",5),
					new Power("Walking Wounded","rogue","Daily",5),
					new Power("Chameleon","rogue","Utility",6),
					new Power("Ignoble Escape","rogue","Utility",6),
					new Power("Mob Mentality","rogue","Utility",6),
					new Power("Nimble Climb","rogue","Utility",6),
					new Power("Slippery Mind","rogue","Utility",6),
					new Power("Cloud of Steel","rogue","Encounter",7),
					new Power("Imperiling Strike","rogue","Encounter",7),
					new Power("Rogue's Luck","rogue","Encounter",7),
					new Power("Send in the Eyes","rogue","Encounter",7),
					new Power("Crimson Edge","rogue","Daily",9),
					new Power("Deadly Positioning","rogue","Daily",9),
					new Power("Knockout","rogue","Daily",9),
					new Power("Certain Freedom","rogue","Utility",10),
					new Power("Close Quarters","rogue","Utility",10),
					new Power("Dangerous Theft","rogue","Utility",10),
					new Power("Shadow Stride","rogue","Utility",10),
					new Power("Fool's Opportunity","rogue","Encounter",13),
					new Power("Stunning Strike","rogue","Encounter",13),
					new Power("Tornado Strike","rogue","Encounter",13),
					new Power("Unbalancing Attack","rogue","Encounter",13),
					new Power("Bloody Path","rogue","Daily",15),
					new Power("Garrote Grip","rogue","Daily",15),
					new Power("Slaying Stirke","rogue","Daily",15),
					new Power("Foil the Lock","rogue","Utility",16),
					new Power("Hide in Plain Sight","rogue","Utility",16),
					new Power("Leaping Dodge","rogue","Utility",16),
					new Power("Raise the Stakes","rogue","Utility",16),
					new Power("Dragon Tail Strike","rogue","Encounter",17),
					new Power("Hounding Strike","rogue","Encounter",17),
					new Power("Stab and Grab","rogue","Encounter",17),
					new Power("Feiting Flurry","rogue","Daily",19),
					new Power("Flying Foe","rogue","Daily",19),
					new Power("Snake's Retreat","rogue","Daily",19),
					new Power("Cloud Jump","rogue","Utility",22),
					new Power("Dazzling Acrobatics","rogue","Utility",22),
					new Power("Hide from the Light","rogue","Utility",22),
					new Power("Knave's Gambit","rogue","Encounter",23),
					new Power("Scorpion Strike","rogue","Encounter",23),
					new Power("Steel Entrapment","rogue","Encounter",23),
					new Power("Biting Assault","rogue","Daily",25),
					new Power("Ghost on the Wind","rogue","Daily",25),
					new Power("Hamstring","rogue","Daily",25),
					new Power("Dance of Death","rogue","Encounter",27),
					new Power("Hurricane of Blood","rogue","Encounter",27),
					new Power("Perfect Strike","rogue","Encounter",27),
					new Power("Assassin's Point","rogue","Daily",29),
					new Power("Immobilizing Strike","rogue","Daily",29),
					new Power("Moving Target","rogue","Daily",29),
					new Power("Dire Radiance","warlock","At-Will",1),
					new Power("Eldritch Blast","warlock","At-Will",1),
					new Power("Eyebite","warlock","At-Will",1),
					new Power("Hellish Rebuke","warlock","At-Will",1),
					new Power("Diabolic Grasp","warlock","Encounter",1),
					new Power("Dreadul Word","warlock","Encounter",1),
					new Power("Vampiric Embrace","warlock","Encounter",1),
					new Power("Witchfire","warlock","Encounter",1),
					new Power("Armor of Agathys","warlock","Daily",1),
					new Power("Curse of the Drak Dream","warlock","Daily",1),
					new Power("Dread Star","warlock","Daily",1),
					new Power("Flames of Phlegethos","warlock","Daily",1),
					new Power("Beguiling Tongue","warlock","Utility",2),
					new Power("Ethereal Stride","warlock","Utility",2),
					new Power("Fiendish Resilience","warlock","Utility",2),
					new Power("Shadow Veil","warlock","Utility",2),
					new Power("Eldritch Rain","warlock","Encounter",3),
					new Power("Fiery Bolt","warlock","Encounter",3),
					new Power("Frigid Darkness","warlock","Encounter",3),
					new Power("Otherwind Stride","warlock","Encounter",3),
					new Power("Avernian Eruption","warlock","Daily",5),
					new Power("Crown of Madness","warlock","Daily",5),
					new Power("Curse of the Bloody Fangs","warlock","Daily",5),
					new Power("Hunger of Hadar","warlock","Daily",5),
					new Power("Dark One's Luck","warlock","Utility",6),
					new Power("Fey Switch","warlock","Utility",6),
					new Power("Shroud of Black Steel","warlock","Utility",6),
					new Power("Spider Blimb","warlock","Utility",6),
					new Power("Howl of Doom","warlock","Encounter",7),
					new Power("Infernal Moon Curse","warlock","Encounter",7),
					new Power("Mire the Mind","warlock","Encounter",7),
					new Power("Sign of Ill Omen","warlock","Encounter",7),
					new Power("Curse of the Black Frost","warlock","Daily",9),
					new Power("Iron Spike of Dis","warlock","Daily",9),
					new Power("Summons of Khired","warlock","Daily",9),
					new Power("Theif of Five Fates","warlock","Daily",9),
					new Power("Ambassador Imp","warlock","Utility",10),
					new Power("Shadow Form","warlock","Utility",10),
					new Power("Shielding Shades","warlock","Utility",10),
					new Power("Warlock's Leap","warlock","Utility",10),
					new Power("Bewitching Whispers","warlock","Encounter",13),
					new Power("Coldfire Vortex","warlock","Encounter",13),
					new Power("Harrowstorm","warlock","Encounter",13),
					new Power("Soul Flaying","warlock","Encounter",13),
					new Power("Curse of the Golden Mist","warlock","Daily",15),
					new Power("Fireswarm","warlock","Daily",15),
					new Power("Tendrils of Thuban","warlock","Daily",15),
					new Power("Thirsting Maw","warlock","Daily",15),
					new Power("Cloak of Shadow","warlock","Utility",16),
					new Power("Eye of the Warlock","warlock","Utility",16),
					new Power("Infuriating Elusiveness","warlock","Utility",16),
					new Power("Strand of Date","warlock","Encounter",17),
					new Power("Thristing Tendrils","warlock","Encounter",17),
					new Power("Warlock's Bargain","warlock","Encounter",17),
					new Power("Delusions of Loyalty","warlock","Daily",19),
					new Power("Minions of Malbolge","warlock","Daily",19),
					new Power("Wrath of Acamar","warlock","Daily",19),
					new Power("Entropic Ward","warlock","Utility",22),
					new Power("Raven's Glamor","warlock","Utility",22),
					new Power("Wings of the Fiend","warlock","Utility",22),
					new Power("Dark Transport","warlock","Encounter",23),
					new Power("Spitefull Darts","warlock","Encounter",23),
					new Power("Thorns of Venom","warlock","Encounter",23),
					new Power("Curse of the Twin Princes","warlock","Daily",25),
					new Power("Tartareen Tomb","warlock","Daily",25),
					new Power("Thirteen Baleful Stars","warlock","Daily",25),
					new Power("Banish to the Void","warlock","Encounter",27),
					new Power("Curse of the Fey King","warlock","Encounter",27),
					new Power("Hellfire Curse","warlock","Encounter",27),
					new Power("Curse of the Dark Delirium","warlock","Daily",29),
					new Power("Doom of Delban","warlock","Daily",29),
					new Power("Hurl through Hell","warlock","Daily",29),
					new Power("Commander's Strike","warlord","At-Will",1),
					new Power("Furious Smash","warlord","At-Will",1),
					new Power("Viper's Smash","warlord","At-Will",1),
					new Power("Wolf Pack Tactics","warlord","At-Will",1),
					new Power("Guarding Attack","warlord","Encounter",1),
					new Power("Hammer and Anvil","warlord","Encounter",1),
					new Power("Leaf on the Wind","warlord","Encounter",1),
					new Power("Warlord's Favor","warlord","Encounter",1),
					new Power("Bastion of Defense","warlord","Daily",1),
					new Power("Lead the Attack","warlord","Daily",1),
					new Power("Pin the Foe","warlord","Daily",1),
					new Power("White Raven Onslaught","warlord","Daily",1),
					new Power("Aid the Injured","warlord","Utility",2),
					new Power("Crescendo of Violence","warlord","Utility",2),
					new Power("Knight's Move","warlord","Utility",2),
					new Power("Shake it Off","warlord","Utility",2),
					new Power("Hold the Line","warlord","Encounter",3),
					new Power("Inspiring War Cry","warlord","Encounter",3),
					new Power("Steel Monsoon","warlord","Encounter",3),
					new Power("Warlord's Strike","warlord","Encounter",3),
					new Power("Stand the Fallen","warlord","Daily",5),
					new Power("Turning Point","warlord","Daily",5),
					new Power("Villian's Nightmare","warlord","Daily",5),
					new Power("Guide the Charge","warlord","Utility",6),
					new Power("Inspiring Reaction","warlord","Utility",6),
					new Power("Quick Step","warlord","Utility",6),
					new Power("Stand Tough","warlord","Utility",6),
					new Power("Lion's Roar","warlord","Encounter",7),
					new Power("Sunder Armor","warlord","Encounter",7),
					new Power("Suprise Attack","warlord","Encounter",7),
					new Power("Surround Foe","warlord","Encounter",7),
					new Power("Iron Dungeon Charge","warlord","Daily",9),
					new Power("Knock Them Down","warlord","Daily",9),
					new Power("White Raven Strike","warlord","Daily",9),
					new Power("Defensive Rally","warlord","Utility",10),
					new Power("Ease Suffering","warlord","Utility",10),
					new Power("Tactical Shift","warlord","Utility",10),
					new Power("Beat Them Into the Ground","warlord","Encounter",13),
					new Power("Bolstering Blow","warlord","Encounter",13),
					new Power("Denying Strike","warlord","Encounter",13),
					new Power("Fury of the Sirocco","warlord","Encounter",13),
					new Power("Make Them Bleed","warlord","Daily",15),
					new Power("Renew the Troops","warlord","Daily",15),
					new Power("Warlord's Gambit","warlord","Daily",15),
					new Power("Hero's Defense","warlord","Utility",16),
					new Power("Warlord's Banner","warlord","Utility",16),
					new Power("White Raven Formation","warlord","Utility",16),
					new Power("Battle On","warlord","Encounter",17),
					new Power("Hall of Steel","warlord","Encunter",17),
					new Power("Thunderous Cry","warlord","Encounter",17),
					new Power("Warlord's Rush","warlord","Encounter",17),
					new Power("Break the Tempo","warlord","Daily",19),
					new Power("Victory Suge ","warlord","Daily",19),
					new Power("Windmill of Doom","warlord","Daily",19),
					new Power("Heart of the Titan","warlord","Utility",22),
					new Power("Heroic Surge","warlord","Utility",22),
					new Power("Own the Battlefield","warlord","Utility",22),
					new Power("Great Dragon War Cry","warlord","Encounter",23),
					new Power("Pillar to Post","warlord","Encounter",23),
					new Power("Rabbits and Wolves","warlord","Encounter",23),
					new Power("Sudden Assault","warlord","Encounter",23),
					new Power("Relentles Assault","warlord","Daily",25),
					new Power("Stir the Hornet's Nest","warlord","Daily",25),
					new Power("White Raven's Call","warlord","Daily",25),
					new Power("Chimera Battlestrike","warlord","Encounter",27),
					new Power("Devastating Charge","warlord","Encounter",27),
					new Power("Incite Heroism","warlord","Encounter",27),
					new Power("Warlord's Doom","warlord","Encounter",27),
					new Power("Defy Death","warlord","Daily",29),
					new Power("Stand Invincible","warlord","Daily",29)];