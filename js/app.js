// 검색창 컴포넌트 UI
$(function(){
  const html =`
  <!-- 검색 UI -->
  <div class="search-box">
    <form class="search-box-container">
      <input 
      type="search" 
      id="search"
      placeholder="검색"
      required>
      <div class="button-group">
      <button id="submit" type="submit">
        <i class="bi bi-search"></i>
      </button>
      <button class="btn-close">
        <i class="bi bi-x-lg"></i>
      </button>
      </div>
    </form>
  </div>
`;
$('body').append(html);
});

$(function(){

  /*** #gnb toggle ***/
  // 1. 열기: #toggle-btn 클릭시 #gnb on
  $('#toggle-btn').click(function(){
    $('#gnb').addClass('on');
  });
  // 2. 닫기: #btn-close 클릭시 #gnb 닫음
  $('#btn-close').click(function(){
    $('#gnb').removeClass('on');
  });
  
  $(function(){
    $('#icon-menu .bi-search').click(function(){
        $(".search-box").addClass('on');
    })
    $('.search-box .btn-close').click(function(){
        $(".search-box").removeClass('on');
    })
});
});

// 제품 데이터 가져오기
function getData() {
  // 여기에 깃허브 JSON 파일 경로(서버 데이터 주소)
  const DataURL = 'https://raw.githubusercontent.com/six6na/sennheiser-mobile/main/data.json';
  fetch(DataURL)
  .then(function(res){
    return res.json(); // JSON 객체 변환
  })
  .then(function(obj){
    // obj 동물데이터
    showProducts(obj);
    console.log(obj)
  });
}

function showProducts(obj) {
  // 현재 페이지의 URL query 파라미터(매개변수)
  const query = location.search;
  console.log(query);
  // ? URL query문을 object(변수)로 변경
  let params = new URLSearchParams(query).get('category');

  // params == null 이면(시작 페이지 dog 출력)
  if(params == null) {
    params = 'wireless'
  }
  console.log(params);  

  // 동물 데이터 출력
  obj.forEach(function(product){
    // 카테고리 구분 wireless | 무선헤드폰 | 유선헤드폰
    // 요청한 params와 제품카테고리명이 일치하는 데이터만 출력
    let category = product.category;
    let name = product.name;
    let price = product.price;
    let imgUrl = product.imgUrl;
    let text = product.text;
    console.log(category);
    if(params == product.category) {
      let html = `
      <div class="product">
            <a href="detail.html">
              <img src="images/cx plus true wireless k.webp" alt="">
              <div class="info">
                <span class="category">${category}</span>
                <p class="title">MOMEN TUM True Wireless 3</p>
                <p class="price"><span>₩</span>170,900</p>
              </div>
            </a>
          </div>
    `
    $('.row').append(html);
    }

  });
}

$(function(){
  getData();
});


/* 파라미터를 전달하여 요청하기
  홈페이지주소?name=홍길동
    매개변수(URL parameter) name = '홍길동'

  index.html -> index.html?category=dog -> 개 보여주시오
  cat.html -> cat.html?category=cat -> 고양이 보여주시오
  bird.html -> bird.html?category=bird -> 새 보여주시오
*/