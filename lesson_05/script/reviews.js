(function($) {
	$(function() {
		// COMMENTS RENDERING
		$.ajax({
			url: 'http://localhost:3000/reviews',
			dataType: 'json',
			success: function(reviews) {
				var $ul = $('<ul/>').addClass('reviews__comment-list');
				
				reviews.forEach(function(review) {
					var $li = $('<li/>').addClass('comment-list__comment')
							.text('Comment #' + review.id),
						$span = $('<span/>').addClass('comment__user-name')
							.text(review.name),
						$i = $('<i/>').addClass('comment__user-text')
							.text(review.text),
						$hr = $('<hr/>').addClass('comment__line');
					
					$li.append($span, $i, $hr);
					$ul.prepend($li);
				});
				
				$('#reviews').append($ul);
			}
		});
		
		// ADDING COMMENTS
		$('#reviews').on('click', 'div > a', function(event) {
			var $input = $('#name').val(),
				$textarea = $('#message').val();
			$.ajax({
				url: 'http://localhost:3000/reviews',
				type: 'POST',
				contentType: 'application/json',
				data: JSON.stringify({
					id: $(this).attr('data-id'),
					name: $input,
					text: $textarea
				}),
				success: function(data) {
					var $ul = $('.reviews__comment-list'),
						$li = $('<li/>').addClass('comment-list__comment')
							.text('Comment #' + data.id),
						$span = $('<span/>').addClass('comment__user-name')
							.text(data.name),
						$i = $('<i/>').addClass('comment__user-text')
							.text(data.text),
						$hr = $('<hr/>').addClass('comment__line');
					
					$li.append($span, $i, $hr);
					$ul.prepend($li);
					
					$('#name').val('');
					$('#message').val('');
				}
			});
			
			event.preventDefault();
		});
		
	});
})(jQuery);