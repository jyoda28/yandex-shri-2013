$(document).ready(function(){
	$(".td-left").click(function() {
		attribute = $(this).attr('blockNumber');
		$(".slide[blockNumber='"+attribute+"']").slideToggle('slow');
	});
	
	$(".fileButton").click(function() {
		$("input[type='file']").trigger('click');
	});
	
	$("input").keyup(function () {
		blockID = $(this).attr('blockId');
		if ($("input[blockId='"+blockID+"']").attr('name') == "name") {
			var regex = /^[a-zа-я]+$/ ; 
		} else {
			if ($("input[blockId='"+blockID+"']").attr('name') == "e-mail"){
				var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;		
			} else {
				if ($("input[blockId='"+blockID+"']").attr('name') == "phone") {
					var regex = /^(\+|\s\s?)?\d{11}$/;
				} else {
					var regex = /^[0-9a-zA-Z]+$/;
				}
			}
		}
		var str = $.trim($("input[blockId='"+blockID+"']").val());
		if (regex.test(str)) {
			$("label[blockId='"+blockID+"']").html("ВЕРНО");
			$("label[blockId='"+blockID+"']").css({'color' : 'rgb(0, 255, 0)'});
			$("label[blockId='"+blockID+"']").css({'visibility' : 'visible'});
			return $.trim($("input[blockId='"+blockID+"']").val());
		} else {
			$("label[blockId='"+blockID+"']").html("ВВЕДЕНО НЕВЕРНО");
			$("label[blockId='"+blockID+"']").css({'visibility' : 'visible'});
			$("label[blockId='"+blockID+"']").css({'color' : 'red'});
		}
	});
	
	$("#drag-inner").draggable({ 
		containment: "parent",
		revert: function(){
					if (parseInt($("#drag-inner").css("left")) < parseInt($("#drag-outter").css("width"))-36) {
						return true;
					}
				},
		stop: function(event,ui){ 
					if(parseInt($("#drag-inner").css("left")) == parseInt($("#drag-outter").css("width"))-36) {
					
					if (/^[0-9a-zA-Z]+$/.test($.trim($("input[name='myCircle']").val())))
						myCircle = $.trim($("input[name='myCircle']").val());
					if (/^[a-zа-я]+$/.test($.trim($("input[name='name']").val())))
						name = $.trim($("input[name='name']").val());
					if (/^(\+|\s\s?)?\d{11}$/.test($.trim($("input[name='phone']").val())))
						phone = $.trim($("input[name='phone']").val());
					if (/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test($.trim($("input[name='e-mail']").val())))
						mail = $.trim($("input[name='e-mail']").val());
					additional = $.trim($("textarea[name='texta']").val());

					if(typeof myCircle == 'undefined' || typeof name == 'undefined' || typeof phone == 'undefined' || typeof mail == 'undefined') {
						$(".result").text("Заполните все поля");
						window.scrollBy(0,200);
					} else {
						$.ajax({
							type: "POST",
							url: "/form/form.php",
							data: {"myCircle": myCircle, "name": name, "phone": phone, "mail": mail},
							cache: false,
							success: function(response) {
								$(".result").text(response);
								window.scrollBy(0,200);
								}, 
							error: function(response) {
								$(".result").text("Форма не отправлена");
								window.scrollBy(0,200);
							}
						})	
					}
				}
			}
	});	
});