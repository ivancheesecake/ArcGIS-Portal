
//var newCart = 0;
//var filter = {province: "Province", filetype:0}; //wag kalimutan na palitan ng province ID's in the future
//var categories = [];
//var subcategories = [];
//var filetypeStrings = [];
// var filetypes = [];
//var icons = [];
////When the page is ready, initialize the page

// $(document).ready(function() {

// 	$('#main-container').height($(window).height() - 150);
// 	$('#display-pane-middle').height($(window).height()-200);
// 	$('#display-pane-bottom').hide()
	
	
// });

$(document).ready(function(){

	initialize();
});

function initialize(){
	
	if($(window).width()<992){
		$('body').css("overflow","scroll");
		$('#main-container').height("auto");
		$('#uploaded-files').height("auto");
		$('#push').show();
		
		}

	else{
		$('body').css("overflow","hidden");
		$('#left>.well').css("padding-top",$(window).height() - 800)
		$('#main-container').height($(window).height() - 140);
		$('#uploaded-files').height($('#main-container').height()-60);
		$('#push').hide();
	}
	
	
	
}

$(window).resize(function() {
	
	initialize();
});


/*Responsiveness hacks
					====================================*/

// $(window).resize(function() {

// 	if($(window).width()>991){
// 		$('#main-container').height($(window).height() - 140);
// 		$('#left').height('100%');
// 		$('#right').height('100%');
// 		}
// 	else{
// 		$('#main-container').height($(window).height() * 2);
// 		$('#left').height('auto');
// 		$('#right').height('auto');
// 	}

// 	$('#display-pane-middle').height($(window).height()-220);

// });

// 	$(document).ready(function(){

// 		panel_height = $(window).height()-200;

// 		$("#scroll-tab-content").height(panel_height);

// 	});