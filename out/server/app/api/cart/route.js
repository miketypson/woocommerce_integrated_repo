/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/cart/route";
exports.ids = ["app/api/cart/route"];
exports.modules = {

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fcart%2Froute&page=%2Fapi%2Fcart%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcart%2Froute.js&appDir=%2Fhome%2Fubuntu%2Fprivacy_website%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fubuntu%2Fprivacy_website&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=export&preferredRegion=&middlewareConfig=e30%3D!":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fcart%2Froute&page=%2Fapi%2Fcart%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcart%2Froute.js&appDir=%2Fhome%2Fubuntu%2Fprivacy_website%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fubuntu%2Fprivacy_website&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=export&preferredRegion=&middlewareConfig=e30%3D! ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _home_ubuntu_privacy_website_src_app_api_cart_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/app/api/cart/route.js */ \"(rsc)/./src/app/api/cart/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"export\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/cart/route\",\n        pathname: \"/api/cart\",\n        filename: \"route\",\n        bundlePath: \"app/api/cart/route\"\n    },\n    resolvedPagePath: \"/home/ubuntu/privacy_website/src/app/api/cart/route.js\",\n    nextConfigOutput,\n    userland: _home_ubuntu_privacy_website_src_app_api_cart_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZjYXJ0JTJGcm91dGUmcGFnZT0lMkZhcGklMkZjYXJ0JTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGY2FydCUyRnJvdXRlLmpzJmFwcERpcj0lMkZob21lJTJGdWJ1bnR1JTJGcHJpdmFjeV93ZWJzaXRlJTJGc3JjJTJGYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj0lMkZob21lJTJGdWJ1bnR1JTJGcHJpdmFjeV93ZWJzaXRlJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PWV4cG9ydCZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUNNO0FBQ25GO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGOztBQUUxRiIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCIvaG9tZS91YnVudHUvcHJpdmFjeV93ZWJzaXRlL3NyYy9hcHAvYXBpL2NhcnQvcm91dGUuanNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiZXhwb3J0XCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2NhcnQvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9jYXJ0XCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9jYXJ0L3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiL2hvbWUvdWJ1bnR1L3ByaXZhY3lfd2Vic2l0ZS9zcmMvYXBwL2FwaS9jYXJ0L3JvdXRlLmpzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fcart%2Froute&page=%2Fapi%2Fcart%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcart%2Froute.js&appDir=%2Fhome%2Fubuntu%2Fprivacy_website%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fubuntu%2Fprivacy_website&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=export&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(rsc)/./src/app/api/cart/route.js":
/*!***********************************!*\
  !*** ./src/app/api/cart/route.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var next_headers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/headers */ \"(rsc)/./node_modules/next/dist/api/headers.js\");\n/* harmony import */ var _utils_woocommerce_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/utils/woocommerce/api */ \"(rsc)/./src/utils/woocommerce/api.js\");\n\n\n\n/**\n * GET handler for /api/cart\n * Fetches the current cart from WooCommerce\n */ async function GET() {\n    try {\n        const { baseUrl, authHeader } = (0,_utils_woocommerce_api__WEBPACK_IMPORTED_MODULE_2__.getWooCommerceApi)();\n        const cookieStore = (0,next_headers__WEBPACK_IMPORTED_MODULE_1__.cookies)();\n        const wcSession = cookieStore.get('wc_session')?.value;\n        const headers = {\n            Authorization: authHeader\n        };\n        // Add session header if available\n        if (wcSession) {\n            headers['X-WC-Session'] = wcSession;\n        }\n        const response = await fetch(`${baseUrl}/wp-json/wc/store/v1/cart`, {\n            headers\n        });\n        if (!response.ok) {\n            const errorData = await response.json();\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'Failed to fetch cart',\n                details: errorData\n            }, {\n                status: response.status\n            });\n        }\n        const cart = await response.json();\n        // Store WooCommerce session in cookie if provided\n        const wcSessionHeader = response.headers.get('X-WC-Session');\n        if (wcSessionHeader) {\n            const nextResponse = next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(cart);\n            nextResponse.cookies.set('wc_session', wcSessionHeader, {\n                httpOnly: true,\n                secure: \"development\" === 'production',\n                sameSite: 'strict',\n                maxAge: 60 * 60 * 24 * 7\n            });\n            return nextResponse;\n        }\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(cart);\n    } catch (error) {\n        console.error('Error fetching cart:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'Server error',\n            message: error.message\n        }, {\n            status: 500\n        });\n    }\n}\n/**\n * POST handler for /api/cart\n * Adds a product to the cart\n */ async function POST(request) {\n    try {\n        const { baseUrl, authHeader } = (0,_utils_woocommerce_api__WEBPACK_IMPORTED_MODULE_2__.getWooCommerceApi)();\n        const cookieStore = (0,next_headers__WEBPACK_IMPORTED_MODULE_1__.cookies)();\n        const wcSession = cookieStore.get('wc_session')?.value;\n        const data = await request.json();\n        // Validate required fields\n        if (!data.product_id) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'product_id is required'\n            }, {\n                status: 400\n            });\n        }\n        const headers = {\n            Authorization: authHeader,\n            'Content-Type': 'application/json'\n        };\n        // Add session header if available\n        if (wcSession) {\n            headers['X-WC-Session'] = wcSession;\n        }\n        const response = await fetch(`${baseUrl}/wp-json/wc/store/v1/cart/add-item`, {\n            method: 'POST',\n            headers,\n            body: JSON.stringify({\n                id: data.product_id,\n                quantity: data.quantity || 1\n            })\n        });\n        if (!response.ok) {\n            const errorData = await response.json();\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'Failed to add item to cart',\n                details: errorData\n            }, {\n                status: response.status\n            });\n        }\n        const cart = await response.json();\n        // Store WooCommerce session in cookie if provided\n        const wcSessionHeader = response.headers.get('X-WC-Session');\n        if (wcSessionHeader) {\n            const nextResponse = next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(cart);\n            nextResponse.cookies.set('wc_session', wcSessionHeader, {\n                httpOnly: true,\n                secure: \"development\" === 'production',\n                sameSite: 'strict',\n                maxAge: 60 * 60 * 24 * 7\n            });\n            return nextResponse;\n        }\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(cart);\n    } catch (error) {\n        console.error('Error adding item to cart:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'Server error',\n            message: error.message\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUVDLE9BQU87Z0JBQThCQyxTQUFTSDtZQUFVLEdBQzFEO2dCQUFFSSxRQUFRUCxTQUFTTyxNQUFNO1lBQUM7UUFFOUI7UUFFQSxNQUFNQyxPQUFPLE1BQU1SLFNBQVNJLElBQUk7UUFFaEMsa0RBQWtEO1FBQ2xELE1BQU1LLGtCQUFrQlQsU0FBU0YsT0FBTyxDQUFDRixHQUFHLENBQUM7UUFDN0MsSUFBSWEsaUJBQWlCO1lBQ25CLE1BQU1DLGVBQWV0QixxREFBWUEsQ0FBQ2dCLElBQUksQ0FBQ0k7WUFDdkNFLGFBQWFyQixPQUFPLENBQUNzQixHQUFHLENBQUMsY0FBY0YsaUJBQWlCO2dCQUN0REcsVUFBVTtnQkFDVkMsUUFBUUMsa0JBQXlCO2dCQUNqQ0MsVUFBVTtnQkFDVkMsUUFBUSxLQUFLLEtBQUssS0FBSztZQUN6QjtZQUNBLE9BQU9OO1FBQ1Q7UUFFQSxPQUFPdEIscURBQVlBLENBQUNnQixJQUFJLENBQUNJO0lBQzNCLEVBQUUsT0FBT0gsT0FBTztRQUNkWSxRQUFRWixLQUFLLENBQUMsOEJBQThCQTtRQUM1QyxPQUFPakIscURBQVlBLENBQUNnQixJQUFJLENBQ3RCO1lBQUVDLE9BQU87WUFBZ0JhLFNBQVNiLE1BQU1hLE9BQU87UUFBQyxHQUNoRDtZQUFFWCxRQUFRO1FBQUk7SUFFbEI7QUFDRiIsInNvdXJjZXMiOlsiL2hvbWUvdWJ1bnR1L3ByaXZhY3lfd2Vic2l0ZS9zcmMvYXBwL2FwaS9jYXJ0L3JvdXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gJ25leHQvc2VydmVyJztcbmltcG9ydCB7IGNvb2tpZXMgfSBmcm9tICduZXh0L2hlYWRlcnMnO1xuaW1wb3J0IHsgZ2V0V29vQ29tbWVyY2VBcGkgfSBmcm9tICdAL3V0aWxzL3dvb2NvbW1lcmNlL2FwaSc7XG5cbi8qKlxuICogR0VUIGhhbmRsZXIgZm9yIC9hcGkvY2FydFxuICogRmV0Y2hlcyB0aGUgY3VycmVudCBjYXJ0IGZyb20gV29vQ29tbWVyY2VcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdFVCgpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCB7IGJhc2VVcmwsIGF1dGhIZWFkZXIgfSA9IGdldFdvb0NvbW1lcmNlQXBpKCk7XG4gICAgY29uc3QgY29va2llU3RvcmUgPSBjb29raWVzKCk7XG4gICAgY29uc3Qgd2NTZXNzaW9uID0gY29va2llU3RvcmUuZ2V0KCd3Y19zZXNzaW9uJyk/LnZhbHVlO1xuICAgIFxuICAgIGNvbnN0IGhlYWRlcnMgPSB7XG4gICAgICBBdXRob3JpemF0aW9uOiBhdXRoSGVhZGVyLFxuICAgIH07XG4gICAgXG4gICAgLy8gQWRkIHNlc3Npb24gaGVhZGVyIGlmIGF2YWlsYWJsZVxuICAgIGlmICh3Y1Nlc3Npb24pIHtcbiAgICAgIGhlYWRlcnNbJ1gtV0MtU2Vzc2lvbiddID0gd2NTZXNzaW9uO1xuICAgIH1cbiAgICBcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAke2Jhc2VVcmx9L3dwLWpzb24vd2Mvc3RvcmUvdjEvY2FydGAsIHtcbiAgICAgIGhlYWRlcnMsXG4gICAgfSk7XG5cbiAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICBjb25zdCBlcnJvckRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXG4gICAgICAgIHsgZXJyb3I6ICdGYWlsZWQgdG8gZmV0Y2ggY2FydCcsIGRldGFpbHM6IGVycm9yRGF0YSB9LFxuICAgICAgICB7IHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzIH1cbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3QgY2FydCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICBcbiAgICAvLyBTdG9yZSBXb29Db21tZXJjZSBzZXNzaW9uIGluIGNvb2tpZSBpZiBwcm92aWRlZFxuICAgIGNvbnN0IHdjU2Vzc2lvbkhlYWRlciA9IHJlc3BvbnNlLmhlYWRlcnMuZ2V0KCdYLVdDLVNlc3Npb24nKTtcbiAgICBpZiAod2NTZXNzaW9uSGVhZGVyKSB7XG4gICAgICBjb25zdCBuZXh0UmVzcG9uc2UgPSBOZXh0UmVzcG9uc2UuanNvbihjYXJ0KTtcbiAgICAgIG5leHRSZXNwb25zZS5jb29raWVzLnNldCgnd2Nfc2Vzc2lvbicsIHdjU2Vzc2lvbkhlYWRlciwge1xuICAgICAgICBodHRwT25seTogdHJ1ZSxcbiAgICAgICAgc2VjdXJlOiBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nLFxuICAgICAgICBzYW1lU2l0ZTogJ3N0cmljdCcsXG4gICAgICAgIG1heEFnZTogNjAgKiA2MCAqIDI0ICogNywgLy8gMSB3ZWVrXG4gICAgICB9KTtcbiAgICAgIHJldHVybiBuZXh0UmVzcG9uc2U7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihjYXJ0KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdFcnJvciBmZXRjaGluZyBjYXJ0OicsIGVycm9yKTtcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXG4gICAgICB7IGVycm9yOiAnU2VydmVyIGVycm9yJywgbWVzc2FnZTogZXJyb3IubWVzc2FnZSB9LFxuICAgICAgeyBzdGF0dXM6IDUwMCB9XG4gICAgKTtcbiAgfVxufVxuXG4vKipcbiAqIFBPU1QgaGFuZGxlciBmb3IgL2FwaS9jYXJ0XG4gKiBBZGRzIGEgcHJvZHVjdCB0byB0aGUgY2FydFxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUE9TVChyZXF1ZXN0KSB7XG4gIHRyeSB7XG4gICAgY29uc3QgeyBiYXNlVXJsLCBhdXRoSGVhZGVyIH0gPSBnZXRXb29Db21tZXJjZUFwaSgpO1xuICAgIGNvbnN0IGNvb2tpZVN0b3JlID0gY29va2llcygpO1xuICAgIGNvbnN0IHdjU2Vzc2lvbiA9IGNvb2tpZVN0b3JlLmdldCgnd2Nfc2Vzc2lvbicpPy52YWx1ZTtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVxdWVzdC5qc29uKCk7XG4gICAgXG4gICAgLy8gVmFsaWRhdGUgcmVxdWlyZWQgZmllbGRzXG4gICAgaWYgKCFkYXRhLnByb2R1Y3RfaWQpIHtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcbiAgICAgICAgeyBlcnJvcjogJ3Byb2R1Y3RfaWQgaXMgcmVxdWlyZWQnIH0sXG4gICAgICAgIHsgc3RhdHVzOiA0MDAgfVxuICAgICAgKTtcbiAgICB9XG4gICAgXG4gICAgY29uc3QgaGVhZGVycyA9IHtcbiAgICAgIEF1dGhvcml6YXRpb246IGF1dGhIZWFkZXIsXG4gICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgIH07XG4gICAgXG4gICAgLy8gQWRkIHNlc3Npb24gaGVhZGVyIGlmIGF2YWlsYWJsZVxuICAgIGlmICh3Y1Nlc3Npb24pIHtcbiAgICAgIGhlYWRlcnNbJ1gtV0MtU2Vzc2lvbiddID0gd2NTZXNzaW9uO1xuICAgIH1cbiAgICBcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAke2Jhc2VVcmx9L3dwLWpzb24vd2Mvc3RvcmUvdjEvY2FydC9hZGQtaXRlbWAsIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgaGVhZGVycyxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgaWQ6IGRhdGEucHJvZHVjdF9pZCxcbiAgICAgICAgcXVhbnRpdHk6IGRhdGEucXVhbnRpdHkgfHwgMSxcbiAgICAgIH0pLFxuICAgIH0pO1xuXG4gICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgY29uc3QgZXJyb3JEYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgICB7IGVycm9yOiAnRmFpbGVkIHRvIGFkZCBpdGVtIHRvIGNhcnQnLCBkZXRhaWxzOiBlcnJvckRhdGEgfSxcbiAgICAgICAgeyBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyB9XG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IGNhcnQgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgXG4gICAgLy8gU3RvcmUgV29vQ29tbWVyY2Ugc2Vzc2lvbiBpbiBjb29raWUgaWYgcHJvdmlkZWRcbiAgICBjb25zdCB3Y1Nlc3Npb25IZWFkZXIgPSByZXNwb25zZS5oZWFkZXJzLmdldCgnWC1XQy1TZXNzaW9uJyk7XG4gICAgaWYgKHdjU2Vzc2lvbkhlYWRlcikge1xuICAgICAgY29uc3QgbmV4dFJlc3BvbnNlID0gTmV4dFJlc3BvbnNlLmpzb24oY2FydCk7XG4gICAgICBuZXh0UmVzcG9uc2UuY29va2llcy5zZXQoJ3djX3Nlc3Npb24nLCB3Y1Nlc3Npb25IZWFkZXIsIHtcbiAgICAgICAgaHR0cE9ubHk6IHRydWUsXG4gICAgICAgIHNlY3VyZTogcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJyxcbiAgICAgICAgc2FtZVNpdGU6ICdzdHJpY3QnLFxuICAgICAgICBtYXhBZ2U6IDYwICogNjAgKiAyNCAqIDcsIC8vIDEgd2Vla1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gbmV4dFJlc3BvbnNlO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oY2FydCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcignRXJyb3IgYWRkaW5nIGl0ZW0gdG8gY2FydDonLCBlcnJvcik7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgeyBlcnJvcjogJ1NlcnZlciBlcnJvcicsIG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UgfSxcbiAgICAgIHsgc3RhdHVzOiA1MDAgfVxuICAgICk7XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJjb29raWVzIiwiZ2V0V29vQ29tbWVyY2VBcGkiLCJHRVQiLCJiYXNlVXJsIiwiYXV0aEhlYWRlciIsImNvb2tpZVN0b3JlIiwid2NTZXNzaW9uIiwiZ2V0IiwidmFsdWUiLCJoZWFkZXJzIiwiQXV0aG9yaXphdGlvbiIsInJlc3BvbnNlIiwiZmV0Y2giLCJvayIsImVycm9yRGF0YSIsImpzb24iLCJlcnJvciIsImRldGFpbHMiLCJzdGF0dXMiLCJjYXJ0Iiwid2NTZXNzaW9uSGVhZGVyIiwibmV4dFJlc3BvbnNlIiwic2V0IiwiaHR0cE9ubHkiLCJzZWN1cmUiLCJwcm9jZXNzIiwic2FtZVNpdGUiLCJtYXhBZ2UiLCJjb25zb2xlIiwibWVzc2FnZSIsIlBPU1QiLCJyZXF1ZXN0IiwiZGF0YSIsInByb2R1Y3RfaWQiLCJtZXRob2QiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsImlkIiwicXVhbnRpdHkiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/cart/route.js\n");

/***/ }),

/***/ "(rsc)/./src/utils/woocommerce/api.js":
/*!**************************************!*\
  !*** ./src/utils/woocommerce/api.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   WOO_ENDPOINTS: () => (/* binding */ WOO_ENDPOINTS),\n/* harmony export */   getWooCommerceApi: () => (/* binding */ getWooCommerceApi)\n/* harmony export */ });\n/**\n * WooCommerce API utility functions\n * \n * This file contains utility functions for connecting to the WooCommerce REST API\n */ /**\n * Get WooCommerce API configuration\n * \n * @returns {Object} WooCommerce API configuration\n */ const getWooCommerceApi = ()=>{\n    // In Next.js, server-side environment variables must be accessed with process.env\n    // Client-side environment variables must be prefixed with NEXT_PUBLIC_\n    const baseUrl = process.env.WOO_BASE_URL || 'https://fortresstechnologies.org';\n    const consumerKey = process.env.WOO_CONSUMER_KEY || 'ck_bd78d9f3769cf268f01476426a39629a2d840f6a';\n    const consumerSecret = process.env.WOO_CONSUMER_SECRET || 'cs_4f40e9100912924380d7ebf7bdf43ff471353599';\n    // Create Basic Auth header from consumer key and secret\n    const authHeader = 'Basic ' + Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');\n    console.log('WooCommerce API Config:', {\n        baseUrl,\n        hasKey: !!consumerKey,\n        hasSecret: !!consumerSecret\n    });\n    return {\n        baseUrl,\n        authHeader\n    };\n};\n/**\n * Get WooCommerce API endpoints\n */ const WOO_ENDPOINTS = {\n    PRODUCTS: '/wp-json/wc/v3/products',\n    PRODUCT: (id)=>`/wp-json/wc/v3/products/${id}`,\n    ORDERS: '/wp-json/wc/v3/orders',\n    ORDER: (id)=>`/wp-json/wc/v3/orders/${id}`,\n    PAYMENT_GATEWAYS: '/wp-json/wc/v3/payment_gateways'\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvdXRpbHMvd29vY29tbWVyY2UvYXBpLmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7Ozs7Q0FJQyxHQUVEOzs7O0NBSUMsR0FDTSxNQUFNQSxvQkFBb0I7SUFDL0Isa0ZBQWtGO0lBQ2xGLHVFQUF1RTtJQUN2RSxNQUFNQyxVQUFVQyxRQUFRQyxHQUFHLENBQUNDLFlBQVksSUFBSTtJQUM1QyxNQUFNQyxjQUFjSCxRQUFRQyxHQUFHLENBQUNHLGdCQUFnQixJQUFJO0lBQ3BELE1BQU1DLGlCQUFpQkwsUUFBUUMsR0FBRyxDQUFDSyxtQkFBbUIsSUFBSTtJQUUxRCx3REFBd0Q7SUFDeEQsTUFBTUMsYUFBYSxXQUFXQyxPQUFPQyxJQUFJLENBQUMsR0FBR04sWUFBWSxDQUFDLEVBQUVFLGdCQUFnQixFQUFFSyxRQUFRLENBQUM7SUFFdkZDLFFBQVFDLEdBQUcsQ0FBQywyQkFBMkI7UUFBRWI7UUFBU2MsUUFBUSxDQUFDLENBQUNWO1FBQWFXLFdBQVcsQ0FBQyxDQUFDVDtJQUFlO0lBRXJHLE9BQU87UUFDTE47UUFDQVE7SUFDRjtBQUNGLEVBQUU7QUFFRjs7Q0FFQyxHQUNNLE1BQU1RLGdCQUFnQjtJQUMzQkMsVUFBVTtJQUNWQyxTQUFTLENBQUNDLEtBQU8sQ0FBQyx3QkFBd0IsRUFBRUEsSUFBSTtJQUNoREMsUUFBUTtJQUNSQyxPQUFPLENBQUNGLEtBQU8sQ0FBQyxzQkFBc0IsRUFBRUEsSUFBSTtJQUM1Q0csa0JBQWtCO0FBQ3BCLEVBQUUiLCJzb3VyY2VzIjpbIi9ob21lL3VidW50dS9wcml2YWN5X3dlYnNpdGUvc3JjL3V0aWxzL3dvb2NvbW1lcmNlL2FwaS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFdvb0NvbW1lcmNlIEFQSSB1dGlsaXR5IGZ1bmN0aW9uc1xuICogXG4gKiBUaGlzIGZpbGUgY29udGFpbnMgdXRpbGl0eSBmdW5jdGlvbnMgZm9yIGNvbm5lY3RpbmcgdG8gdGhlIFdvb0NvbW1lcmNlIFJFU1QgQVBJXG4gKi9cblxuLyoqXG4gKiBHZXQgV29vQ29tbWVyY2UgQVBJIGNvbmZpZ3VyYXRpb25cbiAqIFxuICogQHJldHVybnMge09iamVjdH0gV29vQ29tbWVyY2UgQVBJIGNvbmZpZ3VyYXRpb25cbiAqL1xuZXhwb3J0IGNvbnN0IGdldFdvb0NvbW1lcmNlQXBpID0gKCkgPT4ge1xuICAvLyBJbiBOZXh0LmpzLCBzZXJ2ZXItc2lkZSBlbnZpcm9ubWVudCB2YXJpYWJsZXMgbXVzdCBiZSBhY2Nlc3NlZCB3aXRoIHByb2Nlc3MuZW52XG4gIC8vIENsaWVudC1zaWRlIGVudmlyb25tZW50IHZhcmlhYmxlcyBtdXN0IGJlIHByZWZpeGVkIHdpdGggTkVYVF9QVUJMSUNfXG4gIGNvbnN0IGJhc2VVcmwgPSBwcm9jZXNzLmVudi5XT09fQkFTRV9VUkwgfHwgJ2h0dHBzOi8vZm9ydHJlc3N0ZWNobm9sb2dpZXMub3JnJztcbiAgY29uc3QgY29uc3VtZXJLZXkgPSBwcm9jZXNzLmVudi5XT09fQ09OU1VNRVJfS0VZIHx8ICdja19iZDc4ZDlmMzc2OWNmMjY4ZjAxNDc2NDI2YTM5NjI5YTJkODQwZjZhJztcbiAgY29uc3QgY29uc3VtZXJTZWNyZXQgPSBwcm9jZXNzLmVudi5XT09fQ09OU1VNRVJfU0VDUkVUIHx8ICdjc180ZjQwZTkxMDA5MTI5MjQzODBkN2ViZjdiZGY0M2ZmNDcxMzUzNTk5JztcbiAgXG4gIC8vIENyZWF0ZSBCYXNpYyBBdXRoIGhlYWRlciBmcm9tIGNvbnN1bWVyIGtleSBhbmQgc2VjcmV0XG4gIGNvbnN0IGF1dGhIZWFkZXIgPSAnQmFzaWMgJyArIEJ1ZmZlci5mcm9tKGAke2NvbnN1bWVyS2V5fToke2NvbnN1bWVyU2VjcmV0fWApLnRvU3RyaW5nKCdiYXNlNjQnKTtcbiAgXG4gIGNvbnNvbGUubG9nKCdXb29Db21tZXJjZSBBUEkgQ29uZmlnOicsIHsgYmFzZVVybCwgaGFzS2V5OiAhIWNvbnN1bWVyS2V5LCBoYXNTZWNyZXQ6ICEhY29uc3VtZXJTZWNyZXQgfSk7XG4gIFxuICByZXR1cm4ge1xuICAgIGJhc2VVcmwsXG4gICAgYXV0aEhlYWRlclxuICB9O1xufTtcblxuLyoqXG4gKiBHZXQgV29vQ29tbWVyY2UgQVBJIGVuZHBvaW50c1xuICovXG5leHBvcnQgY29uc3QgV09PX0VORFBPSU5UUyA9IHtcbiAgUFJPRFVDVFM6ICcvd3AtanNvbi93Yy92My9wcm9kdWN0cycsXG4gIFBST0RVQ1Q6IChpZCkgPT4gYC93cC1qc29uL3djL3YzL3Byb2R1Y3RzLyR7aWR9YCxcbiAgT1JERVJTOiAnL3dwLWpzb24vd2MvdjMvb3JkZXJzJyxcbiAgT1JERVI6IChpZCkgPT4gYC93cC1qc29uL3djL3YzL29yZGVycy8ke2lkfWAsXG4gIFBBWU1FTlRfR0FURVdBWVM6ICcvd3AtanNvbi93Yy92My9wYXltZW50X2dhdGV3YXlzJyxcbn07XG4iXSwibmFtZXMiOlsiZ2V0V29vQ29tbWVyY2VBcGkiLCJiYXNlVXJsIiwicHJvY2VzcyIsImVudiIsIldPT19CQVNFX1VSTCIsImNvbnN1bWVyS2V5IiwiV09PX0NPTlNVTUVSX0tFWSIsImNvbnN1bWVyU2VjcmV0IiwiV09PX0NPTlNVTUVSX1NFQ1JFVCIsImF1dGhIZWFkZXIiLCJCdWZmZXIiLCJmcm9tIiwidG9TdHJpbmciLCJjb25zb2xlIiwibG9nIiwiaGFzS2V5IiwiaGFzU2VjcmV0IiwiV09PX0VORFBPSU5UUyIsIlBST0RVQ1RTIiwiUFJPRFVDVCIsImlkIiwiT1JERVJTIiwiT1JERVIiLCJQQVlNRU5UX0dBVEVXQVlTIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/utils/woocommerce/api.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fcart%2Froute&page=%2Fapi%2Fcart%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcart%2Froute.js&appDir=%2Fhome%2Fubuntu%2Fprivacy_website%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fubuntu%2Fprivacy_website&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=export&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();