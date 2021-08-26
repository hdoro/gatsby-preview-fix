"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateWebhookPayload = exports.handleWebhookEvent = void 0;
const normalize_1 = require("./normalize");
const documentIds_1 = require("./documentIds");
async function handleV1Webhook(args, options) {
    const { client, processingOptions } = options;
    const { webhookBody, reporter } = args;
    const { ids } = webhookBody;
    const { created, deleted, updated } = ids;
    const refetchIds = [...created, ...updated];
    let numRefreshed = 0;
    if (deleted.length > 0) {
        numRefreshed += handleDeletedDocuments(args, deleted);
    }
    let touchedDocs = [];
    if (refetchIds.length > 0) {
        reporter.info(`[sanity] Refetching ${refetchIds.length} documents`);
        const newDocuments = await client.getDocuments(refetchIds, {
            tag: 'sanity.gatsby.webhook-refetch',
        });
        touchedDocs = newDocuments.filter(isDocument);
    }
    if (created.length > 0) {
        const createdDocs = created
            .map((id) => touchedDocs.find((doc) => doc && doc._id === id))
            .filter(isDocument);
        numRefreshed += handleChangedDocuments(args, createdDocs, processingOptions, 'created');
    }
    if (updated.length > 0) {
        const updatedDocs = updated
            .map((id) => touchedDocs.find((doc) => doc && doc._id === id))
            .filter(isDocument);
        numRefreshed += handleChangedDocuments(args, updatedDocs, processingOptions, 'created');
    }
    reporter.info(`Refreshed ${numRefreshed} documents`);
    return true;
}
async function handleV2Webhook(args, options) {
    const { webhookBody, reporter } = args;
    const { operation = 'update', documentId: rawId, dataset, projectId, after: document } = webhookBody;
    const publishedDocumentId = documentIds_1.unprefixId(rawId);
    const config = options.client.config();
    const { overlayDrafts } = options.processingOptions;
    if (projectId && dataset && (config.projectId !== projectId || config.dataset !== dataset)) {
        return false;
    }
    if (operation === 'create' &&
        (document === null || document === void 0 ? void 0 : document._id) &&
        // Don't create node if a draft document w/ overlayDrafts === false
        (!document._id.startsWith('drafts.') || overlayDrafts)) {
        handleChangedDocuments(args, [document], options.processingOptions, 'created');
        reporter.verbose(`Created 1 document`);
        console.log(`Created 1 document`);
        return true;
    }
    if (operation === 'update' &&
        (document === null || document === void 0 ? void 0 : document._id) &&
        (!document._id.startsWith('drafts.') || overlayDrafts)) {
        handleChangedDocuments(args, [document], options.processingOptions, 'updated');
        reporter.verbose(`Refreshed 1 document`);
        console.log(`Refreshed 1 document`);
        return true;
    }
    if (operation === 'delete') {
        handleDeletedDocuments(args, [publishedDocumentId]);
        reporter.verbose(`Deleted 1 document`);
        console.log(`Deleted 1 document`);
        return true;
    }
    return false;
}
async function handleWebhookEvent(args, options) {
    const { webhookBody, reporter } = args;
    const validated = validateWebhookPayload(webhookBody);
    if (validated === false) {
        reporter.verbose('Invalid/non-sanity webhook payload received');
        console.log('Invalid/non-sanity webhook payload received');
        return false;
    }
    reporter.verbose('[sanity] Processing changed documents from webhook');
    if (validated === 'v1') {
        return await handleV1Webhook(args, options);
    }
    else if (validated === 'v2') {
        return await handleV2Webhook(args, options);
    }
    return false;
}
exports.handleWebhookEvent = handleWebhookEvent;
function handleDeletedDocuments(context, ids) {
    const { actions, createNodeId, getNode, reporter } = context;
    const { deleteNode } = actions;
    return ids
        .map((documentId) => getNode(documentIds_1.safeId(documentIds_1.unprefixId(documentId), createNodeId)))
        .filter((node) => typeof node !== 'undefined')
        .reduce((count, node) => {
        reporter.verbose(`Deleted document with ID ${node._id}`);
        console.log(`Deleted document with ID ${node._id}`);
        deleteNode(node);
        return count + 1;
    }, 0);
}
function handleChangedDocuments(args, changedDocs, processingOptions, action) {
    const { reporter } = args;
    const { typeMap } = processingOptions;
    return changedDocs.reduce((count, doc) => {
        const type = normalize_1.getTypeName(doc._type);
        if (!typeMap.objects[type]) {
            reporter.verbose(`[sanity] Document "${doc._id}" has type ${doc._type} (${type}), which is not declared in the GraphQL schema. Make sure you run "graphql deploy". Skipping document.`);
            return count;
        }
        reporter.verbose(`${action === 'created' ? 'Created' : 'Updated'} document with ID ${doc._id}`);
        processingOptions.createNode(normalize_1.toGatsbyNode(doc, processingOptions));
        return count + 1;
    }, 0);
}
function isDocument(doc) {
    return Boolean(doc && doc._id);
}
function validateWebhookPayload(payload) {
    if (!payload) {
        return false;
    }
    // Let's test V2 first as those documents could also include an `ids` object
    if ('__webhooksVersion' in payload && payload.__webhooksVersion === 'v2') {
        return 'v2';
    }
    if ('ids' in payload && typeof payload.ids === 'object') {
        const { created, deleted, updated } = payload.ids;
        if (Array.isArray(created) && Array.isArray(deleted) && Array.isArray(updated)) {
            return 'v1';
        }
    }
    return false;
}
exports.validateWebhookPayload = validateWebhookPayload;
//# sourceMappingURL=handleWebhookEvent.js.map