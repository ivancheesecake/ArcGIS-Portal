/*	Filename: main.js
 *	Type: Javascript file
 *	Description: Scripts for the Phil-LiDAR UPLB File Repository Web application
 *	Date Modified: 10/07/2014
					====================================*/

/*Initialize Application
					====================================*/

//initialize variables for user data
//i-try mag-cookies sa future
var cart=[];
var cart_ids=[];
var newCart = 0;
//var filter = {province: "Province", filetype:0}; //wag kalimutan na palitan ng province ID's in the future

//when page is ready, initialize the page
$(document).ready(function() {
	initialize();
});


function initialize(){
	
	//
	$('#display-pane-middle').height($(window).height()-200);
	$('#display-pane-bottom').hide();
	$('#cart-number').hide();
	//Initialize categories and subcategories
	initializeNavigationTree();
	//initializeSortBy
	//initializyFilterBy

}

/*Scripts for left side
					====================================*/
// function initializeNavigationTree(){

// 	$.ajax({
// 		type: 'POST',
// 		url: 'http://localhost/repositoryPrototype/index.php/user/initialize',
// 		dataType: 'json',
		
// 		success: function( resp ){
// 			console.log(resp);
// 			var categories = resp.categories;
// 			var subcategories = resp.subcategories;
// 			var htmlString = "";
// 			var subCategoryIndex = 0;

// 			for(var i=0; i< categories.length; i++){
				
// 				htmlString += 
// 				"<li class='active category'>"+
// 				"<a href='#'>"+
// 				categories[i].category+
// 				"<i class='fa fa-caret-down'></i></a></li>";

// 				htmlString += '<li class="category-group">';
				
// 				while(subcategories[subCategoryIndex].category_id == categories[i].id){

// 					htmlString += 
// 					"<a class='subcategory'"+ 
// 					'data-subcategoryid="' + subcategories[subCategoryIndex].id+ '" href="#">'
// 					+subcategories[subCategoryIndex].subcategory+"</a>";
				
// 					subCategoryIndex++;	
// 					if(subCategoryIndex >= subcategories.length)
// 						break;
// 				}

// 				htmlString += '</li>';

// 				$('#tree').html(htmlString);				
				
// 				$('.category-group').hide();
// 				attachAccordion();
// 				attachSubCategoryNavigation();
// 			}
			
// 		},
// 		error: function(resp){
// 			console.log("Error.");
// 		}


// 	});

// console.log("Navigation tree: initialized");
// }


/*Accordion*/

// function attachAccordion(){

// 	$('.category').click(function(e){
// 		$(this).next().slideToggle('fast');
// 	});
// }

// /*Access files through subcategories*/
// function attachSubCategoryNavigation(){

// 	$('.subcategory').click(function(e) {
// 		e.preventDefault();
// 		// console.log("H");

// 		var subcategoryId = {subcategoryId : $(this).data("subcategoryid")};
// 		//console.log(subcategoryId);
// 		$('#display-pane-middle').html("<div class='spinner'><img src='http://localhost/repositoryPrototype/img/spinner.gif'></i></div");
// 		$.ajax({
// 			type: 'POST',
// 			url: 'http://localhost/repositoryPrototype/index.php/user/getData2',
// 			data: subcategoryId,
// 			dataType: 'json',
			
// 			success: function( resp ){
// 				var x = resp[0].subcategory;
// 				//console.log(resp);
// 				//x = resp[0].sub_category;
// 				console.log("Success.");
// 				console.log(x);
// 				$('#display-pane-middle').hide().html(x).fadeIn('fast');
// 			},
// 			error: function(resp){
// 				console.log("Error.");
// 				console.log(resp);
// 			}

// 		});
// 	});
// }

/*Scripts for right side
					====================================*/

/*Toggle View*/
$('#view-toggle').click(function(event){
	if($(this).data("view")==0){
		$(this).data("view",1);
		$(this).html("<i class=\"fa fa-list-ul\"></i>");
	}
	else{
		$(this).data("view",0);
		$(this).html("<i class=\"fa fa-th\"></i>");	
	}
});

// /*Toggle Sort by*/
// $('#sortby-toggle').click(function(event){
// 	if($(this).data("sortby")==0){
// 		$(this).data("sortby",1);
// 		$(this).html("Date Uploaded");
// 	}
// 	else{
// 		$(this).data("sortby",0);
// 		$(this).html("File Name");	
// 	}
// });

// /*Toggle Sort Type*/
// $('#sorttype-toggle').click(function(event){
// 	if($(this).data("sorttype")==0){
// 		$(this).data("sorttype",1);
// 		$(this).html("<i class=\"fa fa-sort-desc\"></i>");
// 	}
// 	else{
// 		$(this).data("sorttype",0);
// 		$(this).html("<i class=\"fa fa-sort-asc\"></i>");	
// 	}
// });

// /*Customized dropdown list for province filter*/
// $('.filter-province-dropdown-item').click(function(event) {
// 	$('#filter-province-dropdown').html($(this).html()+"&nbsp; <i class=\"fa fa-caret-down\"></i>");
// 	//use input type=hidden to store province of choice
// });

// /*Toggle search types*/
// $('#searchtype-toggle').click(function(event) {
// 	if($('#searchtype-toggle').data("searchtype") == 0){
// 		$('#province-dropdown').show();	
// 		$('#filetype-dropdown').show();
// 		$('#searchtype-toggle').html("Basic Search");
// 		$('#searchtype-toggle').data("searchtype","1");
// 		}
// 	else{
// 		$('#province-dropdown').hide();	
// 		$('#filetype-dropdown').hide();
// 		$('#searchtype-toggle').html("Advanced Search");
// 		$('#searchtype-toggle').data("searchtype","0");
// 	}		
// });

// /*Customized dropdown list for province*/
// $('.province-dropdown-item').click(function(event) {
// 	console.log($(this).html());
// 	$('#province-dropdown').html($(this).html()+"&nbsp; <i class=\"fa fa-caret-down\"></i>");

// 	filter.province = $(this).html();
// 	renderFiles(files,colors,icons, filter);
// 	//use input type=hidden to store province of choice
// });

// Customized dropdown list for filetype
// $('.filetype-dropdown-item').click(function(event) {
// 	console.log($(this).html());
// 	$('#filetype-dropdown>button').html($(this).html()+"&nbsp; <i class=\"fa fa-caret-down\"></i>");

// 	filter.filetype = $(this).data('filetype');
// 	renderFiles(files,colors,icons, filter);
// 	//use input type=hidden to store province of choice
// });

/*Scripts for Grid View
// 					===================================*/
// function renderFiles(files, colors, icons, filter){

// 	//clear file display panel
// 	$("#display-pane-middle").html("");

// 	console.log(filter.province);

// 	var htmlString = "";

// 	for(var i=0; i<files.length; i++){

// 		if((files[i].province==filter.province || filter.province == 'Province') &&
// 			(files[i].filetype==filter.filetype || filter.filetype == 0)
// 			){
// 			htmlString += "<div class=\"panel panel-default file-panel\" id=\"file-"+files[i].id+"\"> ";
// 				htmlString += "<div class=\"panel-heading\">";
// 					htmlString += "<p>";
// 					htmlString += files[i].filename;
// 					htmlString += "</p>";
// 				htmlString += "</div>";
// 				htmlString += "<div class=\"panel-body\">";
// 					htmlString += "<div class=\"file-panel-left\">";
// 						htmlString +="<i class=\""+icons[files[i].filetype-1]+" fa-5x fa\"></i>";
// 					htmlString += "</div>";	
// 					htmlString += "<div class=\"file-panel-right\">";
// 						htmlString +="<p class=\"size\">"+files[i].filesize+" MB</p>";
// 						htmlString +="<div class=\"btn-group\"><button type=\"button\" class=\"btn btn-default btn-fileaction view-details\" data-toggle=\"tooltip\" data-placement=\"bottom\" title data-original-title=\"View Details\""+"data-index=\""+i+"\""+"><i class=\"fa fa-eye\"></i></button><button type=\"button\" class=\"btn btn-default btn-fileaction\" data-toggle=\"tooltip\" data-placement=\"bottom\" title data-original-title=\"Download\"><i class=\"fa fa-download\"></i></button><button type=\"button\" class=\"btn btn-default btn-fileaction add-to-cart\" data-toggle=\"tooltip\" data-placement=\"bottom\" title data-original-title=\"Add&nbsp;to&nbsp;Cart\""+"data-index=\""+i+"\""+"><i class=\"fa fa-shopping-cart\"></i></button></div>";
// 					htmlString += "</div>";	
// 				htmlString += "</div>";
// 			htmlString += "</div>";

// 			$("#display-pane-middle").append(htmlString);
// 			selector = "#file-"+files[i].id+">.panel-heading";
// 			$(selector).css("background-color",colors[files[i].filetype-1]);
// 			$(selector).css("color","#fff");
// 		}
// 		htmlString="";

// 	}
	
// 	/*attach view details onclick event*/

// 	$('.view-details').click(function(event) {

// 		index = $(this).data('index');
// 		if($("#display-pane-bottom").data("show")==0){
// 			$('#display-pane-bottom').slideDown(200, function(){
// 				$('#display-pane-middle').height($(window).height()-350);
// 			});
// 			$('#display-pane-bottom').data("show",1);	
// 		}

// 		$("#display-pane-bottom-filename").html(files[index].filename);
// 		$("#display-pane-bottom-content>div>i").removeClass();
// 		$("#display-pane-bottom-content>div>i").addClass('fa fa-5x '+icons[files[index].filetype-1]);

// 		$("#filesize").html(files[index].filesize + " MB");
// 		$("#filetype").html(files[index].filetype);
// 		$("#extension").html(files[index].extension);
// 		$("#category").html(files[index].category);
// 		$("#subcategory").html(files[index].subcategory);
// 		$("#province").html(files[index].province);
// 	});

// 	$('#close-bottom').click(function(event) {
// 		$('#display-pane-bottom').slideUp(200);
// 		$("#display-pane-bottom").data("show",0);
// 		$('#display-pane-middle').height($(window).height()-200);
// 	});

// 	//attach add to cart functionalty
// 	$('.add-to-cart').click(function(event) {
// 		addToCart(files[$(this).data('index')]);
// 	});
// }

// /*Trial of file rendering*/
// $(document).ready(function() {
// 	files = [
// 		{
// 			id: 1, 
// 			filename: "Laguna Geological Information", 
// 			category: "Geophysical Environment", 
// 			subcategory: "Geology", 
// 			filetype: 1, 
// 			extension: ".docx", 
// 			searchtag:"", 
// 			province:"Laguna", 
// 			filesize: 3.45
// 		},
// 		{
// 			id: 2, 
// 			filename: "Mindoro_school_directory", 
// 			category: "Socio-Economic Profile", 
// 			subcategory: "Education", 
// 			filetype: 1, 
// 			extension: ".docx", 
// 			searchtag:"", 
// 			province:"Mindoro", 
// 			filesize: 0.23
// 		},
// 		{
// 			id: 3, 
// 			filename: "History of Laguna", 
// 			category: "General Information", 
// 			subcategory: "History", 
// 			filetype: 1, 
// 			extension: ".docx", 
// 			searchtag:"", 
// 			province:"Laguna", 
// 			filesize: 1.63
// 		},
// 		{
// 			id: 4, 
// 			filename: "map_romblon_political_boundaries", 
// 			category: "General Information", 
// 			subcategory: "Political Boundaries", 
// 			filetype: 2, 
// 			extension: ".jpg", 
// 			searchtag:"", 
// 			province:"Romblon", 
// 			filesize: 0.74
// 		},
// 		{
// 			id: 5, 
// 			filename: "Oriental Mindoro Forest Cover", 
// 			category: "Geophysical Environment", 
// 			subcategory: "Land Resources", 
// 			filetype: 2, 
// 			extension: ".png", 
// 			searchtag:"", 
// 			province:"Mindoro", 
// 			filesize: 3.74
// 		},
// 		{
// 			id: 6, 
// 			filename: "Protected Areas - Palawan", 
// 			category: "Environmental Management", 
// 			subcategory: "", 
// 			filetype: 2, 
// 			extension: ".jpg", 
// 			searchtag:"", 
// 			province:"Palawan", 
// 			filesize: 1.43
// 		},
// 		{
// 			id: 7, 
// 			filename: "map_climate_sta_cruz", 
// 			category: "Geophysical Environment", 
// 			subcategory: "Climate", 
// 			filetype: 2, 
// 			extension: ".jpg", 
// 			searchtag:"", 
// 			province:"Laguna", 
// 			filesize: 0.37
// 		},
// 		{
// 			id: 8, 
// 			filename: "marinduque-population-statistics", 
// 			category: "Socio-Economic Profile", 
// 			subcategory: "Population", 
// 			filetype: 3, 
// 			extension: ".xlsx", 
// 			searchtag:"", 
// 			province:"Marinduque", 
// 			filesize: 0.21
// 		},
// 		{
// 			id: 9, 
// 			filename: "Census-Romblon", 
// 			category: "Socio-Economic Profile", 
// 			subcategory: "Population", 
// 			filetype: 4, 
// 			extension: ".pdf", 
// 			searchtag:"", 
// 			province:"Romblon", 
// 			filesize: 9.81
// 		}
// 		];

// 	colors = ['#22A7F0','#F6BB42','#26A65B','#C3272B'];
// 	icons = ['fa-file-word-o','fa-file-image-o','fa-file-excel-o','fa-file-pdf-o'];
// 	renderFiles(files,colors,icons, filter);

// });

// /*Scripts for offcanvas cart
// 					====================================*/

// $("#offcanvas-cart").height($(window).height()-100);

// $("#cart-toggle").click(function(event) {
// 	toggleCart();	
// });
// $("#cart-close").click(function(event) {
// 	toggleCart();	
// });

// $("#offcanvas-cart-body").height($("#offcanvas-cart").height()-210);

// function toggleCart(){

// 	if($("#offcanvas-cart").hasClass(".show-nav")){
// 		$("#offcanvas-cart").removeClass(".show-nav");
// 		$("#offcanvas-cart").css("right",-315);
// 	}
// 	else{
// 		$("#offcanvas-cart").addClass(".show-nav");
// 		$("#offcanvas-cart").css("right",0);
// 	}

// 	newCart=0;
// 	$('#cart-number').hide();
// }

// function renderCartItems(cart){

// 	var htmlString = "<tr>";
// 	file = files[cart_ids[i]];
// 	$('#cart-items').html("");

// 	for(var i=0; i<cart.length; i++){
// 	//add to offcanvas cart
// 		htmlString += "<td class=\"cart-icon\">"; 
// 			htmlString += "<i class=\"fa fa-3x "+ icons[cart[i].filetype-1]+"\"></i>";
// 		htmlString += "</td>";
// 		htmlString += "<td class=\"cart-data\">";
// 			htmlString +="<p>"+ cart[i].filename + cart[i].extension +"</p>";
// 			htmlString +="<a href=\"#\" class=\"remove-cart-item\" data-fileid=\""+cart[i].id+"\">Remove</a>";
// 		htmlString += "</td>";
// 		htmlString += "</tr>";

// 		$('#cart-items').append(htmlString);
		
// 		htmlString = "<tr>";
// 	}

// 	$('.remove-cart-item').click(function(event) {
// 		console.log("here.");
// 		removeFromCart($(this).data("fileid"));
// 	});
// }

// function addToCart(file){
// 	var id = file.id;
// 	var htmlString = "<tr>";
// 	// console.log("Here.");
// 	if(cart_ids.indexOf(id)==-1){
// 		cart_ids.push(id);
// 		cart.push(file);
// 		renderCartItems(cart);
// 		alertify.log(file.filename+" was successfully added to the cart.",2000);
// 		$('#cart-number').html(++newCart);
// 		$('#cart-number').show();
// 	}

// }

// function removeFromCart(id){
	
// 	cart.splice(cart_ids.indexOf(id),1);
// 	cart_ids.splice(cart_ids.indexOf(id),1);
// 	//renderCartItems(cart);
// 	$('*[data-fileid=\"'+id+'\"]').parent().parent().remove();
// }

// $('.add-to-cart').click(function(event) {
// 	addToCart(files[$(this).data("index")]);
// });


/*Responsiveness hacks
					====================================*/

//ilipat sa initialize in the future
$(document).ready(function() {
	$('#main-container').height($(window).height() - 140);
});

$(window).resize(function() {

	if($(window).width()>991){
		$('#main-container').height($(window).height() - 140);
		$('#left').height('100%');
		$('#right').height('100%');
		}
	else{
		console.log("HERE.");
		$('#main-container').height($(window).height() * 2);
		$('#left').height('auto');
		$('#right').height('auto');
	}

	$('#display-pane-middle').height($(window).height()-220);

});
