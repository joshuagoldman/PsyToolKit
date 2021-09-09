import { Record, Union } from "../client/.fable/fable-library.3.2.9/Types.js";
import { record_type, bool_type, union_type, list_type, string_type } from "../client/.fable/fable-library.3.2.9/Reflection.js";
import { FSharpResult$2 } from "../client/.fable/fable-library.3.2.9/Choice.js";

export class ErrorType extends Union {
    constructor(tag, ...fields) {
        super();
        this.tag = (tag | 0);
        this.fields = fields;
    }
    cases() {
        return ["Single", "Multiple"];
    }
}

export function ErrorType$reflection() {
    return union_type("Shared.ErrorType", [], ErrorType, () => [[["Item", string_type]], [["Item", list_type(string_type)]]]);
}

export class Validation$1 extends Union {
    constructor(tag, ...fields) {
        super();
        this.tag = (tag | 0);
        this.fields = fields;
    }
    cases() {
        return ["ValidationNotStarted", "ValidationResolved"];
    }
}

export function Validation$1$reflection(gen0) {
    return union_type("Shared.Validation`1", [gen0], Validation$1, () => [[], [["Item", gen0]]]);
}

export class PsyToolUser extends Record {
    constructor(UserName, Password, IsFirstLink) {
        super();
        this.UserName = UserName;
        this.Password = Password;
        this.IsFirstLink = IsFirstLink;
    }
}

export function PsyToolUser$reflection() {
    return record_type("Shared.PsyToolUser", [], PsyToolUser, () => [["UserName", string_type], ["Password", string_type], ["IsFirstLink", bool_type]]);
}

export class Model extends Record {
    constructor(CurrLink) {
        super();
        this.CurrLink = CurrLink;
    }
}

export function Model$reflection() {
    return record_type("Shared.Model", [], Model, () => [["CurrLink", string_type]]);
}

export const init = new Model("");

export class Client_ClientMsg extends Union {
    constructor(tag, ...fields) {
        super();
        this.tag = (tag | 0);
        this.fields = fields;
    }
    cases() {
        return ["ExercizeButtonClickedResult", "CreateDBValsResult", "Invoke"];
    }
}

export function Client_ClientMsg$reflection() {
    return union_type("Shared.Client.ClientMsg", [], Client_ClientMsg, () => [[["Item", union_type("Microsoft.FSharp.Core.FSharpResult`2", [string_type, ErrorType$reflection()], FSharpResult$2, () => [[["ResultValue", string_type]], [["ErrorValue", ErrorType$reflection()]]])]], [["Item", union_type("Microsoft.FSharp.Core.FSharpResult`2", [string_type, ErrorType$reflection()], FSharpResult$2, () => [[["ResultValue", string_type]], [["ErrorValue", ErrorType$reflection()]]])]], []]);
}

export class Server_ServerMsg extends Union {
    constructor(tag, ...fields) {
        super();
        this.tag = (tag | 0);
        this.fields = fields;
    }
    cases() {
        return ["ExercizeButtonClicked", "CreateDBVals"];
    }
}

export function Server_ServerMsg$reflection() {
    return union_type("Shared.Server.ServerMsg", [], Server_ServerMsg, () => [[], []]);
}

