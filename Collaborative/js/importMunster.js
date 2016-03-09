function rollInitiative()
{
	return rollD20()+Number(this.initiative);
}

function Power(name,attack,recharge,discription)
{
	this.name=name;
	this.attack=attack;
	this.recharge=recharge;
	this.discription=discription;
}

function Monster(name,role,size,level,xp,initiative,sense,hp,bloodied,ac,fort,reflex,will,savingthrows,speed,ap,alignment,str,dex,wis,con,intel,cha,power)
{
	this.name=name;
	this.role=role;
	this.size=size;
	this.level=level;
	this.xp=xp;
	this.initiative=initiative;
	this.sense=sense;
	this.hp=hp;
	this.bloodied=bloodied;
	this.armorclass=ac;
	this.fortitude=fort;
	this.reflex=reflex;
	this.will=will;
	this.savingthrows=savingthrows;
	this.speed=speed;
	this.actionpoints=ap;
	this.alignment=alignment;
	this.strength=str;
	this.dexterity=dex;
	this.wisdom=wis;
	this.constitution=con;
	this.intelligence=intel;
	this.charisma=cha;
	this.power=power;
	this.rollInitiative=rollInitiative;
	this.type="monster";
}

var Monsters=[];

(function(){
	var fileInput = document.getElementById('monsterfileInput');
	var	fileUpload;
	var	results;
	
	
	$("#addMonster").click(function() {
		var file = fileInput.files[0];
		var textType = /text.*/;

		//if (file.type.match(textType)) {
			var reader = new FileReader();
			reader.onload = function(e) {
				fileUpload = reader.result;
				results = fileUpload.split(",");
				var powers=[];
				for(var i = 23;i < results.length;i+=4)
				{
					powers[powers.length]=new Power(results[i],results[i+1],results[i+2],results[i+3]);
				}
				Monsters[Monsters.length]=new Monster(results[0],results[1],results[2],results[3],results[4],results[5],results[6],results[7],results[8],results[9],results[10],results[11],results[12],results[13],results[14],results[15],results[16],results[17],results[18],results[19],results[20],results[21],results[22],powers);
				updateMonsterList();
			};
			reader.readAsText(file);
		// }
		// else{
		//	alert("You Dummy, that isn't a text file");
		// }

	});
})();

function updateMonsterList(){
	$("#monsters").empty();
	for (var i = 0; i < Monsters.length; i++) {
		$("#monsters").append("<div class='monster'><h4>"+Monsters[i].name+"</h4><h6>Level "+Monsters[i].level+" "+Monsters[i].role+" "+Monsters[i].xp+" XP</h6></div>");
	}
}