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
            var $visibleDiv = $(this.myObj + " div:visible");
            //클릭했을때 보이는 div 요소는 숨겨라
            // 클릭한 탭에 해당하는 div는 보여라
            if ($myDiv.is(":hidden")) {
                $visibleDiv.hide();
                $myDiv.show();

                var src_off = this.actImg.attr("src").replace("_ov.gif", ".gif");
                this.actImg.attr("src", src_off);
                var src_on = $myImg.attr("src").replace(".gif", "_ov.gif");
                $myImg.attr("src", src_on);

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

/*
 *@ $.fn.playSlide : 반응형 bxSlide 메서드
 *@opt {object} : bxSlider 옵션 값
 *@{
 *@  mobile: { minSlides: 2, maxSlides: 2, slideWidth: 150 },
 *@  tablet: { minSlides: 3, maxSlides: 3, slideWidth: 150 },
 *@  pc: { minSlides: 5, maxSlides: 5, slideWidth: 150 }
 *@}
 */

$.fn.playSlide = function(opt) {
    var baseOption = {
        auto: true,
        minSlides: 5,
        maxSlides: 5,
        slideWidth: 100,
        slideMargin: 10,
        mode: "horizontal",
        speed: 500
    }
    var k;
    $(window).on("resize", function() {
        if ($(window).width() > 800) { //pc
            k = $.extend(baseOption, opt.pc);
        } else if ($(window).width() > 480) { //tablet
            k = $.extend(baseOption, opt.tablet);
        } else { //mobile
            k = $.extend(baseOption, opt.mobile);
        }
        console.log(k);
    });

    $(window).resize();
    var mySliede = $(this).bxSlider(k); //여기서 this는  playSlide를 적용한 ".slideList"
    $(window).on("resize", function() {
        console.log($(window).width());
        mySliede.reloadSlider(k);
    });
}

/*
 *@$.fn.gnb 메서드 
 *@opt {object} : img 파일명값
 */

$.fn.gnb = function(opt) {
    var myThis = $(this);
    var activeMenu = null;
    var mouseOver = function() {
        var ts = $(this);
        if (activeMenu) {
            activeMenu.next().slideUp(300);
            var bfImg = $("img", activeMenu).attr("src").replace(opt.name2, opt.name1);
            $("img", activeMenu).attr("src", bfImg);
        }

        ts.next().slideDown(300);

        var ovImg = $("img", ts).attr("src").replace(opt.name1, opt.name2);
        $("img", ts).attr("src", ovImg);

        activeMenu = ts;
    }
    $("ul ul", myThis).hide();
    $(">ul>li>a", myThis).on({
        "mouseover focus": mouseOver
    });
    myThis.on({ //마우스리브 이벤트실행함수
        "mouseleave": function() {
            if (activeMenu) {
                activeMenu.next().slideUp(300);
                var bfImg = $("img", activeMenu).attr("src").replace(opt.name2, opt.name1);
                $("img", activeMenu).attr("src", bfImg);
            }
        }
    });
}
$(function() {
    $("#gnb").gnb({
        name1: ".gif",
        name2: "_ov.gif"
    });
});
