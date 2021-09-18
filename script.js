// INITIALIZE FULLY GLOBAL VARS IN ORDER TO ACCESS LATER

// AMOUNT OF TIME TO COMPLETE QUIZ / GAME
let counter = 90;

// INITIALIZE TRACKS - NO NEED FOR LOOP AS APP IS TIMED!
let track1 = new Audio("media/smw-title.mp3");
let track2 = new Audio("media/Just Do It Up.mp3");
let track3 = new Audio("media/310 - dark alliance.mp3");
let track4 = new Audio("media/ave-maria.mp3");
let track5 = new Audio("media/firestarter.mp3");
let track6 = new Audio("media/zangief-theme.mp3");
let track7 = new Audio("media/one-more-win.mp3");
let buttonPress = new Audio("media/button-press.mp3");
let airHorn = new Audio("media/air-horn.mp3");
let warning = new Audio("media/missile-warning.mp3");
let laugh = new Audio("media/evil-laugh.mp3");
let applause = new Audio("media/applause.mp3");
let boo = new Audio("media/boo.mp3");

// INITIALIZE SCORE & SCORING OUTPUT AREA
let score = 0;
let output = $("#answer-area");
// NOT USED - SEE PROGRESS BAR COMMENT: let pbVal = 0;

// DISABLE SCORE BUTTON / UI & DISPLAY "GAME OVER"
function endLogic() {
    $("#calc").prop("disabled", true);
    $("#start").prop("disabled", true);
    $("input:radio").prop("disabled", true);
    $(".flex-container button").prop("disabled", true);
    track1.pause();
    track2.pause();
    track3.pause();
    track4.pause();
    track5.pause();
    track6.pause();
    track7.pause();
}

$(document).ready(function () {

    // jQUERY UI TO STYLE ELEMENTS
    $("#page-tabs").tabs();
    $("button").button();
    $("radio").addClass("ui-widget ui-widget-content ui-corner-all");
    
    // PREVENT RADIOS REMAINING CHECKED ON BROWSER REFRESH
    $(":radio").prop("checked", false);

    // ENSURE UI IS DISABLED UNTIL USER STARTS GAME / QUIZ
    // FIXED BUG: ENABLE PROPERTIES HERE, *AFTER* jQUERY UI ELEMENTS RENDERED!!!
    $("input:radio").prop("disabled", true);
    $("#calc").prop("disabled", true);
    $(".flex-container button").prop("disabled", true);

    // PREVENT jQUERY UI ALERT SHOWING BY DEFAULT
    $("#test-alert").dialog({
        autoOpen: false
    });

    // ANIMATE 'HINT' SECTIONS OF THE PAGE
    $("#show-Q1-hint").click(function () {
        $("#hint-Q1").toggle("clip");
    });
    $("#show-Q2-hint").click(function () {
        $("#hint-Q2").toggle("blind", {
            direction: "left"
        })
    });
    $("#show-Q3-hint").click(function () {
        $("#hint-Q3").toggle("fade", "slow");
    });
    $("#show-Q4-hint").click(function () {
        $("#hint-Q4").toggle("clip");
    });
    $("#show-Q5-hint").click(function () {
        $("#hint-Q5").toggle("blind", {
            direction: "left"
        })
    });
    $("#show-Q6-hint").click(function () {
        $("#hint-Q6").toggle("fade", "slow");
    });
    $("#show-Q7-hint").click(function () {
        $("#hint-Q7").toggle("clip");
    });

    // UI SFX
    $("#start").click(function () {
        airHorn.play();
    });
    $("button").click(function () {
        buttonPress.play();
    });

    // PLAY TRACKS ON BTN CLICK
    $("#track-1").on("click", function () {
        track1.paused ? track1.play() : track1.pause();
        track1.currentTime = 0;
    });
    $("#track-2").on("click", function () {
        track2.paused ? track2.play() : track2.pause();
        track2.currentTime = 0;
    });
    $("#track-3").on("click", function () {
        track3.paused ? track3.play() : track3.pause();
        track3.currentTime = 0;
    });
    $("#track-4").on("click", function () {
        track4.paused ? track4.play() : track4.pause();
        track4.currentTime = 0;
    });
    $("#track-5").on("click", function () {
        track5.paused ? track5.play() : track5.pause();
        track5.currentTime = 0;
    });
    $("#track-6").on("click", function () {
        track6.paused ? track6.play() : track6.pause();
        track6.currentTime = 0;
    });
    $("#track-7").on("click", function () {
        track7.paused ? track7.play() : track7.pause();
        track7.currentTime = 0;
    });

    /* UNNECESSARY UI BUT USEABLE FOR FUTURE PROJECTS
    $("#progbar").progressbar({
        value: 0
    });

    // TRIGGER WHEN USER CLICKS RADIO
    $(".Prog").change(function () {
        // INCREMENT PERCENTAGE VALUE & FILL PROGRESS BAR
        pbVal += 20;
        $("#progbar").progressbar("option", "value", pbVal);
    }); */

    // RELOAD PAGE - ACTS AS A QUIT OR RESET BUTTON FOR USER
    $("#stop").click(function () {
        location.reload();
    });

    // ACTIVATE TIMER / UI & START QUIZ
    let alert = true;

    $("#start").click(function () {

        // ANIMATE UI
        $("#time-display, #answer-area").toggle("blind", {
            direction: "left"
        }, 3000);
        // ENABLE / DISABLE CERTAIN UI COMPONENTS TO PREVENT CHEATING!!!
        $("#calc").prop("disabled", false);
        $("#start").prop("disabled", true);
        $(".flex-container button").prop("disabled", false);
        $("input:radio").prop("disabled", false);
        $(".timer").removeClass("red");
        // START COUNTDOWN TIMER 
        setInterval(function () {
            // SET COUNTER TO DECREMENT
            counter--;
            // DISPLAY COUNTDOWN ON PAGE
            if (counter >= 0) {
                $(".timer").html(`Challenge in progress... <br><br> Time remaining: ${counter}`);
            }
            // DISPLAY WARNING TEXT IF TIME RUNNING OUT!    
            if (counter >= 0 && counter < 22) {
                $(".timer").addClass("red").html(`WARNING! Hurry up! <br><br> Time remaining: ${counter}`);
            }
            // PLAY WARNING SOUND & ADD 'DISABLE WARNING' BTN (REVERSED IF FALSE)
            if (counter >= 0 && counter < 23 && alert === true) {
                warning.play();
                $("#alarm-disable").css("margin", "0");
            }
            // IF TIME UP, PLAY / STOP SOUND & DISPLAY 0 - USER GETS 0 SCORE ON TIMEOUT
            if (counter === 0) {
                laugh.play();
                warning.pause();
                $(".timer").html(`<br> You're dead :(`);
                output.html(`You have scored: ${score} / 7`);
                $("#test-alert").dialog("open").html(`You have scored: ${score} / 7 <br><br> Thank you for playing :) <br><br> Please click the 'Reset' button to reload and try again!`);
                clearInterval(counter);
                endLogic();
            }
        }, 1000);
    });

    // BUTTON TO APPEAR TO ALLOW USER TO DISABLE TIME WARNING SOUND
    $("#alarm-disable").click(function () {
        alert = false;
        warning.pause();
        $("#alarm-disable").css("margin", "-1000px");
    });

    // BUTTON TO TOTAL SCORES, DISPLAY ERROR / CORRECT, DISABLE SFX AND UI
    $("#calc").click(function () {
        // CHECK THAT AT LEAST ONE ANSWER FROM EACH RADIO GROUP / QUESTION IS CHECKED
        if ($("input[name = 'q-1']").is(":checked") &&
            $("input[name = 'q-2']").is(":checked") &&
            $("input[name = 'q-3']").is(":checked") &&
            $("input[name = 'q-4']").is(":checked") &&
            $("input[name = 'q-5']").is(":checked") &&
            $("input[name = 'q-6']").is(":checked") &&
            $("input[name = 'q-7']").is(":checked")) {
            // IF ALL CHECKED, ASK USER TO FINISH OR GIVE OPTION TO CONTINUE
            let confirmationAllChecked = window.confirm("All answers selected. Continue and get score?");
            if (confirmationAllChecked) {
                counter = 0;
                warning.pause();
            } else {
                return false;
            }
            // INFORM USER OF MISSED QUESTIONS & ASK TO CONFIRM GAME OVER
        } else {
            let confirmationNotAllChecked = window.confirm("Not all questions have been answered!\n\nFinish and check score?");
            if (confirmationNotAllChecked) {
                counter = 0;
                warning.pause();
            } else {
                return false;
            }
        }

        // STORE VALUES FOR RADIO CHECK BOXES
        let checkAnswer_1 = $("input[name = 'q-1']:checked").val();
        let checkAnswer_2 = $("input[name = 'q-2']:checked").val();
        let checkAnswer_3 = $("input[name = 'q-3']:checked").val();
        let checkAnswer_4 = $("input[name = 'q-4']:checked").val();
        let checkAnswer_5 = $("input[name = 'q-5']:checked").val();
        let checkAnswer_6 = $("input[name = 'q-6']:checked").val();
        let checkAnswer_7 = $("input[name = 'q-7']:checked").val();

        // CHECK ANSWERS & TALLY SCORE, OUTPUT 'CORRECT' OR 'INCORRECT' SVG
        checkAnswer_1 === "1" ? ++score + $("#check-1").css("display", "inline-block") : $("#error-1").css("display", "inline-block");
        checkAnswer_2 === "2" ? ++score + $("#check-2").css("display", "inline-block") : $("#error-2").css("display", "inline-block");
        checkAnswer_3 === "1" ? ++score + $("#check-3").css("display", "inline-block") : $("#error-3").css("display", "inline-block");
        checkAnswer_4 === "2" ? ++score + $("#check-4").css("display", "inline-block") : $("#error-4").css("display", "inline-block");
        checkAnswer_5 === "3" ? ++score + $("#check-5").css("display", "inline-block") : $("#error-5").css("display", "inline-block");
        checkAnswer_6 === "3" ? ++score + $("#check-6").css("display", "inline-block") : $("#error-6").css("display", "inline-block");
        checkAnswer_7 === "2" ? ++score + $("#check-7").css("display", "inline-block") : $("#error-7").css("display", "inline-block");

        // OUTPUT & RESET SCORE, TERMINATE SFX & UI
        $(".timer").html(`<br> Game Over!`);
        $("#test-alert").dialog("open").html(`You have scored: ${score} / 7 <br><br> Thank you for playing :) <br><br> Please click the 'Reset' button to reload and try again!`);
        output.html(`You have scored: ${score} / 7`);
        endLogic();

        // PLAY SOUNDS UPON MAX SCORE / LOW SCORE, THEN RESET SCORE FOR NEXT PLAY
        if (score === 7) {
            applause.play();
        } else if (score <= 2) {
            boo.play();
        }
        score = 0;
    });

});
