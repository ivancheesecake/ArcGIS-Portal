
/*	Filename: admin.js
 *	Type: Javascript file
 *	Description: Scripts for the Phil-LiDAR UPLB File Repository Administrator page
 *	Author: Ivan Marc H. Escamos
 *	Date Modified: 10/13/2014
 *	Notes: For every ajax request made, load a spinner to disable simultaneous requests 
					====================================*/

/* Section 1
 * Application Initialization

					====================================*/

//Initialize dummy files
// files=[{id:1,filename:"Laguna Geological Information",category:"Geophysical Environment",subcategory:"Geology",filetype:1,extension:".docx",searchtag:"",province:"Laguna",filesize:3.45},{id:2,filename:"Mindoro_school_directory",category:"Socio-Economic Profile",subcategory:"Education",filetype:1,extension:".docx",searchtag:"",province:"Mindoro",filesize:.23},{id:3,filename:"History of Laguna",category:"General Information",subcategory:"History",filetype:1,extension:".docx",searchtag:"",province:"Laguna",filesize:1.63},{id:4,filename:"map_romblon_political_boundaries",category:"General Information",subcategory:"Political Boundaries",filetype:2,extension:".jpg",searchtag:"",province:"Romblon",filesize:.74},{id:5,filename:"Oriental Mindoro Forest Cover",category:"Geophysical Environment",subcategory:"Land Resources",filetype:2,extension:".png",searchtag:"",province:"Mindoro",filesize:3.74},{id:6,filename:"Protected Areas - Palawan",category:"Environmental Management",subcategory:"",filetype:2,extension:".jpg",searchtag:"",province:"Palawan",filesize:1.43},{id:7,filename:"map_climate_sta_cruz",category:"Geophysical Environment",subcategory:"Climate",filetype:2,extension:".jpg",searchtag:"",province:"Laguna",filesize:.37},{id:8,filename:"marinduque-population-statistics",category:"Socio-Economic Profile",subcategory:"Population",filetype:3,extension:".xlsx",searchtag:"",province:"Marinduque",filesize:.21},{id:9,filename:"Census-Romblon",category:"Socio-Economic Profile",subcategory:"Population",filetype:4,extension:".pdf",searchtag:"",province:"Romblon",filesize:9.81}];

//Initialize variables for user data

var filter = {province: "Province", filetype:0}; //wag kalimutan na palitan ng province ID's in the future
var categories = [];
var subcategories = [];
// var filetypes = [];
var colors = [];
var icons = [];
var addSubcatActive = false;
var editCatActive = false;
var editSubcatActive = false;
var editFiletypeActive = false;
var changepwActive = false;
var toggledView = 1;
var fileStart =0;
var fileEnd = 15;
var newFileStart = 0;
var newFileEnd = 15;

//When the page is ready, initialize the page
$(document).ready(function() {

	$('#main-container').height($(window).height() - 140);
	$('#secondary-container').height($(window).height() - 140);
	$('#cart-number').hide();

	initialize();

});

function initialize(){
	if(page == 0){
		renderCategoriesAndSubcategories(catsub);
		renderFiletypes(filetypes);	
		renderFiles(files);
		populateDropdowns(catsub,filetypes);

		$('#main-container').hide();
		$('#secondary-container').show();
	}
	if(page == 1){
		renderManageUser(manageuser)
	}
}



spinnerDiv ="<div id='spinner-div'><img src='http://localhost/repositoryPrototype/img/spinner.gif' /></div>"

/*Pagination!*/
$('.pagination').click(function(event) {
	/* Act on the event */
	
	type = $(this).data('pagination');
	
	if(type=='next'){
		//add condition pag nasa dulo 
		newFileStart= (fileEnd<=numfiles)?fileStart+15:fileStart;	
		newFileEnd= (fileEnd<=numfiles)?fileEnd+15:fileEnd;	
		// console.log("CLICKED");
	}
	else{
		newFileStart = (fileStart!=0) ?fileStart-15:0;
		newFileEnd = (fileStart!=0) ? fileEnd-15:15;
		// 
	}
	

	if(newFileStart!=fileStart && newFileEnd!=fileEnd){
		// console.log("CLICKED");
		$("#filetable-row").html(spinnerDiv);
		//perform ajax
		var data = {start_index: newFileStart, end_index: newFileEnd};
		// console.log(dataX);
		console.log(data);
		$.ajax({
			url: 'http://localhost/repositoryPrototype/index.php/admin/loadFiles',
			type: 'POST',
			dataType: 'json',
			data: data,
			success: function(resp){
				$("#filetable-row").html("<div class='col-md-12'><table class='table table-striped table-hover' id='file-table'></table></div>");
				renderFiles(resp)
			}
		})
		.done(function() {
			console.log("success");
			fileStart = newFileStart;
			fileEnd = newFileEnd;

			if(fileEnd>=numfiles){
				$('.pagination[data-pagination="next"]').addClass('pagination-inactive')
				$('.pagination[data-pagination="prev"]').removeClass('pagination-inactive');

			}
			if(fileStart == 0){

				$('.pagination[data-pagination="prev"]').addClass('pagination-inactive')
				$('.pagination[data-pagination="next"]').removeClass('pagination-inactive');
			}


		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
		
	}

});


/* Section 5
 * Scripts for Manage Users
					====================================*/
function renderManageUser(manageuser){
	/* console.log(manageuser) */
	htmlString="<tr><th>ID</th><th>User Name</th><th>Email Address</th><th>Full Name</th><th>Designation</th><th>Colleges</th><th>Contact Number</th><th>Status</th><th>Actions</th></tr>"

	for(var i=0; i<manageuser.length; i++){
		htmlString+="<tr>";
		htmlString+="<td class='id'>"+manageuser[i].id+"</td>";
		htmlString+="<td class='username'>"+manageuser[i].username+"</td>";
		htmlString+="<td>"+manageuser[i].email+"</td>";
		htmlString+="<td>"+manageuser[i].fullname+"</td>";
		htmlString+="<td>"+manageuser[i].designation+"</td>";
		htmlString+="<td>"+manageuser[i].colleges+"</td>";
		htmlString+="<td>"+manageuser[i].contact+"</td>";
		
		if (manageuser[i].isactive == 1)
			htmlString+="<td><button type='button' class='btn btn-info toggle-user toggle-user-enabled' data-userid='"+manageuser[i].id+"'>Enabled</button></td>"
		else
			htmlString+="<td><button type='button' class='btn btn-danger toggle-user toggle-user-disabled' data-userid='"+manageuser[i].id+"'>Disabled</button></td>"
		
		htmlString+="<td><button type='button' class='btn btn-info change-pw' data-userid='"+manageuser[i].id+"'><i class='fa fa-unlock'></button></td>"

		htmlString+="</tr>";
	}

	$('#manage-user').html(htmlString);

	$('.toggle-user-enabled').mouseenter(function(event) {
		$(this).removeClass("btn-info");
		$(this).addClass("btn-danger");
		$(this).html("Disable");
	});

	$('.toggle-user-enabled').mouseleave(function(event) {
		$(this).removeClass("btn-danger");
	 	$(this).addClass("btn-info");
	 	$(this).html("Enabled");
	});

	$('.toggle-user-disabled').mouseenter(function(event) {
		$(this).removeClass("btn-danger");
	 	$(this).addClass("btn-info");
	 	$(this).html("Enable");
	});

	$('.toggle-user-disabled').mouseleave(function(event) {
		$(this).removeClass("btn-info");
		$(this).addClass("btn-danger");
		$(this).html("Disabled");
	});


	$('.toggle-user').click(function(event) 
	{

	var dis = 0;
	if ($(this).html() == "Disable") 
		dis = 0;
	else 
		dis = 1;

	var data = {
		userid: $(this).data("userid"), dis: dis
	};

	$.ajax({
			url: 'http://localhost/portalprototype/index.php/admin/enabledisableuser',
			type: 'POST',
			dataType: 'json',
			data: data,
			success: function(resp){

				renderManageUser(resp);
			}
		})
		.done(function() {
			alertify.success("User Activation Status successfully changed!");
		})
		.fail(function() {
			alertify.error("User Activation Status was not successfully changed.");
		})
		.always(function() {
		});
	});
	
	//attach onclick events to #cart-toggle & #cart-close
	$(".change-pw").click(function(event) {
		
		changepwId = $(this).parent().siblings('.id').html()
		changepwUsername = $(this).parent().siblings('.username').html()
		$('#changepw-username').val(changepwUsername);
		$('#changepw-password').val("");
		$('#changepw-cpassword').val("");
		$('.change-pw-save').data('userid',changepwId);
		
		if(!changepwActive)
			toggleCart();	
		
	});

	
}

$(".change-pw-save").click(function(event) {
	// console.log($('#changepw-password').val());

	data = {editId:$(this).data('userid'), editVal: sanitize($('#changepw-password').val())};
	//console.log(data);
	if(data.editVal !="" && (data.editVal == $('#changepw-cpassword').val())){
		
		$.ajax({
			url: 'http://localhost/portalprototype/index.php/admin/changePassword',
			type: 'POST',
			dataType: 'json',
			data: data,
			success: function(resp){
				$('#changepw-password').val("");
				$('#changepw-cpassword').val("");
			}
		})
		.done(function() {
			
			alertify.success("Password successfully changed!");
		})
		.fail(function() {
			alertify.error("Password was not successfully changed.");
		})
		.always(function() {
		});
	}
	else{
		alertify.error("Invalid input for changing password.");
	}
	

});

//change password window
$("#offcanvas-changepw").height($(window).height()-100);
$("#offcanvas-changepw-body").height($("#offcanvas-changepw").height()-210);


$("#changepw-close").click(function(event) {
	toggleCart();	
});

//function for hiding & displaying the offcanvas cart
function toggleCart(){

	if($("#offcanvas-changepw").hasClass(".show-nav")){
		$("#offcanvas-changepw").removeClass(".show-nav");
		$("#offcanvas-changepw").css("left",-315);
		changepwActive = false;
	}
	else{
		$("#offcanvas-changepw").addClass(".show-nav");
		$("#offcanvas-changepw").css("left",0);
		changepwActive = true;
	}



}



/* Section 8
 * Security
					====================================*/

function sanitize(str){
 	
    var rex = /(<([^>]+)>)/ig;		//taken from: http://stackoverflow.com/questions/13911681/remove-html-tags-from-a-javascript-string 
    str.replace(rex , "");	//strip html tags from input
    return str;
    //magdagdag pa ng code for input sanitization later	
}



/* Section 9
 * Other Application Logic
					====================================*/
$('.logout').click(function(event) {
	var loc = window.location;
	console.log(loc);
	loc = loc.origin+"/portalprototype/index.php/admin/logout";
	//replace repositoryPrototype when deployed
	window.location.replace(loc);
});



/*Responsiveness hacks
					====================================*/

$(window).resize(function() {

	if($(window).width()>991){
		$('#main-container').height($(window).height() - 140);
		$('#left').height('100%');
		$('#right').height('100%');
		}
	else{
		$('#main-container').height($(window).height() * 2);
		$('#left').height('auto');
		$('#right').height('auto');
	}

	$('#display-pane-middle').height($(window).height()-220);

});

