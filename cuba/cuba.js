var timeline;

function showBox(e){
	$(document.cubaData[e.items[0]].body).appendTo("body").modal();
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
	var items = new vis.DataSet(document.cubaData);

	// Configuration for the Timeline
	var options = {
		"height":"70%",
		"stack":true,
		"start":"1953-01-04",
		"end":"1972-07-12"
	};

	// Create a Timeline
	timeline = new vis.Timeline(container, items, options);

	timeline.on("select", showBox);
})

