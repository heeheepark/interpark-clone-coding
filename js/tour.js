/**
 * 작성자: 박주희
 * 연락처: pjh9641@gmail.com;
 * 작성일: 23-05-22
 * 기능: 투어 리스트 슬라이드 코드
 * 업데이트: 투어 리스트 목록 출력 함수화 작업
 */

window.addEventListener('load', function () {
  this.fetch('data/books.json')
    .then((res) => res.json())
    .then((result) => parseTour(result))
    .catch((err) => console.log(err));

  // 목록 리스트 만들기
  let jsonData;
  let cateBtns = document.querySelector('.tour .btns');
  function parseTour(_data) {
    jsonData = _data;
    let btHtml = ``;
    let dataArr = _data.tour;
    for (let i = 0; i < dataArr.length; i++) {
      let temp = `<a href="#">${dataArr[i].catename}</a>`;
      btHtml += temp;
    }
    cateBtns.innerHTML = btHtml;

    let tourSwiper;

    let aTags = document.querySelectorAll('.tour .btns a');
    aTags.forEach((item, index) => {
      item.addEventListener('click', function (event) {
        event.preventDefault();
        makeTourSlide(index);
        aTags.forEach((item) => item.classList.remove('btns-active'));
        this.classList.add('btns-active');
      });
      aTags[0].classList.add('btns-active');
      makeTourSlide(0);
    });

    console.log(jsonData);
    function makeTourSlide(_idx) {
      let swTourHtml = ``;
      let listData = jsonData.tour[_idx].list;
      let listTotal = listData.length;
      for (let i = 0; i < listTotal; i++) {
        let obj = listData[i];
        let temp = `
      <div class="swiper-slide">
        <a href="${obj.link}" class="tour-link">
          <div class="tour-img">
            <img src="images/${obj.pic}" alt="${obj.alt}" />
          </div>
          <div class="tour-info">
            <ul class="tour-info-list">
              <li ${obj.category ? "style='display:block'" : "style='display:none'"}>
                <span class="tour-cate">${obj.category}</span>
              </li>
              <li>
                <span class="tour-title">
                  ${obj.title}
                </span>
              </li>
              <li>
                <span class="tour-place">${obj.place}</span>
              </li>
              <li>
                <span class="tour-price"><b>${obj.price}</b>원~</span>
              </li>
            </ul>
          </div>
        </a>
      </div>`;
        swTourHtml += temp;
      }

      let swTourWrapper = document.querySelector('.sw-tour .swiper-wrapper');
      swTourWrapper.innerHTML = swTourHtml;

      if (tourSwiper) {
        tourSwiper.destroy();
      }

      tourSwiper = new Swiper('.sw-tour', {
        slidesPerView: 3,
        grid: {
          rows: 2,
          fill: 'row',
        },
        spaceBetween: 10,
        navigation: {
          nextEl: '.tour .sw-next',
          prevEl: '.tour .sw-prev',
        },
        breakpoints: {
          1024: {
            spaceBetween: 24,
            slidesPerView: 2,
            // 화면당 2개씩 슬라이드 이동
            slidesPerGroup: 2,
            grid: {
              rows: 1,
            },
          },
          1280: {
            spaceBetween: 26,
            slidesPerView: 3,
            // 화면당 4개씩 슬라이드 이동
            slidesPerGroup: 3,
            grid: {
              rows: 1,
            },
          },
        },
      });
    }
  }
});
