/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./client/client.js":
/*!**************************!*\
  !*** ./client/client.js ***!
  \**************************/
/***/ (() => {

eval("{    window.onload = () => {\r\n  // Collapsible sections\r\n  document.querySelectorAll(\".collapsible\").forEach((header) => {\r\n    header.addEventListener(\"click\", () => {\r\n      document.querySelectorAll(\".content\").forEach((content) => {\r\n        if (content !== header.nextElementSibling) content.style.display = \"none\";\r\n      });\r\n      const content = header.nextElementSibling;\r\n      content.style.display = content.style.display === \"block\" ? \"none\" : \"block\";\r\n    });\r\n  });\r\n\r\n  // Form submission\r\n  document.querySelectorAll(\"form\").forEach((form) => {\r\n    form.addEventListener(\"submit\", (e) => {\r\n      e.preventDefault();\r\n      const formData = new FormData(form);\r\n      const params = new URLSearchParams(formData).toString();\r\n      const method = form.querySelector('input[name=\"method\"]:checked')?.value || form.dataset.method;\r\n      const endpoint = form.dataset.endpoint + (params && method !== \"POST\" ? `?${params}` : \"\");\r\n      const resultBox = form.nextElementSibling;\r\n\r\n      fetch(endpoint, {\r\n        method,\r\n        headers: method === \"POST\" ? { \"Content-Type\": \"application/json\" } : undefined,\r\n        body: method === \"POST\" ? JSON.stringify(Object.fromEntries(formData)) : undefined,\r\n      })\r\n        .then((res) => {\r\n          const status = `Status: ${res.status}\\nContent-Length: ${res.headers.get(\"Content-Length\")}`;\r\n          if (res.ok) {\r\n            if (method !== \"HEAD\") {\r\n              return res.text().then((text) => {\r\n                if (text.length > 300) text = text.substring(0, 300) + \"...\";\r\n                resultBox.textContent = `${status}\\nResponse: ${text}`;\r\n              });\r\n            } else {\r\n              resultBox.textContent = status;\r\n            }\r\n          } else {\r\n            return res.text().then((text) => {\r\n              resultBox.textContent = `${status}\\nError: ${text}`;\r\n              throw new Error(text);\r\n            });\r\n          }\r\n        })\r\n        .catch((err) => {\r\n          if (!resultBox.textContent.includes(\"Status:\")) {\r\n            resultBox.textContent = \"Error: \" + err.message;\r\n          }\r\n        });\r\n    });\r\n  });\r\n};\n\n//# sourceURL=webpack://igme-430-project1/./client/client.js?\n}");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./client/client.js"]();
/******/ 	
/******/ })()
;