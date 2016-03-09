function compare(a,b) {
  if (a.last_nom < b.last_nom)
	 return -1;
  if (a.last_nom > b.last_nom)
	return 1;
  return 0;
}


function compileOrder(){
	function compare(a,b) {
		if (a.rollInitiative() < b.rollInitiative())
			return -1;
		if (a.rollInitiative() > b.rollInitiative())
			return 1;
		return 0;
	}
	var allActors=[];
	for (var i = 0; i < Players.length; i++) {
		allActors[allActors.length] = Players[i];
	};
	for (var i = 0; i < Monsters.length; i++) {
		allActors[allActors.length]= Monsters[i];
	};
	var Order=allActors.sort(compare);
	return Order;
}

function attack(defender, damage){
	defender.hp=defender.hp - damage;
}

var Order;

function updateHP () {
	for (var i = 0; i < Order.length; i++) {
		$("div[data-i="+i+"]").find(".hpStat").text(Order[i].hp);
	};
}

function startTurn(){
	Order=compileOrder();
	if(Order.length==0){
		return;
	}
	$("#orderList").empty();
	var currentCharacter=0;
	for (var i = 0; i < Order.length; i++) {
		if(Order[i].type=="player"){
			$("#orderList").append("<div class='player' data-i="+i+"><h4>"+Order[i].name+"</h4><h6>Level "+Order[i].level+" "+Order[i].race+" "+Order[i].Class+", HP:<span class='hpStat'>"+Order[i].hp+"</span></h6></div>");
		}
		if(Order[i].type=="monster"){
			$("#orderList").append("<div class='monster' data-i="+i+"><h4>"+Order[i].name+"</h4><h6>Level "+Order[i].level+" "+Order[i].role+" "+Order[i].xp+" XP, HP:<span class='hpStat'>"+Order[i].hp+"</span></h6></div>");
		}
	};
	updateHP();
	turn(currentCharacter);
	console.log(Order);
	function turn(cur){
		
		// Wraps current player in a panel
		$("#orderList").find("div[data-i='"+cur+"']").wrap("<div class='panel-body'></div>").wrap("<div class='panel panel-default'></div>");


		$("#turnArea").empty();
		
		// Put turn Code here
		$("#turnArea").append("<div class='row'><div class='col-md-3'><select id='turnChoice' class='form-control'><option value='attack'>Attack</option><option value='usePower'>Use Specific Power</option><option value='makeCamp'>Make Camp</option></select></div></div>");
		
		$("#turnChoice").change(function(){
			$("#turnArea").append("<div id='choiceArea'></div>");
			$("#nextTurn").remove();

			$(".powerChooser").remove();
			$(".attackInputs").remove();
			$(".utilityInputs").remove();
			

			// Code for Attack
			

			if($("#turnChoice").val()=="attack"){			
				$("#choiceArea").empty();
				$("#choiceArea").append("<label for='target'>Target</label>");
				$("#choiceArea").append("<select id='target' class='form-control'></select>");
				var target;
				for (var i = 0; i < Order.length; i++) {
					if(Order[cur].type!=Order[i].type){
						$("#target").append("</br><option value='"+i+"' class='targetOption'>"+Order[i].name+"</option>");
					}
				};
				$("#choiceArea").append("<br><label for='attack'>How much damage does it do?</label><input type='number' class='form-control' id='damage'></input>");
				$("#choiceArea").append("<br><button class='btn' id='attackButton'>ATTACK</button>");
				if($(".targetOption").size()==0){
					$("#attackButton").attr("disabled","disabled");
				}
				$("#attackButton").click(function (){
					target = Order[$("#target").val()];
					attack(target,$('#damage').val());
					checkDead(target);
					nextTurn();
				});
			}
			

			// Code for Using a Power
			

			if($("#turnChoice").val()=="usePower"){
				
				$("#choiceArea").empty();

				// Start Copied code from powers.js
				if(Order[cur].type=="player"){
					$("#powerArea").empty();
					var PowerChoices = Order[cur].powers;
					$("#turnArea").append("<div id='powerArea' class='col-md-3 powerChooser'><label for='powerSelect'>Select Power</label><select id='powerSelect' class='form-control'></select></div>");
					for (var i = 0; i < PowerChoices.length; i++) {
						$("#powerSelect").append("<option value='"+i+"'>"+PowerChoices[i]+"</option>");
					};
					var type;
					$("#powerSelect").change(function (){
						$(".attackInputs").remove();
						$(".utilityInputs").remove();
						$("#targetArea").remove();
						$("br").remove();
						for(var i=0;i<allPlayerPowers.length;i++){
							console.log(PowerChoices[$("#powerSelect").val()]);
							if(PowerChoices[$("#powerSelect").val()].toUpperCase()==allPlayerPowers[i].name.toUpperCase() && allPlayerPowers[i].type == "Utility"){
								type="Utility";
								break;
							}
							else{
								type="Attack";
							}
						};
						if(type=="Attack"){
							console.log("attack");
							$("#turnArea").append("<div id='targetArea' class='col-md-3 attackInputs'><label for='target' class='attackInputs'>Target:</label><select id='target' class='form-control attackInputs'></select></div>");
							var target;
							for (var i = 0; i < Order.length; i++) {
								if(Order[cur].type!=Order[i].type){
									$("#target").append("<option value='"+i+"'>"+Order[i].name+"</option>");
								}
							};
							$("#powerArea").append("<br><label for='damage' class='attackInputs'>How much damage does it do?</label><input type='number' class='form-control attackInputs' id='damage'></input>");
							$("#powerArea").append("<br><button class='btn attackInputs' id='executePower'>Use Power</button>");
							if($("#target").size()==0){
								$("#executePower").attr("disabled","disabled");
							}
							if($(".targetOption").size()==0){
								$("#attackButton").attr("disabled","disabled");
							}
							$("#executePower").click(function (){
								target = Order[$("#target").val()];
								attack(target,$('#damage').val());
								checkDead(target);
								nextTurn();
							});
						}
						if(type=="Utility"){
							console.log("Utility");
							$("#powerArea").append("<br><button class='btn utilityInputs' id='executePower'>Use Power</button>");
							$("#executePower").click(function(){
								nextTurn();
							});
						}
					});
					$("#powerSelect").trigger("change");
				}
				
				if(Order[cur].type=="monster"){
					var PowerChoices = Order[cur].power;
					$("#turnArea").append("<div id='powerArea' class='col-md-3'><label for='powerSelect'>Select Power</label><select id='powerSelect' class='form-control'></select></div>");
					for (var i = 0; i < PowerChoices.length; i++) {
						$("#powerSelect").append("<option value='"+i+"'>"+PowerChoices[i].name+"</option>");
					};
					$("#turnArea").append("<div id='targetArea' class='col-md-3'><label for='target' class='attackInputs'>Target:</label><select id='target' class='form-control'></select></div>");
					for (var i = 0; i < Order.length; i++) {
						if(Order[cur].type!=Order[i].type){
							$("#target").append("<option value='"+i+"'>"+Order[i].name+"</option>");
						}
					};
					$("#powerArea").append("<br><label for='damage' class='attackInputs'>How much damage does it do?</label><input type='number' class='form-control attackInputs' id='damage'></input>");
					$("#powerArea").append("<br><button class='btn attackInputs' id='executePower'>Use Power</button>");
						if($("#target").size()==0){
							$("#executePower").attr("disabled","disabled");
						}
						$("#executePower").click(function (){
							target = Order[$("#target").val()];
							attack(target,$('#damage').val());
							checkDead(target);
							nextTurn();
						});
				}
				// End Copied code from powers.js


				
			}
			// Code For Makin' da Camp
			if($("#turnChoice").val()=="makeCamp"){
				$("#turnArea").append("<button class='btn' id='nextTurn' onclick='nextTurn()'><span class='glyphicon glyphicon-fire'></span> Make a Happy Little Camp</button>");
				$("#choiceArea").empty();
			

			}
			$("#nextTurn").click(function(){
				nextTurn();
			});
		});
		$("#turnChoice").trigger("change");

		// Next Turn Stuff (goes to first player after last player hits next turn)
		function nextTurn(){
			if(cur<(Order.length-1)){
				cur+=1;
				$("#orderList").find("div[data-i='"+(cur-1)+"']").unwrap().unwrap();
				turn(cur);
			}
			else{
				$("#orderList").find("div[data-i='"+(cur)+"']").unwrap().unwrap();
				cur=0;
				turn(cur);
			}
			updateHP();
		}
		
	}
}
function checkDead(dude){
	if(dude.hp <= 0){
		if(dude.type=="player"){
			var location;
			for (var i = 0; i < Players.length; i++) {
				if(Players[i].name==dude.name){
					location==i;
				}	
			};
			Players.splice(location,1);
			updateMonsterList();
			updatePlayerList();
			startTurn();
		}
		if(dude.type=="monster"){
			var location;
			for (var i = 0; i < Monsters.length; i++) {
				if(Monsters[i].name==dude.name){
					location==i;
				}
			};
			Monsters.splice(location,1);
			updateMonsterList();
			updatePlayerList();
			startTurn();

		}
	}
	updateHP();
}

// Choices:

// Attack
// Make Camp
// Use Power at something