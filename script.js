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




/* Função para converter os valores */

const btnConverter = document.getElementById('btnConverter')
btnConverter.addEventListener('click', () => converte('moeda1', 'moeda2'))


function converte(x, y){
    const moeda1 = document.getElementById(x).value
    const moeda2 = document.getElementById(y).value

    const inputMoeda1 = parseFloat(document.getElementById('inputMoeda1').value)

    /* Buscando dados da API */
    let retornoBusca = []

    async function buscaDados(){
        try{
            const api = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024.7.9/v1/currencies/${moeda1}.json`)

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

            document.getElementById('inputMoeda2').value = resposta
            
        }else{
            msgErro.textContent = 'Ops, Digite um valor válido!!!'
            msgErro.style.padding = '8px 15px'
        }
               
    
    }
    buscaDados()

    

}




