(function($) {
	$(function() {
		// FORM
		var $dialog = $('#dialog'),
			$datepicker = $('#birthday'),
			$formValidation = {
				'name': /^[A-Za-zА-Яа-я]+$|^[A-Za-zА-Яа-я]+\s[A-Za-zА-Яа-я]+$/i,
				'birthday': /^\d{2}.\d{2}.\d{4}/,
				'phone': /^\+7\(\d{3}\)\d{3}-\d{4}$/,
				'email': /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i,
				'city': /^[A-Za-z\s-]+$/i,
				'message': /^.+|^(.+\s)+/i,
				'default': '/./'
			},
			$errorMessages = {
				'name': 'Error! Specify your name.',
				'birthday': 'Error! Specify your birthday.',
				'phone': 'Error! Specify your phone.',
				'email': 'Error! Specify your e-mail.',
				'city': 'Error! Specify your city.',
				'message': 'Error! Write the message.',
				'default': 'Error! Fill this field.'
			};
		
		$dialog.dialog({
			autoOpen: false
		});
		
		$datepicker.datepicker({
			firstDay: 1,
			dateFormat: 'dd.mm.yy'
		});
		
		$('#form').on('click', 'button[id=sendButton]', function(event) {
			
			var result = $('.form__field').filter(function() {
				var fieldName = (this.name in $formValidation) ? this.name : 'default',
					validator = $formValidation[fieldName],
					result = !validator.test(this.value);
				
				if (result) {
					event.preventDefault();
					var $p = $('<p/>').text($errorMessages[fieldName]);
					$dialog.append($p);
				}
				else {
					$('.form__field').removeClass('error');
					$dialog.contents().remove();
				}
				
				return result;
			}).addClass('error').effect('shake');
			
			if (result.length > 0) {
				$('#dialog').dialog('open');
			}
			return result.length === 0;
		});
		
	});
})(jQuery);