const helpBtn = document.getElementById("helpBtn")
const modal = document.getElementById("helpModal")

//form
const formsDiv = document.getElementById("forms")
const formRequisitos = document.getElementById("formRequisitos")
const formItg = document.getElementById("formItg")
const finishBtn = document.getElementById("finish")

//relatório
const log = document.getElementById("log")
const resultsTable = document.getElementById("resultsTable")
const resultsRequisitos = document.getElementById("resultEr").children
const resultsItg = document.getElementById("resultItg").children

//form items
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

const itensIntegracao = [
    "Foi gerado um diagrama de classes?",
    "Foi gerado um diagrama de componentes?",
    "Foi gerado um artefato baseado nos diagramas?",
    "O artefato gerado é mantido atualizado?",
    "Os diagramas estão de acordo com as boas práticas da UML?",
    "O produto gerado segue a estrutura planejada anteriormente?",
    "Os diagramas usam os recursos humanos de maneira eficiente? ",
    "Foi feita a revisão do produto após a integração?"
]

const cargos = ["Gerente","Analista de qualidade","Analista financeiro","Desenvolvedor"]
const prioridades = ['Baixa', 'Média', 'Alta', 'Urgente']

function loadForm(form,questions){
    
    let idTemplate;
    form.id == "formRequisitos"?idTemplate = "er": idTemplate = "itg" 
    
    for (let i = 0; i < questions.length; i++) {
        
        //containers
        let itemDiv = document.createElement("div")
        let selectDiv = document.createElement("div")
        itemDiv.classList.add("formItem")  
        selectDiv.classList.add("selectContainer")
        
        //descrição    
        let descLabel = document.createElement('label')
        descLabel.setAttribute("for",`${idTemplate}Desc${i}`)  
        
        let checkBox = document.createElement("input") 
        checkBox.setAttribute("type","checkbox")
        checkBox.setAttribute("id",`${idTemplate}Desc${i}`)
        
        let desc = document.createElement("span")
        desc.innerHTML = questions[i]
            
        //cargo    
        let roleLabel = document.createElement("label")
        roleLabel.setAttribute("for",`${idTemplate}Cargo${i}`)
        let roleSelect = document.createElement("select")
        roleSelect.setAttribute("id",`${idTemplate}Cargo${i}`)
        roleSelect.setAttribute("name",`${idTemplate}Cargo${i}`)
        
        //prioridade        
        let priorityLabel = document.createElement("label")
        priorityLabel.setAttribute("for",`${idTemplate}Priority${i}`)
        let prioritySelect = document.createElement("select")
        prioritySelect.setAttribute("id",`${idTemplate}Priority${i}`)
        prioritySelect.setAttribute("name",`${idTemplate}Priority${i}`)

        //select options
        for (let j = 0; j < 4; j++) {
            let role = document.createElement('option');
            role.setAttribute('value', cargos[j]);
            role.textContent = cargos[j];

            let priority = document.createElement('option')
            priority.setAttribute('value', prioridades[j]);
            priority.textContent = prioridades[j];
            
            roleSelect.appendChild(role)
            prioritySelect.appendChild(priority)
        }               
        
        descLabel.appendChild(checkBox)
        descLabel.appendChild(desc)
        roleLabel.appendChild(roleSelect)
        priorityLabel.appendChild(prioritySelect)
        itemDiv.appendChild(descLabel)
        selectDiv.appendChild(roleLabel)
        selectDiv.appendChild(priorityLabel)
        itemDiv.appendChild(selectDiv)
        form.appendChild(itemDiv)
    } 
}

function generateTable(itens,resultDiv,idTemplate){
    let processo;
    idTemplate == "er"? processo = "Engenharia de requisitos": processo = "Integração de produto"
    let nConformidades = 0; 
    
    for (let i = 0; i < itens.length; i++) {
        let checkbox = document.getElementById(`${idTemplate}Desc${i}`);
        if(checkbox.checked){
            continue
         } 
        
        let newRow = document.createElement('tr');    
        let cargoSelect = document.getElementById(`${idTemplate}Cargo${i}`)
        let prioritySelect = document.getElementById(`${idTemplate}Priority${i}`)
                
        let descCol = document.createElement("td")    
        let processoCol = document.createElement("td")   
        let cargoCol = document.createElement("td")
        let priorityCol = document.createElement("td")
        
        descCol.textContent = itens[i]
        processoCol.textContent = processo
        cargoCol.textContent = cargoSelect.options[cargoSelect.selectedIndex].value
        priorityCol.textContent = prioritySelect.options[prioritySelect.selectedIndex].value

        newRow.appendChild(descCol)
        newRow.appendChild(processoCol)
        newRow.appendChild(cargoCol)
        newRow.appendChild(priorityCol)
        resultsTable.appendChild(newRow);  
        
        nConformidades ++;
    }

    resultDiv[1].innerHTML += itens.length;
    resultDiv[2].innerHTML += nConformidades
    resultDiv[3].innerHTML += Math.round(Math.abs((nConformidades - itens.length) / itens.length * 100)).toFixed(2) + "%"  
}


document.addEventListener("DOMContentLoaded", function() {
    loadForm(formRequisitos,itensRequisitos)
    loadForm(formItg,itensIntegracao)
  });

finishBtn.addEventListener("click",() =>{
    formsDiv.classList.add("hidden")
    finishBtn.classList.add("hidden")
    log.classList.remove("hidden")
    generateTable(itensRequisitos,resultsRequisitos,"er")
    generateTable(itensIntegracao,resultsItg,"itg")
})

helpBtn.addEventListener("click", () => {
    modal.showModal()
})

modal.addEventListener("click", e => {
    const modalDimensions = modal.getBoundingClientRect()
    if (
      e.clientX < modalDimensions.left ||
      e.clientX > modalDimensions.right ||
      e.clientY < modalDimensions.top ||
      e.clientY > modalDimensions.bottom
    ) {
      modal.close()
    }
  })
