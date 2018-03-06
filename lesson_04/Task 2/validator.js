var sendButton = document.querySelector('#sendButton'),
	formValidation = {
		'name': /^[A-Za-zА-Яа-я]+$|^[A-Za-zА-Яа-я]+\s[A-Za-zА-Яа-я]+$/,
		'phone': /^\+7\(\d{3}\)\d{3}-\d{4}$/,
		'email': /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i,
		'message': /^.+|^(.+\s)+/i
	};

sendButton.addEventListener('click', function(event) {

	var fields = document.querySelectorAll('input, textarea');
	for (var i = 0; i < fields.length; i++) {

		if (formValidation[fields[i].name].test(fields[i].value) === true) {
			fields[i].classList.remove('error');
			fields[i].classList.add('success');
			fields[i].previousElementSibling.style.display = "none";
		}
		else {
			event.preventDefault();
			fields[i].classList.add('error');
			fields[i].classList.remove('success');
			fields[i].previousElementSibling.style.display = "block";
		}
	}
});