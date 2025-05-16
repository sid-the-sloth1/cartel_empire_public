// ==UserScript==
// @name         Henchman
// @namespace    hardy.henchman
// @version      0.1
// @description  Some QoL improvements for Cartel Empire
// @author       Hardy
// @match        *://*/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=cartelempire.online
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_addValueChangeListener
// @grant        GM_xmlhttpRequest
// @grant        GM_notification
// @grant        GM_addElement
// @grant        GM_addStyle
// @grant        GM_addValueChangeListener
// @grant        GM_download
// @connect      *
// @run-at       document-start
// ==/UserScript==

(function () {
    'use strict';
    const storageMetadata = {
        "alarms": {
            "cooldowns": {
                "job": 0,
                "hospitalRelease": 0,
                "jailRelease": 0,
                "educationIcon": 0,
                "expedition": 0
            }
        },
        "prodItems": {
            "400": {
                "quantity": 0
            },
            "401": {
                "quantity": 0
            },
            "402": {
                "quantity": 0
            }
        },
        "inventoryItems": {},
        "prod_usage": {
            "400": 9,
            "401": 4,
            "402": 33
        },
        "prods_details": {
            "400": "0",
            "401": "12",
            "402": "4"
        },
        "selfDetails": {
            "id": 6969,
            "name": "Placeholder",
            "cartelID": 1
        },
        "attacksCache": {

        },
        "misc": {
            "lastpurgeOFOldAttacks": 0
        },
        "itemMetadata": { "items": { "1": { "name": "Mini Donator Pack", "type": "Special", "value": 0 }, "2": { "name": "Donator Pack", "type": "Special", "value": 0 }, "3": { "name": "Personal Favour", "type": "Special", "value": 0 }, "100": { "name": "Corana Beer", "type": "Alcohol", "value": 0 }, "101": { "name": "Mexcal Beer", "type": "Alcohol", "value": 0 }, "102": { "name": "Blancoda Tequila", "type": "Alcohol", "value": 0 }, "103": { "name": "Repose Tequila", "type": "Alcohol", "value": 0 }, "104": { "name": "Anejo Tequila", "type": "Alcohol", "value": 0 }, "105": { "name": "Raicilla", "type": "Alcohol", "value": 0 }, "200": { "name": "Bandage", "type": "Medical", "value": 0 }, "201": { "name": "Small Medical Kit", "type": "Medical", "value": 0 }, "202": { "name": "Large Medical Kit", "type": "Medical", "value": 0 }, "203": { "name": "Basic Trauma Kit", "type": "Medical", "value": 0 }, "204": { "name": "Large Trauma Kit", "type": "Medical", "value": 0 }, "210": { "name": "Tainted Cocaine", "type": "Medical", "value": 0 }, "211": { "name": "Tainted Cannabis", "type": "Medical", "value": 0 }, "300": { "name": "Cannabis", "type": "Drug", "value": 0 }, "301": { "name": "Cocaine", "type": "Drug", "value": 0 }, "400": { "name": "Bag of Fertiliser", "type": "Production Supply", "value": 0 }, "401": { "name": "Agave Heart", "type": "Production Supply", "value": 0 }, "402": { "name": "Coca Paste", "type": "Production Supply", "value": 0 }, "501": { "name": "Dog Food", "type": "Food", "value": 0 }, "502": { "name": "Black Market Treat", "type": "Food", "value": 0 }, "700": { "name": "Velvet Mystery Gift", "type": "Special", "value": 0 }, "701": { "name": "Green Surprise Gift", "type": "Special", "value": 0 }, "702": { "name": "Glittering Gift", "type": "Drug", "value": 0 }, "703": { "name": "Rustic Charm Gift", "type": "Special", "value": 0 }, "704": { "name": "Golden Treasure Gift", "type": "Special", "value": 0 }, "1000": { "name": "AK-47", "type": "Weapon", "value": 0 }, "1001": { "name": "M16A2 Rifle", "type": "Weapon", "value": 0 }, "1002": { "name": "G36", "type": "Weapon", "value": 0 }, "1003": { "name": "Steyr AUG", "type": "Weapon", "value": 0 }, "1004": { "name": "SIG SG 550", "type": "Weapon", "value": 0 }, "1005": { "name": "FN SCAR-H", "type": "Weapon", "value": 0 }, "1100": { "name": "Baseball Bat", "type": "Weapon", "value": 0 }, "1101": { "name": "Walther P38", "type": "Weapon", "value": 0 }, "1102": { "name": "M1911", "type": "Weapon", "value": 0 }, "1103": { "name": "S&W Magnum Revolver", "type": "Weapon", "value": 0 }, "1104": { "name": "Glock 18", "type": "Weapon", "value": 0 }, "1105": { "name": "Desert Eagle", "type": "Weapon", "value": 0 }, "1200": { "name": "Covert Stab Vest", "type": "Armour", "value": 0 }, "1201": { "name": "Ballistic Vest", "type": "Armour", "value": 0 }, "1202": { "name": "Tactical Plate Armour", "type": "Armour", "value": 0 }, "1203": { "name": "Full-Body Armour", "type": "Armour", "value": 0 }, "1204": { "name": "Trench Coat", "type": "Armour", "value": 0 }, "1205": { "name": "Kevlar Weave Vest", "type": "Armour", "value": 0 }, "1206": { "name": "Carbon Fiber Vest", "type": "Armour", "value": 0 }, "1207": { "name": "Armoured Suit", "type": "Armour", "value": 0 }, "1208": { "name": "Ceramic Plate Carrier Vest", "type": "Armour", "value": 0 }, "1209": { "name": "Riot Suit", "type": "Armour", "value": 0 }, "1210": { "name": "Blast Suit", "type": "Armour", "value": 0 }, "1211": { "name": "New-Age Combat Fatigues", "type": "Armour", "value": 0 }, "1500": { "name": "MG34", "type": "Weapon", "value": 0 }, "1501": { "name": "L86 LSW", "type": "Weapon", "value": 0 }, "1502": { "name": "MG5", "type": "Weapon", "value": 0 }, "1503": { "name": "Sniper Rifle", "type": "Weapon", "value": 0 }, "1600": { "name": "Fragmentation Grenade", "type": "Thrown", "value": 0 }, "1601": { "name": "Flash Bang Grenade", "type": "Thrown", "value": 0 }, "1602": { "name": "Illuminating Grenade", "type": "Thrown", "value": 0 }, "1603": { "name": "Tear Gas Grenade", "type": "Thrown", "value": 0 }, "1604": { "name": "Stun Grenade", "type": "Thrown", "value": 0 }, "2000": { "name": "Nails", "type": "Construction", "value": 0 }, "2001": { "name": "Bricks", "type": "Construction", "value": 0 }, "2002": { "name": "Concrete Bags", "type": "Construction", "value": 0 }, "2003": { "name": "Steel", "type": "Construction", "value": 0 }, "3000": { "name": "Renault Espace", "type": "Car", "value": 0 }, "3001": { "name": "Fiat Panda", "type": "Car", "value": 0 }, "3002": { "name": "Austin Metro", "type": "Car", "value": 0 }, "3003": { "name": "Peugeot 205 GTI", "type": "Car", "value": 0 }, "3004": { "name": "Ford Sierra", "type": "Car", "value": 0 }, "3005": { "name": "Vauxhall Cavalier", "type": "Car", "value": 0 }, "3006": { "name": "Ford Escort", "type": "Car", "value": 0 }, "3007": { "name": "Honda CRX", "type": "Car", "value": 0 }, "3008": { "name": "Saab 900 Turbo", "type": "Car", "value": 0 }, "3009": { "name": "Lancia Delta Integrale", "type": "Car", "value": 0 }, "3010": { "name": "Toyota MR2", "type": "Car", "value": 0 }, "3011": { "name": "Audi Quattro 1980", "type": "Car", "value": 0 }, "3012": { "name": "Ford Capri 2.8i", "type": "Car", "value": 0 }, "3013": { "name": "Volkswagen Golf GTI", "type": "Car", "value": 0 }, "3014": { "name": "BMW M5", "type": "Car", "value": 0 }, "3015": { "name": "Porsche 959", "type": "Car", "value": 0 }, "3016": { "name": "Ferrari F40", "type": "Car", "value": 0 }, "3017": { "name": "Lamborghini Countach", "type": "Car", "value": 0 }, "4000": { "name": "Diablo Tattoo", "type": "Luxury", "value": 0 }, "4001": { "name": "Italian Shoes", "type": "Luxury", "value": 0 }, "4002": { "name": "Cuban Cigar Set", "type": "Luxury", "value": 0 }, "4003": { "name": "Eagle Cabernet 1992", "type": "Luxury", "value": 0 }, "4004": { "name": "Whiskey Decanter", "type": "Luxury", "value": 0 }, "4005": { "name": "Gold Grooming Kit", "type": "Luxury", "value": 0 }, "4006": { "name": "Gemstone Cufflinks", "type": "Luxury", "value": 0 }, "4007": { "name": "Lapis-Encrusted Lighter", "type": "Luxury", "value": 0 }, "4008": { "name": "Satellite Phone", "type": "Luxury", "value": 0 }, "4009": { "name": "Club VIP Lounge Membership", "type": "Luxury", "value": 0 }, "4010": { "name": "Pearl-Encrusted Lighter", "type": "Luxury", "value": 0 }, "4011": { "name": "Diamond Watch", "type": "Luxury", "value": 0 }, "4012": { "name": "Diamond-Encrusted Lighter", "type": "Luxury", "value": 0 }, "4013": { "name": "Bulletproof Suit", "type": "Luxury", "value": 0 }, "4014": { "name": "Pet Jaguar", "type": "Luxury", "value": 0 }, "4015": { "name": "Gold-Plated Pistol", "type": "Luxury", "value": 0 }, "4016": { "name": "Platinum Credit Card", "type": "Luxury", "value": 0 }, "4017": { "name": "Personal Helicopter", "type": "Luxury", "value": 0 }, "9001": { "name": "El Chapo's Head", "type": "Collectible", "value": 0 }, "9002": { "name": "Pablo's Hat", "type": "Collectible", "value": 0 }, "9003": { "name": "Quecheu Troll Doll", "type": "Collectible", "value": 0 }, "9004": { "name": "The Easter Fuggly", "type": "Collectible", "value": 0 }, "9005": { "name": "Elf on a Shelf - Green", "type": "Collectible", "value": 0 }, "9006": { "name": "Elf on a Shelf - Red", "type": "Collectible", "value": 0 }, "9007": { "name": "Padrino's Egg", "type": "Collectible", "value": 0 }, "9008": { "name": "The Crimson Star", "type": "Collectible", "value": 0 } } }
    };
    const settingsMetadata = {
        "features": {
            "alarms": {
                "job_alarm": {
                    "label": "Job Completion Alert",
                    "default": "yes",
                    "inp_type": "checkbox"
                },
                "hosp_alarm": {
                    "label": "Hospital Release Alert",
                    "default": "yes",
                    "inp_type": "checkbox"
                },
                "edu_alarm": {
                    "label": "Education Over Alert",
                    "default": "yes",
                    "inp_type": "checkbox"
                },
                "expedition_alarm": {
                    "label": "Expedition Over Alert",
                    "default": "yes",
                    "inp_type": "checkbox"
                },
                "cash_changed": {
                    "label": "Cash Balance Change Alert",
                    "default": "yes",
                    "inp_type": "checkbox"
                }
            },
            "quick_items": {
                "gym": {
                    "label": "Enable Quick Items at the Gym Page",
                    "default": "yes",
                    "inp_type": "checkbox"
                },
                "hosp": {
                    "label": "Enable Quick Items at Hospital Page",
                    "default": "yes",
                    "inp_type": "checkbox"
                },
                "jail": {
                    "label": "Enable Quick Items at Jail Page",
                    "default": "yes",
                    "inp_type": "checkbox"
                }
            },
            "expedition": {
                "helper": {
                    "label": "Enable Expedition Helper",
                    "default": "yes",
                    "inp_type": "checkbox"
                },
                "hideImages": {
                    "label": "Hide images on Expedition Page",
                    "default": "yes",
                    "inp_type": "checkbox"
                }
            },
            "market": {
                "totalListing": {
                    "label": "Show total value of your listings",
                    "default": "yes",
                    "inp_type": "checkbox"
                },
                "categorySelect": {
                    "label": "Show category selection on listing page",
                    "default": "yes",
                    "inp_type": "checkbox"
                },
                "betterPriceInput": {
                    "label": "Better price input while listing items on Market",
                    "default": "yes",
                    "inp_type": "checkbox"
                },
                "buyInputAutoFill": {
                    "label": "Auto Fill the maximum in Buy Input boxes when clicked on 'Num.'",
                    "default": "yes",
                    "inp_type": "checkbox"
                }
            },
            "bank": {
                "showTax": {
                    "label": "Show Tax Rate on Deposit",
                    "default": "yes",
                    "inp_type": "checkbox"
                }
            },
            "chat": {
                "mytexts": {
                    "label": "Highlight Texts sent by me",
                    "default": "yes",
                    "inp_type": "checkbox"
                },
                "highlightWords": {
                    "label": "Highlight Specific Words",
                    "default": "yes",
                    "inp_type": "checkbox"
                },
                "highlight_Words_in_chat": {
                    "label": "Words to be Highlighted in Chat",
                    "inp_type": "text_list",
                    "default": ['Fba', "lambo"]
                },
                "test12": {
                    "label": "testt",
                    "inp_type": "text_single",
                    "default": "sdd"
                }
            },
            "trade": {
                "tradeAutoFill": {
                    "label": "Trade auto-fill to maximum if value exceeds the maximum",
                    "default": "yes",
                    "inp_type": "checkbox"
                },
                "formatCash": {
                    "label": "Format cash values to make it easier to know how much cash the other player has added to trade",
                    "default": "yes",
                    "inp_type": "checkbox"
                }
            },
            "cosmetic": {
                "hideUniLeave": {
                    "label": "Hide course leave button in University",
                    "default": "yes",
                    "inp_type": "checkbox"
                },
                "hideItemThrow": {
                    "label": "Hide item throw button in Inventory",
                    "default": "yes",
                    "inp_type": "checkbox"
                }
            },
            "quick_links": {
                "casino": {
                    "label": "Enable Quick Link to Casino Page",
                    "default": "yes",
                    "inp_type": "checkbox"
                },
                "juliosclub": {
                    "label": "Enable Quick Link to Julios Club Page",
                    "default": "no",
                    "inp_type": "checkbox"
                },
                "market": {
                    "label": "Enable Quick Link to Market Page",
                    "default": "yes",
                    "inp_type": "checkbox"
                },
                "mateo": {
                    "label": "Enable Quick Link to Mateo's Premium Antiques's Page",
                    "default": "yes",
                    "inp_type": "checkbox"
                },
                "statestimate": {
                    "label": "Enable Quick Link to Stats Estimate Page",
                    "default": "yes",
                    "inp_type": "checkbox"
                },
                "script": {
                    "label": "Enable Quick Link to Script Settings Page",
                    "default": "yes",
                    "inp_type": "checkbox"
                }
            },
            "others": {
                "production_tracker": {
                    "label": "Enable Production Raw Material Tracker",
                    "default": "yes",
                    "inp_type": "checkbox"
                },
                "vaultDefault": {
                    "label": "Open Property Page by default in vault tab",
                    "default": "yes",
                    "inp_type": "checkbox"
                },
                "betterItemValues": {
                    "label": "Show item values on inventory page",
                    "default": "yes",
                    "inp_type": "checkbox"
                },
                "external_links": {
                    "label": "Open external links (in Forums and Mails) in new tab",
                    "default": "yes",
                    "inp_type": "checkbox"
                },
                "mateosautofill": {
                    "label": "Autofill number of points at Mateo's",
                    "default": "yes",
                    "inp_type": "checkbox"
                }
            },
            "events": {
                "pricePerUnit": {
                    "label": "Show price per unit of items sold in market.",
                    "default": "yes",
                    "inp_type": "checkbox"
                },
                "attackSheetExport": {
                    "label": "Export attacks made in last one week for Google sheet.",
                    "default": "yes",
                    "inp_type": "checkbox"
                }
            }
        },
        "itemsToCache": ["3", "100", "200", "201", "202", "203", "204", "301", "105"]
    }
    const quickLinksMetadata = {
        "casino": { "label": "Casino", "url": "/Casino", "icon": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m5 12l2-4V7H4v1h2l-2 4m5 0l2-4V7H8v1h2l-2 4m5 0l2-4V7h-3v1h2l-2 4m9-10c-1.1 0-2 .9-2 2c0 .7.4 1.4 1 1.7V17h-3v-2c.6 0 1-.4 1-1V5c0-.6-.4-1-1-1h-3.8c-.8-1.2-2.2-2-3.7-2s-2.9.8-3.7 2H2c-.6 0-1 .4-1 1v9c0 .6.4 1 1 1v7h15v-3h3c1.1 0 2-.9 2-2V5.7c.6-.3 1-1 1-1.7c0-1.1-.9-2-2-2M3 6h13v7H3zm12 14H4v-5h11zm-2-1H6v-2h7z"/></svg>` },
        "juliosclub": { "label": "Julios Club", "url": "/Town/Club", "icon": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12.998 3.658a3.23 3.23 0 0 0-1.995 0c-.452.147-.898.465-1.604 1.128c-.18.168-.415.266-.661.274c-.968.03-1.508.12-1.931.336a3.23 3.23 0 0 0-1.411 1.41c-.216.424-.306.964-.337 1.932a1 1 0 0 1-.273.661c-.663.706-.981 1.152-1.128 1.604a3.23 3.23 0 0 0 0 1.995c.147.451.465.897 1.128 1.603c.168.18.266.415.274.661c.03.968.12 1.508.336 1.931c.31.608.803 1.102 1.41 1.411c.424.216.964.306 1.932.337c.246.007.481.105.661.273c.706.663 1.152.981 1.604 1.128c.648.21 1.346.21 1.995 0c.451-.147.897-.465 1.603-1.128c.18-.168.415-.266.661-.273c.968-.03 1.508-.121 1.931-.337a3.23 3.23 0 0 0 1.411-1.41c.216-.424.306-.964.337-1.932c.007-.246.105-.481.273-.661c.663-.706.981-1.152 1.128-1.604c.21-.648.21-1.346 0-1.995c-.147-.451-.465-.897-1.128-1.603a1 1 0 0 1-.273-.661c-.03-.968-.121-1.508-.337-1.931a3.23 3.23 0 0 0-1.41-1.411c-.424-.216-.964-.306-1.932-.336a1 1 0 0 1-.661-.274c-.706-.663-1.152-.981-1.604-1.128m-2.304-.951a4.23 4.23 0 0 1 2.612 0c.677.22 1.26.674 1.98 1.35l.008.003c.986.03 1.72.122 2.353.445a4.23 4.23 0 0 1 1.848 1.848c.323.634.414 1.367.445 2.353q0 .005.003.008c.676.72 1.13 1.303 1.35 1.98a4.22 4.22 0 0 1 0 2.612c-.22.677-.674 1.26-1.35 1.98l-.003.008c-.03.986-.122 1.72-.445 2.353a4.23 4.23 0 0 1-1.848 1.848c-.634.323-1.367.414-2.353.445l-.008.003c-.72.676-1.303 1.13-1.98 1.35a4.23 4.23 0 0 1-2.612 0c-.677-.22-1.26-.674-1.98-1.35l-.008-.003c-.986-.03-1.72-.122-2.353-.445a4.23 4.23 0 0 1-1.848-1.848c-.323-.634-.414-1.367-.445-2.353l-.003-.008c-.676-.72-1.13-1.303-1.35-1.98a4.23 4.23 0 0 1 0-2.612c.22-.677.674-1.26 1.35-1.98l.003-.008c.03-.986.122-1.72.445-2.353a4.23 4.23 0 0 1 1.848-1.848c.634-.323 1.367-.414 2.353-.445l.008-.003c.72-.676 1.303-1.13 1.98-1.35"/><path fill="currentColor" d="M14.65 9.53a3.674 3.674 0 0 0-5.1 0a3.43 3.43 0 0 0 0 4.94a3.674 3.674 0 0 0 5.1 0a.5.5 0 1 1 .7.716c-1.796 1.752-4.703 1.752-6.498 0a4.43 4.43 0 0 1 0-6.372c1.795-1.752 4.702-1.752 6.497 0a.5.5 0 0 1-.698.715"/></svg>` },
        "market": { "label": "Market", "url": "/Market", "icon": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19 6h-2c0-2.8-2.2-5-5-5S7 3.2 7 6H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2m-7-3c1.7 0 3 1.3 3 3H9c0-1.7 1.3-3 3-3m7 17H5V8h14zm-7-8c-1.7 0-3-1.3-3-3H7c0 2.8 2.2 5 5 5s5-2.2 5-5h-2c0 1.7-1.3 3-3 3"/></svg>` },
        "mateo": { "label": "Mateo", "url": "/Town/Mateos", "icon": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12a4 4 0 1 0 8 0a4 4 0 1 0-8 0"/></svg>` },
        "statestimate": { "label": "Stats Estimate", "url": "/StatEstimates", "icon": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="M3 9h18M3 15h18M9 9v12m6-12v12"/></g></svg>` },
        "script": { "label": "Script Settings", "url": "/settings?t=henchman-settings", "icon": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19.9 12.66a1 1 0 0 1 0-1.32l1.28-1.44a1 1 0 0 0 .12-1.17l-2-3.46a1 1 0 0 0-1.07-.48l-1.88.38a1 1 0 0 1-1.15-.66l-.61-1.83a1 1 0 0 0-.95-.68h-4a1 1 0 0 0-1 .68l-.56 1.83a1 1 0 0 1-1.15.66L5 4.79a1 1 0 0 0-1 .48L2 8.73a1 1 0 0 0 .1 1.17l1.27 1.44a1 1 0 0 1 0 1.32L2.1 14.1a1 1 0 0 0-.1 1.17l2 3.46a1 1 0 0 0 1.07.48l1.88-.38a1 1 0 0 1 1.15.66l.61 1.83a1 1 0 0 0 1 .68h4a1 1 0 0 0 .95-.68l.61-1.83a1 1 0 0 1 1.15-.66l1.88.38a1 1 0 0 0 1.07-.48l2-3.46a1 1 0 0 0-.12-1.17ZM18.41 14l.8.9l-1.28 2.22l-1.18-.24a3 3 0 0 0-3.45 2L12.92 20h-2.56L10 18.86a3 3 0 0 0-3.45-2l-1.18.24l-1.3-2.21l.8-.9a3 3 0 0 0 0-4l-.8-.9l1.28-2.2l1.18.24a3 3 0 0 0 3.45-2L10.36 4h2.56l.38 1.14a3 3 0 0 0 3.45 2l1.18-.24l1.28 2.22l-.8.9a3 3 0 0 0 0 3.98m-6.77-6a4 4 0 1 0 4 4a4 4 0 0 0-4-4m0 6a2 2 0 1 1 2-2a2 2 0 0 1-2 2"/></svg>` }
    }
    let saved = {};
    const Storage = {
        "get": function (key) {
            const data = GM_getValue(key);
            if (data) {
                if (isValidJsonObject(data)) {
                    const parsed = JSON.parse(data);
                    if (key === "settings") {
                        const categories = Object.keys(settingsMetadata.features);
                        for (const categoryName of categories) {
                            const category = settingsMetadata.features[categoryName];

                            if (!parsed.features[categoryName]) {
                                parsed.features[categoryName] = {};
                            }
                            const features = Object.keys(category);
                            for (const featureName of features) {
                                if (!parsed.features[categoryName][featureName]) {
                                    const feature = category[featureName];
                                    parsed.features[categoryName][featureName] = category[featureName];
                                }
                            };
                        }
                    }
                    return parsed;
                } else {
                    return data;
                }

            } else {
                if (key !== "settings") {
                    if (storageMetadata[key]) {
                        //this.set(key, storageMetadata[key]);
                        return storageMetadata[key];
                    }
                    return null
                } else {
                    //this.set(key, settingsMetadata);
                    return settingsMetadata;
                }
            }
        },
        "set": function (key, data) {
            const stringifiedData = JSON.stringify(data);
            if (isValidJsonObject(stringifiedData)) {
                GM_setValue(key, stringifiedData);
            } else {
                GM_setValue(key, data);
            }

        },
        "initialise": function () {
            saved.cash = 0;
            saved.currentEnergy = 0;
            ["alarms", "settings", "inventoryItems", "prodItems", "prod_usage", "prods_details", "itemMetadata", "selfDetails", "attacksCache", "misc"].forEach(keyName => {
                saved[keyName] = Storage.get(keyName);
                GM_addValueChangeListener(keyName, function (key, oldValue, newValue, remote) {
                    if (remote) {
                        saved[keyName] = Storage.get(keyName);
                    }
                });
            });
        },
        "itemIdentifiersToItemIDs": function () {
            const metadata = saved.inventoryItems;
            const obj = {};
            for (const item_id in metadata) {
                obj[metadata[item_id].id.split("item-")[1]] = item_id;
            }
            saved.itemIdentifiersToItemIDs = obj;
        }
    };

    Storage.initialise();
    ///////
    const currentHREF = window.location.href;
    const currentDomain = new URL(currentHREF).origin;
    const page = currentHREF.toLowerCase();
    const Identity = {
        "cache": function () {
            const authParent = document.querySelector("#auth0").parentNode;
            const userID = authParent.querySelector("#userId").getAttribute("userid");
            const cartelID = authParent.querySelector("#cartelId").getAttribute("cartelid");
            saved.selfDetails.id = Number(userID);
            saved.selfDetails.cartelID = cartelID;
            Storage.set("selfDetails", saved.selfDetails);
        },
        "get": function (key) {
            return saved.selfDetails[key];
        }

    }
    const Settings = {
        "isEnabled": (category, featureName) => {
            if (saved.settings.features[category] && saved.settings.features[category][featureName]) {
                const feature = saved.settings.features[category][featureName];
                if (feature.default === "yes") {
                    return true;
                }
            } else if (settingsMetadata.features[category]?.[featureName]) {
                const feature = settingsMetadata.features[category][featureName];
                if (feature.default === "yes") {
                    return true;
                }
            }
            return false;
        },
        "createBox": function (name = "henchman-settings", fullName = "Henchman Settings") {

            let navTabs = document.querySelector("#settingsNav .nav-tabs");
            let tabContent = document.querySelector("#settingsNav .tab-content");
            if (!navTabs || !tabContent) return;

            const urlParams = new URLSearchParams(window.location.search);
            const selected = urlParams.get("t") === name;

            let button = document.createElement("button");
            button.id = `v-tab-${name}`;
            button.classList.add("nav-link", "settings-nav-link");
            if (selected) button.classList.add("active");
            button.setAttribute("data-bs-toggle", "tab");
            button.setAttribute("data-bs-target", `#v-content-${name}`);
            button.type = "button";
            button.role = "tab";
            button.setAttribute("aria-controls", `v-content-${name}`);
            button.setAttribute("aria-selected", selected.toString());
            button.setAttribute("tab", name);
            if (!selected) button.setAttribute("tabindex", "-1");
            button.innerText = fullName;

            navTabs.append(button);

            let tab = document.createElement("div");
            tab.classList.add("tab-pane", "fade", "hardy_henchman_settings");
            if (selected) tab.classList.add("active", "show");
            tab.id = `v-content-${name}`;
            tab.setAttribute("role", "tabpanel");
            tab.setAttribute("aria-labelledby", `v-tab-${name}`);
            tab.innerHTML = this.generateSettingsHTML(fullName);
            tabContent.appendChild(tab);
            tab.querySelector("#henchman_settings_save").addEventListener("click", () => {
                Settings.saveSettings(tab);
            });
            tab.querySelector("#henchman_settings_reset").addEventListener("click", () => {
                saved.settings = settingsMetadata;
                Storage.set("settings", saved.settings);
                document.querySelector(".henchman_settings_saved_indicator").innerHTML = `<label class="success">Settings reset!</label>`;
                document.querySelector(".henchman_settings_saved_indicator").style.display = "block";
                setTimeout(() => {
                    document.querySelector(".henchman_settings_saved_indicator").innerHTML = "";
                    document.querySelector(".henchman_settings_saved_indicator").style.display = "none";
                }, 9000);
                //reload page
                location.reload();
            });

            GM_addStyle(`.hardy_henchman_settings{display:flex;flex-direction:column;gap:20px}.henchman_settings_saved_indicator{position:fixed;bottom:20px;right:20px;z-index:9999;padding:20px 35px;border-radius:12px;background:rgba(44,44,44,.85);box-shadow:0 6px 12px rgba(0,0,0,.4);color:#fff;font-family:Arial,sans-serif;font-size:16px;transition:opacity .3s;font-weight:700}.henchman_settings_saved_indicator .success{color:#4caf50}.henchman_settings_saved_indicator .error{color:#f44336}.hardy_henchman_settings .categories{display:flex;flex-wrap:wrap;gap:20px}.hardy_henchman_settings button{margin:7px}.hardy_henchman_settings .henchman_category{flex:1 1 calc(33.33% - 20px);min-width:250px;border:1px solid;border-radius:6px;padding:6px}.hardy_henchman_settings .henchman_category label{display:block;margin-bottom:10px}.henchman_settings_sub_titles{text-align:center;font-weight:700;color:#d0e6e4}.hardy_henchman_settings .form-check{margin-bottom:10px}.hardy_henchman_settings .form-check-input{margin-right:10px}.hardy_henchman_settings .form-check-label{display:inline-block;font-size:14px}.hardy_henchman_settings .card-body{padding:20px}.hardy_henchman_settings .card{margin-bottom:20px}`);
        },
        "generateSettingsHTML": function (fullName = "Henchman Settings") {
            let settingsHTML = '<div class="card"><div class="card-body">';
            settingsHTML += `<h5 class="h5">${fullName}</h5>`;
            settingsHTML += '<p class="card-text">Configure your script settings below:</p><div class="categories">';

            for (const category of Object.keys(saved.settings.features).sort()) {
                settingsHTML += `<div class="henchman_category"><label class="henchman_settings_sub_titles">${category.replace(/_/g, ' ').toUpperCase()}</label>`;
                for (const feature in saved.settings.features[category]) {
                    const setting = saved.settings.features[category][feature];
                    if (setting.inp_type === "checkbox") {
                        settingsHTML += `<div class="form-check">
                        <input class="form-check-input" type="checkbox" aria-type="checkbox" aria-id="${feature}" ${setting.default === "yes" ? "checked" : ""}>
                        <label class="form-check-label" for="${feature}">${setting.label}</label>
                    </div>`;
                    } else if (setting.inp_type === "text_single") {
                        const value = setting.default || "";
                        settingsHTML += `<div class="form-check">
                         <label class="form-check-label" for="${feature}">${setting.label}: </label>
                        <input  type="text" aria-type="single" aria-id="${feature}" value="${value}">
                    </div>`;
                    } else if (setting.inp_type === "text_list") {
                        const valueArray = setting.default || [];
                        settingsHTML += `<div class="form-check">
                        <label class="form-check-label" for="${feature}">${setting.label}: </label>
                        <input type="text" aria-id="${feature}" aria-type="list" value="${valueArray.join(",")}">
                    </div>`;
                    }
                }
                settingsHTML += '</div>';
            }



            settingsHTML += '</div></div><div class="card-footer"><button class="btn btn-primary" id="henchman_settings_save">Save</button><button class="btn btn-danger" id="henchman_settings_reset">Reset</button><div class="henchman_settings_saved_indicator" style="display:none;"></div></div>';
            settingsHTML += '</div></div>';
            return settingsHTML;
        },
        "saveSettings": function (tab) {
            try {
                const categories = tab.querySelectorAll(".henchman_category");
                for (const category of categories) {
                    const categoryName = category.querySelector("label.henchman_settings_sub_titles").innerText.toLowerCase().replace(" ", "_");
                    const checkboxes = category.querySelectorAll("input[type=checkbox]");
                    for (const checkbox of checkboxes) {
                        const settingName = checkbox.getAttribute("aria-id");
                        if (checkbox.checked) {
                            saved.settings.features[categoryName][settingName].default = "yes";
                        } else {
                            saved.settings.features[categoryName][settingName].default = "no";
                        }
                    }
                    const textInputs = category.querySelectorAll("input[type=text]");
                    for (const textInput of textInputs) {
                        const settingName = textInput.getAttribute("aria-id");
                        const inptype = textInput.getAttribute("aria-type");
                        if (inptype === "list") {
                            const val = textInput.value;
                            if (val) {
                                const value = val.replace(/\s/g, "").split(",").filter(item => item !== "");
                                saved.settings.features[categoryName][settingName].default = value;
                            } else {
                                saved.settings.features[categoryName][settingName].default = [];
                            }
                        } else {
                            const value = textInput.value || "";
                            saved.settings.features[categoryName][settingName].default = value;
                        }
                    }
                }
                //console.log(saved.settings)
                Storage.set("settings", saved.settings);
                document.querySelector(".henchman_settings_saved_indicator").innerHTML = `<label class="success">Settings saved!</label>`;
                document.querySelector(".henchman_settings_saved_indicator").style.display = "block";
                setTimeout(() => {
                    document.querySelector(".henchman_settings_saved_indicator").innerHTML = "";
                    document.querySelector(".henchman_settings_saved_indicator").style.display = "none";
                }, 9000);
            } catch (e) {
                document.querySelector(".henchman_settings_saved_indicator").innerHTML = `<label class="error">Error saving settings: ${e.message}</label>`;

                document.querySelector(".henchman_settings_saved_indicator").style.display = "block";
                setTimeout(() => {
                    document.querySelector(".henchman_settings_saved_indicator").innerHTML = "";
                    document.querySelector(".henchman_settings_saved_indicator").style.display = "none";
                }, 9000);
            }
        }


    };
    const observeDOM = (function () {
        let MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
        return function (obj, callback) {
            if (!obj || obj.nodeType !== 1)
                return;
            if (MutationObserver) {
                let mutationObserver = new MutationObserver(callback);
                mutationObserver.observe(obj, {
                    childList: true,
                    subtree: true
                });
                return mutationObserver;
            } else if (window.addEventListener) {
                obj.addEventListener("DOMNodeInserted", callback, false);
                obj.addEventListener("DOMNodeRemoved", callback, false);
            }
        }
    })();
    const Cosmetic = {
        "hideUniLeave": () => {
            if (Settings.isEnabled("cosmetic", "hideUniLeave")) {
                waitForElement(".leaveCourseBtn", 800, 25, true).then(elements => {
                    for (const element of elements) {
                        element.classList.add("disabled");
                    }
                });
            }
        },
        "hideItemThrow": () => {
            if (Settings.isEnabled("cosmetic", "hideItemThrow")) {
                waitForElement(`button[data-bs-target="#throwItemModal"]`, 800, 15, true).then((elements) => {
                    for (const element of elements) {
                        element.classList.add("disabled");
                    }
                });
            }
        }
    }
    const Chat = {
        "my_uid": Identity.get("id"),
        "words": JSON.parse(JSON.stringify(saved.settings.features.chat.highlight_Words_in_chat.default)),
        "highlight": function () {
            Chat.words = Chat.words.map(element => element.toLowerCase());
            this.words.push(Identity.get("name").toLocaleLowerCase());
            if (Settings.isEnabled("chat", "mytexts") || Settings.isEnabled("chat", "highlightWords")) {
                waitForElement(`div.chats.row`).then(mainElement => {
                    
                    const observer = observeDOM(mainElement, (mutations) => {
                        mutations.forEach(mutation => {
                            if (mutation.type === "childList") {
                                mutation.addedNodes.forEach(added => {
                                    if (added.nodeType === 1) { // Ensure it's an element
                                        if (added.classList.contains("messageText")) {
                                            const splitted = added.innerHTML.split("</a>:")[1];
                                            for (const word of Chat.words) {
                                                if (splitted?.toLowerCase().includes(word)) {
                                                    //console.log(added.innerHTML);
                                                    added.classList.add("hardy_chat_highlight_me");
                                                    break;
                                                }
                                            }
                                        } else if (added.classList.contains("col-auto")) {
                                            const messages = added.querySelectorAll(".messageText");
                                            messages.forEach(message => {
                                                const splitted = message.innerHTML.split("</a>:")[1];
                                                for (const word of Chat.words) {
                                                    if (splitted?.toLowerCase().includes(word)) {
                                                        //console.log(message.innerHTML);
                                                        message.classList.add("hardy_chat_highlight_me");
                                                        break;
                                                    }
                                                }
                                            });
                                        }
                                    }
                                });
                            }
                        });
                    });

                    const messages = mainElement.querySelectorAll(".messageText");
                    for (const message of messages) {
                        const splitted = message.innerHTML.split("</a>:")[1];
                        for (const word of Chat.words) {  // Again, use `for` loop
                            if (splitted?.toLowerCase().includes(word)) {
                                message.classList.add("hardy_chat_highlight_me");
                                //console.log(message.innerHTML);
                                break; // Stop checking more words for this message
                            }
                        }
                    }


                });
                if (Settings.isEnabled("chat", "mytexts")) {
                    GM_addStyle(`a[class="PlayerHighlight"][href*="User/${Chat.my_uid}"] { color: rgb(17, 154, 239);} [data-bs-theme="dark"] a[class="PlayerHighlight"][href*="User/${Chat.my_uid}"] {
                        color: rgb(65, 172, 238);
                    }`);
                }
                if (Settings.isEnabled("chat", "highlightWords")) {
                    GM_addStyle(`
                        .hardy_chat_highlight_me{
                            color: rgb(17, 154, 239);
                        }
                        [data-bs-theme="dark"] .hardy_chat_highlight_me, 
                         {
                            color: rgb(65, 172, 238);
                        }
                    `);
                }


            }
        }
    }
    const Property = {
        "vaultDefault": () => {
            if (Settings.isEnabled("others", "vaultDefault")) {
                const safeDiv = document.getElementById("v-content-safe");
                if (safeDiv) {
                    safeDiv.classList.add("active");
                    document.getElementById("v-content-home").classList.remove("active");
                    document.getElementById("v-tab-safe").classList.add("active");
                    document.getElementById("v-tab-home").classList.remove("active");
                }
            }
        }
    }
    const Alarm = {
        "add": (stamp, text, selector, sixty_sec_limit = "no") => {
            const obj = { "data": { "timestamp": stamp, "text": text, "sixty_sec_limit": sixty_sec_limit } };
            connectToFlask("add_alarm", obj).then(res => {
                if (res.message) {
                    console.log(res.message);
                    saved.alarms.cooldowns[selector] = stamp;
                    Storage.set("alarms", saved.alarms);
                } else if (res.error) {
                    console.log(`Call details: Add alarm for ${selector}, Error: ${res.error}`);
                }
            }).catch(error => {
                console.log(`Call details: Add alarm for ${selector}, Request failed: ${error}`);
            });
        },
        "remove": (stamp, selector) => {
            const obj = { "data": { "timestamp": stamp } };
            connectToFlask("remove_alarm", obj).then(res => {
                if (res.message) {
                    saved.alarms.cooldowns[selector] = 0;
                    Storage.set("alarms", saved.alarms);
                } else if (res.error) {
                    console.log(`Call details: Remove alarm for ${selector}, Error: ${res.error}`);
                }
            }).catch(error => {
                console.log(`Call details: Remove alarm for ${selector}, Request failed: ${error}`);
            });
        },
        "education": function () {
            if (Settings.isEnabled("alarms", "edu_alarm")) {
                waitForElement(`.educationIcon`, 800, 35).then((element) => {
                    const selector = 'educationIcon';
                    if (element.classList.contains("d-none")) {
                        saved.alarms.cooldowns[selector] = 0;
                    } else {
                        const txtElem = element.querySelector("a");
                        if (txtElem) {

                            const txt = txtElem.getAttribute("data-bs-content");
                            if (txt && txt.includes("will finish at")) {
                                const time = this.parseTime(txt.trim().split("finish at ")[1].split(".")[0]);
                                if (saved.alarms.cooldowns[selector] != time) {
                                    this.add(time, `CE: Education course is over!!!`, selector, "yes");
                                }
                            } else {
                                saved.alarms.cooldowns[selector] = 0;
                            }
                        } else {
                            saved.alarms.cooldowns[selector] = 0;
                        }
                    }
                }).catch(error => {
                    console.log(error);
                });
            }
        },
        "parseTime": (time) => {
            const inp = time.trim();
            const sep = inp.split(" ");
            const datePart = sep[1].split("/");
            const timePart = sep[0].split(":");
            const year = parseInt(datePart[2]);
            const month = parseInt(datePart[1]) - 1;
            const day = parseInt(datePart[0]);
            const hr = parseInt(timePart[0]);
            const min = parseInt(timePart[1]);
            const sec = parseInt(timePart[2]);
            const date = new Date(Date.UTC(year, month, day, hr, min, sec));
            return Math.floor(date.getTime() / 1000);
        }
    }

    const QuickItems = {
        "cacheInventory": function () {
            const quickItemList = saved.settings.itemsToCache;
            const obj = {};
            for (const itemID of quickItemList) {

                const img = document.querySelector(`img[src^="/images/items/${itemID}.png"]`);
                if (img) {
                    const itemDiv = img.parentNode.parentNode;
                    const desc = itemDiv.querySelector(`div[id^="itemCollapse"] > div:nth-child(2) > div > div > div.card-text`).innerText;
                    const effect = itemDiv.querySelector('div[id^="itemCollapse"] > div:nth-child(4) > div > div > div.card-text').innerText;
                    const quantityDiv = itemDiv.querySelector("span.itemQuantity");
                    const name = img.getAttribute("title");
                    obj[itemID] = { "id": itemDiv.id, 'quantity': Number(quantityDiv.innerText), "desc": desc, "effect": effect, "name": name };
                } else {
                    obj[itemID] = { "id": "", 'quantity': 0, "desc": "", "effect": "", "name": "" };
                }
            }
            saved.inventoryItems = obj;
            Storage.set("inventoryItems", obj);
        },
        "getHTML": function (uid) {
            const metadata = saved.inventoryItems;
            if (metadata && metadata[uid]) {
                const item = metadata[uid];
                const id = item.id;
                const str_id = item.id.split("item-")[1];
                const name = item.name;
                const quantity = item.quantity;
                const itemtype = saved.itemMetadata.items[uid].type;
                const desc = item.desc;
                const effect = item.effect;
                const html = `<div class="row align-items-center inventoryItemWrapper row-cols-3"id=${id}><div class="col col-4 col-sm-2 col-xl-1"><img class=img-thumbnail src="/images/items/${uid}.png?v=1.1"title=${name}></div><div class="col align-items-center col-8 col-sm-3 col-xl-3 d-flex"><p>${name} <span class=fw-bold>x<span class=itemQuantity>${quantity}</span></span></div><div class="col d-none col-2 col-xl-2 d-sm-inline">${itemtype}</div><div class="col d-none col-2 col-xl-2 d-xl-inline">£${formatNumber(saved.itemMetadata.items[uid].value)}</div><div class="col d-none col-2 d-sm-inline"></div><div class="col d-none col-xl-2 d-sm-inline col-12 col-sm-3 pe-xl-2"><button aria-label="Throw Away ${name}"class="action-btn btn btn-outline-dark btn-sm float-end ms-1 hide"href=# title="Throw Away"data-bs-itemid=${str_id} data-bs-itemname=${name} data-bs-target=#throwItemModal data-bs-toggle=modal><svg fill=currentColor height=22 viewBox="0 0 16 16"width=22 xmlns=http://www.w3.org/2000/svg><path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1V2zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5H2zm13-3H1v2h14V2zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"fill-rule=evenodd></path></svg></button> <button aria-label="Send ${name}"class="action-btn btn btn-outline-dark btn-sm float-end ms-1 hide"href=# title=Send data-bs-itemid=${str_id} data-bs-itemname=${name} data-bs-target=#sendItemModal data-bs-toggle=modal data-bs-owned=${quantity}><svg fill=currentColor height=22 viewBox="0 0 16 16"width=22 xmlns=http://www.w3.org/2000/svg><path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"fill-rule=evenodd></path></svg></button> <button aria-label="Use ${name}"class="action-btn btn btn-outline-dark btn-sm float-end use-item-btn"href=# title=Use id=${str_id}><svg fill=currentColor height=22 viewBox="0 0 16 16"width=22 xmlns=http://www.w3.org/2000/svg><path d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"fill-rule=evenodd></path></svg></button></div><div class="col col-12 collapse"id=itemCollapse${str_id}><div class="row d-md-none mb-2 mt-3 row-cols-2"><div class="col col-6 mb-2"><button aria-label="Use ${name}"class="action-btn btn btn-outline-dark btn-sm w-100 use-item-btn"href=# title=Use id=${str_id}>Use</button></div><div class="col col-6 mb-2"><button aria-label="Send ${name}"class="action-btn btn btn-outline-dark btn-sm float-end ms-1 w-100"href=# title=Send data-bs-itemid=${str_id} data-bs-itemname=${name} data-bs-target=#sendItemModal data-bs-toggle=modal data-bs-owned=${quantity}>Send</button></div><div class="col col-6 mb-2"><button aria-label="Throw Away ${name}"class="action-btn btn btn-outline-dark btn-sm float-end ms-1 w-100"href=# title="Throw Away"data-bs-itemid=${str_id} data-bs-itemname=${name} data-bs-target=#throwItemModal data-bs-toggle=modal data-bs-itemquantity=${name}>Throw</button></div></div><div class="row mb-3"><div class="col-12 mt-2"><div class=card-text><div class=fw-bold>Description</div><div class=card-text>${desc}</div></div></div></div><div class="row mb-3"><div class="col-6 d-md-none"><div class=card-text><div class=fw-bold>Type</div><div class=card-text>${itemtype}</div></div></div><div class="col-6 d-xl-none"><div class=card-text><div class=fw-bold>Value</div><div class=card-text>${formatNumber(saved.itemMetadata.items[uid].value)}</div></div></div></div><div class=row><div class="col-12 col-md-6 col-xl-6 mb-3"><div class=card-text><div class=fw-bold>Effect</div><div class=card-text>${effect}</div></div></div></div></div></div>`;
                //console.log(metadata.name, metadata.quantity
                return html
            }
            return undefined;
        },
        "addScript": function () {
            Storage.itemIdentifiersToItemIDs();
            GM_addElement('script', {
                src: '/javascripts/inventory.js',
                type: 'text/javascript'
            });
        },
        "addQuickItemGym": function () {
            if (Settings.isEnabled("quick_items", "gym")) {
                const div = createElement("DIV", { "id": "hardyGymDiv", "class": "inventoryWrapper", "style": `padding: 10px; margin-bottom: 4px;` });
                const graphDiv = document.querySelector("#graphContainer");
                graphDiv.parentNode.insertBefore(div, graphDiv);
                ["301", "105"].forEach(uid => {
                    const html = QuickItems.getHTML(uid);
                    //console.log(uid, html);
                    if (html) {
                        div.innerHTML += html;
                        const metadata = saved.inventoryItems
                        const parsed = metadata[uid];
                    }
                });
                this.addScript();
            }
        },
        "addQuickItemHosp": function () {
            if (Settings.isEnabled("quick_items", "hosp")) {
                const parentDiv = document.querySelector("#helpAccordion").parentNode;
                const array = ["200", "201", "202", "203", "204"];
                const div = createElement("DIV", { "id": "hardyHospitalDiv", "class": "inventoryWrapper", "style": `padding: 10px; margin-bottom: 4px;` });
                parentDiv.insertBefore(div, parentDiv.querySelectorAll("div.card.mb-4")[2]);
                for (const itemID of array) {
                    const html = this.getHTML(itemID);
                    if (html) {
                        div.innerHTML += `${html}`;
                        const metadata = saved.inventoryItems;
                        const parsed = metadata[itemID];
                    }
                }
                this.addScript();
            }
        },
        "addQuickItemJail": function () {
            if (Settings.isEnabled("quick_items", "jail")) {
                const parentDiv = document.querySelector("#helpAccordion").parentNode;
                const array = ["3"];
                const div = createElement("DIV", { "id": "hardyJailDiv", "class": "inventoryWrapper", "style": `padding: 10px; margin-bottom: 4px;` });
                parentDiv.insertBefore(div, parentDiv.querySelectorAll("div.card.mb-4")[1]);
                for (const itemID of array) {
                    const html = this.getHTML(itemID);
                    if (html) {
                        div.innerHTML += `${html}`;
                        const metadata = saved.inventoryItems;
                        const parsed = metadata[itemID];
                    }
                }
                this.addScript();
            }
        }
    }

    const ProductionTracker = {
        "cache": function () {
            const prodList = ["400", "401", "402"];
            const obj = {}
            for (const itemID of prodList) {
                const img = document.querySelector(`img[src^="/images/items/${itemID}.png"]`);
                if (img) {
                    const itemDiv = img.parentNode.parentNode;
                    const quantityDiv = itemDiv.querySelector("span.itemQuantity");
                    obj[itemID] = { 'quantity': Number(quantityDiv.innerText) };
                } else {
                    obj[itemID] = { 'quantity': 0 };
                }
            }
            Storage.set("prodItems", obj);
        },
        "addBox": function () {
            if (Settings.isEnabled("others", "production_tracker")) {
                waitForElement(`.contentColumn`).then((element) => {
                    const node = createElement("div", { "id": "hardy_ce_job_div_container" });
                    node.innerHTML = `<div class="header-section">Production Raw Material Tracker</div><div id="hardy_ce_job_div"><div id="hardy_prod_summary"></div></div>`;
                    const fchild = element.firstChild;
                    fchild.insertBefore(node, fchild.firstChild);
                    GM_addStyle(`#helpAccordion {display: none;} #hardy_ce_job_div {background-color: rgb(255, 255, 255);margin: 0 0 15px 0;padding: 12px;min-height: 82px;}[data-bs-theme="dark"] #hardy_ce_job_div {background-color: #2b3035;}#hardy_prod_summary {text-align: center;margin: 8px 0;font-weight: bold;}.hardy_red {color: #cb2121;}.hardy_green {color: #157d15;}[data-bs-theme="dark"] .hardy_red {color: #e89090;}[data-bs-theme="dark"] .hardy_green {color: #75f675;}.header-section {text-align: center;}`)
                    ProductionTracker.updateSummary();
                }).catch(error => {
                    console.log(error);
                });
            }
        },
        "updateSummary": function () {
            const amount = saved.prodItems;
            const node = document.querySelector("#hardy_prod_summary");
            if (node) {
                let html = "";
                if (Number(saved.prods_details["401"]) > 1) {
                    const p = amount["401"].quantity;
                    const req = Number(saved.prods_details["401"]) * saved.prod_usage["401"];
                    html += `<div style="display:inline;  margin: 0 5px;"><label class="${p < req ? "hardy_red" : "hardy_green"}">Agave Heart: (${p}/${req}) (${Math.floor(p / req)} days)</label></div>`;
                }
                if (Number(saved.prods_details["400"]) > 1) {
                    const p = amount["400"].quantity;
                    const req = Number(saved.prods_details["400"]) * saved.prod_usage["400"];
                    html += `<div style="display:inline; margin: 0 5px;"><label class="${p < req ? "hardy_red" : "hardy_green"}">Bag of Fertiliser: (${p}/${req}) (${Math.floor(p / req)} days)</label></div>`;
                }
                if (Number(saved.prods_details["402"]) > 1) {
                    const p = amount["402"].quantity;
                    const req = Number(saved.prods_details["402"]) * saved.prod_usage["402"];
                    html += `<div style="display:inline;  margin: 0 5px;"><label class="${p < req ? "hardy_red" : "hardy_green"}">Coca Paste: (${p}/${req}) (${Math.floor(p / req)} days)</label></div>`;
                }
                node.innerHTML = html;
            }
        },
        "updateAfterSuccess": function () {
            waitForElement(`.border-success`).then((element) => {
                const txt = element.innerText.trim().toLowerCase();
                if (txt.includes("you gained")) {
                    if (txt.includes("agave heart")) {
                        const amountGained = Number(txt.split("you gained x")[1].trim().split("agave heart")[0].trim().replace(/,/g, ""));
                        const cached = saved.prodItems;
                        cached["401"].quantity += amountGained;
                        Storage.set("prodItems", saved.prodItems);
                    } else if (txt.includes("coca paste")) {
                        const amountGained = Number(txt.split("you gained x")[1].trim().split("coca paste")[0].trim().replace(/,/g, ""));
                        const cached = saved.prodItems;
                        cached["402"].quantity += amountGained;
                        Storage.set("prodItems", saved.prodItems);
                    } else if (txt.includes("bag of fert")) {
                        const amountGained = Number(txt.split("you gained x")[1].trim().split("bag of fert")[0].trim().replace(/,/g, ""));
                        const cached = saved.prodItems;
                        cached["400"].quantity += amountGained;
                        Storage.set("prodItems", saved.prodItems);
                    }
                }
            }).catch(error => {
                console.log(error);
            });
        }
    }
    const Expedition = {
        "statsForExpeditions": [],
        "hideImages": function () {
            if (Settings.isEnabled("expedition", "hideImages")) {
                GM_addStyle(`img[src^="images/expeditions/"] {display: none;}`);
            }
        },
        "helper": function () {
            if (Settings.isEnabled("expedition", "helper")) {
                waitForElement(`select.expeditionTeamSelector`, 800, 30, true).then((elements) => {
                    let hasLooped = 0;
                    for (const element of elements) {
                        if (hasLooped === 0 && element.value == 0) {
                            hasLooped = 1;
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
                                    Expedition.statsForExpeditions.push(obj);
                                }
                                Expedition.updateText();
                            }
                        }
                    }
                }).catch(error => {
                    console.log(error);
                });
            }
        },
        "updateText": function () {
            const expeditions = document.querySelectorAll('div.expeditionButton');
            for (const expedition of expeditions) {
                if (!expedition.querySelector(".remainingTime").hasAttribute("completion")) {
                    const req = {};
                    req.morale = parseInt(expedition.querySelector('.moraleRequirement').innerText);
                    req.combat = parseInt(expedition.querySelector('.combatRequirement').innerText);
                    req.caution = parseInt(expedition.querySelector('.cautionRequirement').innerText);
                    req.speed = parseInt(expedition.querySelector('.speedRequirement').innerText);
                    req.notoriety = parseInt(expedition.querySelector('.estimatedTime').getAttribute("notoriety"));
                    const chances = Expedition.calculateChances(req);
                    let box = expedition.querySelector(".hardy_expedition_box");
                    if (!box) {
                        box = createElement("DIV", { "class": 'hardy_expedition_box row' });
                        expedition.appendChild(box);
                    }
                    box.innerHTML = Expedition.createHTML(chances);
                }
            }
        },
        "calculateChances": function (req) {
            const moraleRequirement = req.morale;
            const combatRequirement = req.combat;
            const cautionRequirement = req.caution;
            const speedRequirement = req.speed;
            const array = [];
            for (const team of this.statsForExpeditions) {
                let moraleSuccessChance = moraleRequirement > 0 ? Math.max(Math.min((team.morale / moraleRequirement) * 100, 100), 0) : 100
                let combatSuccessChance = combatRequirement > 0 ? Math.max(Math.min((team.combat / combatRequirement) * 100, 100), 0) : 100
                let cautionSuccessChance = cautionRequirement > 0 ? Math.max(Math.min((team.caution / cautionRequirement) * 100, 100), 0) : 100
                let minSuccessChance = Math.min(moraleSuccessChance, combatSuccessChance, cautionSuccessChance);
                let maxEffectiveSpeed = speedRequirement * 1.25;
                let minEffectiveSpeed = speedRequirement * 0.75;
                let effectiveSpeed = Math.max(Math.min(maxEffectiveSpeed, team.speed), minEffectiveSpeed)
                let mins = Math.max(15, Math.round((1 / 10) * (speedRequirement * req.notoriety) / effectiveSpeed))
                array.push([team.name, Math.floor(minSuccessChance), mins]);
            }
            return array
        },
        "createHTML": function (chances) {
            let html = '<table><thead><tr><th>Team</th><th>Chance</th><th>Time</th></tr></thead><tbody>'
            if (chances.length > 0) {
                for (const team of chances) {
                    let label = '';
                    if (team[1] < 20) {
                        label = "text-danger";
                    } else if (team[1] < 50) {
                        label = "text-warning";
                    } else {
                        label = "text-success";
                    }
                    html += `<tr><th>${team[0]}</th><th class="${label}" style="font-weight: bold;">${team[1]}%</th><th>${this.convertTime(team[2])}</th></tr>`;
                }
            }
            html += '</tbody></table>';
            return html;
        },
        "convertTime": function (minutes) {
            let hours = Math.floor(minutes / 60);
            let mins = minutes % 60;
            if (hours > 0) {
                return `${hours}H ${mins}m`
            }
            return `${mins}m`
        }
    }
    const Market = {
        "totalListing": function () {
            if (Settings.isEnabled("market", "totalListing")) {
                waitForElement(`.inventoryItemWrapper`, 800, 15, true).then((elements) => {
                    let total = 0;
                    for (const element of elements) {
                        const children = element.children;
                        const price = Number(children[2].innerText.replace(/[^0-9]/g, ""));
                        const units = Number(children[4].innerText.replace(/[^0-9]/g, ""));
                        total += price * units;
                        const totalforItem = formatToText(price * units);
                        children[2].innerText += ` (£${totalforItem})`;
                    }
                    const div = elements[0].parentNode.parentNode.parentNode.children[0].querySelector(".header-section");
                    div.innerText = `Listing Value: £${formatNumber(total)} (£${formatToText(total)})`;
                    div.style = "text-align: center;";
                });
            }
        },
        "categorySelect": function () {
            if (Settings.isEnabled("market", "categorySelect")) {
                waitForElement(`select#itemSelector`).then((element) => {
                    let listOFCategories = [];
                    const options = element.querySelectorAll("option");
                    for (const option of options) {
                        const value = option.getAttribute("value");
                        if (value && value != "0") {
                            const name = option.innerText.trim();
                            const itemID = Market.getItemIDFromName(name, "market");
                            if (itemID) {
                                const category = saved.itemMetadata.items[itemID].type;
                                const sanitizedCategory = Market.sanitizeStringForHTMLElements(category);
                                option.classList.add("market-select-item");
                                option.setAttribute("aria-itemid", itemID);
                                option.setAttribute("aria-item-category", sanitizedCategory);
                                option.setAttribute("aria-label", Market.sanitizeStringForHTMLElements(saved.itemMetadata.items[itemID].name));
                                listOFCategories.push(category);
                            }
                        }
                    };
                    listOFCategories.sort((a, b) => a.localeCompare(b));
                    listOFCategories = [...new Set(listOFCategories)];
                    if (listOFCategories.length > 1) {
                        const form = document.querySelector("form#itemsSellForm");
                        const newSelect = createElement("select", { "id": "itemSelectorCategory", "class": "form-select form-control-sm mb-3 form-control-sm" });
                        newSelect.innerHTML = `<option value="0"> - Select a Category: - </option>` + listOFCategories.map(category => `<option value="${Market.sanitizeStringForHTMLElements(category)}">${category}</option>`).join("");
                        form.querySelector(".row").appendChild(newSelect);
                        newSelect.addEventListener("change", (event) => {
                            const categorySelected = event.target.value;
                            const options = document.querySelectorAll(".market-select-item");
                            for (const option of options) {
                                const category = option.getAttribute("aria-item-category");
                                if (categorySelected !== "0") {
                                    if (category === categorySelected) {
                                        option.classList.remove("hide");
                                    } else {
                                        option.classList.add("hide");
                                    }
                                } else {
                                    option.classList.remove("hide");
                                }
                            }
                            GM_setValue("categorySelected", categorySelected);
                        });
                        const newSelectCached = GM_getValue("categorySelected", "0");
                        if (newSelectCached !== "0" && newSelect.querySelector(`option[value="${newSelectCached}"]`)) {
                            newSelect.value = newSelectCached;
                            const event = new Event("change");
                            newSelect.dispatchEvent(event);
                        }
                    }
                });
            }
        },
        "getItemIDFromName": function (nameString, pageName = "market") {
            if (pageName === "market") {
                let name = "";
                if (nameString.includes("-")) {
                    if (nameString.includes("%")) {
                        const split = nameString.split("-");
                        split.pop();
                        name = split.join("-").trim();
                    } else {
                        name = nameString.trim();
                    }
                } else {
                    name = nameString.trim();
                }
                for (const itemID in saved.itemMetadata.items) {
                    const item = saved.itemMetadata.items[itemID];
                    if (item.name.toLowerCase() === name.toLowerCase()) {
                        return itemID;
                    }
                }
                return undefined;
            }
        },
        "sanitizeStringForHTMLElements": function (str) {
            // Remove non-alphanumeric characters and replace spaces with hyphens
            return str.replace(/[^a-zA-Z0-9]/g, '-') // Replaces non-alphanumeric characters with hyphens
                .replace(/\s+/g, '_') // Replaces spaces with hyphens
                .toLowerCase(); // Converts to lowercase for uniformity
        },
        "betterInput": function () {
            if (Settings.isEnabled("market", "betterPriceInput")) {
                waitForElement("#priceper").then((element) => {
                    const obj = {};
                    for (const attr of element.attributes) {
                        obj[attr.name] = attr.value;
                    }
                    const newInput = createElement("input", obj);
                    newInput.id = "priceper_new";
                    newInput.removeAttribute("name");
                    element.style.display = "none";
                    element.parentNode.insertBefore(newInput, element);
                    newInput.setAttribute("style", "background-color:#495449; margin-bottom: 4px;");
                    newInput.addEventListener("input", () => {
                        const parsedValue = valueListenerForCashInputs(newInput);
                        if (parsedValue) {
                            newInput.value = `£${formatNumber(parsedValue)}`;
                            AutoNumeric.getAutoNumericElement(element).set(Number(parsedValue));
                            element.value = Number(parsedValue);
                            element.dispatchEvent(new Event("input"));
                        }

                    });

                    const selector = document.querySelector("#itemSelector");
                    selector.addEventListener("change", (event) => {
                        const value = event.target.value;
                        if (value && value !== "" && value !== "0") {
                            const option = selector.querySelector(`option[value="${value}"]`);
                            const uid = option.getAttribute("aria-itemid");
                            if (uid && saved.itemMetadata.items[uid]) {
                                const price = saved.itemMetadata.items[uid].value;
                                if (price) {
                                    newInput.value = `£${formatNumber(price)}`;
                                    newInput.dispatchEvent(new Event("input"));
                                }
                            }
                        } else {
                            newInput.value = `0`;
                            newInput.dispatchEvent(new Event("input"));
                        }
                    });
                });
            }
        },
        "buyInputAutoFill": function () {
            if (Settings.isEnabled("market", "buyInputAutoFill")) {
                waitForElement("#itemMarketNav .tab-content").then((element) => {
                    const observer = observeDOM(element, (mutations) => {
                        mutations.forEach(mutation => {
                            if (mutation.addedNodes.length > 0) {
                                const addedNodes = mutation.addedNodes;
                                for (const addedNode of addedNodes) {
                                    if (addedNode.classList.contains("offerListWrapper")) {
                                        const inputs = addedNode.querySelectorAll(`input[name="quantity"]`);
                                        for (const input of inputs) {
                                            const previous = input.previousSibling;
                                            if (previous.tagName === "LABEL") {
                                                previous.addEventListener("click", () => {
                                                    const max = input.getAttribute("max");
                                                    if (max) {
                                                        AutoNumeric.getAutoNumericElement(input).set(Number(max))
                                                        input.value = max;
                                                        input.dispatchEvent(new Event("input"))
                                                    }
                                                });
                                            }
                                        }
                                    }
                                }
                            }
                        });
                    });
                });
            }
        }
    }
    const Bank = {
        "showTax": function () {
            if (Settings.isEnabled("bank", "showTax")) {
                waitForElement(`form[action^="/Bank/Deposit"]`).then((element) => {
                    const parent = element.parentNode.parentNode;
                    const deposit_input = element.querySelector("input");
                    Bank.updateRate(parent, deposit_input);
                    deposit_input.addEventListener('input', function (event) {
                        Bank.updateRate(parent, event.target);
                    });
                }).catch(error => {
                    console.log(error);
                });
            }
        },
        "updateRate": function (parent, inputElement) {
            const value_raw = inputElement.value || "";
            const value = value_raw.replace(/,/g, "");
            console.log(value);
            let tax = 0
            if (!isNaN(Number(value))) {
                const amount = Number(value);
                tax = Math.round(amount * (2.5 / 100));
            }
            let taxDiv = parent.querySelector("#hardyTaxDiv");
            if (!taxDiv) {
                taxDiv = createElement("DIV", { "id": "hardyTaxDiv" });
                parent.appendChild(taxDiv);
            }
            taxDiv.innerHTML = `Tax on Deposit: £${formatNumber(tax)}`;
        }
    }
    const ItemValues = {
        "cacheInventory": function () {
            const itemList = document.querySelectorAll("div.inventoryItemWrapper");
            for (const item of itemList) {
                const uid = item.querySelector("img").getAttribute("src").split("images/items/")[1].split(".png")[0];
                if (!saved.itemMetadata.items[uid]) {
                    const children = item.children;
                    const name = children[1].innerHTML.split("<p>")[1].split("<span")[0].trim();
                    const itemType = children[2].innerText.trim();
                    const value = Number(children[3].innerText.replace(/[^0-9]/g, ''));
                    saved.itemMetadata.items[uid] = { "name": name, "type": itemType, "value": value };
                }
            }
        },
        "showOnInventory": function () {
            if (Settings.isEnabled("others", "betterItemValues")) {

                const itemList = document.querySelectorAll("div.inventoryItemWrapper");
                for (const item of itemList) {

                    const uid = item.querySelector("img").getAttribute("src").split("images/items/")[1].split(".png")[0];
                    const quantity = Number(item.querySelector("span.itemQuantity").innerText.replace(/[^0-9]/g, '').trim());
                    let price = false;
                    if (saved.itemMetadata.items[uid]) {
                        price = saved.itemMetadata.items[uid].value;
                    }
                    if (price && price !== 0) {
                        //
                    } else {
                        price = Number(item.children[3].innerText.replace(/[^0-9]/g, ''));
                    }
                    item.querySelectorAll("div")[3].innerHTML = `<label class="hardy_betterValue">£${formatNumber(price)}, Total: £${formatToText(Math.round(price * quantity))}</label>`;
                }
                // make label.hardy_betterValue bold and greenish color that fits well with dark background 
                GM_addStyle(`label.hardy_betterValue { font-weight: bold; color:rgb(106, 233, 106); }`);
            }

        },
        "showOnGallery": function () {
            if (Settings.isEnabled("others", "betterItemValues")) {
                const parentDiv = document.querySelector("div#sortableGallery");
                const owner = Number(page.split("gallery/")[1].replace(/[^0-9]/g, '').trim());
                const myId = Identity.get("id");
                let sum = 0;
                if (parentDiv) {
                    const items = parentDiv.children;
                    if (items.length > 0) {
                        for (const item of items) {
                            const uid = item.querySelector("img").getAttribute("src").split("images/items/")[1].split(".png")[0];
                            if (!isNaN(Number(uid))) {
                                if (saved.itemMetadata.items[uid]) {
                                    const elemChildren = item.children;
                                    const price = saved.itemMetadata.items[uid].value;
                                    if (price && price != 0) {
                                        const quantityDivIndex = owner == myId ? 5 : 4;
                                        const quantity = Number(elemChildren[quantityDivIndex].innerText.replace(/[^0-9]/g, ''));
                                        //console.log(quantity);
                                        if (quantity && !isNaN(quantity)) {
                                            const total = price * quantity;
                                            const valueDivIndex = owner == myId ? 4 : 3;
                                            elemChildren[valueDivIndex].innerHTML = `<label class="hardy_betterValue">£${formatNumber(price)}, Total: £${formatToText(Math.round(total))}</label>`;
                                            sum += total;
                                        }
                                    }
                                }
                            }
                        }
                        const headerElem = document.querySelector("#mainBackground > div > div > div.col-12 > div.card.mb-4 > div.row.mb-0 > div > div > h2");
                        headerElem.innerText += `, Total Value: £${formatToText(Math.round(sum))}`;
                    }
                }

                GM_addStyle(`label.hardy_betterValue { font-weight: bold; color:rgb(106, 233, 106); }`);
            }
        },
        "showOnUserProfile": function () {
            if (Settings.isEnabled("others", "betterItemValues")) {
                let sum = 0;
                const items = document.querySelectorAll("div.galleryCard");
                if (items.length > 0) {
                    for (const item of items) {
                        const imgElem = item.querySelector("img");
                        if (imgElem) {
                            const uid = imgElem.getAttribute("src").split("images/items/")[1].split(".png")[0];
                            if (saved.itemMetadata.items[uid]) {
                                const parentDiv = item.parentNode;
                                const title = parentDiv.querySelector(".card-title").innerText.split(" ");
                                const quantity = Number(title[title.length - 1].split("x")[1]);
                                if (quantity && !isNaN(quantity)) {
                                    const price = saved.itemMetadata.items[uid].value;
                                    if (price && price != 0) {
                                        const total = price * quantity;
                                        parentDiv.querySelectorAll("p")[1].innerHTML = `<span class="text-muted">Value: </span><label class="hardy_betterValue">£${formatToText(Math.round(total))}</label>`;
                                        sum += total;
                                    }
                                }
                            }
                        }
                    }
                    const headerElem = document.querySelector("#mainBackground > div > div > div.col-12 > div:nth-child(7) > div.row.mb-0 > div > div");
                    headerElem.innerHTML = `<h2>Personal Gallery, Total Value: £${formatToText(Math.round(sum))}</h2>`;
                    GM_addStyle(`label.hardy_betterValue { font-weight: bold; color:rgb(106, 233, 106); }`);
                }
            }
        }
    }
    const Trade = {
        "autoFill": function () {
            if (Settings.isEnabled("trade", "tradeAutoFill")) {
                //console.log("trade auto-fill enabled");

                const inputList = document.querySelectorAll("input.form-control");
                for (const input of inputList) {
                    if (input.hasAttribute("min") && input.hasAttribute("max")) {
                        //input.value = "9"
                        input.addEventListener("input", () => {
                            const min = Number(input.getAttribute("min"));
                            const max = Number(input.getAttribute("max"));
                            const value = Number(input.value);
                            if (value < min) {
                                input.value = min;
                            } else if (value > max) {
                                input.value = max;
                            }
                        });
                    }
                }

            }
        },
        "formatCash": function () {
            if (Settings.isEnabled("trade", "formatCash")) {
                waitForElement("#otherPlayerCash").then((element) => {
                    const value = element.value;
                    if (value) {
                        const num = Number(value.replace(/[^\d.-]/g, ''));
                        if (num > 0) {
                            const formatted = formatToText(num);
                            const elem = createElement("div", { "style": "margin: 7px; font-weight: bold; color: rgb(69, 175, 69);" });
                            elem.innerHTML = `Formatted Value: ${formatted}`;
                            element.parentNode.appendChild(elem);
                        }
                    }
                });
            }
        }
    }
    const Forum = {
        "externalLinks": () => {
            if (Settings.isEnabled("others", "external_links")) {
                const links = document.querySelector("#mainBackground").querySelectorAll("a[href]");
                for (const link of links) {
                    const href = link.getAttribute("href");
                    if (href && href !== "#" && (!link.hasAttribute("target") || link.getAttribute("target") !== "_blank")) {
                        //console.log(`Href: ${href}, issameDomain: ${isSameDomain(href)}`);
                        if (!isSameDomain(href)) {
                            link.setAttribute("target", "_blank");
                        }
                    }
                }
            }
        }
    }
    const QuickLinks = {
        "add": function () {
            waitForElement(`#auth0`).then((element) => {
                let next = element.nextSibling;;
                while (next.tagName === "SCRIPT") {
                    next = next.nextSibling;
                }
                let num = 0;
                const node = createElement("div", { "id": "hardy_quick_links_div", "class": "card-body" });
                const keys = Object.keys(quickLinksMetadata).sort((a, b) => a.localeCompare(b));
                for (const key of keys) {
                    if (Settings.isEnabled("quick_links", key)) {
                        num += 1;
                        const label = quickLinksMetadata[key].label;
                        const url = quickLinksMetadata[key].url;
                        const icon = quickLinksMetadata[key].icon;
                        const html = `<div><a href="${url}">${icon}<label>${label}</label></a></div>`;
                        node.innerHTML += html;
                    }
                }
                if (num > 0) {
                    element.parentNode.insertBefore(node, next);
                    GM_addStyle(`#hardy_quick_links_div{display:flex;align-items:center;gap:10px;padding:10px;margin-bottom:8px}#hardy_quick_links_div a{display:inline-block;text-decoration:none;white-space:nowrap;padding:4px 6px;color:#7498cd;background-color:#000;border-radius:6px;cursor:pointer}#hardy_quick_links_div label{font-weight:700;cursor:pointer;margin-left:3px;}#hardy_quick_links_div a:hover{text-decoration:underline}`);
                }

            });
        }
    }
    const Mateo = {
        "autofill": function () {
            if (Settings.isEnabled("others", "mateosautofill")) {
                setTimeout(() => {
                    console.log(1)
                    const remaining_points_txt = document.querySelector("#mainBackground > div > div > div.col-12 > div.row.mb-3 > div:nth-child(2) > div > div.row.mb-0 > div > div > h2").innerText;
                    console.log(remaining_points_txt)
                    const remaining_points = Number(remaining_points_txt.split("(")[1].split("/")[0]);
                    if (remaining_points > 0) {
                        const input = document.querySelector("#pointsToBuy");
                        console.log(input)
                        if (input) {
                            console.log(2)
                            input.value = remaining_points;
                            input.dispatchEvent(new Event("input", { bubbles: true }));
                            input.dispatchEvent(new Event("change", { bubbles: true }));
                        }
                    }
                }, 3000);

            }
        }
    }
    const Events = {
        "pricePerUnit": function () {
            if (Settings.isEnabled("events", "pricePerUnit")) {
                const events = document.querySelectorAll(".eventItemWrapper");
                for (const event of events) {
                    const children = event.children;
                    const category = children[0].innerText.trim();
                    if (category === "Item Market") {
                        const eventTextElem = children[1];
                        if (eventTextElem.querySelector("a")) {
                            const eventTextHTML = eventTextElem.innerHTML;
                            const eventText = eventTextHTML.split("</a>")[1].trim();
                            if (eventText.includes("bought")) {
                                const splitted = eventText.split(" ");
                                const totalPrice = Number(splitted[splitted.length - 1].replace(/[^0-9.]/g, ""));
                                const quantity = Number(splitted[1].replace(/[^0-9.]/g, ""));
                                const pricePerItem = `£${formatNumber(Math.round(totalPrice / quantity))}`;
                                const htmlString = eventTextHTML.replace(`</span>`, ` (Per Unit: ${pricePerItem})</span>`);
                                eventTextElem.innerHTML = htmlString;
                            }
                        }
                    }
                }
            }
        },
        "attackSheetExport": function () {
            if (Settings.isEnabled("events", "attackSheetExport")) {
                waitForElement("#hardy_quick_links_div").then(element => {
                    const div = createElement("div", {});
                    div.innerHTML = `<a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none"><path fill="currentColor" d="m12 5l-.707-.707l.707-.707l.707.707zm1 9a1 1 0 1 1-2 0zM6.293 9.293l5-5l1.414 1.414l-5 5zm6.414-5l5 5l-1.414 1.414l-5-5zM13 5v9h-2V5z"/><path stroke="currentColor" stroke-width="2" d="M5 16v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1"/></g></svg><label>Export to Attack Sheet</label></a>`;
                    element.appendChild(div);
                    div.addEventListener("click", function () {
                        const attacks = document.querySelectorAll(".eventItemWrapper");
                        const mondayStamp = getMondayTimestamp();
                        let index = 0;
                        let rawText = `Me, Time, Enemy Cartel, Enemy, FairFight, Rep, Note, StatEstimate\n`;
                        for (const attack of attacks) {
                            const children = attack.children;
                            const timeNode = children[3];
                            const timeText = timeNode.innerText.trim();
                            const timestamp = Alarm.parseTime(timeText);
                            if (timestamp < mondayStamp) break;
                            //console.log(timestamp, mondayStamp, timestamp > mondayStamp);

                            const textNode = children[1].querySelector("span");
                            const attackTxt = textNode.innerHTML.split("<a")[0].trim();
                            if (attackTxt === "You attacked") {
                                const a = textNode.querySelector(`a[href^="/User/"]`);
                                const defenderName = a.innerText.trim();
                                const defenderID = a.href.match(/\d+$/)[0];
                                const rep = textNode.innerHTML.split(", gaining")[1].split("Rep")[0].trim();
                                const statEstimateText = children[2].innerText;
                                const statEstimate = statEstimateText.includes("???") ? "N/A" : statEstimateText.trim();
                                const logIDA = textNode.querySelector(`a[href^="/Fight/"]`).href.match(/\d+$/)[0];
                                if (saved.attacksCache[logIDA]) {
                                    rawText += `Hardy[1345],${timeText},,${defenderName}[${defenderID}],${saved.attacksCache[logIDA].fairFight},${rep},,"${statEstimate}" \n`;
                                } else {
                                    rawText += `Hardy[1345],${timeText},,${defenderName}[${defenderID}],N/A,${rep},,"${statEstimate}" \n`;
                                }
                                index += 1;
                                //console.log(timeText)
                            }
                        }
                        //console.log(index)
                        if (index > 0) {
                            GM_download({
                                url: URL.createObjectURL(new Blob([rawText], { type: 'text/csv' })),
                                name: "attackLog.csv",
                                saveAs: true
                            });
                        }
                    });
                });
            }
        }
    }
    const AttackLog = {
        "cache": function () {
            const outcomeNode = document.querySelector("#mainBackground > div.container > div > div.col-12 > div.mb-4.card > div.card-body > div.row.mb-3 > div:nth-child(1) > p > span");
            const outcome = outcomeNode.innerText.trim();
            if (outcome === "Win") {
                const table = document.querySelector("div.fightTable table");
                const firstLineInAttackLogNode = table.querySelector(`tbody tr td`);
                const firstLineInAttackLogTxt = firstLineInAttackLogNode.innerHTML.trim();
                if (firstLineInAttackLogTxt.startsWith("You initiated a fight")) {

                    const timeNode = document.querySelector("#mainBackground > div.container > div > div.col-12 > div.mb-4.card > div.card-body > div.row.mb-3 > div:nth-child(3) > p");
                    const timeTxt = timeNode.innerText.trim().split("Date - ")[1].trim();
                    const timestamp = Alarm.parseTime(timeTxt);

                    //replace anything that is not a number with an empty string
                    const logID = page.split("fight/")[1].replace(/[^0-9]/g, "");
                    if (!saved.attacksCache[logID]) {
                        const defenderID = firstLineInAttackLogTxt.split("user/")[1].split('">')[0];
                        const fairFight = document.querySelector("#mainBackground > div.container > div > div.col-12 > div.mb-4.card > div.card-body > div.row.mb-3 > div:nth-child(2) > p > span").innerText.trim();
                        saved.attacksCache[logID] = {};
                        saved.attacksCache[logID].defenderID = defenderID;
                        saved.attacksCache[logID].fairFight = fairFight;
                        saved.attacksCache[logID].timestamp = timestamp;
                        Storage.set("attacksCache", saved.attacksCache);
                    }
                }
            }
        },
        "purgeOldRecord": function () {
            const now = Math.floor(Date.now() / 1000);
            const lastPurged = saved.misc.lastpurgeOFOldAttacks;
            if (now - lastPurged > (20 * 86400)) {
                const logIDs = Object.keys(saved.attacksCache);
                for (const logID of logIDs) {
                    const attackDetails = saved.attacksCache[logID];
                    const timestamp = attackDetails.timestamp;
                    if (now - timestamp > (10 * 86400)) {
                        delete saved.attacksCache[logID];
                    }
                }
                Storage.set("attacksCache", saved.attacksCache);
                saved.misc.lastpurgeOFOldAttacks = now;
                Storage.set("misc", saved.misc);
            }
        }
    }
    const XHRUtils = {
        "add": function () {
            window.addEventListener("hardy-xhr", (t) => {
                const detail = t.detail;
                const url = detail.url;
                if (url.includes("user/status")) {
                    const response = JSON.parse(detail.response);
                    const current = Math.floor(Date.now() / 1000);
                    const jobRelease = response.activeJob ? parseInt(response.activeJob.finishTime) : 0;
                    if (jobRelease !== 0 && jobRelease !== saved.alarms.cooldowns.job) {
                        if (jobRelease < saved.alarms.cooldowns.job) {
                            Alarm.remove(saved.alarms.cooldowns.job, "job");
                        } else {
                            if (Settings.isEnabled("alarms", "job_alarm")) {
                                Alarm.add(jobRelease, `CE: Job is ready to be done!!!`, "job");
                            }
                        }
                    }
                    const hospitalRelease = response.hospitalRelease >= current ? response.hospitalRelease - 10 : 0;
                    if (hospitalRelease !== 0 && hospitalRelease !== saved.alarms.cooldowns.hospitalRelease) {
                        if (hospitalRelease < saved.alarms.cooldowns.hospitalRelease) {
                            Alarm.remove(saved.alarms.cooldowns.hospitalRelease, "hospitalRelease");
                        } else {
                            if (Settings.isEnabled("alarms", "hosp_alarm")) {
                                Alarm.add(hospitalRelease, `CE: You are no longer in hospital!!`, "hospitalRelease");
                            }
                        }
                    } else if (hospitalRelease === 0 && saved.alarms.cooldowns.hospitalRelease !== 0) {
                        Alarm.remove(saved.alarms.cooldowns.hospitalRelease, "hospitalRelease");
                    }
                    if (response.expeditions) {
                        const expeditions = response.expeditions;
                        let array = [];
                        for (const expedition of expeditions) {
                            array.push(Number(expedition.endDate));
                        }
                        if (array.length > 1) {
                            array.sort((a, b) => a - b);
                            const first_exp = array[0];
                            if (first_exp !== 0 && first_exp !== saved.alarms.cooldowns.expedition) {
                                if (first_exp < saved.alarms.cooldowns.expedition) {
                                    Alarm.remove(saved.alarms.cooldowns.expedition, "expedition");
                                } else {
                                    if (Settings.isEnabled("alarms", "expedition_alarm")) {
                                        Alarm.add(first_exp, `CE: Expedition is over!!!`, "expedition");
                                    }
                                }
                            }
                        }
                    }
                } else if (url.includes("/Market/")) {
                    try {
                        const responseText = JSON.parse(detail.response);
                        if (responseText.compiledHTML) {
                            const compiledHTML = responseText.compiledHTML;
                            if (compiledHTML.length > 0) {
                                const response = compiledHTML[0];
                                if (response.includes("offerListWrapper")) {

                                    const htmlElem = createElement("div", {});
                                    htmlElem.innerHTML = response;
                                    //console.log(htmlElem);
                                    const imgElems = htmlElem.querySelectorAll(`img[src^="images/items/"]`);
                                    for (const imgElem of imgElems) {
                                        const uid = imgElem.getAttribute("src").split("images/items/")[1].split(".png")[0];
                                        const rateElem = imgElem.parentNode.querySelector("button").previousSibling;
                                        const price = Number(rateElem.innerText.replace(/[^0-9]/g, '').trim());
                                        if (uid !== "points") {
                                            const parent = imgElem.parentNode;
                                            const name = parent.querySelector(".card-title").innerText.trim();
                                            const category = parent.querySelector(".viewOffersButton").getAttribute("data-category");
                                            saved.itemMetadata.items[uid] = { "name": name, "type": category, "value": price };

                                        }
                                    }
                                    Storage.set("itemMetadata", saved.itemMetadata);
                                }
                            }
                        }
                    } catch (error) {
                        console.log(error);
                    }
                } else if (url.includes("Chat")) {
                    Chat.highlight();
                } else if (url.includes("ser/getId")) {
                    const response = JSON.parse(detail.response);
                    if (response.name) {
                        saved.selfDetails.name = response.name;
                        Storage.set("selfDetails", saved.selfDetails);
                    }
                } else if (url.includes("/Inventory/Use?id=")) {
                    const item_id = url.split("Use?id=")[1];
                    if (saved.itemIdentifiersToItemIDs[item_id]) {
                        const uid = String(saved.itemIdentifiersToItemIDs[item_id]);
                        if (saved.settings.itemsToCache.includes(uid)) {
                            const item = saved.inventoryItems[uid];
                            if (item.quantity > 0) {
                                item.quantity -= 1;
                                Storage.set("inventoryItems", saved.inventoryItems);
                            }
                        }
                    }

                }
            });
        }
    }

    const socketUtils = {
        "add": function () {
            window.addEventListener("hardy-socket", (t) => {
                const detail = t.detail.response;

                if (detail) {
                    if (detail.includes("cashChanged")) {

                        const text = detail.match(/\{.*\}/);
                        if (text) {
                            const jsonData = JSON.parse(text);
                            const newCash = jsonData.newCash;
                            if (Settings.isEnabled("alarms", "cash_changed")) {
                                if (newCash !== saved.cash && newCash > saved.cash && (newCash - saved.cash >= 4000000 || newCash >= 10000000) && !page.includes("/property") && !page.includes("/bank")) {
                                    connectToFlask("instant_notif", { "data": { "text": `In hand changed` } }).then(res => {
                                        console.log(res);
                                    }).catch(error => {
                                        console.log(error);
                                    });
                                }
                            }
                            saved.cash = newCash;
                            if (page.includes("/market") && Settings.isEnabled("market", "buyInputAutoFill")) {
                                const inputs = document.querySelectorAll(`#itemMarketNav .tab-content input[type="text"][name="quantity"]`);
                                for (const input of inputs) {
                                    const pricePerUnit = input.getAttribute("data-item-priceper");
                                    const maxUnits = Math.floor(saved.cash / Number(pricePerUnit));
                                    input.setAttribute("max", maxUnits);
                                    AutoNumeric.getAutoNumericElement(input).options.maximumValue(maxUnits);
                                }
                            }
                        }

                    } else if (detail.includes("energyChanged")) {
                        if (page.includes("/gym") && Settings.isEnabled("quick_items", "gym")) {
                            const text = detail.match(/\{.*\}/);
                            if (text) {
                                const response = JSON.parse(text);
                                const newEnergy = response.newEnergy;
                                if (newEnergy !== saved.currentEnergy) {
                                    saved.currentEnergy = newEnergy;
                                    document.querySelectorAll(`input[name="energyToUse"]`).forEach((element) => {
                                        element.value = saved.currentEnergy;
                                        ["placeholder", "value", "max", "aria-label"].forEach((attr) => {
                                            element.setAttribute(attr, saved.currentEnergy);
                                        });
                                        element.dispatchEvent(new Event("input"));
                                    })
                                }
                            }
                        }

                    } else if (detail.includes("jobPageUpdate")) {
                        ProductionTracker.updateAfterSuccess();
                    }
                }
            });
        }
    }
    const commonTasks = {
        "do": function () {
            Alarm.education();
            XHRUtils.add();
            waitForElement(".cashDisplay", 900, 26).then((element) => {
                const cashTxt = element.innerText;
                saved.cash = Number(cashTxt.replace(/[^\d.-]/g, ''));
            });
            socketUtils.add();
            waitForPageLoad().then(() => {
                Identity.cache();
                QuickLinks.add();
            });
            AttackLog.purgeOldRecord();
        }
    }
    //////////////////////////////////////////////////////////////


    if (page.includes("cartelempire.online")) {

        commonTasks.do();
        if (page.includes("/gym")) {

            waitForPageLoad().then(() => {
                saved.currentEnergy = Number(document.getElementById("currentEnergy").innerText.trim());
                QuickItems.addQuickItemGym();
            });
        } else if (page.includes("/inventory")) {
            Storage.itemIdentifiersToItemIDs();
            waitForPageLoad().then(() => {
                QuickItems.cacheInventory();
                ProductionTracker.cache();
                Cosmetic.hideItemThrow();
                ItemValues.cacheInventory();
                ItemValues.showOnInventory();
            });
        } else if (page.includes("/hospital")) {

            waitForPageLoad().then(() => {
                QuickItems.addQuickItemHosp();
            });
        } else if (page.includes("/jail")) {

            waitForPageLoad().then(() => {
                QuickItems.addQuickItemJail();
            });
        } else if (page.includes("/jobs")) {
            waitForPageLoad().then(() => {
                ProductionTracker.addBox();
            });
        } else if (page.includes("/expedition")) {
            Expedition.hideImages();
            Expedition.helper();
        } else if (page.includes("/market")) {

            waitForPageLoad().then(() => {
                Market.totalListing();
                Market.categorySelect();
                Market.betterInput();
                Market.buyInputAutoFill();
            });
        } else if (page.includes("/bank")) {
            Bank.showTax();
        } else if (page.includes("/property")) {
            waitForPageLoad().then(() => {
                Property.vaultDefault();
            });
        } else if (page.includes("/university")) {
            waitForPageLoad().then(() => {
                Cosmetic.hideUniLeave();
            });
        } else if (page.includes("/trade/additems/")) {
            waitForPageLoad().then(() => {
                Trade.autoFill();
            });
        } else if (page.includes("/settings")) {
            waitForPageLoad().then(() => {
                Settings.createBox();
            });
        } else if (page.includes("/trade/view")) {
            Trade.formatCash();
        } else if (page.includes("/forum/")) {
            waitForPageLoad().then(() => {
                Forum.externalLinks();
            });
        } else if (page.includes("/mail/")) {
            waitForPageLoad().then(() => {
                Forum.externalLinks();
            });
        } else if (page.includes("/gallery/")) {
            waitForPageLoad().then(() => {
                ItemValues.showOnGallery();
            });
        } else if (page.includes("/user/")) {
            waitForPageLoad().then(() => {
                ItemValues.showOnUserProfile();
            });
        } else if (page.includes("/town/mateos")) {
            waitForPageLoad().then(() => {
                Mateo.autofill();
            });
        } else if (page.includes("/events")) {
            waitForPageLoad().then(() => {
                Events.pricePerUnit();

            });
        } else if (page.includes("/fight/")) {
            waitForPageLoad().then(() => {
                AttackLog.cache();
            });
        }
    }
    /////////////////////////////////////////////////////////////////
    function getMondayTimestamp() {
        const nowDate = new Date();
        const day = nowDate.getDay(); // Get current day (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
        const diff = (day === 0 ? -6 : 1) - day; // Days to subtract to get to Monday
        const monday = new Date(nowDate);
        monday.setDate(nowDate.getDate() + diff); // Move to Monday
        monday.setHours(0, 1, 0, 0); // Set time to 00:01 AM

        return Math.floor(monday.getTime() / 1000); // Convert to Unix timestamp (seconds)
    }
    function isValidJsonObject(str) {
        try {
            const parsed = JSON.parse(str);
            return typeof parsed === "object" && parsed !== null;
        } catch {
            return false;
        }
    }
    function isSameDomain(link) {
        const siteDomain = currentDomain;
        const url = new URL(link, siteDomain);
        //console.log(`URL: ${url}`);
        return url.origin.toLowerCase() === siteDomain.toLowerCase();
    }

    function createElement(tagName, attributes) {
        const element = document.createElement(tagName);
        for (const key in attributes) {
            element.setAttribute(key, attributes[key]);
        }
        return element;
    }


    function formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }
    function formatToText(number) {
        return new Intl.NumberFormat('en-US', {
            notation: 'compact',
            compactDisplay: 'short',
            maximumFractionDigits: 1
        }).format(number).toLowerCase();
    }
    function valueListenerForCashInputs(element) {
        const target = element;
        let value = target.value.trim();

        // Return early if the value is empty, starts with "N" (for NaN), or is just "£"
        if (!value || value === "" || value.startsWith("N") || value === "£") {
            return null;
        }

        // Remove commas, £ symbols, and whitespace
        const cleanedValue = value.replace(/[,\£\s]/g, "");

        // Split the cleaned value into an array of characters
        const chars = cleanedValue.split("");
        const lastChar = chars[chars.length - 1].toLowerCase();
        if (lastChar === ".") {
            return null;
        }
        let numericValue;
        const multipliers = {
            "b": 1e9,
            "k": 1e3,
            "m": 1e6,
            "t": 1e12
        }
        // Handle suffixes (b, k, m)
        if (multipliers[lastChar]) {
            chars.pop();
            numericValue = parseInt(parseFloat(chars.join("")) * multipliers[lastChar]);
        } else {
            numericValue = parseFloat(chars.join(""));
        }
        const max = target.getAttribute("max");
        const min = target.getAttribute("min");
        if (max && numericValue > Number(max)) {
            numericValue = Number(max);
        }
        if (min && numericValue < Number(min)) {
            numericValue = Number(min);
        }

        // Update the element with the calculated value
        if (!isNaN(numericValue)) {
            //target.value = numericValue;
            return numericValue;
        }
        return null;
    }
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
    function observeElement(element, callback, options = { childList: true, subtree: true }) {
        if (!(element instanceof Element)) {
            throw new Error("Input should be a valid DOM element.");
        }

        const observer = new MutationObserver(callback);
        observer.observe(element, options);

        return observer;
    }
    // Function to connect to Flask endpoint
    function connectToFlask(url, req_body) {
        console.log(req_body);
        return new Promise((resolve, reject) => {
            GM_xmlhttpRequest({
                method: 'POST',
                timeout: 10000,
                url: `http://localhost:6969/${url}`,
                data: JSON.stringify(req_body),
                headers: {
                    "Content-Type": "application/json"
                },
                responseType: 'json',
                onload: response => {
                    if (response.status === 200 || response.status === 201) {
                        resolve(response.response);
                    } else {
                        reject(`Error: ${response.status} ${response.statusText}`);
                    }
                },
                onerror: err => reject(`Error: ${err}`),
                ontimeout: err => reject(`Timeout: ${err}`)
            });
        });
    }
    class StatEstimate {
        constructor() {

            this.statEstimateLink = "/StatEstimates";
            this.statEstimateRegex = /^statestimates(\/|(\/\d+\/?)?(\?.+)?)?/;

            this.currentList = this.getList();
            if (this.currentList === null) {
                this.currentList = [];
                this.setList([]);
            }
            //GM_deleteValue("statEstimate_40");
            //this.currentList = this.currentList.filter(x=>x != 40);
            this.ownID = Identity.get("id");
            this.ownStats = this.getEst("self");

            this.constant = 8 / 3;
            this.maxFF = 3;
            this.minFF = 1;
            this.cutoff = 0.01; // Can't be certain whether it truncates or rounds, use the more conservative estimate
            this.repQuadratic = false;
            if (this.repQuadratic) {
                this.repA = 53 / 990;
                this.repC = 48 / 3;
            } else {
                this.repM = 0.049;
                this.repC = 2.7;
            }
            this.minStats = 400;
            this.multMug = 1 / 2;
            this.multHosp = 3 / 4;
            this.perPage = 50;
        }
        getEst(ID = "self") {
            const val = GM_getValue(`statEstimate_${ID}`);
            return val === undefined ? null : val;
        }
        setEst(ID, estimate) {
            GM_setValue(`statEstimate_${ID}`, estimate);
            console.log(`Set statEstimate_${ID} to "${estimate}"`);
            return estimate;
        }
        getList() {
            const list = GM_getValue("statEstimate_list");
            return list === undefined ? null : list;
        }
        setList(list) {
            GM_setValue("statEstimate_list", list);
            return list;
        }
        getName(ID) {
            const name = GM_getValue(`name_${ID}`);
            return name === undefined ? null : name;
        }
        setName(ID, name) {
            GM_setValue(`name_${ID}`, name);
            console.log(`Set name_${ID} to "${name}"`);
            return name;
        }
        calcFairFight(ownStats, theirStats) {
            return Math.min(this.maxFF, Math.max(this.minFF, 1 + this.constant * theirStats / ownStats));
        }
        estimateRep(level, fairFight) {
            return (this.repQuadratic ? Math.pow(level + 1, 2) * this.repA + this.repC : Math.exp(level * this.repM + this.repC)) * fairFight;
        }
        estimateYouAttacked(ownStats, fairFight) {
            if (fairFight === this.minFF)
                return ['<', Math.ceil(this.cutoff / this.constant * ownStats).toLocaleString("en-US")];
            return [fairFight === this.maxFF ? '>' : '~', Math.floor(Math.max(this.minStats, (fairFight - 1) / this.constant * ownStats)).toLocaleString("en-US")];
        }
        estimateAttackedYou(ownStats, fairFight) {
            if (fairFight === this.minFF)
                return ['>', Math.floor(this.constant * ownStats / this.cutoff).toLocaleString("en-US")];
            return [fairFight === this.maxFF ? '<' : '~', Math.ceil(Math.max(this.minStats, this.constant * ownStats / (fairFight - 1))).toLocaleString("en-US")];
        }
        AattackedB(knownStatsText, fairFight, knownIsA) {
            const knownChar = knownStatsText[0];
            const knownStats = parseInt(knownStatsText.split(' ')[0].slice(1).replaceAll(',', ""));
            const theirStats = (knownIsA ? this.estimateYouAttacked : this.estimateAttackedYou).bind(this)(knownStats, fairFight);
            if (knownChar === '~')
                return theirStats;
            else if (knownChar === '>' && fairFight === (knownIsA ? this.minFF : this.maxFF))
                return [];
            else if (knownChar === '<' && fairFight === (knownIsA ? this.maxFF : this.minFF))
                return [];
            return [knownChar, theirStats[1]];
        }
        dontOverride(curStatEst, newStatEst, curChar, newChar) {
            if (curChar === '>' && newChar === '>' && curStatEst > newStatEst)
                return true;
            else if (curChar === '~' && newChar !== '~') {
                if (newChar === '>' && curStatEst > newStatEst)
                    return true;
                else if (newChar === '<' && curStatEst > newStatEst)
                    return true;
            }
            return false;
        }
        colorVal(ownStats, theirStats) {
            return ownStats ? ownStats / (ownStats + theirStats) : 0.5;
        }
        unColorVal(ownStats, theirStats) { // Unused
            return ownStats ? 67 * ownStats / (ownStats + theirStats) : 0;
        }
        scriptFunc() {
            $(() => {
                $("#userSearchName").on("input", target => {
                    $.get(`/User/SearchName?search=${target.currentTarget.value}`, result => {
                        if (result && result.status == 204) {
                            $("#userInput").attr("value", "");
                            $("#userInputActual").attr("value", "");
                            $("#userName").attr("value", "");
                        } else {
                            $("#userInput").attr("value", result.userId);
                            $("#userInputActual").attr("value", result.userId);
                            $("#userName").attr("value", result.name.toUpperCase());
                        }
                        validateSend();
                    });
                });

                $("#stats").on("input", () => validateSend());
            });
            function validateSend() {
                var allValid = true;

                if ((typeof $("#userName").attr("value")) === "undefined") {
                    allValid = false;
                    $("#userInput").removeClass("is-invalid");
                } else if ($("#userName").attr("value") == "") {
                    $("#userInput").addClass("is-invalid");
                    allValid = false;
                } else
                    $("#userInput").removeClass("is-invalid");

                let statsInput = document.getElementById("stats");
                if (!statsInput) {
                    allValid = false;
                    $("#stats").removeClass("is-invalid");
                } else if (statsInput.value.length === 0 || !/^\d[\d,]*$/.test(statsInput.value)) {
                    $("#stats").addClass("is-invalid");
                    allValid = false;
                } else {
                    $("#stats").removeClass("is-invalid");
                    statsInput.value = parseInt(statsInput.value.replaceAll(',', "")).toLocaleString("en-US");
                }

                if (allValid)
                    $("#addEstimate").attr("disabled", false);
                else
                    $("#addEstimate").attr("disabled", true);
            }
        }
        inStatEstimate(url) {
            document.title = "Stat Estimates | Cartel Empire";
            const ownName = Identity.get("name");
            if (!this.ownStats) {
                let errorText = document.querySelector("div.content-container.contentColumn strong");
                errorText.innerHTML = `You haven't set your own stats yet! Visit <a class="text-white" href="/Gym">the gym</a> or <a class="text-white" href="/user">the homepage</a>`;
                return;
            }
            let container = document.querySelector("div.content-container.contentColumn");

            const urlParams = new URLSearchParams(window.location.search);
            const userID = urlParams.get("userId");
            const userName = urlParams.get("userName");
            const statEst = urlParams.get("stats");
            const deleteID = urlParams.get("delete");
            if (ownName !== userName && userID !== null && userName !== null && statEst !== null) {
                this.setEst(userID, `~${statEst} ${Date.now()} 0`);
                if (!this.currentList.includes(parseInt(userID))) {
                    this.currentList.push(parseInt(userID));
                    this.setList(this.currentList);
                }
                this.setName(userID, userName);
                container.innerHTML = `<div class="col-12 col-md-10"><div class="mb-4 card border-success"><div class="card-body text-center bg-success"><p class="card-text fw-bold text-white">Set the stat estimate for <a class="text-white" href="/User/${userID}">${userName}</a> to ${statEst}</p></div></div></div>`;
                window.history.replaceState({}, document.title, this.statEstimateLink); // remove params from URL
            } else if (deleteID !== null) {
                GM_deleteValue(`statEstimate_${deleteID}`);
                this.currentList = this.currentList.filter(estID => estID !== parseInt(deleteID));
                this.setList(this.currentList);
                const userName = this.getName(deleteID);
                container.innerHTML = `<div class="col-12 col-md-10"><div class="mb-4 card border-success"><div class="card-body text-center bg-success"><p class="card-text fw-bold text-white">Removed the stat estimate for <a class="text-white" href="/User/${deleteID}">${userName}</a></p></div></div></div>`;
                window.history.replaceState({}, document.title, this.statEstimateLink); // remove params from URL
            } else
                container.innerHTML = "";

            let extractedData = [];
            const ownData = [ownName, "self", '~', this.ownStats, "---", 0];
            extractedData.push(ownData);
            for (var ID of this.currentList) {
                const estimate = this.getEst(ID);
                if (estimate === null) {
                    this.currentList = this.currentList.filter(estID => estID !== ID);
                    continue;
                }
                const textSplit = estimate.split(' ');
                extractedData.push([this.getName(ID) || "???", ID, estimate[0], parseInt(textSplit[0].slice(1).replaceAll(',', "")), parseInt(textSplit[1]), parseInt(textSplit[2])]);
            }
            extractedData.sort((a, b) => {
                if (a[3] !== b[3])
                    return b[3] - a[3];
                else if (a[2] === '>' && b[2] !== '>')
                    return -1;
                else if (b[2] === '>' && a[2] !== '>')
                    return 1;
                else if (b[2] === '<' && a[2] !== '<')
                    return -1;
                else if (a[2] === '<' && b[2] !== '<')
                    return 1;
                return 0;
            });
            const ownRank = extractedData.indexOf(ownData);
            const pageNumText = url.replace('#', "").match(/\/\d+\/?$/);
            let pageNum = pageNumText === null ? Math.ceil(ownRank / this.perPage) : parseInt(pageNumText[0].replaceAll('/', ""));
            if (pageNum === 0)
                pageNum = 1;

            let navHTML = "";
            let insert = "";
            let muted = false;
            let added = false;
            for (var i = (pageNum - 1) * this.perPage; i >= 0 && i < extractedData.length && i !== pageNum * this.perPage; ++i) {
                added = true;
                const data = extractedData[i];
                if (!muted && data[3] < this.ownStats * (this.maxFF - 1) / this.constant)
                    muted = true;
                if (data[1] === "self")
                    insert += `<tr class="align-middle fw-bold"><td>${i + 1}</td><th><a class="fw-bold" href="/user">${ownName}</a></th><td><span style="color: hsl(60, 67%, ${this.brightness}%)">${this.ownStats.toLocaleString("en-US")}</span></td><td>---</td><td></td></tr>`;
                else {
                    insert += `<tr class="align-middle"><td${muted ? " class='text-muted'" : ""}>${i + 1}</td><th><a class="fw-bold" href="/User/${data[1]}">${data[0]}</a></th><td><span class="fw-bold">${data[2] === '~' ? "" : data[2].replace('>', "&gt;").replace('<', "&lt;")}</span><span style="color: hsl(${this.ownStats / (this.ownStats + data[3]) * 120}, 67%, ${this.brightness}%)">${data[3].toLocaleString("en-US")}</span></td>`;
                    const dateStr = new Date(data[4]).toLocaleDateString("en-GB", { timeZone: "Europe/London" });
                    if (data[5] === 0)
                        insert += `<td><span style="color: rgba(var(--bs-link-color-rgb), var(--bs-link-opacity, 1))">${dateStr}</span></td>`;
                    else
                        insert += `<td><a href="/Fight/${data[5]}">${dateStr}</a></td>`;
                    insert += `<td><button onclick="window.location.href += '?delete=${data[1]}'" title="Delete" aria-label="Delete stat estimate for ${data[0]}" class="btn btn-sm btn-outline-dark action-btn fw-normal p-0"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" height="20" width="20"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"></path></svg></button></td></tr>`;
                }
            }
            if (!added)
                insert = `<p class="card-text mt-4">You have no estimates</p>`;
            else {
                insert = `<table class="table align-items-center table-flush table-hover dark-tertiary-bg" id="statEstimateTable"><thead class="thead-light"><tr><th>Rank</th><th>Name</th><th>Estimate</th><th class="d-none d-lg-table-cell">Date of Estimate</th><th class="d-table-cell d-lg-none">Date</th><th>Delete</th></tr></thead><tbody>${insert}</tbody></table>`;
                const lastPageNum = Math.ceil(extractedData.length / this.perPage);
                navHTML = `<nav aria-label="Stat Estimates Page"><ul class="pagination justify-content-center"><li class="page-item${pageNum === 1 ? " active" : ""} pageNav"> <a class="page-link" href="${this.statEstimateLink}/1" data-page="1">1</a></li>`;
                if (pageNum >= 5)
                    navHTML += `<li class="page-item pageNav"><a class="page-link" href="${this.statEstimateLink}/${pageNum - 1}" data-page="${pageNum - 1}">&lt;- </a></li>`;
                for (var i = Math.max(2, pageNum - 2); i <= Math.min(lastPageNum - 1, pageNum + 2); ++i)
                    navHTML += `<li class="page-item${pageNum === i ? " active" : ""} pageNav"> <a class="page-link" href="${this.statEstimateLink}/${i}" data-page="${i}">${i}</a></li>`;
                if (pageNum <= lastPageNum - 4)
                    navHTML += `<li class="page-item pageNav"><a class="page-link" href="${this.statEstimateLink}/${pageNum + 1}" data-page="${pageNum + 1}">-&gt; </a></li>`;
                if (lastPageNum !== 1)
                    navHTML += `<li class="page-item${pageNum === lastPageNum ? " active" : ""} pageNav"> <a class="page-link" href="${this.statEstimateLink}/${lastPageNum}" data-page="${lastPageNum}">${lastPageNum}</a></li>`;
                navHTML += `</ul></nav>`;
            }

            let script = document.createElement("script");
            script.type = "text/javascript";
            script.innerHTML = this.scriptFunc.toString().replace(/^[^{]*{/, "").replace(/}[^}]*$/, "");
            document.head.appendChild(script);

            let fileInput = document.createElement("input");
            fileInput.id = "fileInput";
            fileInput.type = "file";
            fileInput.classList.add("d-none");
            fileInput.addEventListener("input", async e => {
                const file = e.target.files[0];
                if (file.type !== "application/json")
                    return;
                const contentText = await file.text();
                const content = JSON.parse(contentText);
                for (var entry of content) {
                    const userName = entry[0];
                    const userID = entry[1];
                    if (userID == this.ownID)
                        continue;
                    if (userName !== "???" && userName !== this.getName(userID))
                        this.setName(userID, userName);
                    const curEst = this.getEst(userID);
                    if (curEst === null || entry[4] > parseInt(curEst.split(' ')[1])) {
                        this.setEst(userID, `${entry[2]}${entry[3].toLocaleString("en-US")} ${entry[4]} ${entry[5]}`);
                        if (!this.currentList.includes(userID)) {
                            this.currentList.push(userID);
                            this.setList(this.currentList);
                        }
                    }
                }
                window.location.reload();
            });

            const exportText = JSON.stringify(extractedData.filter(data => data[1] !== "self"));
            const fileBlob = new Blob([exportText], { type: "application/octet-binary" });
            const exportURL = window.URL.createObjectURL(fileBlob);
            const exportImport = `<div class="row align-items-center mb-4"><span class="text-center fw-bold">Export/Import Estimates</span></div><div class="row align-items-center mx-2 mb-2"><a class="btn btn-outline-dark w-100" href="${exportURL}" download="stat_estimates.json">Export</a></div><div class="row align-items-center mx-2 mb-2"><a class="btn btn-outline-dark w-100" onclick="document.getElementById('fileInput').click()">Import and Merge</a></div>`;
            const newEntryHTML = `<div class="row"><div class="col-12 col-sm-8 mb-3"><form id="addEstimateForm" class="mt-auto"><div class="row align-items-center mb-2"><div class="col-12 col-sm-3"><label class="form-label fw-bold" for="userId" id="searchLabel">Search</label></div><div class="col-12 col-sm-9"><div class="input-group"> <input class="form-control" type="text" placeholder="Diablo" autofill="false" id="userSearchName"></div></div></div><div class="row align-items-center mb-2"><div class="col-12 col-sm-3"><label class="form-label fw-bold" for="userId" id="usernameLabel">Player</label></div><div class="col-12 col-sm-9"><div class="input-group"> <input class="form-control is-invalid" name="userId" type="number" placeholder="1" min="1" disabled="" id="userInput" value=""><input class="form-control d-none" name="userId" type="number" placeholder="1" min="1" id="userInputActual" value=""><input class="form-control" name="userName" type="text" placeholder="Diablo" id="userName" value="" readonly></div></div></div><div class="row align-items-center"><div class="col-12 col-sm-3"><label class="form-label fw-bold" for="stats">Stats</label></div><div class="col-12 col-sm-9"><input class="form-control is-invalid" name="stats" type="text" placeholder="Enter player's stats" maxlength="20" required="true" autofill="false" id="stats"></div></div><input class="btn btn-outline-dark w-100 mt-4" type="submit" value="Add estimate" disabled="" id="addEstimate"></form></div><div class="col-12 col-sm-4">${exportImport}</div></div>`;
            container.innerHTML += `<div class="col-12 col-md-10"><div class="card mb-2"><div class="row mb-0"><div class="col-12"><div class="header-section"><h2>Battlestat Estimates</h2></div></div></div><div class="card-body">${newEntryHTML}<hr><div class="tab-pane fade active show" role="tabpanel"><div class="row mb-2 align-items-center">${navHTML}<div class="container">${insert}</div></div></div></div></div></div>`;
            container.appendChild(fileInput);
        }
        inSearch(url) {
            const table = document.querySelector("#userTable");

            const tableHeadTr = table.querySelector("thead tr");
            let ageCol = tableHeadTr.querySelectorAll("th")[2];
            let statEstCol = document.createElement("th");
            statEstCol.setAttribute("scope", "col");
            statEstCol.innerText = "Stat Estimate";
            tableHeadTr.insertBefore(statEstCol, ageCol);

            const entries = table.querySelectorAll("tbody tr");
            for (var entry of entries) {
                ageCol = entry.querySelectorAll("td")[1];
                statEstCol = document.createElement("td");

                const userLink = entry.querySelector("th").children[1];
                const userID = userLink.href.match(/\d+$/)[0];

                const statEst = this.getEst(userID);
                if (statEst !== null) {
                    const theirStatsText = statEst.split(' ')[0];
                    const theirStats = parseInt(theirStatsText.slice(1).replaceAll(',', ""));
                    statEstCol.innerHTML = `<a href="${this.statEstimateLink}" style="color: hsl(${this.colorVal(this.ownStats, theirStats) * 120}, 67%, ${this.brightness}%); text-decoration: none">${theirStatsText.replace('>', "&gt;").replace('<', "&lt;")}</a>`;

                    const userName = userLink.innerText; // Don't really need username of everyone
                    if (userName !== this.getName(userID))
                        this.setName(userID, userName);
                } else if (userID === this.ownID && this.ownStats)
                    statEstCol.innerHTML = `<a href="${this.statEstimateLink}" style="color: hsl(60, 67%, ${this.brightness}%); text-decoration: none">${this.ownStats.toLocaleString("en-US")}</a>`;
                else {
                    statEstCol.classList.add("text-muted");
                    statEstCol.innerText = "---";
                }
                entry.insertBefore(statEstCol, ageCol);
            }
        }
        inBountyOrOtherCartel(url) {
            const table = document.querySelector("div.table-responsive table.table");
            if (table === null)
                return;

            const tableHeadTr = table.querySelector("thead tr");
            let levelCol = tableHeadTr.querySelectorAll("th")[1];
            let statEstCol = document.createElement("th");
            if (/^cartel/.test(url))
                statEstCol.setAttribute("scope", "col");
            statEstCol.innerText = "Stat Estimate";
            tableHeadTr.insertBefore(statEstCol, levelCol);

            let entries;
            let start = 0;
            let linkIdx = 1;
            if (/^cartel/.test(url)) {
                entries = table.querySelectorAll("tbody tr");
                if (/\d\/?$/.test(url))
                    linkIdx = 0;
            } else {
                entries = table.querySelectorAll("thead tr");
                start = 1;
                linkIdx = 0;
            }
            for (var i = start; i !== entries.length; ++i) {
                let entry = entries[i];
                const tds = entry.querySelectorAll("td");
                levelCol = tds[1];
                statEstCol = document.createElement("td");

                const userLink = tds[0].children[linkIdx];
                const userID = userLink.href.match(/\d+$/)[0];

                const statEst = this.getEst(userID);
                if (statEst !== null) {
                    const theirStatsText = statEst.split(' ')[0];
                    const theirStats = parseInt(theirStatsText.slice(1).replaceAll(',', ""));
                    statEstCol.innerHTML = `<a href="${this.statEstimateLink}" style="color: hsl(${this.colorVal(this.ownStats, theirStats) * 120}, 67%, ${this.brightness}%); text-decoration: none">${theirStatsText.replace('>', "&gt;").replace('<', "&lt;")}</a>`;

                    const userName = userLink.innerText; // Don't really need username of everyone
                    if (userName !== this.getName(userID))
                        this.setName(userID, userName);
                } else if (userID === this.ownID && this.ownStats)
                    statEstCol.innerHTML = `<a href="${this.statEstimateLink}" style="color: hsl(60, 67%, ${this.brightness}%); text-decoration: none">${this.ownStats.toLocaleString("en-US")}</a>`;
                else {
                    statEstCol.classList.add("text-muted");
                    statEstCol.innerText = "---";
                }
                entry.insertBefore(statEstCol, levelCol);
            }
        }
        inCartelHomepage(url) {
            const table = document.querySelector("div.card-body > div.container-fluid");
            if (table === null)
                return;

            const tableHead = table.querySelector(".row-header");
            let levelCol = tableHead.querySelectorAll(".col")[1];
            let roleCol;
            let daysCol = tableHead.querySelectorAll(".col")[3];
            let statEstCol = document.createElement("div");
            statEstCol.classList.add("col", "col-xl-2");
            statEstCol.innerText = "Stat Estimate";
            tableHead.insertBefore(statEstCol, levelCol);
            levelCol.classList.remove("col-xl-2");
            levelCol.classList.add("col-xl-1");
            daysCol.classList.remove("col-xl-2");
            daysCol.classList.add("col-xl-1");

            let entries = table.querySelectorAll(".row.align-middle");
            for (var i = 0; i !== entries.length; ++i) {
                let entry = entries[i];
                const cols = entry.querySelectorAll(".col");
                const headerCols = entry.querySelectorAll(".col-3.fw-bold");
                levelCol = cols[1];
                roleCol = cols[2];
                daysCol = cols[3];
                let levelHeaderCol = headerCols[0];
                let roleHeaderCol = headerCols[1];
                let daysHeaderCol = headerCols[2];
                statEstCol = document.createElement("div");
                let statEstColHeader = document.createElement("div");
                statEstCol.classList.add("col", "col-3", "col-xl-2");
                statEstColHeader.classList.add("col-3", "d-xl-none", "fw-bold");
                levelCol.classList.remove("col-xl-2", "col-3");
                levelCol.classList.add("col-xl-1", "col-2");
                daysCol.classList.remove("col-xl-2", "col-3");
                daysCol.classList.add("col-xl-1", "col-2");
                roleCol.classList.remove("col-3");
                roleCol.classList.add("col-2");
                levelHeaderCol.classList.remove("col-3");
                levelHeaderCol.classList.add("col-2");
                roleHeaderCol.classList.remove("col-3");
                roleHeaderCol.classList.add("col-2");
                daysHeaderCol.classList.remove("col-3");
                daysHeaderCol.classList.add("col-2");
                statEstColHeader.innerText = "Stat Estimate";

                const userLink = cols[0].children[1];
                const userID = userLink.href.match(/\d+$/)[0];

                const statEst = this.getEst(userID);
                if (statEst !== null) {
                    const theirStatsText = statEst.split(' ')[0];
                    const theirStats = parseInt(theirStatsText.slice(1).replaceAll(',', ""));
                    statEstCol.innerHTML = `<a href="${this.statEstimateLink}" style="color: hsl(${this.colorVal(this.ownStats, theirStats) * 120}, 67%, ${this.brightness}%); text-decoration: none">${theirStatsText.replace('>', "&gt;").replace('<', "&lt;")}</a>`;

                    const userName = userLink.innerText; // Don't really need username of everyone
                    if (userName !== this.getName(userID))
                        this.setName(userID, userName);
                } else if (userID === this.ownID && this.ownStats)
                    statEstCol.innerHTML = `<a href="${this.statEstimateLink}" style="color: hsl(60, 67%, ${this.brightness}%); text-decoration: none">${this.ownStats.toLocaleString("en-US")}</a>`;
                else {
                    statEstCol.classList.add("text-muted");
                    statEstCol.innerText = "---";
                }
                entry.insertBefore(statEstCol, levelCol);
                entry.insertBefore(statEstColHeader, levelHeaderCol);
            }
        }
        inCartelWar(url) {
            const war = document.querySelector("div#warReportModule");
            let cols = war.querySelectorAll("div.col-12.col-lg-6");
            cols[0].classList.remove("col-lg-6");
            cols[0].classList.add("col-lg-7");
            cols[1].classList.remove("col-lg-6");
            cols[1].classList.add("col-lg-5");

            const theirTable = cols[0].querySelector("table.table");
            const tableHeadTr = theirTable.querySelector("thead tr");
            let levelCol = tableHeadTr.querySelectorAll("th")[1];
            let statEstCol = document.createElement("th");
            statEstCol.setAttribute("scope", "col");
            statEstCol.innerText = "Stat Estimate";
            tableHeadTr.insertBefore(statEstCol, levelCol);
            const tableBody = theirTable.querySelector("tbody");

            observeDOM(theirTable, e => {
                if (e[0].target !== tableBody)
                    return;
                let trs = tableBody.querySelectorAll("tr");
                for (var tr of trs) {
                    const tds = tr.querySelectorAll("td");
                    levelCol = tds[1];
                    statEstCol = document.createElement("td");

                    let statusCol = tds[2];
                    if (statusCol.innerText === "Active") // Highlight actives in war
                        statusCol.classList.add("fw-bold");
                    else
                        statusCol.classList.add("text-muted");

                    const userLink = tds[0].children[0];
                    const userID = userLink.href.match(/\d+$/)[0];

                    const statEst = this.getEst(userID);
                    if (statEst !== null) {
                        const theirStatsText = statEst.split(' ')[0];
                        const theirStats = parseInt(theirStatsText.slice(1).replaceAll(',', ""));
                        statEstCol.innerHTML = `<a href="${this.statEstimateLink}" style="text-decoration: none">${theirStatsText.replace('>', "&gt;").replace('<', "&lt;")}</a>`;

                        const userName = userLink.innerText;
                        if (userName !== this.getName(userID))
                            this.setName(userID, userName);
                    } else {
                        statEstCol.classList.add("text-muted");
                        statEstCol.innerText = "---";
                    }
                    tr.insertBefore(statEstCol, levelCol);
                }
            });
        }
        inHomepage(url) {
            const totalStats = document.querySelector("#mainBackground > div > div > div.col-12 > div.row > div:nth-child(2) > div > div.card-body.dark-tertiary-bg > div > div:nth-child(1) > div:nth-child(10) > p").innerHTML.split("<span")[0].trim();
            const totalStatsVal = parseInt(totalStats.replaceAll(',', ""));

            if (this.ownStats !== totalStatsVal)
                this.setEst("self", totalStatsVal);
        }
        inGym(url) {
            const totalStats = document.querySelector("p.card-text.fw-bold.text-muted"); // Total is the first one
            if (totalStats === null)
                return;
            const totalStatsVal = parseInt(totalStats.innerText.split(' ')[0].slice(1).replaceAll(',', ""));

            if (this.ownStats !== totalStatsVal)
                this.setEst("self", totalStatsVal);
        }
        inFight(url) {
            const showEsts = (nameA, nameB, A_ID, B_ID, Anew = false, Bnew = false) => {
                let container = document.querySelector("div.contentColumn");
                const fightReport = container.querySelector("div.col-12.col-md-10");
                let ests = document.createElement("div");
                ests.classList.add("col-12", "col-md-10");
                const estA = A_ID === "self" ? (this.ownStats ? this.ownStats.toLocaleString("en-US") : "???") : (this.getEst(A_ID) || "???");
                const estB = this.getEst(B_ID) || "???";
                let inner = `<div class="row"><div class="col-md-6 col-12"><div class="mb-4 card"><div class="row mb-0"><div class="col-12"><div class="header-section text-center"><h2>`;
                inner += nameA === "You" ? "You" : `<a class="text-white" href="/${A_ID === "self" ? "user" : ("User/" + A_ID)}">${nameA}</a>`;
                inner += `</h2></div></div></div><div class="card-body"><p class="card-text text-center">Stat estimate: `;
                if (estA === "???")
                    inner += `<span class="text-muted">???</span>`;
                else {
                    const Astats = parseInt(estA.split(' ')[0].replace(/[,<>~]/g, ""));
                    inner += `<span class="fw-bold" style="color: hsl(${this.colorVal(this.ownStats, Astats) * 120}, 67%, ${this.brightness}%)">${estA.split(' ')[0].replace('>', "&gt;").replace('<', "&lt;")}</span>${Anew ? " (new)" : ""}`;
                }
                inner += `</p></div></div></div><div class="col-md-6 col-12"><div class="mb-4 card"><div class="row mb-0"><div class="col-12"><div class="header-section text-center"><h2><a class="text-white" href="/${"User/" + B_ID}">${nameB}</a></h2></div></div></div><div class="card-body"><p class="card-text text-center">Stat estimate: `;
                if (estB === "???")
                    inner += `<span class="text-muted">???</span>`;
                else {
                    const Bstats = parseInt(estB.split(' ')[0].replace(/[,<>~]/g, ""));
                    inner += `<span class="fw-bold" style="color: hsl(${this.colorVal(this.ownStats, Bstats) * 120}, 67%, ${this.brightness}%)">${estB.split(' ')[0].replace('>', "&gt;").replace('<', "&lt;")}</span>${Bnew ? " (new)" : ""}`;
                }
                inner += `</p></div></div></div></div>`;
                ests.innerHTML = inner;
                container.insertBefore(ests, fightReport);
            }

            const firstRow = document.querySelector("div.fightTable tbody tr td");
            const youAttacked = firstRow.innerText.startsWith("You ");
            const attackedYou = firstRow.innerText.endsWith(" you");
            const estimate = youAttacked ? this.estimateYouAttacked.bind(this) : attackedYou ? this.estimateAttackedYou.bind(this) : this.AattackedB.bind(this);

            const headers = document.querySelectorAll("div.card-body p.card-text.fw-bold");
            if (!this.ownStats || headers.length < 3 || (headers[0].innerText.split(' ')[2] === "Loss" && !attackedYou)) {
                if (firstRow.children.length === 1) {
                    const other = firstRow.children[0];
                    showEsts("You", other.innerText, "self", other.href.match(/\d+$/)[0]);
                } else {
                    const userA = firstRow.children[0];
                    const userB = firstRow.children[1];
                    showEsts(userA.innerText, userB.innerText, userA.href.match(/\d+$/)[0], userB.href.match(/\d+$/)[0]);
                }
                return;
            }
            const fairFightText = headers[1];
            const fairFight = parseFloat(fairFightText.children[0].innerText.slice(1));
            const dateText = headers[headers.length - 1].innerText.slice(7).split(/[ :\/]/g);
            const fightDate = Date.UTC(dateText[5], parseInt(dateText[4]) - 1, dateText[3], dateText[0], dateText[1], dateText[2]);

            let fightID = url.replace('#', "").match(/\d+\/?$/)[0];
            if (fightID.endsWith('/'))
                fightID = fightID.slice(0, -1);

            // Method: replace old log with new log, but only if it's more extreme OR specific
            if (youAttacked || attackedYou) {
                const userLink = firstRow.children[0];
                const againstID = userLink.href.match(/\d+$/)[0];
                const currentEstimate = this.getEst(againstID);

                const userName = userLink.innerText;
                if (userName !== this.getName(againstID))
                    this.setName(againstID, userName);

                if (currentEstimate === null || fightDate > parseInt(currentEstimate.split(' ')[1])) {
                    const est = estimate(this.ownStats, fairFight);
                    const newStatEst = parseInt(est[1].replace(',', ""));
                    if (currentEstimate !== null) {
                        const curStatEst = parseInt(currentEstimate.split(' ')[0].slice(1).replace(',', ""));
                        if (this.dontOverride(curStatEst, newStatEst, currentEstimate[0], est[0])) {
                            showEsts("You", userName, "self", againstID);
                            return;
                        }
                    }

                    this.setEst(againstID, `${est[0]}${est[1]} ${fightDate} ${fightID}`);
                    if (!this.currentList.includes(parseInt(againstID))) {
                        this.currentList.push(parseInt(againstID));
                        this.setList(this.currentList);
                    }
                }
                showEsts("You", userName, "self", againstID, false, true);
            } else {
                // Indirect attack logs
                const userA = firstRow.children[0];
                const userB = firstRow.children[1];
                const A_ID = userA.href.match(/\d+$/)[0];
                const B_ID = userB.href.match(/\d+$/)[0];
                const Astats = this.getEst(A_ID);
                const Bstats = this.getEst(B_ID);
                if (Astats !== null && Bstats !== null) {
                    const Adate = parseInt(Astats.split(' ')[1]);
                    const Bdate = parseInt(Bstats.split(' ')[1]);
                    if (Adate === Bdate || fightDate <= Adate || fightDate <= Bdate) {
                        showEsts(userA.innerText, userB.innerText, A_ID, B_ID);
                        return;
                    }

                    const newerStats = Adate > Bdate ? Astats : Bstats;
                    const otherEst = estimate(newerStats, fairFight, Adate > Bdate);
                    if (otherEst.length === 0) {
                        showEsts(userA.innerText, userB.innerText, A_ID, B_ID);
                        return;
                    }
                    const oldEst = Adate > Bdate ? Bstats : Astats;
                    console.log(parseInt(oldEst.split(' ')[0].slice(1).replaceAll(',', "")), parseInt(otherEst[1].replaceAll(',', "")), oldEst[0], otherEst[0]);
                    if (this.dontOverride(parseInt(oldEst.split(' ')[0].slice(1).replaceAll(',', "")), parseInt(otherEst[1].replaceAll(',', "")), oldEst[0], otherEst[0])) {
                        showEsts(userA.innerText, userB.innerText, A_ID, B_ID);
                        return;
                    }
                    console.log("hi");
                    const otherID = Adate > Bdate ? B_ID : A_ID;
                    this.setEst(otherID, `${otherEst[0]}${otherEst[1]} ${newerStats.split(' ')[1]} ${fightID}`);
                    if (!this.currentList.includes(parseInt(otherID))) {
                        this.currentList.push(parseInt(otherID));
                        this.setList(this.currentList);
                    }
                    showEsts(userA.innerText, userB.innerText, A_ID, B_ID, Adate <= Bdate, Adate > Bdate);
                } else if ((Astats !== null && Bstats === null) || (Astats === null && Bstats !== null)) {
                    const knownStats = Astats !== null ? Astats : Bstats;
                    const knownDate = parseInt(knownStats.split(' ')[1]);
                    if (fightDate <= knownDate) {
                        showEsts(userA.innerText, userB.innerText, A_ID, B_ID);
                        return;
                    }

                    const otherEst = estimate(knownStats, fairFight, Astats !== null);
                    if (otherEst.length === 0) {
                        showEsts(userA.innerText, userB.innerText, A_ID, B_ID);
                        return;
                    }
                    const otherID = Astats !== null ? B_ID : A_ID;
                    this.setEst(otherID, `${otherEst[0]}${otherEst[1]} ${knownDate} ${fightID}`);
                    if (!this.currentList.includes(parseInt(otherID))) {
                        this.currentList.push(parseInt(otherID));
                        this.setList(this.currentList);
                    }
                    showEsts(userA.innerText, userB.innerText, A_ID, B_ID, Astats === null, Astats !== null);
                    const otherUser = Astats !== null ? userB : userA;
                    const userName = otherUser.innerText;
                    if (userName !== this.getName(otherID))
                        this.setName(otherID, userName);
                } else
                    showEsts(userA.innerText, userB.innerText, A_ID, B_ID);
            }
        }
        inUserProfile(url) {
            let userID = url.replace('#', "").match(/\d+\/?$/)[0];
            if (userID.endsWith('/'))
                userID = userID.slice(0, -1);
            if (userID === this.ownID)
                return;

            let statsTable = document.querySelector("div.card-body tbody");
            const estimate = this.getEst(userID);

            const attackText = document.querySelector("div#attackConfirmModal p.card-text");
            const level = parseInt(statsTable.children[4].children[1].innerText);
            const repMultipliers = {
                Attack: 1,
                Mug: this.multMug,
                Hospitalise: this.multHosp
            };
            let prefix = "";
            let append = "";
            let expectedRep = 0;

            if (estimate !== null) {
                const textSplit = estimate.split(' ');
                const statEstimate = textSplit[0];
                const date = new Date(parseInt(textSplit[1])).toLocaleDateString("en-GB", { timeZone: "Europe/London" });

                const theirStats = parseInt(statEstimate.slice(1).replaceAll(',', ""));
                statsTable.innerHTML += `<tr><th>Stat Estimate:</th><td><a href="${this.statEstimateLink}" class="fw-bold" style="color: hsl(${this.colorVal(this.ownStats, theirStats) * 120}, 67%, ${this.brightness}%)">${statEstimate.replace('>', "&gt;").replace('<', "&lt;")}</a> (${date})</td></tr>`;

                expectedRep = this.ownStats ? this.estimateRep(level, this.calcFairFight(this.ownStats, theirStats)) : "???";
                prefix = statEstimate[0].replace('~', "");
            } else {
                statsTable.innerHTML += `<tr><th>Stat Estimate:</th><td><a href="${this.statEstimateLink}" class="text-muted">No attacks recorded</a></td></tr>`;
                expectedRep = this.estimateRep(level, this.maxFF);
                append = " with 3x fair fight modifier";
            }
            observeDOM(attackText, e => {
                const textSplit = e[0].target.innerText.split(' ');
                const attackType = textSplit[textSplit.length - 2];
                if (!["Attack", "Mug", "Hospitalise"].includes(attackType))
                    return;
                e[0].target.innerHTML += `<br>Expected rep gain: <span class="fw-bold">${prefix.replace('>', "&gt;").replace('<', "&lt;")}${expectedRep === "???" ? "???" : Math.round(expectedRep * repMultipliers[attackType])}</span>${append}`;
            });

            const userName = document.querySelector("div.header-section > h2").innerText.slice(1);
            if (userName !== this.getName(userID))
                this.setName(userID, userName);
        }
        inEvents(url) {
            const urlParams = new URLSearchParams(window.location.search);
            const category = urlParams.get("filter");
            if (category !== "Attack")
                return;

            const eventList = document.querySelector("div.container.eventWrapper").children;
            for (var i = 1; i !== eventList.length; ++i) {
                const ev = eventList[i];
                ev.children[0].classList.value = "col-2 col-lg-2 col-md-2 col-sm-2"; //"col-2 col-lg-2 col-md-2 col-sm-2";
                ev.children[1].classList.value = "col-5 col-lg-6 col-md-7 col-sm-7"; //"col-5 col-lg-6 col-md-5 col-sm-6";
                ev.children[2].classList.value = "col-3 col-lg-2 d-none d-lg-inline"; //"col-3 col-lg-2 col-md-3 col-sm-2";
                let estCol = document.createElement("div");
                let mergedCol = document.createElement("div");
                estCol.classList.value = "col-2 col-lg-2 d-none d-lg-inline"; //"col-2 col-lg-2 col-md-2 col-sm-2";
                mergedCol.classList.value = "col-3 col-md-3 col-sm-3 d-lg-none"; // new

                if (i === 1) {
                    estCol.innerText = "Stat Estimate";
                    mergedCol.innerText = "Date/Est";
                    ev.insertBefore(estCol, ev.children[2]);
                    ev.appendChild(mergedCol);
                    continue;
                }
                const userID = parseInt(ev.children[1].querySelector("a").href.match(/\d+$/)[0]);
                const theirStats = this.getEst(userID);
                if (theirStats !== null) {
                    estCol.style.color = `hsl(${this.colorVal(this.ownStats, parseInt(theirStats.split(' ')[0].slice(1).replaceAll(',', ""))) * 120}, 67%, ${this.brightness}%)`;
                    estCol.innerText = theirStats.split(' ')[0];
                    mergedCol.innerHTML = `${ev.children[2].innerText}<br><span style="color: ${estCol.style.color}">${estCol.innerText}</span>`;
                } else {
                    estCol.classList.add("text-muted");
                    estCol.innerText = "???";
                    mergedCol.innerHTML = `${ev.children[2].innerText}<br><span class="text-muted">${estCol.innerText}</span>`;
                }
                ev.insertBefore(estCol, ev.children[2]);
                ev.appendChild(mergedCol);
            }
            Events.attackSheetExport();
        }
    }

    class HighscoreChanges {
        constructor() {
            this.hoursLate = 2;
            this.height = 16.75;
            if (this.getCache("Battlestats_self") === null)
                this.setCache("Battlestats_self", [null, null]);
            if (this.getCache("Networth_self") === null)
                this.setCache("Networth_self", [null, null]);
            if (this.getCache("Reputation") === null)
                this.setCache("Reputation", [null, null]);
            if (this.getCache("Cartel Reputation") === null)
                this.setCache("Cartel Reputation", [null, null]);
            if (this.getCache("Attacks Won") === null)
                this.setCache("Attacks Won", [null, null]);
            this.hoverColor = "rgba(var(--bs-emphasis-color-rgb), 0)";
        }
        getCache(type) {
            const cache = GM_getValue(`highscoreCache_${type}`);
            return cache === undefined ? null : cache;
        }
        setCache(type, cache) {
            GM_setValue(`highscoreCache_${type}`, cache);
            console.log(`Set highscoreCache_${type} to ${JSON.stringify(cache)}`);
            return cache;
        }
        timeFunc(now) {
            return new Date(now - this.hoursLate * 1000 * 60 * 60).toLocaleDateString("en-GB", { timeZone: "UTC" });
        }
        up(diff) {
            return ` <span class="text-success"><svg xmlns="http://www.w3.org/2000/svg" width="${this.height}" height="${this.height}" fill="currentColor" class="bi bi-caret-up-fill" viewBox="0 0 16 16"><path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"></path></svg> ${diff.toLocaleString("en-US")}</span>`;
        }
        down(diff) {
            return ` <span class="text-danger"><svg xmlns="http://www.w3.org/2000/svg" width="${this.height}" height="${this.height}" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16"><path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"></path></svg> ${(-diff).toLocaleString("en-US")}</span>`;
        }
        same(diff) {
            return ` <span class="text-warning"><svg xmlns="http://www.w3.org/2000/svg" width="${this.height}" height="${this.height}" fill="currentColor" class="bi bi-dash-lg" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z"></path></svg></span>`;
        }
        changeSelfOnly(content, type) {
            const ownStats = content.querySelector("tbody tr.fw-bold");
            if (ownStats === null)
                return;
            const timeNow = this.timeFunc(Date.now());
            let curCache = this.getCache(`${type}_self`);
            const ownRank = ownStats.children[0];
            const newVal = parseInt(ownRank.innerText.replaceAll(',', ""));
            if (curCache[1] === null)
                curCache[1] = [timeNow, newVal];
            else if (curCache[1][0] !== timeNow) {
                curCache[0] = curCache[1];
                curCache[1] = [timeNow, newVal];
            }
            if (curCache[0] !== null && curCache[1] !== null) {
                const diff = curCache[0][1] - curCache[1][1];
                if (diff > 0)
                    ownRank.innerHTML += this.up(diff);
                else if (diff < 0)
                    ownRank.innerHTML += this.down(diff);
                else
                    ownRank.innerHTML += this.same(diff);
            }
            this.setCache(`${type}_self`, curCache);
        }
        change(content, type) {
            const rows = content.querySelectorAll("tbody tr");
            const timeNow = this.timeFunc(Date.now());
            let curCache = this.getCache(type);
            let newRanks = {};
            if (curCache[1] !== null && curCache[1][0] === timeNow)
                newRanks = curCache[1][1];
            for (var row of rows) {
                let user = row.children[1];
                const userID = user.children.length ? parseInt(user.children[0].href.match(/\d+$/)[0]) : "self";
                newRanks[userID] = parseInt(row.children[0].innerText.replaceAll(',', ""));
            }
            if (curCache[1] === null)
                curCache[1] = [timeNow, newRanks];
            else if (curCache[1][0] !== timeNow) {
                curCache[0] = curCache[1];
                curCache[1] = [timeNow, newRanks];
            }
            if (curCache[0] !== null && curCache[1] !== null)
                for (var row of rows) {
                    let user = row.children[1];
                    const userID = user.children.length ? parseInt(user.children[0].href.match(/\d+$/)[0]) : "self";
                    if (userID in curCache[0][1] && userID in curCache[1][1]) {
                        const diff = curCache[0][1][userID] - curCache[1][1][userID];
                        if (diff > 0)
                            row.children[0].innerHTML += this.up(diff);
                        else if (diff < 0)
                            row.children[0].innerHTML += this.down(diff);
                        else
                            row.children[0].innerHTML += this.same(diff);
                    }
                }
            this.setCache(type, curCache);
        }
        inHighscores(url) {
            const battlestatsContainer = document.querySelector("div#v-content-battlestats");
            this.changeSelfOnly(battlestatsContainer, "Battlestats");
            observeDOM(battlestatsContainer, e => this.changeSelfOnly(e[0].target, "Battlestats"));
            const networthContainer = document.querySelector("div#v-content-networth");
            this.changeSelfOnly(networthContainer, "Networth");
            observeDOM(networthContainer, e => this.changeSelfOnly(e[0].target, "Networth"));

            const repContainer = document.querySelector("div#v-content-reputation");
            this.change(repContainer, "Reputation");
            observeDOM(repContainer, e => this.change(e[0].target, "Reputation"));
            const cartelRepContainer = document.querySelector("div#v-content-cartelreputation");
            this.change(cartelRepContainer, "Cartel Reputation");
            observeDOM(cartelRepContainer, e => this.change(e[0].target, "Cartel Reputation"));
            const attacksWonContainer = document.querySelector("div#v-content-attackswon");
            this.change(attacksWonContainer, "Attacks Won");
            observeDOM(attacksWonContainer, e => this.change(e[0].target, "Attacks Won"));

            //GM_addStyle(`#highscoresTable tr:hover td > span { background-color: ${this.hoverColor} !important }`);
        }
    }





    waitForPageLoad().then(() => {
        const URL = window.location.href.split(/\/|\?/g).slice(3).join('/').replace(/#[^\?\/]*$/, "").toLowerCase() || "home";
        const statEstimate = new StatEstimate();
        const highscoreChanges = new HighscoreChanges();
        if (/^gym\/?$/.test(URL)) {
            // In the gym
            statEstimate.inGym(URL);
        } else if (/^cartel\/\d+\/?$/.test(URL)) {
            // In someone else's cartel homepage
            statEstimate.inBountyOrOtherCartel(URL);
        } else if (/^cartel\/?$/.test(URL)) {
            // In the cartel homepage

            statEstimate.inCartelHomepage(URL);
            //cartelMemberRep.inCartelHomepage(URL);
        } else if (/^cartel\/territory\/?$/.test(URL)) {
            // In cartel war page
            statEstimate.inCartelWar(URL);
        } else if (/^events/.test(URL)) {
            // On an events page

            statEstimate.inEvents(URL);
        } else if (/^(home|user)\/?$/.test(URL)) {
            // On the homepage

            statEstimate.inHomepage(URL);
        } else if (/^user\/\d+\/?$/.test(URL)) {
            // Viewing someone's profile
            statEstimate.inUserProfile(URL);
            //betterMoneyInputs.inUserProfile(URL);

        } else if (statEstimate.statEstimateRegex.test(URL)) {
            // On the custom stat estimate page
            statEstimate.inStatEstimate(URL);
        } else if (/^(advanced)?search/.test(URL)) {
            // On the search page
            statEstimate.inSearch(URL);
        } else if (/^bounty/.test(URL)) {
            // In the bounty list page
            statEstimate.inBountyOrOtherCartel(URL);

        } else if (/^fight/.test(URL)) {
            // Viewing attack log
            statEstimate.inFight(URL);
        } else if (/^highscores/.test(URL)) {
            // On a highscores page
            highscoreChanges.inHighscores(URL);
        }

    });

})();
