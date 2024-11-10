let quoteDisplayEl = document.getElementById("quoteDisplay");
let resultEl = document.getElementById("result");
let timerEL = document.getElementById("timer");
let quoteInputEl = document.getElementById("quoteInput");
let submitBtnEl = document.getElementById("submitBtn");
let resetBtnEl = document.getElementById("resetBtn");
let loading = document.getElementById("spinner");
let idInterval = 0;
let counter = 0;
generateText();

function generateText() {
    let counter = 0;
    let options = {
        method: "GET"
    }
    loading.classList.remove("d-none");
    fetch("https://apis.ccbp.in/random-quote", options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            loading.classList.add("d-none");
            quoteDisplayEl.textContent = (jsonData.content);
            idInterval = setInterval(function() {
                counter += 1;
                timerEL.textContent = counter;
            }, 1000);
        });
}

resetBtnEl.addEventListener("click", function() {
    resultEl.textContent = "";
    clearInterval(idInterval);
    timerEL.textContent = "0";
    generateText();
});

submitBtnEl.onclick = function() {
    if (quoteInputEl.value === quoteDisplayEl.textContent) {
        clearInterval(idInterval);
        resultEl.textContent = "You typed in " + timerEL.textContent + " seconds";
    } else {
        resultEl.textContent = "You typed wrong sentece";
    }
}
