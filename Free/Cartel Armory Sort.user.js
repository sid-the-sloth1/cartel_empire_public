// ==UserScript==
// @name         CE: Cartel Armory Sort
// @namespace    hardy.ce.armory.sort
// @version      0.1
// @description  Makes the table on Cartel Armory Page Sortable
// @author       Hardy [1345]
// @match        https://cartelempire.online/Cartel/Armory
// @icon         https://www.google.com/s2/favicons?sz=64&domain=cartelempire.online
// ==/UserScript==

(function() {
    'use strict';
    const meta = {"item": "asc", "type": "asc"};
    const cont = document.querySelector(".inventoryWrapper");
    const headerRow = cont.querySelector(".row-header");
    const rows = cont.querySelectorAll(".inventoryItemWrapper");
    let headerIndex = 0;
    for (const header of headerRow.children) {
        if (headerIndex === 0 || headerIndex === 1) {
            header.innerHTML += `<svg style="margin-left:3px;" xmlns="http://www.w3.org/2000/svg" width="10" height="13" viewBox="0 0 1024 1408"><path fill="currentColor" d="M1024 896q0 26-19 45l-448 448q-19 19-45 19t-45-19L19 941Q0 922 0 896t19-45t45-19h896q26 0 45 19t19 45zm0-384q0 26-19 45t-45 19H64q-26 0-45-19T0 512t19-45L467 19q19-19 45-19t45 19l448 448q19 19 19 45z"/></svg>`;
            header.addEventListener("click", (event) => {
                sort(header.innerText.trim().toLowerCase());
            });
        }
        headerIndex += 1;
    }
    sort("item");
    function sort(key) {
        let array = [];
        let index = 0;
        for (const row of rows) {
            row.setAttribute("hardy-sort", `row-${index}`);
            const child = row.children;
            const item = child[0].querySelector("img").getAttribute("title");
            const type = child[2].innerText;
            if (key === "item") {
                array.push([`row-${index}`, item]);
            } else {
                array.push([`row-${index}`, type]);
            }
            index += 1;
        }
        const ord = meta[key];
        if (ord === "asc") {
            array.sort(function(a, b) {
                return a[1].localeCompare(b[1]);
            });
            meta[key] = "des";
        } else {
            array.sort(function(a, b) {
                return b[1].localeCompare(a[1]);
            })
            meta[key] = "asc";
        }
        const indexOfLast = array[array.length - 1][0];
        const last = cont.querySelector(`[hardy-sort="${indexOfLast}"]`);
        cont.appendChild(last);
        array.splice(-1);
        for (const sub of array) {
            const num = sub[0];
            cont.insertBefore(cont.querySelector(`[hardy-sort="${num}"]`), last);
        }
    }
})();
