// ==UserScript==
// @name         CE: Cartel Armory Sort
// @namespace    hardy.ce.armory.sort
// @version      0.3
// @description  Makes the table on Cartel Armory Page Sortable
// @author       Hardy [1345]
// @match        https://cartelempire.online/Cartel/Armory
// @icon         https://www.google.com/s2/favicons?sz=64&domain=cartelempire.online
// @grant        GM_addStyle
// ==/UserScript==

(function () {
    'use strict';


    /////
    class SweetTable {
        #table;
        #excludedColumns;
        #keysForAttributes;
        #customParseFunctions = {};
        #customGetHeadersFunction = null;
        #customGetRowsFunction = null;
        #customGetTbodyFunction = null;
        #customGetCellFromRowFunction = null;
        #tableType;
        #boundSortClickHandler;
        #engaged = false;
        constructor(table, excludedColumns = [], keysForAttributes = {}) {
            if (!(table instanceof HTMLElement)) {
                throw new Error("SweetTable: Invalid table element provided.");
            }
            if (!Array.isArray(excludedColumns) || !excludedColumns.every(Number.isInteger)) {
                throw new Error("SweetTable: excludedColumns must be an array of integers.");
            }
            if (typeof keysForAttributes !== "object" || keysForAttributes === null) {
                throw new Error("SweetTable: keysForAttributes must be a valid object.");
            }

            this.#table = table;
            this.#excludedColumns = excludedColumns;
            this.#keysForAttributes = keysForAttributes;
            this.#customParseFunctions = {};
            this.#customGetHeadersFunction = null;
            this.#customGetRowsFunction = null;
            this.#customGetTbodyFunction = null;
            this.#customGetCellFromRowFunction = null;
            this.#tableType = this.#getTableType();
            this.#boundSortClickHandler = this.#sortClickHandler.bind(this);
        }

        #getTableType() {
            const tableElem = this.#table;
            const tagName = tableElem.tagName.toLowerCase();
            this.tagName = tagName;
            if (tagName === "table") {
                return "default";
            } else {
                return "custom";
            }
        }

        setCustomGetHeadersFunction(func) {
            if (typeof func !== "function") {
                throw new Error("SweetTable: customGetHeadersFunction must be a function.");
            }
            this.#customGetHeadersFunction = func;
        }

        setCustomGetRowsFunction(func) {
            if (typeof func !== "function") {
                throw new Error("SweetTable: customGetRowsFunction must be a function.");
            }
            this.#customGetRowsFunction = func;
        }

        setCustomGetTbodyFunction(func) {
            if (typeof func !== "function") {
                throw new Error("SweetTable: customGetTbodyFunction must be a function.");
            }
            this.#customGetTbodyFunction = func;
        }

        setCustomGetCellFromRowFunction(func) {
            if (typeof func !== "function") {
                throw new Error("SweetTable: customGetCellFromRowFunction must be a function.");
            }
            this.#customGetCellFromRowFunction = func;
        }

        setCustomParseFunction(colIndex, parseFunction) {
            if (!Number.isInteger(colIndex)) {
                throw new Error("SweetTable: colIndex must be an integer.");
            }
            if (typeof parseFunction !== "function") {
                throw new Error("SweetTable: customParseFunction must be a function.");
            }
            this.#customParseFunctions[`col_${colIndex}`] = parseFunction;
        }

        #getHeaders() {
            if (this.#customGetHeadersFunction !== null) {
                const headers = this.#customGetHeadersFunction(this.#table);
                if (!(headers instanceof NodeList) && !Array.isArray(headers) && !(headers instanceof HTMLCollection)) {
                    throw new Error("SweetTable: customGetHeadersFunction must return a NodeList, Array, or HTMLCollection.");
                }
                return headers;
            } else {
                if (this.#tableType === "default") {
                    const headers = this.#table.querySelector("tr")?.children;
                    if (!headers) {
                        throw new Error("SweetTable: No header row found in the table.");
                    }
                    return headers;
                } else {
                    throw new Error("SweetTable: customGetHeadersFunction is not set. You need to set this function to use SweetTable with custom tables.");
                }
            }
        }

        #getBodyRows() {
            if (this.#customGetRowsFunction !== null) {
                const rows = this.#customGetRowsFunction(this.#table);
                if (!Array.isArray(rows) && !(rows instanceof NodeList)) {
                    throw new Error("SweetTable: customGetRowsFunction must return an Array or NodeList.");
                }
                return rows;
            } else {
                if (this.#tableType === "default") {
                    if (this.#table.querySelector("thead")) {
                        return Array.from(this.#table.querySelectorAll("tbody tr"));
                    } else {
                        let rows = this.#table.querySelectorAll("tr");
                        return rows.length > 1 ? Array.from(rows).slice(1) : [];
                    }
                } else {
                    throw new Error("SweetTable: customGetRowsFunction is not set. You need to set this function to use SweetTable with custom tables.");
                }
            }
        }

        #getTbody() {
            if (this.#customGetTbodyFunction !== null) {
                const tbody = this.#customGetTbodyFunction(this.#table);
                if (!(tbody instanceof HTMLElement)) {
                    throw new Error("SweetTable: customGetTbodyFunction must return an HTMLElement.");
                }
                return tbody;
            } else {
                if (this.#tableType === "default") {
                    return this.#table.querySelector("tbody") || this.#table;
                } else {

                    const rows = this.#getBodyRows();
                    const firstRow = rows[0];
                    if (!firstRow) {
                        throw new Error("SweetTable: Unable to find the rows in table. You must set a custom function to get the rows using setCustomGetRowsFunction().");
                    }
                    return firstRow.parentElement;
                }
            }
        }

        #resetIndicatorArrows() {
            const headers = this.#getHeaders();
            for (let index = 0; index < headers.length; index++) {
                if (this.#excludedColumns.indexOf(index) === -1) {
                    const th = headers[index];
                    let arrowsDiv = th.querySelector(".sweettable-arrow-container");
                    if (!arrowsDiv) {
                        th.classList.add("sweettable-header");
                        th.setAttribute("data-sweettable-col-index", `index_${index}`);
                        arrowsDiv = this.#createElement("div", { "class": "sweettable-arrow-container" });
                        th.appendChild(arrowsDiv);
                    }
                    arrowsDiv.innerHTML = `<div class="sweettable-arrow-up"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path  d="M18.2 13.3L12 7l-6.2 6.3c-.2.2-.3.5-.3.7s.1.5.3.7s.4.3.7.3h11c.3 0 .5-.1.7-.3s.3-.5.3-.7s-.1-.5-.3-.7"/></svg></div><div class="sweettable-arrow-down"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path  d="M5.8 9.7L12 16l6.2-6.3c.2-.2.3-.5.3-.7s-.1-.5-.3-.7s-.4-.3-.7-.3h-11c-.3 0-.5.1-.7.3s-.3.4-.3.7s.1.5.3.7"/></svg></div>`;
                    th.setAttribute("data-sweettable-order", "asc");
                }
            }
        }
        disengage() {
            this.#removeListeners();
            const headers = this.#getHeaders();
            for (const th of headers) {
                th.classList.remove("sweettable-header");
                const arrowsDiv = th.querySelector(".sweettable-arrow-container");
                if (arrowsDiv) {
                    arrowsDiv.remove();
                }
            }
            this.#table.classList.remove("sweettable-initiated");
            this.#engaged = false;
        }
        #addListeners() {
            const headers = this.#table.querySelectorAll(".sweettable-header");
            if (!headers.length) {
                throw new Error("SweetTable: No sortable headers found. Did you call initiate() first?");
            }
            this.#removeListeners();
            headers.forEach(th => {
                th.addEventListener("click", this.#boundSortClickHandler);
            });
        }

        #sortClickHandler = (event) => {
            const target = event.target.closest(".sweettable-header");
            if (!target) return;
            const colIndex = Number(target.getAttribute("data-sweettable-col-index").split("_")[1]);
            if (isNaN(colIndex)) {
                throw new Error("SweetTable: Invalid column index found in header.");
            }

            const order = target.getAttribute("data-sweettable-order") || "asc";
            let key = "";
            if (this.#keysForAttributes[`col_${colIndex}`]) {
                key = `attr=${this.#keysForAttributes[`col_${colIndex}`]}`;
            }
            this.sort(colIndex, order, key);
        }
        #removeListeners() {
            const headers = this.#table.querySelectorAll(".sweettable-header");
            headers.forEach(th => {
                th.removeEventListener("click", this.#boundSortClickHandler);
            });
        }
        sort(colIndex, order, key = "") {
            if (!Number.isInteger(colIndex) || colIndex < 0) {
                throw new Error("SweetTable: colIndex must be a positive integer.");
            }
            if (order !== "asc" && order !== "desc") {
                throw new Error('SweetTable: order must be either "asc" or "desc".');
            }

            const array = [];
            let rows = this.#getBodyRows();
            const isKeyAttr = typeof key === "string" && key !== "" && key.startsWith("attr=");
            let keyAttr = "";
            if (isKeyAttr) {
                keyAttr = key.split("attr=")[1];
            }

            let rowIndex = 0;
            for (const row of rows) {
                const index = `index_${rowIndex}`;
                row.setAttribute("data-sweettable-row-index", index);

                const tdList = this.#customGetCellFromRowFunction === null ? row.children : this.#customGetCellFromRowFunction(row);
                if (!tdList || !tdList[colIndex]) {
                    throw new Error(`SweetTable: Could not find cell at column index ${colIndex} in row ${rowIndex}.`);
                }

                const relevantTd = tdList[colIndex];
                let parsed;

                if (isKeyAttr) {
                    const attrVal = relevantTd.getAttribute(keyAttr);
                    if (attrVal === null) {
                        throw new Error(`SweetTable: Key argument does not equate to a valid attribute! ATTRIBUTE_KEY: ${keyAttr}, ROW_INDEX: ${index}`);
                    }
                    parsed = this.#customParseFunctions[`col_${colIndex}`]
                        ? this.#customParseFunctions[`col_${colIndex}`](attrVal)
                        : this.#parseText(attrVal);
                } else {
                    const text = relevantTd.textContent;
                    parsed = this.#customParseFunctions[`col_${colIndex}`]
                        ? this.#customParseFunctions[`col_${colIndex}`](text)
                        : this.#parseText(text);
                }
                array.push([index, parsed]);
                rowIndex += 1;
            }

            if (array.length === 0) return;

            if (order === "asc") {
                if (typeof array[0][1] === "string") {
                    array.sort(function (a, b) {
                        return a[1].localeCompare(b[1]);
                    })
                } else {
                    array.sort(function (a, b) {
                        return a[1] - b[1];
                    })
                }
            } else {
                if (typeof array[0][1] === "string") {
                    array.sort(function (a, b) {
                        return b[1].localeCompare(a[1]);
                    })
                } else {
                    array.sort(function (a, b) {
                        return b[1] - a[1];
                    })
                }
            }

            const tbody = this.#getTbody();
            const lastElement = tbody.querySelector(`[data-sweettable-row-index="${array[array.length - 1][0]}"]`);
            tbody.appendChild(lastElement);
            array.pop();

            for (const [index] of array) {
                const row = tbody.querySelector(`[data-sweettable-row-index="${index}"]`);
                if (!row) {
                    throw new Error(`SweetTable: Could not find row with index ${index} during sorting.`);
                }
                tbody.insertBefore(row, lastElement);
            }

            this.#resetIndicatorArrows();
            const selector = order === "asc" ? "div.sweettable-arrow-up" : "div.sweettable-arrow-down";
            const target = this.#table.querySelector(`[data-sweettable-col-index="index_${colIndex}"]`);
            if (target) {
                target.querySelector(selector).classList.add("filled");
                const newOrder = order === "asc" ? "desc" : "asc";
                target.setAttribute("data-sweettable-order", newOrder);
            }
        }

        #createElement(nodeType, attributes = {}) {
            const element = document.createElement(nodeType);
            for (const [key, value] of Object.entries(attributes)) {
                element.setAttribute(key, value);
            }
            return element;
        }
        isEngaged() {
            return this.#engaged;
        }
        #parseText(text) {
            if (typeof text !== "string") {
                return text;
            }
            try {
                let stripped = text.replace(/[$,£]/g, "").replace(/\s/g, "");
                if (stripped.at(-1) === ".") stripped = stripped.slice(0, -1);
                let float = parseFloat(stripped);
                return isNaN(float) ? text : float;
            } catch (error) {
                console.error("SweetTable: Error parsing text.", error);
                return text;
            }
        }

        #addCSS() {
            if (!document.querySelector("style#sweettable-style")) {
                const style = this.#createElement("style", { id: "sweettable-style" });
                style.textContent = `.sweettable-arrow-container{display:inline-flex;flex-direction:column;margin-left:.3em;vertical-align:middle;height:1em;width:.8em;justify-content:space-between}.sweettable-arrow-down,.sweettable-arrow-up{flex:1;min-height:0;display:flex;align-items:center;justify-content:center}.sweettable-arrow-down svg,.sweettable-arrow-up svg{width:100%;height:100%;fill:currentColor;opacity:.3;max-height:.5em}.sweettable-arrow-down.filled svg,.sweettable-arrow-up.filled svg{opacity:1!important}.sweettable-header{cursor:pointer!important}`;
                document.head.appendChild(style);
            }
        }

        initiate() {
            if (this.#table.classList.contains("sweettable-initiated")) {
                throw new Error("SweetTable: This table has already been initialized. Disengage the previous instance of this table before initializing a new one.");
            }
            if (this.#engaged) {
                throw new Error("This SweetTable instance is already engaged. Disengage it properly before initiating a new instance.");
            }
            this.#engaged = true;
            this.#resetIndicatorArrows();
            this.#addListeners();
            this.#addCSS();
            this.#table.classList.add("sweettable-initiated");
        }
        static getVersion() {
            return "1.0.1";
        }


    }
    /////

    const table = document.querySelector(".inventoryWrapper");
    const instance = new SweetTable(table, [3]);

    instance.setCustomGetHeadersFunction((table) => {
        return table.querySelector('.row-header').children;
    });
    instance.setCustomGetRowsFunction((table) => {
        return table.querySelectorAll('.inventoryItemWrapper');
    });
    instance.setCustomGetCellFromRowFunction((row) => {
        const array = Array.from(row.children);
        return [array[1], array[2], array[3]];
    });
    instance.setCustomGetTbodyFunction((table) => {
        return table;
    });
    instance.setCustomParseFunction(2, (text) => {
        if (!text || text === "") {
            text = 0;
        } else {
            text = parseFloat(text.replace(/[$,£%]/g, "").replace(/\s/g, ""));
        }
        return text;
    });
    instance.initiate();
})();
