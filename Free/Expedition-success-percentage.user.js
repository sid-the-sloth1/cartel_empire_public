// ==UserScript==
// @name         CE: Expeditions Helper
// @namespace    hardy.expeditionHelper
// @version      2024-07-02
// @description  Shows success percentage of all teams, without having to select them to see success chance
// @author       Hardy [1345]
// @match        https://cartelempire.online/Expedition
// @icon         https://www.google.com/s2/favicons?sz=64&domain=cartelempire.online
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';
    const stats = [];
    let waitObj = {};
    function waitForElement(selector, duration, maxTries, identifier) {
        return new Promise(function(resolve, reject) {
            const value = Math.floor(Math.random() * 1000000000);
            waitObj[identifier] = value;
            let attempts = 0;
            const intervalId = setInterval(() => {
                if (attempts > maxTries){
                    clearInterval(intervalId);
                    reject(`Selector Listener Expired: ${selector}, Reason: Dead bcoz u didnt cum on time!!!!`);
                } else if (waitObj[identifier] !== value) {
                    clearInterval(intervalId);
                    reject(`Selector Listener Expired: ${selector}, Reason: Dead coz u didnt luv me enough and got another SeLecTor!!!!`);
                }
                const element = document.querySelector(selector);
                if (element) {
                    clearInterval(intervalId);
                    resolve(element);
                }
                attempts += 1;
            }, duration);
        });
    }
    function update() {
        const expeditions = document.querySelectorAll('div.expeditionButton');
        for (const expedition of expeditions) {
            if (!expedition.querySelector(".remainingTime").hasAttribute("completion")) {
                const req = {};
                req.morale = parseInt(expedition.querySelector('.moraleRequirement').innerText);
                req.combat = parseInt(expedition.querySelector('.combatRequirement').innerText);
                req.caution = parseInt(expedition.querySelector('.cautionRequirement').innerText);
                req.speed = parseInt(expedition.querySelector('.speedRequirement').innerText);
                req.notoriety = parseInt(expedition.querySelector('.estimatedTime').getAttribute("notoriety"));
                const chances = calculateChance(req);
                let box = expedition.querySelector(".hardy_expedition_box");
                if (!box) {
                    box = document.createElement("div");
                    box.className = 'hardy_expedition_box row';
                    expedition.appendChild(box);
                }
                box.innerHTML = createHTML(chances);
            }
        }
    }
    waitForElement(`select.expeditionTeamSelector`, 700, 15, "bsvdhdsl").then((element) => {
        const options = element.options;
        const length = options.length;
        if (length > 1) {
            for (let index = 1; index < length; index++) {
                const team = options[index];
                const name = team.text;
                const obj = {};
                obj.name = name;
                obj.speed = parseInt(team.getAttribute("speed"));
                obj.morale = parseInt(team.getAttribute("morale"));
                obj.combat = parseInt(team.getAttribute("combat"));
                obj.caution = parseInt(team.getAttribute("caution"));
                stats.push(obj);
            }
            update();
        }
    }).catch(error => {
        console.log(error);
    });
    function calculateChance(req) {
        const moraleRequirement = req.morale;
        const combatRequirement = req.combat;
        const cautionRequirement = req.caution;
        const speedRequirement = req.speed;
        const array = [];
        for (const team of stats) {
            let moraleSuccessChance = moraleRequirement > 0 ? Math.max(Math.min((team.morale / moraleRequirement) * 100, 100), 0) : 100
            let combatSuccessChance = combatRequirement > 0 ? Math.max(Math.min((team.combat / combatRequirement) * 100, 100), 0) : 100
            let cautionSuccessChance = cautionRequirement > 0 ? Math.max(Math.min((team.caution / cautionRequirement) * 100, 100), 0): 100
            let minSuccessChance = Math.min(moraleSuccessChance, combatSuccessChance, cautionSuccessChance);
            let maxEffectiveSpeed = speedRequirement * 1.25;
            let minEffectiveSpeed = speedRequirement * 0.75;
            let effectiveSpeed = Math.max(Math.min(maxEffectiveSpeed, team.speed), minEffectiveSpeed)
            let mins = Math.max(15, Math.round((1/10)*(speedRequirement*req.notoriety)/effectiveSpeed))
            array.push([team.name, Math.floor(minSuccessChance), mins]);
        }
        return array;
    }
    function convertTime(minutes) {
        let hours = Math.floor(minutes/60);
        let mins = minutes % 60;

        if(hours > 0) {
            return `${hours}H ${mins}m`
	}
        return `${mins}m`
    }
    function createHTML(chances) {
        let html = '<table><thead><tr><th>Team</th><th>Chance</th><th>Time</th></tr></thead><tbody>'
        if (chances.length > 0) {
            for (const team of chances) {
                let label = '';
                if(team[1] < 20) {
                    label = "text-danger";
                } else if (team[1] < 50) {
                    label = "text-warning";
                } else {
                    label = "text-success";
                }
                html += `<tr><th>${team[0]}</th><th class="${label}" style="font-weight: bold;">${team[1]}%</th><th>${convertTime(team[2])}</th></tr>`;
            }
        }
        html += '</tbody></table>';
        return html;
    }
    GM_addStyle(`.hardy_expedition_box {margin-top: 9px;}
.hardy_expedition_box tbody th {font-weight: normal;}`);
})();
