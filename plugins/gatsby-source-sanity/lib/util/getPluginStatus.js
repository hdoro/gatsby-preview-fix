"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerBuildTime = exports.getLastBuildTime = void 0;
function getPluginStatus(args) {
    var _a;
    return (_a = args.store.getState().status.plugins) === null || _a === void 0 ? void 0 : _a[`gatsby-source-sanity`];
}
exports.default = getPluginStatus;
const LAST_BUILD_KEY = "lastBuildTime";
function getLastBuildTime(args) {
    try {
        return new Date(getPluginStatus(args)[LAST_BUILD_KEY]);
    }
    catch (error) {
        // Not a date, return undefined
        return;
    }
}
exports.getLastBuildTime = getLastBuildTime;
async function registerBuildTime(args) {
    args.actions.setPluginStatus(Object.assign(Object.assign({}, (getPluginStatus(args) || {})), { [LAST_BUILD_KEY]: new Date().toISOString() }));
}
exports.registerBuildTime = registerBuildTime;
//# sourceMappingURL=getPluginStatus.js.map