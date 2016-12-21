/*
 *@이벤트 등록 메서드
 *@evObj {object} 이벤트대상
 *@evName {string} 이벤트네임
 *@evH {function} 이벤트 핸들러
 */
function addEvent(evObj, evName, evH) {
    var arrEvent = evName.split(" ");

    for (var i = 0; i < arrEvent.length; i++) {
        if (document.addEventListener) {
            evObj.addEventListener(arrEvent[i], evH);
        } else {
            evObj.attachEvent("on" + arrEvent[i], evH);
        }
    }
}

/*
 * @nextElement(obj) : 요소에 다음 요소 선택 메서드
 * @obj {object} : 대상 요소
 * @return m : 대상 요소에 다음에 요소를 반환 (없을 땐 null)
 */
function nextElement(obj) {
    var m = obj.nextSibling; //줄바꿈없음 -> null, 줄바꿈(나의경우) ->#text 

    if (m) {
        while (m.nodeType != 1) {
            m = m.nextSibling;
            if (m == null) {
                break;
            }
        }
    }
    return m;
}
