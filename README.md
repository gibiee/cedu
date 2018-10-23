# Cedu
## The Programming Language of Hangul for education
## First Commit : 181001

### problem
1. \n value 가 들어가지 않음. >> white-space:pre 로 해결!
2. div or span은 useTab 사용 불가능. >> onKeyDown() 으로 해결!
3. div or span은 line counter 사용 뷸가능
4. 예약어 color는 div or span 에서만 적용 가능
5. 한글 반박자 늦게 적용 >> keyup을 사용하면 해결!
6. 보여지는 화면과 입력box가 다를 때 커서가 안 보임.<br>
textarea -> div 방향 및 div -> textarea 방향 : 양방향으로 반박자 늦게 적용.
<br><br>

>보여지는 화면 : div or span
>> 예약어 색깔 적용을 위해 필수.

>입력 box : div or span
>> textarea 이면 커서가 보이지 않음.

z-index를 활용하여 textarea 맨 뒤로 보낼 것!

###입력 이슈
입력()으로 받아서 숫자는 숫자형으로 문자는 문자형으로 자동으로 처리할 것.

왜냐면 ex. 숫자를 문자로 받을 이유가 없기 때문!
변수 a = 5; 변수 b = 6;
출력(a,b); → 56

###순서
1. textbox div 간 값 전달
2. ↑ 둘이 겹치기
3. 입력() 만들기
