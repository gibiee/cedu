class 정수 {
  constructor(value) {

    if(!(Number(value) === value && value % 1 === 0)) {
      console.log("오류 : 정수가 아닌 값");
    }
    this.value = value;
  }
}

class 실수 {
  constructor(value) {

    if(!(Number(value) === value && value % 1 !== 0)) {
      console.log("오류 : 실수가 아닌 값");
    }
    this.value = value;
  }
}

class 문자 {
  constructor(value) {

    if(!(typeof value == "string" && value.length <= 1)) {
      console.log("오류 : 문자가 아닌 값");
    }
    this.value = value;
  }
}

class 문자열 {
  constructor(value) {

    if(!(typeof value == "string")) {
      console.log("오류 : 문자열이 아닌 값");
    }
    this.value = value;
  }
}

// 정수 a = 5; 를 다음과 같이 변환
var a = new 정수(5.1);
console.log(a.value);

var b = new 정수(10);
console.log(b.value);

// 문자 c = 'H'; 를 다음과 같이 변환
var c = new 문자("H");

var d = new 문자열("HI");

//문제점 : 출력할때 a.value 로 출력해야함. 귀찮음.

//--------------------------------------------------------

/*
class 정수 {
  constructor(value) {
    return value;
  }
}
class 실수 { }
class 문자 { }
class 문자열 {}

function set(자료형, 값) {
  //console.log(자료형)
  //console.log(자료형.name)

  if(자료형.name == "정수" && !(Number(값) === 값 && 값 % 1 === 0)) {
    console.log("오류 : 정수가 아닌 값");
  }
  else if(자료형.name == "실수" && !(Nunmber(값) === 값 && 값 % 1 !== 0)) {
    console.log("오류 : 실수가 아닌 값");
  }
  else if(자료형.name == "문자" && !(typeof 값 == "string" && 값.length <= 1)) {
    console.log("오류 : 문자가 아닌 값");
  }
  else if(자료형.name == "문자열" && !(typeof 값 == "string")) {
    console.log("오류 : 문자열이 아닌 값");
  }
  return 값;
}

정수.a = 5;
정수.b = 55;
//정수.a = 8; -> 다음과 같이 변환
정수.a = set(정수, 5.1);
console.log(정수.a);

정수.a = 10;
console.log(정수.a);

문자.a = set(문자, "HI");
console.log(문자.a);


//문제 : 정수.a 그리고 문자.a 가 있으면 무엇을 출력해야하는지 혼란스러움.
*/
