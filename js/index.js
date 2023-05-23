window.onload = function () {
  // 위로 이동하기
  const goTopBtn = document.querySelector(".gotop");
  goTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Initialize Swiper

  // 2. json 데이터로 뽑아보기
  // 1. 백틱을 이용한 html 생성
  // 1) .sw-promotion에 출력할 html 생성
  // for문을 이용한 데이터 html 생성
  // prodata.json을 불러와서 배치한다.

  let data;
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function (event) {
    const req = event.target;
    if (req.readyState === XMLHttpRequest.DONE) {
      // console.log(req.response);
      // 현재 전달된 문자들은 json이 아닙니다.
      // req.response는 데이터 타입 문자열입니다.
      // 문자열을 json 객체로 변경하는 작업을 수행해야 한다.
      data = JSON.parse(req.response);
      makePromotionSlide();
    }
  };
  xhttp.open("GET", "data/prodata.json");
  xhttp.send();

  function makePromotionSlide() {
    let swPromotionHtml = ``;
    for (let i = 0; i < data.good_count; i++) {
      let obj = data[`good_${i + 1}`];

      let html = `
      <div class="swiper-slide">
        <a href="${obj.link}">
          <img src="images/${obj.img}" alt="${obj.name}" />
        </a>
      </div>
      `;
      swPromotionHtml += html;
    }
    // 위의 백틱 내용을 넣어줄 장소를 저장
    let swPromotionWrapper = document.querySelector(
      ".sw-promotion .swiper-wrapper"
    );
    swPromotionWrapper.innerHTML = swPromotionHtml;

    let promotionSwiper = new Swiper(".sw-promotion", {
      slidesPerView: 1,
      spaceBetween: 24,
      speed: 1000,
      loop: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".promotion .sw-next",
        prevEl: ".promotion .sw-prev",
      },
      pagination: {
        el: ".sw-promotion-pg",
        clickable: true,
      },
      breakpoints: {
        760: {
          slidesPerView: 2,
        },
      },
    });
  }
};
