// ==UserScript==
// @name         CE: Reputation Requirements for Production
// @namespace    hardy.ce.prod.rep
// @version      0.1
// @description  Tells you how much reputation you need to unlock all production factories
// @author       Hardy [1345]
// @match        https://cartelempire.online/Production
// @match        https://cartelempire.online/production
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==
(function() {
    'use strict';
    let currentRep = 0;
    let hasBusinessCourse = false; // set to true; or false; No quotes or commas. Case sensitive.

    const metadata = {
        "doctor": {
          "rep_req": {
            "1": {
              "rep": 10000,
              "course": "no"
            },
            "2": {
              "rep": 20000,
              "course": "no"
            },
            "3": {
              "rep": 30000,
              "course": "no"
            },
            "4": {
              "rep": 40000,
              "course": "no"
            },
            "5": {
              "rep": 50000,
              "course": "no"
            },
            "6": {
              "rep": 60000,
              "course": "no"
            },
            "7": {
              "rep": 70000,
              "course": "no"
            },
            "8": {
              "rep": 80000,
              "course": "no"
            },
            "9": {
              "rep": 90000,
              "course": "no"
            },
            "10": {
              "rep": 100000,
              "course": "no"
            },
            "11": {
              "rep": 110000,
              "course": "no"
            },
            "12": {
              "rep": 120000,
              "course": "no"
            },
            "13": {
              "rep": 130000,
              "course": "no"
            },
            "14": {
              "rep": 140000,
              "course": "no"
            },
            "15": {
              "rep": 150000,
              "course": "no"
            },
            "16": {
              "rep": 160000,
              "course": "no"
            },
            "17": {
              "rep": 170000,
              "course": "no"
            },
            "18": {
              "rep": 180000,
              "course": "no"
            },
            "19": {
              "rep": 190000,
              "course": "no"
            },
            "20": {
              "rep": 200000,
              "course": "no"
            },
            "21": {
              "rep": 210000,
              "course": "yes"
            },
            "22": {
              "rep": 220000,
              "course": "yes"
            },
            "23": {
              "rep": 230000,
              "course": "yes"
            },
            "24": {
              "rep": 240000,
              "course": "yes"
            }
          },
          "info": {
            "limit": 20,
            "step": 10000,
            "extension": 4,
            "label": "Doctor Office"
          }
        },
        "weed": {
          "rep_req": {
            "1": {
              "rep": 40000,
              "course": "no"
            },
            "2": {
              "rep": 80000,
              "course": "no"
            },
            "3": {
              "rep": 120000,
              "course": "no"
            },
            "4": {
              "rep": 160000,
              "course": "no"
            },
            "5": {
              "rep": 200000,
              "course": "no"
            },
            "6": {
              "rep": 240000,
              "course": "no"
            },
            "7": {
              "rep": 280000,
              "course": "no"
            },
            "8": {
              "rep": 320000,
              "course": "no"
            },
            "9": {
              "rep": 360000,
              "course": "no"
            },
            "10": {
              "rep": 400000,
              "course": "no"
            },
            "11": {
              "rep": 440000,
              "course": "no"
            },
            "12": {
              "rep": 480000,
              "course": "no"
            },
            "13": {
              "rep": 520000,
              "course": "no"
            },
            "14": {
              "rep": 560000,
              "course": "no"
            },
            "15": {
              "rep": 600000,
              "course": "no"
            },
            "16": {
              "rep": 640000,
              "course": "no"
            },
            "17": {
              "rep": 680000,
              "course": "no"
            },
            "18": {
              "rep": 720000,
              "course": "no"
            },
            "19": {
              "rep": 760000,
              "course": "no"
            },
            "20": {
              "rep": 800000,
              "course": "no"
            },
            "21": {
              "rep": 840000,
              "course": "yes"
            },
            "22": {
              "rep": 880000,
              "course": "yes"
            },
            "23": {
              "rep": 920000,
              "course": "yes"
            },
            "24": {
              "rep": 960000,
              "course": "yes"
            }
          },
          "info": {
            "limit": 20,
            "step": 40000,
            "extension": 4,
            "label": "Weed Field"
          }
        },
        "booze": {
          "rep_req": {
            "1": {
              "rep": 80000,
              "course": "no"
            },
            "2": {
              "rep": 160000,
              "course": "no"
            },
            "3": {
              "rep": 240000,
              "course": "no"
            },
            "4": {
              "rep": 320000,
              "course": "no"
            },
            "5": {
              "rep": 400000,
              "course": "no"
            },
            "6": {
              "rep": 480000,
              "course": "no"
            },
            "7": {
              "rep": 560000,
              "course": "no"
            },
            "8": {
              "rep": 640000,
              "course": "no"
            },
            "9": {
              "rep": 720000,
              "course": "no"
            },
            "10": {
              "rep": 800000,
              "course": "no"
            },
            "11": {
              "rep": 880000,
              "course": "no"
            },
            "12": {
              "rep": 960000,
              "course": "no"
            },
            "13": {
              "rep": 1040000,
              "course": "yes"
            },
            "14": {
              "rep": 1120000,
              "course": "yes"
            }
          },
          "info": {
            "limit": 12,
            "step": 80000,
            "extension": 2,
            "label": "Alchohol Still"
          }
        },
        "coke": {
          "rep_req": {
            "1": {
              "rep": 160000,
              "course": "no"
            },
            "2": {
              "rep": 320000,
              "course": "no"
            },
            "3": {
              "rep": 480000,
              "course": "no"
            },
            "4": {
              "rep": 640000,
              "course": "no"
            }
          },
          "info": {
            "limit": 4,
            "step": 160000,
            "extension": 0,
            "label": "Coke Factory"
          }
        }
      };

      const page = window.location.href.toLowerCase();
      //////
      if (page.includes("/production")) {
        waitForPageLoad().then(() => {
            const node = document.querySelector("#contentContainer > div > div.col-12.bg-dark.text-white > div.row.justify-content-center.mb-1.text-center.gy-2 > div:nth-child(3) > a > div > div.col > div > div.progress-bar-title > span");
            if (node) {
                currentRep = parseInt(node.innerText.replace(/[^\d]/g, ""));
                const div = document.createElement("div");
                div.id = "hardy_dan_prod_rep_container";
                div.innerHTML = createHTML();
                const prodContainer = document.querySelector(".productionsContainer");
                prodContainer.parentNode.insertBefore(div, prodContainer);
            } else {
                console.log("Unable to find the node containing info regarding current reputation. Contact Hardy[1345]");
            }
        });
      }
      function createHTML() {
        const headerHTML = `<div class="cdxfddfdffd">Reputation Requirements for Production</div>`;
        let html = "";
        let num = 0;
        for (const key in metadata) {
            const progress = calculateProgress(key, currentRep);
            const prodType = metadata[key];
            const repReq = prodType.rep_req;
            const info = prodType.info;
            const label = info.label;
            if (!progress) {
                html += `<div class="hardy_dan_prod_rep_container_item"><label class="green">You have met the reputation requirements for unlocking all of the ${label}.</label></div>`;
            } else {
                const [nextLevel, required, isBusinessCourseNeeded] = progress;
                const percent = ((currentRep / (currentRep + required)) * 100).toFixed(2);
                if (isBusinessCourseNeeded) {
                    if (hasBusinessCourse) {
                        html += `<div class="hardy_dan_prod_rep_container_item"><label class="yellow">You need to further gain ${formatNumber(required)} reputation to unlock the next ${label}. You are ${percent}% of the way there.</label></div>`;
                       
                    } else {
                        html += `<div class="hardy_dan_prod_rep_container_item"><label class="danger">You need to further gain ${formatNumber(required)} reputation and get the Business Education Degree to unlock the next ${label}. You are ${percent}% of the way there.</label></div>`;
                        
                    }
                } else {
                    html += `<div class="hardy_dan_prod_rep_container_item"><label class="yellow">You need to further gain ${formatNumber(required)} reputation to unlock the next ${label}. You are ${percent}% of the way there.</label></div>`;
                }
                num += 1;
            }
        }

        if (num === 0) {
            if (hasBusinessCourse) {
            html = `<div class="hardy_dan_prod_rep_container_item"><label class="green">You have met reputation requirements for all production factories.</label></div>`;
            } else {
                html = `<div class="hardy_dan_prod_rep_container_item"><label class="yellow">You have met reputation requirements for all production factories. You just need to finish Business Education Degree</label></div>`;
            }
        }
        return `${headerHTML}<div class="yggcghg-body" id="hardy_dan_prod_rep_container_body">${html}</div>`;
      }
      function calculateProgress(key, currentRep) {
        const prodType = metadata[key];
        const repReq = prodType.rep_req;
        const info = prodType.info;
        const step = info.step;
        const max = info.limit + info.extension;
        const currentLevel = Math.floor(currentRep / step);
        if (currentLevel < max) {
            const nextLevel = String(currentLevel + 1);
            const required = repReq[nextLevel].rep - currentRep;
            const isBusinessCourseNeeded = repReq[nextLevel].course === "yes";
            return [nextLevel, required, isBusinessCourseNeeded];
        }
        return null;
      }
      GM_addStyle(`#hardy_dan_prod_rep_container{background-color:#212529;color:#fff;padding:15px;border-radius:8px;box-shadow:0 4px 8px rgba(0,0,0,.3)}#hardy_dan_prod_rep_container_body{background-color:#2b3035;padding:10px;border-radius:6px;display:flex;flex-wrap:wrap;gap:10px}.hardy_dan_prod_rep_container_item{flex:1 1 calc(50% - 10px);box-sizing:border-box;padding:10px;background-color:#343a40;border-radius:4px;border:1px solid #3d4248}.hardy_dan_prod_rep_container_item label{display:block;word-wrap:break-word;color:#fff}.hardy_dan_prod_rep_container_item .danger{color:#ff6b6b}.hardy_dan_prod_rep_container_item .yellow{color:#f7c948}.hardy_dan_prod_rep_container_item .green{color:#4caf50}`);
    //////
    function ensureDocumentAccessible() {
        return new Promise((resolve) => {
            const checkHead = setInterval(() => {
                if (document && document.head) {
                    clearInterval(checkHead);
                    resolve();
                }
            }, 50);
        });
    }
    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    async function waitForElement(selector, duration = 800, maxTries = 20, multiple = false) {
        await ensureDocumentAccessible(); // Ensure document is ready
        return new Promise((resolve, reject) => {
            let attempts = 0;
            const intervalId = setInterval(() => {
                const elements = multiple ? document.querySelectorAll(selector) : document.querySelector(selector);
                if ((multiple && elements.length > 0) || (!multiple && elements)) {
                    clearInterval(intervalId);
                    resolve(elements);
                } else if (++attempts > maxTries) {
                    clearInterval(intervalId);
                    reject(`Timeout: Unable to find element(s) for selector "${selector}" after ${maxTries} tries.`);
                }
            }, duration);
        });
    }

    async function waitForPageLoad() {
        await ensureDocumentAccessible(); // Ensure document is ready
        return new Promise((resolve) => {
            if (document.readyState === "complete" || document.readyState === "interactive") {
                resolve();
            } else {
                document.addEventListener("DOMContentLoaded", resolve, { once: true });
            }
        });
    }
})();
