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
    $(document).ready(function() {
        $('.popup').magnificPopup({type:'image'});
    });

    $(".tooltipd").click(function(){
        alert($(this).attr("title"));
    })
});