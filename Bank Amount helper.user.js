// ==UserScript==
// @name         CE: Bank Amount Input Helper
// @namespace    ce.bank.input.helper
// @version      0.1
// @description  Allows k and m shortcuts on Bank page
// @author       You
// @match        https://cartelempire.online/Bank
// @icon         https://www.google.com/s2/favicons?sz=64&domain=cartelempire.online
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    let waitObj = {};
    let taxOnBank = 0;
    let balance = 0;
    waitForElement(`#cashInBank`, 700, 50, "vdghns").then((element) => {
        balance = parseInt(element.innerText.trim().replace(/[,.\s]/g, ""));
        const parent = element.parentNode;
        const txtNode = parent.childNodes[0];
        txtNode.textContent = "Current Balance: £";
    }).catch(error => {
        console.log(error);
    });
    waitForElement(`#withdrawInput`, 700, 50, "djhadgj").then((element) => {
        addBankBox();
        const parent = element.parentNode;
        const spanNode = parent.childNodes[0];
        spanNode.addEventListener("click", ()=> {
            element.value = balance.toString();
            setValue(element, balance);
            document.querySelector("#withdrawBtn").removeAttribute("disabled");
        });
    }).catch(error => {
        console.log(error);
    });

    ///////////////////////////////////////////////////////////////////
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
    function setValue(element, value) {
        AutoNumeric.getAutoNumericElement(element).set(value);
    }
    function valueListener(event_, element) {
        const target = event_.target;
        let value = target.value;
        if (value == "" || value.startsWith("N") || value == "£") {
            return;
        } else {
            const inp = value.replace(/,/g, "").replace(/\£/g, "").replace(/\s/g, "");
            const val = inp.split("");
            const lastLetter = val[val.length -1];
            let digits;
            if (lastLetter == "k" || lastLetter == "K") {
                val.splice(val.length-1, 1);
                digits = parseFloat(val.join(""))*1000.0;
            } else if (lastLetter == "m" || lastLetter == "M") {
                val.splice(val.length-1, 1);
                digits = parseFloat(val.join(""))*1000000.0
            } else {
                let joined = val.join("");
                if (joined.includes(".")) {
                    digits = joined.replace(/./g, "h")
                } else {
                    digits = joined;
                }
            }
            if (isNaN(parseInt(digits))) {
                target.setAttribute("isError", "yes");
            } else if (digits === "") {
                target.setAttribute("isError", "yes");
            } else {
                setValue(element, digits);
                target.value = digits;
                target.setAttribute("isError", "no");
            }
        }
    }
    function createElement(tagName, attributes) {
        const element = document.createElement(tagName);
        for (const key in attributes) {
            element.setAttribute(key, attributes[key]);
        }
        return element;
    }
    function addBankBox() {
        const div = createElement('div', {"class": "hardyDivBoxContainer"});
        div.innerHTML = `<div class="hardyBoxTitle header-section">Bank Input Boxes Helper</div><div class="hardyDivBoxContent card"><label id="taxOnBank"></label><div class="hardyBank"><label>Deposit</label><input type="text" id="hardyDeposit"></div><div class="hardyBank"><label>Withdraw</label><input type="text" id="hardyWithdraw"></div></div>`;
        const footer = document.querySelector("footer");
        footer.parentNode.insertBefore(div, footer);
        div.querySelector("#hardyWithdraw").addEventListener("input", (e)=> {
            valueListener(e, document.querySelector("#withdrawInput"));
            document.querySelector("#withdrawBtn").removeAttribute("disabled");
        });
        const input= document.querySelector("#depositInput");
        const str = input.value.replace(/,/g, "").replace(/\£/g, "").replace(/\s/g, "");
        const amountOnHand = parseInt(str);
        if (!isNaN(amountOnHand)) {
            taxOnBank = Math.round(amountOnHand*0.001);
            document.querySelector("#taxOnBank").innerText = "Tax on Deposit: £"+formatNumber(taxOnBank);
        }
        div.querySelector("#hardyDeposit").addEventListener("input", (e)=> {
            valueListener(e, input);
            document.querySelector("#depositBtn").removeAttribute("disabled");
        });
        ["autoNumeric:rawValueModified", "change"].forEach((eventType) => {
            input.addEventListener(eventType, (event) => {
                const val = event.target.value;
                const inp = val.replace(/,/g, "").replace(/\£/g, "").replace(/\s/g, "");
                const amount = parseInt(inp);
                if (!isNaN(amount)) {
                    taxOnBank = Math.round(amount*0.001);
                    document.querySelector("#taxOnBank").innerText = "Tax on Deposit: £"+formatNumber(taxOnBank);
                }
            });
        });
    }
    function formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }
    GM_addStyle(`.hardyBank {margin: 9px;}
.hardyBank label {font-weight: bold; margin: 0 6px; font-size: 14px;}
.hardyBank input {padding: 4px; border-radius: 2px;}
#taxOnBank {text-align: center; padding: 6px;}`);
})();
