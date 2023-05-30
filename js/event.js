window.addEventListener('load', function () {
  // event Swiper

  this.fetch('data/eventdata.json')
    .then((res) => res.json())
    .then((result) => makeEventSlide(result))
    .catch((err) => console.log(err));

  function makeEventSlide(_result) {
    let swEventHtml = ``;
    for (let i = 0; i < _result.event_count; i++) {
      let obj = _result[`event_${i + 1}`];
      let temp = `
        <div class="swiper-slide">
          <a href="${obj.link}" class="events-link">
            <img src="images/${obj.pic}" alt="${obj.alt}" />
          </a>
        </div>`;
      swEventHtml += temp;
    }

    let swEventWrapper = document.querySelector('.sw-events .swiper-wrapper');
    swEventWrapper.innerHTML = swEventHtml;

    let eventSwipder = new Swiper('.sw-events', {
      slidesPerView: 3,
      spaceBetween: 27,
      navigation: {
        nextEl: '.event .sw-next',
        prevEl: '.event .sw-prev',
      },
      breakpoints: {
        1280: {
          slidesPerView: 4,
        },
      },
    });
  }
});
