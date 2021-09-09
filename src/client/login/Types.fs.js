import { Record, Union } from "../.fable/fable-library.3.2.9/Types.js";
import { record_type, option_type, union_type, string_type } from "../.fable/fable-library.3.2.9/Reflection.js";
import { Client_ClientMsg$reflection, Server_ServerMsg$reflection, Model$reflection as Model$reflection_1 } from "../../shared/Shared.fs.js";
import { Elmish_Hub$2$reflection } from "../.fable/Fable.SignalR.Elmish.0.11.5/Elmish.fs.js";

export class Msg extends Union {
    constructor(tag, ...fields) {
        super();
        this.tag = (tag | 0);
        this.fields = fields;
    }
    cases() {
        return ["TestMsg"];
    }
}

export function Msg$reflection() {
    return union_type("Login.Types.Msg", [], Msg, () => [[["Item", string_type]]]);
}

export class Model extends Record {
    constructor(Shared, Hubb, CurrName, Color) {
        super();
        this.Shared = Shared;
        this.Hubb = Hubb;
        this.CurrName = CurrName;
        this.Color = Color;
    }
}

export function Model$reflection() {
    return record_type("Login.Types.Model", [], Model, () => [["Shared", Model$reflection_1()], ["Hubb", option_type(Elmish_Hub$2$reflection(Server_ServerMsg$reflection(), Client_ClientMsg$reflection()))], ["CurrName", string_type], ["Color", string_type]]);
}

