/**
 * 작성자: 박주희
 * 연락처: pjh9641@gmail.com;
 * 작성일: 23-05-22
 * 기능: 쇼핑몰 리스트 슬라이드 코드
 * 업데이트: 쇼핑몰 리스트 목록 출력 함수화 작업
 */

window.addEventListener('load', function () {
  this.fetch('data/books.json')
    .then((res) => res.json())
    .then((result) => parseShopping(result))
    .catch((err) => console.log(err));

  let jsonData;
  // 메뉴를 클릭 했을 때 목록 slide 변경
  function parseShopping(_data) {
    let cateBtns = document.querySelector('.shopping .btns');
    jsonData = _data;
    let btHtml = ``;
    let dataArr = _data.shopping;
    for (let i = 0; i < dataArr.length; i++) {
      let temp = `<a href="#">${dataArr[i].catename}</a>`;
      btHtml += temp;
    }
    cateBtns.innerHTML = btHtml;

    let aTags = document.querySelectorAll('.shopping .btns a');
    aTags.forEach((item, index) => {
      item.addEventListener('click', function (event) {
        event.preventDefault();
        makeShoppingSlide(index);
        aTags.forEach((item) => item.classList.remove('btns-active'));
        this.classList.add('btns-active');
      });
      aTags[0].classList.add('btns-active');
      makeShoppingSlide(0);
    });
  }

  let shoppingSwiper;

  function makeShoppingSlide(_idx) {
    let swShoppingHtml = ``;
    let listData = jsonData.shopping[_idx].list;
    let listTotal = listData.length;
    for (let i = 0; i < listTotal; i++) {
      let obj = listData[i];
      let temp = `
        <div class="swiper-slide">
          <a href="${obj.link}" class="good">
            <img src="images/${obj.pic}" alt="${obj.product}" />
            <div class="good-info">
              <ul class="good-info-list">
                <li>
                  <b><span>${obj.ratio}%</span> ${obj.price}원</b>
                </li>
                <li><p>${obj.product}</p></li>
              </ul>
            </div>
          </a>
        </div>`;
      swShoppingHtml += temp;
    }

    let swShoppingWrpper = document.querySelector('.sw-shopping .swiper-wrapper');
    swShoppingWrpper.innerHTML = swShoppingHtml;

    // 새로 생성전에 swiper API를 이용해서 삭제한다.
    if (shoppingSwiper) {
      shoppingSwiper.destroy();
    }

    shoppingSwiper = new Swiper('.sw-shopping', {
      slidesPerView: 5,
      grid: {
        rows: 2,
        fill: 'row',
      },
      spaceBetween: 10,
      navigation: {
        nextEl: '.shopping .sw-next',
        prevEl: '.shopping .sw-prev',
      },
      breakpoints: {
        1024: {
          spaceBetween: 32,
          slidesPerView: 3,
          // 화면당 3개씩 슬라이드 이동
          slidesPerGroup: 3,
          grid: {
            rows: 1,
          },
        },
        1280: {
          spaceBetween: 26,
          slidesPerView: 4,
          // 화면당 4개씩 슬라이드 이동
          slidesPerGroup: 4,
          grid: {
            rows: 1,
          },
        },
      },
    });
  }
});
