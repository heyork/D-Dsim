$("input").change(function(){saveMonster();});

var countBox =1;
function addPower()
{
	$("#Powers").append("<div class='row' id='Power"+countBox+"'></br><div class='col-md-2'><label for='PowerName"+countBox+"'>Name</label></br><input type='text' id='PowerName"+countBox+"' class='form-control'></div><div class='col-md-2'><label for='PowerAttack"+countBox+"'>Attack</label></br><input type='text' id='PowerAttack"+countBox+"' class='form-control'></div><div class='col-md-2'><label for='PowerRecharge"+countBox+"'>Recharge</label></br><input id='PowerRecharge"+countBox+"' class='form-control'></div><div class='col-md-5'><label for='PowerDescription"+countBox+"'>Description</label></br><input type='text' id='PowerDescription"+countBox+"' class='form-control'></div><div class='col-md-1'></br><button type='button' class='btn' onclick='removePower(countBox)'><span class='glyphicon glyphicon-remove'></span></button></div></div>");
	countBox += 1;
}

function removePower(count)
{
	var index = count - 1;
	$("#Power"+index+"").remove();
	countBox = countBox - 1;
}

var NumberBox =1;
function addEquipment()
{
	$("#Equipment").append("<div class='row' id='Equipment"+NumberBox+"'></br><div class='col-md-11'><input type='text' id='Equipment"+NumberBox+"' class='form-control'></div><div class='col-md-1'><button type='button' class='btn' onclick='removeEquipment(NumberBox)'><span class='glyphicon glyphicon-remove'></span></button></div></div>");
	NumberBox += 1;
}

function removeEquipment(count)
{
	var index = count - 1;
	$("#Equipment"+index+"").remove();
	NumberBox = NumberBox - 1;
}

//$("#Powers").change(function(){saveMonster();});
function savePower()
{
	var Powers = new Array();
	for(var i = 1; i < countBox; i++)
	{
		Powers.push($("#PowerName"+i).val());
		Powers.push($("#PowerAttack"+i).val());
		Powers.push($("#PowerRecharge"+i).val());
		Powers.push($("#PowerDescription"+i).val());
	}
	console.log(Powers);
	return Powers;
}

function saveEquipment()
{
	var Equipment = new Array();
	for(var j = 1; j < NumberBox; j++)
	{
		Equipment.push($("#Equipment+j").val());
	}
	return Equipment;
}

function saveMonster()
{
	var Monster = new Array();
	Monster[0]=$("#MonsterName").val();
	Monster[1]=$("#MonsterRole").val();
	Monster[2]=$("#Size").val();
	Monster[3]=$("#Level").val();
	Monster[4]=$("#XP").val();
	Monster[5]=$("#Initiative").val();
	Monster[6]=$("#Sense").val();
	Monster[7]=$("#HitPoints").val();
	Monster[8]=$("#Bloodied").val();
	Monster[9]=$("#ArmorClass").val();
	Monster[10]=$("#Fortitude").val();
	Monster[11]=$("#Reflex").val();
	Monster[12]=$("#Will").val();
	Monster[13]=$("#SavingThrows").val();
	Monster[14]=$("#Speed").val();
	Monster[15]=$("#ActionPoints").val();
	Monster[16]=$("#Alignment").val();
	Monster[17]=$("#Strength").val();
	Monster[18]=$("#Dextarity").val();
	Monster[19]=$("#Wisdom").val();
	Monster[20]=$("#Constitution").val();
	Monster[21]=$("#Intelligence").val();
	Monster[22]=$("#Charisma").val();
	Monster[23]=savePower();
	//Monster[24]=saveEquipment();

	var blob = new Blob([Monster], {type: 'text/plain'});
	$('a').attr("href", window.URL.createObjectURL(blob));
	$('a').attr("download",Monster[0]+".monster");
}

