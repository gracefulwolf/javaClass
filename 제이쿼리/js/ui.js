(function() {
    /*
    	1. 개체 생성함수를 정의
    	2. 객체 생성
    	3. 속성, 메서드 등록
    */
    //객체 속성
    function TabmenuFnc(objName, idx) {
        this.myObjName = objName;
        this.myidx = idx;
        this.myObj = this.myObjName + ":eq(" + this.myidx + ")";
        this.actImg = $(this.myObj).find("h3:first img, h4:first img");
        this.bindEvent();
    }
    TabmenuFnc.prototype.bindEvent = function() {
        $(document).on("click", this.myObj + " h3 a," + this.myObj + " h4 a", $.proxy(this.tabmenuEventH, this)); //proxy = this에 역활을 바꿈
    }
    TabmenuFnc.prototype.tabmenuEventH = function(e) {
            e.preventDefault()
            var $myImg = $(e.target);
            var $myThis = $(e.target).closest("a");
            var $myDiv = $myThis.parent().next();
            var $visibleDiv = $(this.myObj+ " div:visible");
            //클릭했을때 보이는 div 요소는 숨겨라
            // 클릭한 탭에 해당하는 div는 보여라
            if ($myDiv.is(":hidden")) {
            	$visibleDiv.hide();
            	$myDiv.show();

            	var src_off = this.actImg.attr("src").replace("_ov.gif",".gif");
            	this.actImg.attr("src",src_off );
            	var src_on = $myImg.attr("src").replace(".gif","_ov.gif");
            	 $myImg.attr("src",src_on );

            	 this.actImg = $myImg;
            }
        }
        //개체 생성 함수
    $(function() {
        var arrTab = [];
        var tabText = "div[data-type=tabmenu]";
        var tabMenuWrap = $("div[data-type=tabmenu]");
        $.each(tabMenuWrap, function(i, o) { //i = 인덱스값  o =속성값 
            arrTab[i] = new TabmenuFnc(tabText, i); //개체
        });
    });
}());
