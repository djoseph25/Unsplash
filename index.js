const submitForm = document.getElementById('myForm');
const result = document.getElementById('result');

submitForm.addEventListener('submit', function loadImage(e) {
	e.preventDefault();

	const myReq = new XMLHttpRequest();
	const search = document.getElementById('searchBox').value;

	// Unsplash api give you access to control the amount the image I get back by passing the per_page query
	const url = `https://api.unsplash.com/search/photos?query=${search}&client_id=U_163zHU3qbl7aJlrhuZOojrUZO1UisdmNYNEGW1XMY&per_page=20`;

	myReq.open('Get', `${url}`);
	myReq.onload = function () {
		let Done = 4; // readyState 4 means the request is done.
		let Ok = 200; // status 200 is a successful return.

		if (myReq.readyState === Done) {
			if (myReq.status === Ok) {
				const data = JSON.parse(this.responseText);
				// console.log(data);

				const response = data.results.map((photo) => {
					return `<div><img class='photo' src="${photo.urls.regular}"></div>`;
				});
				// console.log(response);
				result.innerHTML = response;
			}
			myReq.onerror = function (err) {
				console.log('ERROR', err);
			};
		}
	};
	myReq.send();
});
