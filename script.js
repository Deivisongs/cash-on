/* Função DarkMode*/
function ativaDarkMode(){
    const spanDarkMode = document.getElementById('spanDarkMode')

    if(spanDarkMode.textContent === 'dark_mode'){
        spanDarkMode.textContent = 'light_mode'
        spanDarkMode.style.color = 'white'
        document.getElementById('header').style.background = '#161616';
        document.getElementById('body').style.background = '#202020';
        document.getElementById('spanLogo').style.color = '#ffffff'
        document.getElementById('nav').style.color = '#ffffff'
        document.getElementById('conversor').style.boxShadow = 'none'
        document.getElementById('conversor').style.background = 'white'
        document.getElementById('conversor').style.color = 'black'
        document.getElementById('tituloCotacoes').style.color = 'white'

    }else{
        spanDarkMode.textContent = 'dark_mode'
        spanDarkMode.style.color = 'black'
        document.getElementById('header').style.background = '#ffffff';
        document.getElementById('body').style.background = '#ececec';
        document.getElementById('spanLogo').style.color = 'black'
        document.getElementById('nav').style.color = 'black'
        document.getElementById('conversor').style.boxShadow = '2px 2px 10px rgb(192, 192, 192)'
        document.getElementById('tituloCotacoes').style.color = 'black'
        document.getElementById('conversor').style.background = 'white'
        
    }
}

const btnDarkMode = document.getElementById('btnDarkMode')
btnDarkMode.addEventListener('click', ativaDarkMode)

/* -------------------------- */



/* Criando Select Moedas apartir da API */ 

async function selectMoedas(){
    /* Pegando dados da API */ 
    let moedas = []
    
    try{
        const res = await fetch("https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json")

        const dados = await res.json()
        
        moedas = dados
        
    } catch(error){
        console.error("Erro ao buscar Moedas: ", error)
    }

    /* Função que cria o select que pode ser usado nas 2 moedas */
    function criaSelect(id){
        const select = document.getElementById(id)

        Object.keys(moedas).forEach(x => {

            if(moedas[x] != ''){
                const option = document.createElement('option')
                option.value = x
                option.textContent = `${x} - ${moedas[x]}`
    
                select.append(option)
            }    
        });

    }
    criaSelect('listaMoeda1')
    criaSelect('listaMoeda2')

}
selectMoedas()
/* ----------------------------------------- */



/* funcão seleção moedas apartir da Nav */

function clickMoedas(moeda){
    document.getElementById('moeda1').value = moeda.id
    console.log(moeda.id)
}



/* -------------------------------------------*/





/* Função para converter os valores */

const btnConverter = document.getElementById('btnConverter')
btnConverter.addEventListener('click', () => {
    converte('moeda1', 'moeda2')
})



function converte(x, y){
    const moeda1 = document.getElementById(x).value
    const moeda2 = document.getElementById(y).value

    const inputMoeda1 = parseFloat(document.getElementById('inputMoeda1').value)

    /* Buscando dados da API */
    let retornoBusca = []

    async function buscaDados(){
        const data = new Date();
        const dia = data.getDate();
        const mes = data.getMonth() + 1;
        const ano = data.getFullYear();
    
        try{
            const api = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${ano}.${mes}.${dia}/v1/currencies/${moeda1}.json`)

            const dados = await api.json()

            retornoBusca = dados
        }catch(error){
            console.error('Erro ao buscar dados: ', error)
        }

        const msgErro = document.getElementById('msgErro')
        msgErro.textContent = ''
        msgErro.style.padding = '0px'

        if(!isNaN(inputMoeda1)){
            
            let resposta = inputMoeda1*retornoBusca[moeda1][moeda2]

            const retorno = resposta.toFixed(2);

            document.getElementById('inputMoeda2').value = retorno
            
        }else{
            msgErro.textContent = 'Ops, Digite um valor válido!!!'
            msgErro.style.padding = '8px 15px'
        }
               
    
    }
    buscaDados()

    

}




