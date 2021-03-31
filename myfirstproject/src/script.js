'use strict';


let submitBtn = document.querySelector('.generate');
let teamInput = document.querySelector('.team-names');
let teamNumber = document.querySelector('.team-number');
let againBtn = document.querySelector('.again');
let noOfNames =  document.querySelector('.no-of-names');
let bottomSection = document.querySelector(".bottom");
let actionValue = document.querySelector('.select-action');
let count = 0;

/**
 * Handles event for clicking the submit button
 */
submitBtn.addEventListener('click', () => {
    let noOfTeams = teamNumber.value;
    let teamNames =  teamInput.value.split('\n');
    let action = actionValue.value;

    if(action === 'teamGenerator' && this.checkNoOfTeamsIsValid(noOfTeams, teamNames)){
        
        this.generateTeams(this.groupTeams(teamNames, noOfTeams));
    }

    if(action === 'namePicker') {
       this.displayValueOnPage(this.namePicker(teamNames));
    }

})

againBtn.addEventListener('click', () => {
    teamInput.value = ''; 
    teamNumber.value = '';
    noOfNames.textContent = 0;
    bottomSection.innerHTML = ''
    count = 0;
})

teamInput.addEventListener("keyup", function(event) {

    if (event.keyCode === 13) {
        noOfNames.textContent = (++count)+1;
    }
});


 function groupTeams(arrayOfNames, groupSize){
    let results = [];
    
    while (arrayOfNames.length) {
        results.push(arrayOfNames.splice(0, groupSize));
    }
    
    return results;
}

function checkNoOfTeamsIsValid(noOfTeams, arrayOfTeams){
    if(noOfTeams === "" || noOfTeams <= 0 || noOfTeams > arrayOfTeams.length){
        this.displayValueOnPage("Check input values and try again");
        return false;
    }

    return true;
}

function generateTeams(arrayOfTeams){

    let rows = arrayOfTeams.length;
    bottomSection.innerHTML = '';

    for (let item = 0; item < rows; item++){
        let items = arrayOfTeams[item];
        const teamCard = document.createElement('div');
        const cardHeader = document.createElement('div');
        cardHeader.appendChild(document.createTextNode("Team " + (item+1))); 
        teamCard.className = "team-card";
        teamCard.appendChild(cardHeader);
        for(let value = 0; value < items.length; value++){
            var node = document.createElement("p");                
            var textnode = document.createTextNode(items[value]);     
            node.appendChild(textnode);                              
            teamCard.appendChild(node);
        }
       
        bottomSection.appendChild(teamCard);
    }
}

function namePicker(arrayOfNames) {
    const picker = Math.floor(Math.random() * arrayOfNames.length);
    return arrayOfNames[picker];
}

function displayValueOnPage(value) {
    let pTag = document.createElement("p");
    let createTextNode = document.createTextNode(value);
    pTag.appendChild(createTextNode);
    bottomSection.appendChild(pTag);
}