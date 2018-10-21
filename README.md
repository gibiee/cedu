# 181001
# Cedu

# problem
라인 counter -> textarea 에서만 작용
예약어 color -> div 또는 span 에서만 작용


## div or span 은
1. \n value 가 들어가지 않음. >> white-space:pre 로 해결!

2. useTab 불가능.

textarea -> div 방향으로 값을 보내면 한글 반박자 늦게 적용.
div -> textarea 방향 또한 반박자 늦게 적용.

한글 반박자 문제를 해결한다면 : textarea -> div 방향으로 값을 보냄;
                  해결하지 못한다면 : div -> textarea 방향으로 값을 보냄;

# 현재는 해결하지 못하는 상태
