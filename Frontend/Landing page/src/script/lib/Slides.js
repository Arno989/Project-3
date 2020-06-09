class Slides {
	constructor({ prevElement, nextElement, slideElements }) {
		Object.assign(this, { prevElement, nextElement, slideElements });
	}

	startInterval = function () {
		this.interval = setInterval(() => {
			this.plusSlides(1);
		}, 10000);
	};

	showSlides = function () {
		if (this.slideIndex > this.slideElements.length) {
			this.slideIndex = 1;
		}

		if (this.slideIndex < 1) {
			this.slideIndex = this.slideElements.length;
		}

		this.slideElements.forEach((slide) => slide.classList.add('hidden'));

		this.slideElements[this.slideIndex - 1].classList.remove('hidden');
	};

	plusSlides = function (n) {
		this.slideIndex += n;

		this.showSlides();
	};

	enableListeners = function () {
		this.prevElement.addEventListener('click', () => {
			clearInterval(this.interval);

			this.plusSlides(-1);

			this.startInterval();
		});

		this.nextElement.addEventListener('click', () => {
			clearInterval(this.interval);

			this.plusSlides(1);

			this.startInterval();
		});
	};

	setup() {
		this.slideIndex = 1;

		this.showSlides();

		this.startInterval();

		this.enableListeners();
	}
}

export default Slides;
