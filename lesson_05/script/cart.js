(function($) {
	$(function() {
		// CART RENDERING
		$.ajax({
			url: 'http://localhost:3000/cart',
			dataType: 'json',
			success: function(goods) {
				var $ul = $('<ul/>').addClass('cart__list'),
					$price = 0;
				
				goods.forEach(function(good) {
					$price += good.price * good.quantity;
					var $li = $('<li/>').addClass('cartlist__good').text(good.name),
						$span = $('<span/>').addClass('cartlist__info')
							.text(' / Quantity: ' + good.quantity +
								' / Price: ' + '$' + good.price * good.quantity),
						$a = $('<a/>').attr({
							'class': 'cartlist__delete-button',
							'href': '#',
							'data-id': good.id,
							'data-name': good.name,
							'data-price': good.price,
							'data-quantity': good.quantity
						}).text('Delete');
					
					$li.append($span, $a);
					$ul.append($li);
				});
				
				$('#cart').append($ul);
				$('#amount').text($price);
			}
		});
		
		// ADDING GOODS IN THE CART
		$('#goods').on('click', 'li > a', function(event) {
			var $goodId = $(this).attr('data-id'),
				$inputValue = $('#input' + $goodId).val();
			
			$.ajax({
				url: 'http://localhost:3000/cart',
				type: 'POST',
				contentType: 'application/json',
				data: JSON.stringify({
					id: $(this).attr('data-id'),
					name: $(this).attr('data-name'),
					price: $(this).attr('data-price'),
					quantity: $inputValue
				}),
				success: function(data) {
					var $ul = $('.cart__list'),
						$li = $('<li/>').addClass('cartlist__good').text(data.name),
						$span = $('<span/>').addClass('cartlist__info')
							.text(' / Quantity: ' + data.quantity +
								' / Price: ' + '$' + data.price * data.quantity),
						$a = $('<a/>').attr({
							'class': 'cartlist__delete-button',
							'href': '#',
							'data-id': data.id,
							'data-name': data.name,
							'data-price': data.price,
							'data-quantity': data.quantity
						}).text('Delete');
					
					$li.append($span, $a);
					$ul.append($li);
					
					var $amount = + $('#amount').text();
					$amount += data.price * data.quantity;
					$('#amount').text($amount);
					
					localStorage.setItem('amount', $('#amount').html());
				}
			});
			
			event.preventDefault();
		});
		
		// DELETING GOODS FROM THE CART
		$('#cart').on('click', 'li > a', function (event) {
			var $inputValue = $(this).attr('data-quantity');
			
			$.ajax({
				url: 'http://localhost:3000/cart/' + $(this).attr('data-id'),
				type: 'DELETE',
				context: this,
				contentType: 'application/json',
				data: JSON.stringify({
					id: $(this).attr('data-id')
				}),
				success: function() {
					var $amount = + $('#amount').text();
					$amount -= $(this).attr('data-price') * $inputValue;
					$('#amount').text($amount);
					$(this).parent().remove();
					
					localStorage.setItem('amount', $('#amount').text());
				}
			});
			event.preventDefault();
		});
		
		if (localStorage.getItem('amount') !== null) {
			$('#amount').html(localStorage.getItem('amount'));
		}
		
	});
})(jQuery);