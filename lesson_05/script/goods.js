(function($) {
	$(function() {
		// GOODS RENDERING
		$.ajax({
			url: 'http://localhost:3000/goods',
			dataType: 'json',
			success: function(goods) {
				var $ul = $('<ul/>').addClass('goods__goodlist');
				goods.forEach(function(good) {
					var $li = $('<li/>').addClass('goodlist__good').text(good.name),
						$img = $('<img/>').attr({
							'class': 'goodlist__image',
							'src': good.image,
							'width': 250,
							'height': 250
						}),
						$span = $('<span/>').addClass('goodlist__price').text('$' + good.price),
						$input = $('<input/>').attr({
							'class': 'goodlist__quantity',
							'id': 'input' + good.id,
							'type': 'number',
							'value': 1,
							'min': 1
						}),
						$a = $('<a/>').attr({
							'class': 'goodlist__buy-button',
							'href': '#',
							'data-id': good.id,
							'data-name': good.name,
							'data-price': good.price
						}).text('Buy');
					
					$li.append($img, $span, $input, $a);
					$ul.append($li);
				});
				
				$('#goods').append($ul);
			}
		});
		
	});
})(jQuery);