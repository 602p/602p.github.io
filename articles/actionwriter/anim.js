const string =
[
"a  b  c  d             /-------------------\\\n"+
"|  |  |  |             | A | B | C | D |   |\n"+
"O--X--O--O-- 0         |---+---+---+---+---|\n"+
"|  |  |  |             |   |   |   |   | 0 |\n"+
"O--O--O--O-- 1         |---+---+---+---+---|\n"+
"|  |  |  |             |   |   |   |   | 1 |\n"+
"O--O--O--X-- 2         |---+---+---+---+---|\n"+
"|  |  |  |             |   |   |   |   | 2 |\n"+
"O--O--O--X-- 3         |---+---+---+---+---|\n"+
"                       |   |   |   |   | 3 |\n"
,
"A  b  c  d             /-------------------\\\n"+
"|  |  |  |             | A | B | C | D |   |\n"+
"O--X--O--O-- 0         |---+---+---+---+---|\n"+
"|  |  |  |             | O |   |   |   | 0 |\n"+
"O--O--O--O-- 1         |---+---+---+---+---|\n"+
"|  |  |  |             | O |   |   |   | 1 |\n"+
"O--O--O--X-- 2         |---+---+---+---+---|\n"+
"|  |  |  |             | O |   |   |   | 2 |\n"+
"O--O--O--X-- 3         |---+---+---+---+---|\n"+
"                       | O |   |   |   | 3 |\n"
,
"a  B  c  d             /-------------------\\\n"+
"|  |  |  |             | A | B | C | D |   |\n"+
"O--X--O--O-- 0 HIGH    |---+---+---+---+---|\n"+
"|  |  |  |             | O | X |   |   | 0 |\n"+
"O--O--O--O-- 1         |---+---+---+---+---|\n"+
"|  |  |  |             | O | O |   |   | 1 |\n"+
"O--O--O--X-- 2         |---+---+---+---+---|\n"+
"|  |  |  |             | O | O |   |   | 2 |\n"+
"O--O--O--X-- 3         |---+---+---+---+---|\n"+
"                       | O | O |   |   | 3 |\n"
,
"a  b  C  d             /-------------------\\\n"+
"|  |  |  |             | A | B | C | D |   |\n"+
"O--X--O--O-- 0         |---+---+---+---+---|\n"+
"|  |  |  |             | O | X | O |   | 0 |\n"+
"O--O--O--O-- 1         |---+---+---+---+---|\n"+
"|  |  |  |             | O | O | O |   | 1 |\n"+
"O--O--O--X-- 2         |---+---+---+---+---|\n"+
"|  |  |  |             | O | O | O |   | 2 |\n"+
"O--O--O--X-- 3         |---+---+---+---+---|\n"+
"                       | O | O | O |   | 3 |\n"
,
"a  b  c  D             /-------------------\\\n"+
"|  |  |  |             | A | B | C | D |   |\n"+
"O--X--O--O-- 0         |---+---+---+---+---|\n"+
"|  |  |  |             | O | X | O | O | 0 |\n"+
"O--O--O--O-- 1         |---+---+---+---+---|\n"+
"|  |  |  |             | O | O | O | O | 1 |\n"+
"O--O--O--X-- 2 HIGH    |---+---+---+---+---|\n"+
"|  |  |  |             | O | O | O | X | 2 |\n"+
"O--O--O--X-- 3 HIGH    |---+---+---+---+---|\n"+
"                       | O | O | O | X | 3 |\n"];

$(function(){
    var state = 0;
    var running = 1;

    var muxstate=0;
    var muxrunning=1;
    var muxbin=0;

    var advance = function(){
        $("#keyboard-matrix-animation").text(string[state]);
        state++;
        if(state==5) state=0;
    };
    advance();
    setInterval(function(){
        if(running) advance();
    }, 1500);
    $("#keyboard-matrix-playpause").click(function(){
        running=!running;
        if(running){
            $("#keyboard-matrix-playpause").text("Pause");
        }else{
            $("#keyboard-matrix-playpause").text("Play");
        }
    });
    $("#keyboard-matrix-step").click(function(){
        running=0;
        $("#keyboard-matrix-playpause").text("Play");
        advance();
    });


    var muxadvance = function(){
        $("#mux-animation").attr('src', "anim/"+muxstate+".png");
        muxstate++;
        if(muxstate==16) muxstate=0;
    };
    muxadvance();
    setInterval(function(){
        if(muxrunning) muxadvance();
    }, 750);
    $("#mux-playpause").click(function(){
        muxrunning=!muxrunning;
        if(muxrunning){
            $("#mux-playpause").text("Pause");
        }else{
            $("#mux-playpause").text("Play");
        }
    });
    $("#mux-step").click(function(){
        muxrunning=0;
        $("#mux-playpause").text("Play");
        muxadvance();
    });
    var updateinput=function(){
        var content = $("#mux-input").val();
        if($("#mux-bindec").prop("checked")){
            var badchars="23456789";
            var i = badchars.length;
            while (i--) {
              content=content.replace(badchars.charAt(i), "");
            }
            content=parseInt(content, 2);
        }else{
            content=parseInt(content, 10);
        }
        if(isNaN(content)) content=0;
        else $("#mux-input").val($("#mux-bindec").prop("checked")?content.toString(2):content);
        muxstate=content;
        muxrunning=false;
        $("#mux-playpause").text("Play");
        $("#mux-animation").attr('src', "anim/"+muxstate+".png");
    };
    $("#mux-bindec, #mux-bindec-text").click(function(){
        muxbin=!muxbin;
        if(muxbin){
            $("#mux-bindec-text").text("bin");
            $("#mux-bindec").prop("checked", true);
        }else{
            $("#mux-bindec-text").text("dec");
            $("#mux-bindec").prop("checked", false);
        }
        updateinput();
    });
    $("#mux-input").keyup(updateinput);

    $(document).ready(function() {
        $('.popup').magnificPopup({type:'image'});
    });

    $(".tooltipd").click(function(){
        alert($(this).attr("title"));
    })
});