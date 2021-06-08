const RANDOM_QUOTE_API_URL='https://free-quotes-api.herokuapp.com/'
const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const timerElement=document.getElementById('timer')
const resetElement=document.getElementById('reset')
const stopElement=document.getElementById('stop')

let finished=false

quoteInputElement.addEventListener('input',()=>{
    // console.log('changed')
    const arrayQuote=quoteDisplayElement.querySelectorAll('span')
    const arrayValue=quoteInputElement.value.split('')
    let correct=true
    arrayQuote.forEach((charecterSpan,index)=>{
        const charecter=arrayValue[index]
        if(charecter==null){
            charecterSpan.classList.remove('correct')
            charecterSpan.classList.remove('incorrect')
            correct=false
        }
        else if(charecter===charecterSpan.innerText){
            charecterSpan.classList.add('correct')
            charecterSpan.classList.remove('incorrect')
        }
        else{
            charecterSpan.classList.add('incorrect')
            charecterSpan.classList.remove('correct')
            correct=false
        }
    })
//add activate and deactivate to restart here
    if(correct){
        stop()
    }
})

function getRandomQuote(){
    return fetch(RANDOM_QUOTE_API_URL)
    .then(response => response.json())
    .then(data => data.quote)
}

async function renderNewQuote(){
    const quote = await getRandomQuote()
    quoteDisplayElement.innerHTML=''
    quote.split('').forEach(charecter => {
        const charecterSpan=document.createElement('span')
        // charecterSpan.classList.add('correct')
        // charecterSpan.classList.add('incorrect')
        charecterSpan.innerText=charecter
        quoteDisplayElement.appendChild(charecterSpan)
    })
    resetElement.classList.add('disabled')
    stopElement.classList.remove('disabled')
    quoteInputElement.value=null
    startTimer()
    console.log(quote)
}

let startTime
let timevalue
function startTimer(){
    let time=0.00
    timerElement.innerText=0.00
    startTime=new Date()
    timevalue=setInterval(()=>{
        time+=0.01
        timerElement.innerHTML=(time.toFixed(2))
    },10)
}


renderNewQuote()

function reset(){
    time=0.00
    renderNewQuote()
}

function stop(){
    stopElement.classList.add('disabled')
    resetElement.classList.remove('disabled')
    clearInterval(timevalue)
}
