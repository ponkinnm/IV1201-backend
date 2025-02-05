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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApplications = void 0;
const dbsetup_1 = __importDefault(require("./config/dbsetup"));
const getApplications = () => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
    SELECT 
      p.person_id,
      p.name,
      p.surname,
      p.email,
      s.status_name
    FROM public.person p
    LEFT JOIN public.application a ON p.person_id = a.person_id
    LEFT JOIN public.status s ON a.status_id = s.status_id
  `;
    const result = yield dbsetup_1.default.query(query);
    return result.rows;
});
exports.getApplications = getApplications;
