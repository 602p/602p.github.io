var timeline;
var events={};
var selections={
	relief:true,
	recovery:true,
	reform:true
};

function setPrograms(relief, recovery, reform){
	var list=[];
	for (var program of document.newDealData){
		if ((program.tags.indexOf("relief")>-1 && relief)||
			(program.tags.indexOf("recovery")>-1 && recovery)||
			(program.tags.indexOf("reform")>-1 && reform)){
			list.push(program);
		}
		events[program.id]=program;
	}
	timeline.setItems(new vis.DataSet(list));
}

function updateSelections(e){
	selections[e.toElement.id]=!selections[e.toElement.id];
	$("#"+e.toElement.id).css("text-decoration", selections[e.toElement.id]?"none":"line-through");
	setPrograms(selections.relief, selections.recovery, selections.reform);
}

function showBox(e){
	$(events[e.items[0]].body).appendTo("body").modal();
}

$(document).ready(function(){
	$("#show-help").hide();

	$("#show-help").click(function(e){
		$("#show-help").hide();
		$("#help").show();
	});

	$("#hide-help").click(function(e){
		$("#show-help").show();
		$("#help").hide();
	});

	// DOM element where the Timeline will be attached
	var container = document.getElementById('visualization');

	// Create a DataSet (allows two way data-binding)
	var items = new vis.DataSet([]);

	// Configuration for the Timeline
	var options = {
		"height":"70%",
		"stack":true,
		"start":"1933-01-04",
		"end":"1940-07-12"
	};

	// Create a Timeline
	timeline = new vis.Timeline(container, items, options);
	setPrograms(true, true, true);

	timeline.on("select", showBox);

	$(".sel-box").click(updateSelections);
})

