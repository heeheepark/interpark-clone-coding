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
      makeTicketSlide(data);
    }
  };

  function parseTicket(_menu) {
    if (_menu === "뮤지컬") {
      xhr.open("GET", "../data/ticketdata.json");
    } else if (_menu === "콘서트") {
      xhr.open("GET", "../data/ticketdata2.json");
    } else if (_menu === "연극") {
      xhr.open("GET", "../data/ticketdata3.json");
    } else if (_menu === "클래식/무용") {
      xhr.open("GET", "../data/ticketdata4.json");
    } else if (_menu === "스포츠") {
      xhr.open("GET", "../data/ticketdata5.json");
    } else if (_menu === "레저/캠핑") {
      xhr.open("GET", "../data/ticketdata6.json");
    } else if (_menu === "전시/행사") {
      xhr.open("GET", "../data/ticketdata7.json");
    } else if (_menu === "아동/가족") {
      xhr.open("GET", "../data/ticketdata8.json");
    }
    xhr.send();
  }

  parseTicket("뮤지컬");

  let ticketSwiper;

  function makeTicketSlide(_data) {
    let swTicketHtml = ``;
    for (let i = 0; i < _data.ticket_count; i++) {
      let obj = _data[`ticket_${i + 1}`];
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

  const btns = document.querySelectorAll(".ticket .btns a");

  btns[0].onclick = function (event) {
    event.preventDefault();
    parseTicket("뮤지컬");
  };
  btns[1].onclick = function (event) {
    event.preventDefault();
    parseTicket("콘서트");
  };
  btns[2].onclick = function (event) {
    event.preventDefault();
    parseTicket("연극");
  };
  btns[3].onclick = function (event) {
    event.preventDefault();
    parseTicket("클래식/무용");
  };
  btns[4].onclick = function (event) {
    event.preventDefault();
    parseTicket("스포츠");
  };
  btns[5].onclick = function (event) {
    event.preventDefault();
    parseTicket("레저/캠핑");
  };
  btns[6].onclick = function (event) {
    event.preventDefault();
    parseTicket("전시/행사");
  };
  btns[7].onclick = function (event) {
    event.preventDefault();
    parseTicket("아동/가족");
  };
});
