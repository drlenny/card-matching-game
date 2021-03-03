$(document).ready(() => {
    console.log('Jquery is ready')

    // // function to shuffle our cards
    // function shuffle(deck) {
    //     for (var j, x, i = deck.length; i; j = Math.floor(Math.random() * i), x = deck[--i], deck[i] = deck[j], deck[j] = x);
    //     return deck;
    // };


    const cards = ["king", "king", "queen", "queen"];

    const selectedCards = [];

    var counter = 0;

    var moves = 0;

    // shuffles the cards around
    function shuffle(cards) {
        var currentIndex = cards.length, temporaryValue, randomIndex;

        // While there are elements remainging to shuffle
        while (0 !== currentIndex) {

            // Pick a remaining element
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // Swap with card back
            temporaryValue = cards[currentIndex];
            cards[currentIndex] = cards[randomIndex];
            cards[randomIndex] = temporaryValue;
        }
        return cards;
    }

    // refreshes page
    function reset() {
        // sets all values back to default
        shuffle(cards);
        console.log(cards);
        $(".card-face").hide();
        $(".card-back").show();
        counter = 0;
        moves = 0;
        while (selectedCards.length > 0) {
            selectedCards.pop();
        }
        // assigns a card to one of the four divs if not already assigned
        if (!$(".card-face").length){
            $(".card").each(function () {
                var $cardFace = $("<img>", {
                    src: "/images/" + cards[counter] + ".png"
                })
                    .hide()
                    .addClass("card-face");
    
                $(this).append($cardFace);
                counter += 1;
            })
        }

        // assigns name of card face to div
        $(".card").each(function () {
            if ($(this).find(".card-face").attr("src") === "/images/king.png") {
                $(this).attr("name", "king");
            } else if ($(this).find(".card-face").attr("src") === "/images/queen.png") {
                $(this).attr("name", "queen");
            }
        })
    }

    // runs reset on load
    reset();

    // checks if selected cards are the same
    var check = (card) => {
        if ($(card)[0] == $(card)[1]) {
            return true;
        } else {
            return false;
        }
    };

    // reveals cards
    $(".card").click(function () {
        if (selectedCards.length < 2 && $(this).children(".card-back").attr("style") !== "display: none;") {
            console.log("hello");
            moves++;
            $(this).find(".card-back").hide();
            $(this).find(".card-face").show();

            selectedCards.push($(this).attr("name"));
        }
        console.log(selectedCards);
        
        // continues game if cards match
        if (moves === 2 && check(selectedCards) === true) {
            while (selectedCards.length > 0) {
                selectedCards.pop();
            }
            // 
        } else if (moves === 2 && check(selectedCards) === false) {
            setTimeout(function () { reset() }, 1500);
        }
        console.log(moves);
    })

    $(".reset").click(function(){
        $(".card-face").remove();
        reset();
    });

    //$(".reset").on('click', event => {

    //})
})