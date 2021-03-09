"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMediaGenreAndCast = exports.getMedias = void 0;
var databasePool_1 = __importDefault(require("../databasePool"));
var constants_1 = require("../constants");
var getMedias = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var response_1, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, databasePool_1.default.query("SELECT * FROM media")];
            case 1:
                response_1 = _a.sent();
                res.send({ medias: response_1.rows });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                databasePool_1.default.query("ROLLBACK");
                return [2 /*return*/, res.sendStatus(constants_1.INTERNAL_SERVER_ERROR_STATUS)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getMedias = getMedias;
var getMediaGenreAndCast = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var mediaId, genreResponse, castResponse, results, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                mediaId = req.params.mediaId;
                //Transaction
                return [4 /*yield*/, databasePool_1.default.query("BEGIN")];
            case 1:
                //Transaction
                _a.sent();
                return [4 /*yield*/, databasePool_1.default.query("SELECT genre_name FROM lookup_media_genre\n            NATURAL JOIN genre WHERE media_id = $1;", [mediaId])];
            case 2:
                genreResponse = _a.sent();
                return [4 /*yield*/, databasePool_1.default.query("SELECT actor_first_name, actor_last_name FROM lookup_media_actor\n            NATURAL JOIN actor WHERE media_id = $1;", [mediaId])];
            case 3:
                castResponse = _a.sent();
                databasePool_1.default.query("COMMIT");
                results = {};
                results.casts = castResponse.rows;
                results.genres = genreResponse.rows;
                res.send(results);
                return [3 /*break*/, 5];
            case 4:
                error_2 = _a.sent();
                databasePool_1.default.query("ROLLBACK");
                console.log("ROLLBACK TRIGGERED");
                return [2 /*return*/, res.sendStatus(constants_1.INTERNAL_SERVER_ERROR_STATUS)];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.getMediaGenreAndCast = getMediaGenreAndCast;
