const formsDiv = document.getElementById("forms")
const formRequisitos = document.getElementById("formRequisitos")
const formPcp = document.getElementById("formPcp")
const finishBtn = document.getElementById("finish")
const log = document.getElementById("log")
const resultsTable = document.getElementById("resultsTable")

const itensRequisitos = [
    "Foi gerado um artefato contendo os requisitos coletados?",
    "O artefato com os requisitos coletados é mantido atualizado?",
    "Os requisitos coletados possuem identificador único?",
    "Os requisitos coletados comunicam seu objetivo de forma clara e não ambígua?",
    "Os requisitos coletados são mensuráveis? (É possível avaliar se o requisito foi atendido?)",
    "Os requisitos coletados foram validados pelas partes interessadas?",
    "Os requisitos coletados são classificados em requisitos funcionais e não-funcionais?",
    "Os requisitos coletados possuem classificação com base em sua prioridade?",
]


function loadFormRequisitos(form,arr){
    let idTemplate;
    form.id == "formRequisitos"?idTemplate = "er": idTemplate = "pcp"
  
    for (let i = 0; i < arr.length; i++) {
        let newDiv = document.createElement('div')
        newDiv.classList.add("formItem")
        let label = document.createElement('label')
        label.setAttribute('for', `${idTemplate + i}`)
        label.innerHTML = `<input type="checkbox" id=${idTemplate + i} name=${idTemplate + i}><span>${arr[i]}</span>`
        
        newDiv.appendChild(label)
 
        let priorityDiv = document.createElement('div')
        
        let labelPriority = document.createElement('label')
        labelPriority.textContent = 'Prioridade: '
        priorityDiv.appendChild(labelPriority)
        
        let select = document.createElement('select')
        select.setAttribute('id', `${idTemplate + i}Select`)
        select.setAttribute('name', `${idTemplate + i}Select`)
        
        let options = ['Baixa', 'Média', 'Alta', 'Urgente']
        for (let j = 0; j < options.length; j++) {
            let option = document.createElement('option')
            option.setAttribute('value', options[j])
            option.textContent = options[j]
            select.appendChild(option)
        }
        
        priorityDiv.appendChild(select)
        newDiv.appendChild(priorityDiv)
        form.appendChild(newDiv) 
        }
}

function generateLog(){
    for (let i = 0; i < itensRequisitos.length; i++) {
        let newRow = document.createElement('tr');
        let select = document.getElementById(`er${i}Select`)
        let checkbox = document.getElementById(`er${i}`); 
        if(!checkbox.checked){
           continue
        }  
    let desc = document.createElement("td")
        desc.textContent = itensRequisitos[i]
        let processo = document.createElement("td")
        processo.textContent = "Engenharia de requisitos"
        let prioridade = document.createElement("td")
        prioridade.textContent = select.options[select.selectedIndex].value

        newRow.appendChild(desc)
        newRow.appendChild(processo)
        newRow.appendChild(prioridade)

        resultsTable.appendChild(newRow);
       
    }

    
    
}



document.addEventListener("DOMContentLoaded", function() {
    loadFormRequisitos(formRequisitos,itensRequisitos)
    loadFormRequisitos(formPcp,itensRequisitos)
  });

finishBtn.addEventListener("click",(e) =>{
    formsDiv.classList.add("hidden")
    finishBtn.classList.add("hidden")
    log.classList.remove("hidden")
    generateLog()
})