(function($) {
	$(function() {
		var findCityBlock = $('#find-city'),
			cityArray = [];
		$.ajax({
			url: './city.json',
			dataType: 'json',
			type: 'GET',
			success: function(data) {
				if (data.result === 'success') {
					cityArray = data.message;
				}
			}
		});
		
		$('#city').on('keyup', function() {
			var cityInputValue = $(this).val();
			if (cityInputValue.length < 3) {
				findCityBlock.css('display', 'none');
				return;
			}
			
			var findCityArray = cityArray.filter(function(item) {
				var regExp = new RegExp(cityInputValue, 'ig');
				return regExp.test(item);
			});
			
			if (findCityArray.length > 0) {
				findCityBlock.css('display', 'block');
				findCityBlock.find('.find-city__list').html('');
				for (var i = 0; i < findCityArray.length; i++) {
					var li = $('<li/>').append(findCityArray[i]);
					findCityBlock.find('.find-city__list').append(
						$(li).addClass('find-city__item'));
				}
				findCityBlock.find('li.find-city__item').on('click', function() {
					$('#city').val($(this).text());
					findCityBlock.css('display', 'none');
				});
			}
			else {
				findCityBlock.css('display', 'none');
			}
		});
	});
})(jQuery);
