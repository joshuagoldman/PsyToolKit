import { forAll } from "../../.fable/fable-library.3.2.9/Seq.js";
import { map, length, ofArray, choose } from "../../.fable/fable-library.3.2.9/List.js";
import { interpolate, toText } from "../../.fable/fable-library.3.2.9/String.js";
import { ErrorType } from "../../../shared/Shared.fs.js";
import { FSharpResult$2 } from "../../.fable/fable-library.3.2.9/Choice.js";

export function credentialIsValid(credential) {
    let faultList;
    const stringsAllowed = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    const isRightLen = credential.length === 5;
    const allRightChars = forAll((charVal) => (stringsAllowed.indexOf(charVal) >= 0), credential.split(""));
    const _arg1 = choose((tupledArg) => {
        const res = tupledArg[0];
        const x = tupledArg[1];
        if (!res) {
            return [res, x];
        }
        else {
            return void 0;
        }
    }, ofArray([[isRightLen, toText(interpolate("code must consist of exactly 5 characters", []))], [allRightChars, toText(interpolate("code can only consist of letters and numbers", []))]]));
    if ((faultList = _arg1, length(faultList) !== 0)) {
        const faultList_1 = _arg1;
        return new FSharpResult$2(1, new ErrorType(1, map((tupledArg_1) => {
            const fault = tupledArg_1[1];
            return fault;
        }, faultList_1)));
    }
    else {
        return new FSharpResult$2(0, void 0);
    }
}

