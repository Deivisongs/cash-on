/* Função DarkMode*/
function ativaDarkMode(){
    const spanDarkMode = document.getElementById('spanDarkMode')

    if(spanDarkMode.textContent === 'dark_mode'){
        spanDarkMode.textContent = 'light_mode'
        spanDarkMode.style.color = 'white'
    }else{
        spanDarkMode.textContent = 'dark_mode'
        spanDarkMode.style.color = 'black'
    }
}

const btnDarkMode = document.getElementById('btnDarkMode')
btnDarkMode.addEventListener('click', ativaDarkMode)


/* Função Consulta API bandeiras */
function consultaApiBandeira(){
    const api = fetch("https://restcountries.com/v2/all")
    .then((res) => {
        res.json().then((dados) => {
            console.log(dados[0].flags.svg)
        })
    })
}
consultaApiBandeira()