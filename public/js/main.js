$(function(){
	tabs();
	
	
	
	
	
/*Function*/	
	function tabs(){
		var tabs = $('.b-tabs');
		var menu_tabs = tabs.find('.menu-tabs');
		var content_tabs = tabs.find('.content-tabs');
		
		tabs.find('.tab').not('.tab-selected').hide();
		
		menu_tabs.find('.item').find('.link').click(function(){
			var index_element = $(this).parent('.item').index();
			var item_menu_tabs = menu_tabs.find('.item');
			var item_content_tabs = content_tabs.find('.tab');
			
			
			if(!($(this).parent().hasClass('item-selected'))){
				item_menu_tabs.removeClass('item-selected').eq(index_element).addClass('item-selected');
				item_content_tabs.removeClass('tab-selected').eq(index_element).addClass('tab-selected');
				
				tabs.find('.tab').fadeOut(200);
				tabs.find('.tab-selected').fadeIn(200);
			}
			return false;
		});
	}
});