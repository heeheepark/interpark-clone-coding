/**
 * 작성자: 박주희
 * 연락처: pjh9641@gmail.com;
 * 작성일: 23-05-22
 * 기능: 티켓 리스트 슬라이드 코드
 * 업데이트: 티켓 리스트 목록 출력 함수화 작업
 */

window.addEventListener("load", function () {
  // ticket Swiper
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function (event) {
    const req = event.target;
    if (req.readyState === XMLHttpRequest.DONE) {
      let data = JSON.parse(req.response);
      parseTicket(data);
    }
  };
  xhr.open("GET", "data/books.json");
  xhr.send();

  let jsonData;
  let cateBtns = document.querySelector(".ticket .btns");
  function parseTicket(_data) {
    jsonData = _data;
    let btHtml = ``;
    let dataArr = _data.ticket;
    for (let i = 0; i < dataArr.length; i++) {
      let temp = `<a href="#">${dataArr[i].catename}</a>`;
      btHtml += temp;
    }
    cateBtns.innerHTML = btHtml;

    let aTags = document.querySelectorAll(".ticket .btns a");
    for (let i = 0; i < dataArr.length; i++) {
      aTags[i].onclick = function (event) {
        event.preventDefault();
        makeTicketSlide(i);
        for (j = 0; j < dataArr.length; j++) {
          aTags[j].classList.remove("btns-active");
          this.classList.add("btns-active");
        }
      };
      aTags[0].classList.add("btns-active");
    }
    makeTicketSlide(0);
  }

  let ticketSwiper;

  function makeTicketSlide(_idx) {
    let swTicketHtml = ``;
    let listData = jsonData.ticket[_idx].list;
    let listTotal = listData.length;
    for (let i = 0; i < listTotal; i++) {
      let obj = listData[i];
      let temp = `
        <div class="swiper-slide">
          <a href="${obj.link}" class="ticket-link">
            <div class="ticket-img">
              <img src="images/${obj.pic}" alt="${obj.alt}" />
              <span class="ticket-rank">${obj.rank}</span>
            </div>
            <div class="ticket-info">
              <ul class="ticket-info-list">
                <li>
                  <span class="ticket-title"><b>${obj.title}</b></span>
                </li>
                <li>
                  <span class="ticket-hall">${obj.hall}</span>
                </li>
                <li>
                  <span class="ticket-date"
                    >${obj.date}</span
                  >
                </li>
                <li ${
                  obj.sale ? "style='display:block'" : "style='display:none'"
                }>
                  <span class="ticket-sale">${obj.sale}</span>
                </li>
              </ul>
            </div>
          </a>
        </div>`;
      swTicketHtml += temp;
    }

    let swTicketWrapper = document.querySelector(".sw-ticket .swiper-wrapper");
    swTicketWrapper.innerHTML = swTicketHtml;

    if (ticketSwiper) {
      ticketSwiper.destroy();
    }

    ticketSwiper = new Swiper(".sw-ticket", {
      slidesPerView: "auto",
      spaceBetween: 10,
      navigation: {
        nextEl: ".ticket .sw-next",
        prevEl: ".ticket .sw-prev",
      },
      breakpoints: {
        1024: {
          slidesPerView: 3,
          spaceBetween: 32,
        },
        1280: {
          slidesPerView: 4,
          spaceBetween: 27,
        },
      },
    });
  }

  // const btns = document.querySelectorAll(".ticket .btns a");
  // let cateName = [
  //   "뮤지컬",
  //   "콘서트",
  //   "연극",
  //   "클래식/무용",
  //   "스포츠",
  //   "레저/캠핑",
  //   "전시/행사",
  //   "아동/가족",
  // ];
  // for (let i = 0; i < cateName.length; i++) {
  //   btns[i].onclick = function (event) {
  //     event.preventDefault();
  //     parseTicket(cateName[i]);
  //     for (let j = 0; j < cateName.length; j++) {
  //       btns[j].classList.remove("btns-active");
  //       this.classList.add("btns-active");
  //     }
  //   };
  // }
  // btns[0].classList.add("btns-active");
});
