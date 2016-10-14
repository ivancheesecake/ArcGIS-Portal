/*    Filename: loginregister.js
 *	Type: Javascript file
 *	Description: Scripts for the Phil-LiDAR UPLB File Repository Web application Login & Registration page
 *	Author: Ivan Marc H. Escamos
 *	Date Modified: 10/09/2014
					====================================*/

$(document).ready(function(){

	initialize();
});

function initialize(){
	
	if($(window).width()<992){
		$('#main-container').height("auto");
		$('#push').show();
		}

	else{	
		$('#left>.well').css("padding-top",$(window).height() - 800)
		$('#main-container').height($(window).height() - 140);
        if(($("#right>.well").height()-620)>0  )
		    $('#register-header-section').css("margin-top",($("#right>.well").height()-620)/2);
		// $('#register-header-section').css("margin-top",($("#right>.well").height()-620)/8);

		$('#push').hide();
	}
	positionFormControls();
}

$(window).on('resize', function(){
    
    initialize();
    
});


function positionFormControls(){

	console.log($('#right').height());

	if($('#right').height() > 600){
		$('#register-section2').removeClass('col-md-6');
		$('#register-section2').addClass('col-md-12');
		$('#register-section3').removeClass('col-md-6');
		$('#register-section3').addClass('col-md-12');
	}
    
    else{
    	$('#register-section2').removeClass('col-md-12');
		$('#register-section2').addClass('col-md-6');
		$('#register-section3').removeClass('col-md-12');
		$('#register-section3').addClass('col-md-6');
	}
}

function sanitize(str){
 	
    var rex = /(<([^>]+)>)/ig;		//taken from: http://stackoverflow.com/questions/13911681/remove-html-tags-from-a-javascript-string 
    var out =  str.replace(rex , "");	//strip html tags from input
    $.trim(out);
    
    return out;
    //magdagdag pa ng code for input sanitization later	
}