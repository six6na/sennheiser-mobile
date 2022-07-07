$(function(){
  
  // #gnb toggle
  // 1. 열기: #toggle-btn 클릭시 #gnb on
  $('#toggle-btn').click(function(){
    $('#gnb').addClass('on');
});
  // 2. 닫기: #btn-close 클릭시 #gnb 닫음
  $('#btn-close').click(function(){
    $('#gnb').removeClass('on');
});
});

// 서버에 데이터 요청(request)
function getData() {
  fetch('https://raw.githubusercontent.com/csslick/animal-mobile/main/animal-data.json')
  .then(function(res){
    return res.json(); // JSON 객체 변환
  })
  .then(function(obj){
    // obj 동물데이터
    showProducts(obj);
  });
}

function showProducts(obj) {
  // 현재 페이지의 URL query 파라미터(매개변수)
  const query = location.search;
  console.log(query);
  // ? URL query문을 object(변수)로 변경
  const params = new URLSearchParams(query).get('category');
  console.log(params);  

  // params == null 이면 시작 페이지 dog 출력
  if(params == null) {
    params == 'dog'
  }

  // 동물 데이터 출력
  obj.forEach(function(animal){
    // 카테고리 구분 dog | cat | bird
    // 요청한 params와 동물카테고리명이 일치하는 데이터만 출력
    if(params == animal.category) {
      let html = `
      <div class="col">
          <img src=${animal.imgUrl} alt="dog01">
          <p class="name">${animal.name}</p>
      </div>
    `
    $('.row').append(html);
    }

  });
}