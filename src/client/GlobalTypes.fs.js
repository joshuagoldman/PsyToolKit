import { singleton } from "./.fable/fable-library.3.2.9/AsyncBuilder.js";
import { sleep } from "./.fable/fable-library.3.2.9/Async.js";
import { iterate } from "./.fable/fable-library.3.2.9/List.js";
import { Record, Union } from "./.fable/fable-library.3.2.9/Types.js";
import { list_type, record_type, bool_type, option_type, string_type, union_type } from "./.fable/fable-library.3.2.9/Reflection.js";

export function delayedMsg(time, dispatch, msg) {
    return singleton.Delay(() => singleton.Bind(sleep(time), () => {
        dispatch(msg);
        return singleton.Zero();
    }));
}

export function delayedMsgs(time, dispatch, msgs) {
    return singleton.Delay(() => singleton.Bind(sleep(time), () => {
        iterate((msg) => {
            dispatch(msg);
        }, msgs);
        return singleton.Zero();
    }));
}

export class Deferred$1 extends Union {
    constructor(tag, ...fields) {
        super();
        this.tag = (tag | 0);
        this.fields = fields;
    }
    cases() {
        return ["HasNotStarteYet", "Ongoing", "Resolved"];
    }
}

export function Deferred$1$reflection(gen0) {
    return union_type("App.GlobalTypes.Deferred`1", [gen0], Deferred$1, () => [[], [], [["Item", gen0]]]);
}

export class HtmlElement extends Record {
    constructor(BackgroundColor, FontColor, FontWeight, FontSize, FontFamily, BorderWidth, IsActive, Class) {
        super();
        this.BackgroundColor = BackgroundColor;
        this.FontColor = FontColor;
        this.FontWeight = FontWeight;
        this.FontSize = FontSize;
        this.FontFamily = FontFamily;
        this.BorderWidth = BorderWidth;
        this.IsActive = IsActive;
        this.Class = Class;
    }
}

export function HtmlElement$reflection() {
    return record_type("App.GlobalTypes.HtmlElement", [], HtmlElement, () => [["BackgroundColor", option_type(string_type)], ["FontColor", option_type(string_type)], ["FontWeight", option_type(string_type)], ["FontSize", option_type(string_type)], ["FontFamily", option_type(string_type)], ["BorderWidth", option_type(string_type)], ["IsActive", option_type(bool_type)], ["Class", option_type(string_type)]]);
}

export const initELement = new HtmlElement(void 0, void 0, void 0, void 0, void 0, void 0, true, void 0);

export class User extends Record {
    constructor(Username, Password, NickName, PictureID, Friends) {
        super();
        this.Username = Username;
        this.Password = Password;
        this.NickName = NickName;
        this.PictureID = PictureID;
        this.Friends = Friends;
    }
}

export function User$reflection() {
    return record_type("App.GlobalTypes.User", [], User, () => [["Username", string_type], ["Password", string_type], ["NickName", string_type], ["PictureID", string_type], ["Friends", list_type(User$reflection())]]);
}

export class Status extends Union {
    constructor(tag, ...fields) {
        super();
        this.tag = (tag | 0);
        this.fields = fields;
    }
    cases() {
        return ["Online", "Offline", "Away"];
    }
}

export function Status$reflection() {
    return union_type("App.GlobalTypes.Status", [], Status, () => [[], [], []]);
}

export class UserState extends Record {
    constructor(CurrUser, CurrUserStatus) {
        super();
        this.CurrUser = CurrUser;
        this.CurrUserStatus = CurrUserStatus;
    }
}

export function UserState$reflection() {
    return record_type("App.GlobalTypes.UserState", [], UserState, () => [["CurrUser", User$reflection()], ["CurrUserStatus", Status$reflection()]]);
}

