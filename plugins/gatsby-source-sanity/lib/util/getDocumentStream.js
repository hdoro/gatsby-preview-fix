"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDocumentStream = void 0;
const axios_1 = __importDefault(require("axios"));
const get_stream_1 = __importDefault(require("get-stream"));
const index_1 = require("../index");
function getDocumentStream(url, token) {
    const auth = token ? { Authorization: `Bearer ${token}` } : {};
    const userAgent = { 'User-Agent': `${index_1.pkgName}` };
    const headers = Object.assign(Object.assign({}, userAgent), auth);
    return (0, axios_1.default)({
        method: 'get',
        responseType: 'stream',
        url,
        headers,
    })
        .then((res) => res.data)
        .catch(async (err) => {
        if (!err.response || !err.response.data) {
            throw err;
        }
        let error = err;
        try {
            // Try to lift error message out of JSON payload ({error, message, statusCode})
            const data = await (0, get_stream_1.default)(err.response.data);
            error = new Error(JSON.parse(data).message);
        }
        catch (jsonErr) {
            // Do nothing, throw regular error
        }
        throw error;
    });
}
exports.getDocumentStream = getDocumentStream;
//# sourceMappingURL=getDocumentStream.js.map