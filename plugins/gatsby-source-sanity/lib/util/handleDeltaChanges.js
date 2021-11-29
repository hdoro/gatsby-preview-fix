"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleep = void 0;
const normalize_1 = require("./normalize");
const debug_1 = __importDefault(require("../debug"));
const getPluginStatus_1 = require("./getPluginStatus");
const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};
exports.sleep = sleep;
// Ensures document changes are persisted to the query engine.
const SLEEP_DURATION = 500;
/**
 * Queries all documents changed since last build & adds them to Gatsby's store
 */
async function handleDeltaChanges({ args, lastBuildTime, client, processingOptions, }) {
    await (0, exports.sleep)(SLEEP_DURATION);
    try {
        const changedDocs = await client.fetch('*[!(_type match "system.**") && _updatedAt > $timestamp]', {
            timestamp: lastBuildTime.toISOString(),
        });
        handleChangedDocuments(args, changedDocs, processingOptions);
        (0, getPluginStatus_1.registerBuildTime)(args);
        args.reporter.info(`[sanity] ${changedDocs.length} documents updated.`);
        return true;
    }
    catch (error) {
        (0, debug_1.default)(`[sanity] failed to handleDeltaChanges`, error);
        return false;
    }
}
exports.default = handleDeltaChanges;
function handleChangedDocuments(args, changedDocs, processingOptions) {
    const { reporter, actions } = args;
    const { typeMap } = processingOptions;
    return changedDocs.reduce((count, doc) => {
        const type = (0, normalize_1.getTypeName)(doc._type);
        if (!typeMap.objects[type]) {
            reporter.warn(`[sanity] Document "${doc._id}" has type ${doc._type} (${type}), which is not declared in the GraphQL schema. Make sure you run "graphql deploy". Skipping document.`);
            return count;
        }
        (0, debug_1.default)('%s document with ID %s', 'Changed', doc._id);
        actions.createNode((0, normalize_1.toGatsbyNode)(doc, processingOptions));
        return count + 1;
    }, 0);
}
//# sourceMappingURL=handleDeltaChanges.js.map