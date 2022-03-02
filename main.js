let myLead = []
const inputEl = document.getElementById("input-el")
const saveBtn = document.querySelector("#save-btn")
const ulEl = document.getElementById("list")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLead"))
const tabBtn = document.getElementById("tab-btn")


if(leadsFromLocalStorage){
    myLead = leadsFromLocalStorage
    renderLeads(myLead)
}


tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
        myLead.push(tabs[0].url)
        localStorage.setItem("myLead",JSON.stringify(myLead))
        renderLeads(myLead)
    })
})


function renderLeads(leads){
    let listItems = ""
    for(let i=0 ; i<leads.length; i++){
        listItems += 
            `<li>
                <a href= ${leads[i]} target=_blank> ${leads[i]}</a>
            </li>`
    }
    ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick",function(){
    localStorage.clear()
    myLead = []
    renderLeads(myLead)
})

saveBtn.addEventListener("click",function(){
    myLead.push(inputEl.value)
    localStorage.setItem("myLead",JSON.stringify(myLead))
    inputEl.value =""
    renderLeads(myLead)
})


