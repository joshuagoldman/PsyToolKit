import { HtmlElement, initELement, Deferred$1 } from "../GlobalTypes.fs.js";
import { Msg, Model, Page } from "./Types.fs.js";
import { Cmd_none } from "../.fable/Sutil.1.0.0-alpha-006/Types.fs.js";
import { map, value as value_14, some } from "../.fable/fable-library.3.2.9/Option.js";
import { Elmish_Hub$2_$ctor_Z5FB4A559, Elmish_HubConnectionBuilder$6_$ctor_Z70E748BB, Elmish_HubConnectionBuilder$6__withUrl_Z721C83C5, Elmish_HubConnectionBuilder$6__withAutomaticReconnect, Elmish_HubConnectionBuilder$6__onMessage_Z18EB04B0 } from "../.fable/Fable.SignalR.Elmish.0.11.5/Elmish.fs.js";
import { toFail, printf, toText } from "../.fable/fable-library.3.2.9/String.js";
import { HubConnection$5__startNow, HubConnection$5_$ctor_3ED56BCC, Bindings_signalR } from "../.fable/Fable.SignalR.0.11.5/HubConnection.fs.js";
import { Json_TextMessageFormat_write, Json_TextMessageFormat_parse, HubRecords_CloseMessage$reflection, HubRecords_PingMessage$reflection, HubRecords_CancelInvocationMessage$reflection, HubRecords_StreamInvocationMessage$1$reflection, HubRecords_CompletionMessage$1$reflection, HubRecords_StreamItemMessage$1$reflection, HubRecords_InvocationMessage$1$reflection, Json_JsonProtocol_$ctor, MsgPack_parseMsg, MsgPack_MsgPackProtocol_$ctor } from "../.fable/Fable.SignalR.0.11.5/Protocols.fs.js";
import { singleton, reverse, cons, empty } from "../.fable/fable-library.3.2.9/List.js";
import { Reader__Read_24524716, Reader_$ctor_6C95DA22 } from "../.fable/Fable.Remoting.MsgPack.1.13.0/Read.fs.js";
import { fromInteger, op_Subtraction, compare, fromBits, op_Addition } from "../.fable/fable-library.3.2.9/Long.js";
import { obj_type, enum_type, int32_type, unit_type, class_type } from "../.fable/fable-library.3.2.9/Reflection.js";
import { Model as Model_1, Server_ServerMsg$reflection, Client_ClientMsg$reflection } from "../../shared/Shared.fs.js";
import { InvokeArg$1$reflection, MsgPack_Msg$4, MsgPack_Msg$4$reflection } from "../.fable/Fable.SignalR.0.11.5/Shared.fs.js";
import { writeObject } from "../.fable/Fable.Remoting.MsgPack.1.13.0/Write.fs.js";
import { choose, addRangeInPlace } from "../.fable/fable-library.3.2.9/Array.js";
import { equals } from "../.fable/fable-library.3.2.9/Util.js";
import { SimpleJson_readPath, SimpleJson_parse } from "../.fable/Fable.SimpleJson.3.21.0/SimpleJson.fs.js";
import { createTypeInfo } from "../.fable/Fable.SimpleJson.3.21.0/TypeInfo.Converter.fs.js";
import { Convert_serialize, Convert_fromJson } from "../.fable/Fable.SimpleJson.3.21.0/Json.Converter.fs.js";
import { Result_Map, FSharpResult$2 } from "../.fable/fable-library.3.2.9/Choice.js";
import { toString } from "../.fable/fable-library.3.2.9/Types.js";

export function init() {
    return [new Model(new Deferred$1(0), void 0, initELement, [initELement, ""], new Page(0)), Cmd_none()];
}

export function update(msg, model) {
    let arg10_13;
    switch (msg.tag) {
        case 1: {
            const hub = msg.fields[0];
            console.log(some(hub));
            return [new Model(model.Shared, hub, model.MenuButton, model.MenuAlt, model.CurrPage), Cmd_none()];
        }
        case 0: {
            const dispatch = msg.fields[0];
            const cmd = singleton((dispatch_1) => {
                let arg10, protocol, protocol_1;
                let connection;
                const _ = Elmish_HubConnectionBuilder$6__onMessage_Z18EB04B0(Elmish_HubConnectionBuilder$6__withAutomaticReconnect(Elmish_HubConnectionBuilder$6__withUrl_Z721C83C5(Elmish_HubConnectionBuilder$6_$ctor_Z70E748BB(new Bindings_signalR.HubConnectionBuilder(), dispatch_1), (arg10 = window.location.host, toText(printf("http://%s%s"))(arg10)("/SignalR")))), (arg0_1) => (new Msg(2, arg0_1)));
                connection = HubConnection$5_$ctor_3ED56BCC(_["hub@13"].withHubProtocol(_.useMsgPack ? ((protocol = MsgPack_MsgPackProtocol_$ctor(), {
                    name: "messagepack",
                    version: 1,
                    transferFormat: 2,
                    parseMessages(input, logger) {
                        return Array.from((() => {
                            let arg10_2;
                            try {
                                const buffer_1 = input;
                                const reader = Reader_$ctor_6C95DA22(new Uint8Array(buffer_1));
                                const read = (pos_mut, xs_mut) => {
                                    let pos_1;
                                    read:
                                    while (true) {
                                        const pos = pos_mut, xs = xs_mut;
                                        const matchValue = op_Addition(op_Addition(Reader__Read_24524716(reader, class_type("System.UInt64")), pos), fromBits(1, 0, true));
                                        if ((pos_1 = matchValue, compare(op_Subtraction(fromInteger(buffer_1.byteLength, true, 2), pos_1), fromBits(0, 0, true)) > 0)) {
                                            const pos_2 = matchValue;
                                            pos_mut = pos_2;
                                            xs_mut = cons(MsgPack_parseMsg(Reader__Read_24524716(reader, MsgPack_Msg$4$reflection(unit_type, Client_ClientMsg$reflection(), Client_ClientMsg$reflection(), unit_type))), xs);
                                            continue read;
                                        }
                                        else {
                                            return cons(MsgPack_parseMsg(Reader__Read_24524716(reader, MsgPack_Msg$4$reflection(unit_type, Client_ClientMsg$reflection(), Client_ClientMsg$reflection(), unit_type))), xs);
                                        }
                                        break;
                                    }
                                };
                                return reverse(read(fromBits(0, 0, true), empty()));
                            }
                            catch (e) {
                                logger.log(4, (arg10_2 = e.message, toText(printf("An error occured during message deserialization: %s"))(arg10_2)));
                                return empty();
                            }
                        })());
                    },
                    writeMessage(msg_3) {
                        let matchValue_1, invocation, matchValue_2, invocation_1, arg10_4, streamItem, completion, streamInvocation, cancelInvocation, close;
                        const message = msg_3;
                        const outArr = [];
                        writeObject((matchValue_1 = (message.type | 0), (matchValue_1 === 1) ? ((invocation = message, (matchValue_2 = invocation.target, (matchValue_2 === "Invoke") ? ((invocation.arguments.length === 2) ? (new MsgPack_Msg$4(1, invocation.headers, invocation.invocationId, invocation.target, invocation.arguments[0], invocation.arguments[1], invocation.streamIds)) : ((invocation_1 = message, new MsgPack_Msg$4(2, invocation_1.headers, invocation_1.invocationId, invocation_1.target, invocation_1.arguments, invocation_1.streamIds)))) : ((matchValue_2 === "Send") ? (new MsgPack_Msg$4(0, invocation.headers, invocation.invocationId, invocation.target, invocation.arguments, invocation.streamIds)) : ((matchValue_2 === "StreamTo") ? (new MsgPack_Msg$4(0, invocation.headers, invocation.invocationId, invocation.target, invocation.arguments, invocation.streamIds)) : ((arg10_4 = invocation.target, toFail(printf("Invalid Invocation Target: %s"))(arg10_4)))))))) : ((matchValue_1 === 2) ? ((streamItem = message, new MsgPack_Msg$4(3, streamItem.headers, streamItem.invocationId, streamItem.item))) : ((matchValue_1 === 3) ? ((completion = message, new MsgPack_Msg$4(4, completion.headers, completion.invocationId, completion.error, completion.result))) : ((matchValue_1 === 4) ? ((streamInvocation = message, new MsgPack_Msg$4(5, streamInvocation.headers, streamInvocation.invocationId, streamInvocation.target, streamInvocation.arguments, streamInvocation.streamIds))) : ((matchValue_1 === 5) ? ((cancelInvocation = message, new MsgPack_Msg$4(6, cancelInvocation.headers, cancelInvocation.invocationId))) : ((matchValue_1 === 6) ? (new MsgPack_Msg$4(7)) : ((matchValue_1 === 7) ? ((close = message, new MsgPack_Msg$4(8, close.error, close.allowReconnect))) : toFail(printf("Invalid message: %A"))(message)))))))), MsgPack_Msg$4$reflection(unit_type, Server_ServerMsg$reflection(), unit_type, unit_type), outArr);
                        if (compare(fromInteger(outArr.length, true, 2), fromBits(2147483648, 0, true)) > 0) {
                            throw (new Error("Messages over 2GB are not supported."));
                        }
                        else {
                            const msgArr = [];
                            writeObject(fromInteger(outArr.length, true, 2), class_type("System.UInt64"), msgArr);
                            addRangeInPlace(outArr, msgArr);
                            return (new Uint8Array(msgArr)).buffer;
                        }
                    },
                })) : ((protocol_1 = Json_JsonProtocol_$ctor(), {
                    name: "json",
                    version: 1,
                    transferFormat: 1,
                    parseMessages(input_1, logger_2) {
                        let str;
                        const input_2 = input_1;
                        const logger_3 = logger_2;
                        return Array.from(((typeof input_2) === "string") ? (equals(input_2, "") ? [] : ((str = input_2, (() => {
                            let arg10_10;
                            try {
                                return choose((m) => {
                                    let typeInfo_1, msg_5;
                                    const parsedRaw = SimpleJson_parse(m);
                                    let _arg2;
                                    const parsedRaw_1 = parsedRaw;
                                    const msgType_1 = value_14(map((arg00_4) => {
                                        const typeInfo = createTypeInfo(enum_type("Fable.SignalR.Messages.MessageType", int32_type, [["Invocation", 1], ["StreamItem", 2], ["Completion", 3], ["StreamInvocation", 4], ["CancelInvocation", 5], ["Ping", 6], ["Close", 7]]));
                                        return Convert_fromJson(arg00_4, typeInfo) | 0;
                                    }, SimpleJson_readPath(singleton("type"), parsedRaw))) | 0;
                                    switch (msgType_1) {
                                        case 1: {
                                            let _arg1;
                                            try {
                                                _arg1 = (new FSharpResult$2(0, (typeInfo_1 = createTypeInfo(HubRecords_InvocationMessage$1$reflection(Client_ClientMsg$reflection())), Convert_fromJson(parsedRaw_1, typeInfo_1))));
                                            }
                                            catch (ex) {
                                                _arg1 = (new FSharpResult$2(1, ex.message));
                                            }
                                            if (_arg1.tag === 1) {
                                                _arg2 = Result_Map((arg_1) => {
                                                    let msg_7;
                                                    return (msg_7 = arg_1, ((msg_7.target === "") ? (() => {
                                                        throw (new Error("Invalid payload for Invocation message."));
                                                    })() : (void 0), ((msg_7.invocationId != null) ? ((value_14(msg_7.invocationId) === "") ? (() => {
                                                        throw (new Error("Invalid payload for Invocation message."));
                                                    })() : (void 0)) : (void 0), msg_7)));
                                                }, (() => {
                                                    let typeInfo_2;
                                                    try {
                                                        return new FSharpResult$2(0, (typeInfo_2 = createTypeInfo(HubRecords_InvocationMessage$1$reflection(InvokeArg$1$reflection(Client_ClientMsg$reflection()))), Convert_fromJson(parsedRaw_1, typeInfo_2)));
                                                    }
                                                    catch (ex_1) {
                                                        return new FSharpResult$2(1, ex_1.message);
                                                    }
                                                })());
                                            }
                                            else {
                                                const res = _arg1.fields[0];
                                                _arg2 = (new FSharpResult$2(0, (msg_5 = res, ((msg_5.target === "") ? (() => {
                                                    throw (new Error("Invalid payload for Invocation message."));
                                                })() : (void 0), ((msg_5.invocationId != null) ? ((value_14(msg_5.invocationId) === "") ? (() => {
                                                    throw (new Error("Invalid payload for Invocation message."));
                                                })() : (void 0)) : (void 0), msg_5)))));
                                            }
                                            break;
                                        }
                                        case 2: {
                                            _arg2 = Result_Map((arg_3) => {
                                                let msg_9, matchValue_3, invocationId, invocationId_1;
                                                return (msg_9 = arg_3, (matchValue_3 = msg_9.invocationId, (matchValue_3 != null) ? (((invocationId = matchValue_3, invocationId !== "")) ? ((invocationId_1 = matchValue_3, msg_9)) : (() => {
                                                    throw (new Error("Invalid payload for StreamItem message."));
                                                })()) : (() => {
                                                    throw (new Error("Invalid payload for StreamItem message."));
                                                })()));
                                            }, (() => {
                                                let typeInfo_3;
                                                try {
                                                    return new FSharpResult$2(0, (typeInfo_3 = createTypeInfo(HubRecords_StreamItemMessage$1$reflection(unit_type)), Convert_fromJson(parsedRaw_1, typeInfo_3)));
                                                }
                                                catch (ex_2) {
                                                    return new FSharpResult$2(1, ex_2.message);
                                                }
                                            })());
                                            break;
                                        }
                                        case 3: {
                                            _arg2 = Result_Map((arg_5) => {
                                                let msg_11, fail, matchValue_4, err;
                                                return (msg_11 = arg_5, (fail = (() => {
                                                    throw (new Error("Invalid payload for Completion message."));
                                                }), ((matchValue_4 = [msg_11.result, msg_11.error], (matchValue_4[0] == null) ? ((matchValue_4[1] != null) ? ((err = matchValue_4[1], (err === "") ? fail() : (void 0))) : ((msg_11.invocationId === "") ? fail() : (void 0))) : ((matchValue_4[1] != null) ? fail() : ((msg_11.invocationId === "") ? fail() : (void 0)))), msg_11)));
                                            }, (() => {
                                                let typeInfo_4;
                                                try {
                                                    return new FSharpResult$2(0, (typeInfo_4 = createTypeInfo(HubRecords_CompletionMessage$1$reflection(Client_ClientMsg$reflection())), Convert_fromJson(parsedRaw_1, typeInfo_4)));
                                                }
                                                catch (ex_3) {
                                                    return new FSharpResult$2(1, ex_3.message);
                                                }
                                            })());
                                            break;
                                        }
                                        case 4: {
                                            _arg2 = Result_Map((arg_6) => arg_6, (() => {
                                                let typeInfo_5;
                                                try {
                                                    return new FSharpResult$2(0, (typeInfo_5 = createTypeInfo(HubRecords_StreamInvocationMessage$1$reflection(unit_type)), Convert_fromJson(parsedRaw_1, typeInfo_5)));
                                                }
                                                catch (ex_4) {
                                                    return new FSharpResult$2(1, ex_4.message);
                                                }
                                            })());
                                            break;
                                        }
                                        case 5: {
                                            _arg2 = Result_Map((arg_7) => arg_7, (() => {
                                                let typeInfo_6;
                                                try {
                                                    return new FSharpResult$2(0, (typeInfo_6 = createTypeInfo(HubRecords_CancelInvocationMessage$reflection()), Convert_fromJson(parsedRaw_1, typeInfo_6)));
                                                }
                                                catch (ex_5) {
                                                    return new FSharpResult$2(1, ex_5.message);
                                                }
                                            })());
                                            break;
                                        }
                                        case 6: {
                                            _arg2 = Result_Map((arg_8) => arg_8, (() => {
                                                let typeInfo_7;
                                                try {
                                                    return new FSharpResult$2(0, (typeInfo_7 = createTypeInfo(HubRecords_PingMessage$reflection()), Convert_fromJson(parsedRaw_1, typeInfo_7)));
                                                }
                                                catch (ex_6) {
                                                    return new FSharpResult$2(1, ex_6.message);
                                                }
                                            })());
                                            break;
                                        }
                                        case 7: {
                                            _arg2 = Result_Map((arg_9) => arg_9, (() => {
                                                let typeInfo_8;
                                                try {
                                                    return new FSharpResult$2(0, (typeInfo_8 = createTypeInfo(HubRecords_CloseMessage$reflection()), Convert_fromJson(parsedRaw_1, typeInfo_8)));
                                                }
                                                catch (ex_7) {
                                                    return new FSharpResult$2(1, ex_7.message);
                                                }
                                            })());
                                            break;
                                        }
                                        default: {
                                            _arg2 = toFail(printf("Invalid message: %A"))(parsedRaw_1);
                                        }
                                    }
                                    if (_arg2.tag === 1) {
                                        const e_1 = _arg2.fields[0];
                                        logger_3.log(4, toText(printf("Unknown message type: %s"))(e_1));
                                        return void 0;
                                    }
                                    else {
                                        const msg_12 = _arg2.fields[0];
                                        return some(msg_12);
                                    }
                                }, Json_TextMessageFormat_parse(str));
                            }
                            catch (e_2) {
                                logger_3.log(4, (arg10_10 = e_2.message, toText(printf("An error occured during message deserialization: %s"))(arg10_10)));
                                return [];
                            }
                        })()))) : ((logger_3.log(4, "Invalid input for JSON hub protocol. Expected a string, got an array buffer instead."), [])));
                    },
                    writeMessage(msg_13) {
                        let typeInfo_9;
                        return Json_TextMessageFormat_write((typeInfo_9 = createTypeInfo(obj_type), Convert_serialize(msg_13, typeInfo_9)));
                    },
                }))).build(), _.handlers);
                HubConnection$5__startNow(connection);
                dispatch_1(new Msg(1, Elmish_Hub$2_$ctor_Z5FB4A559(connection)));
            });
            console.log(some((arg10_13 = window.location.host, toText(printf("http://%s%s"))(arg10_13)("/SignalR"))));
            return [model, cmd];
        }
        case 3: {
            const isActive = msg.fields[0];
            let newHtmlElement;
            const inputRecord = model.MenuButton;
            newHtmlElement = (new HtmlElement(inputRecord.BackgroundColor, inputRecord.FontColor, inputRecord.FontWeight, inputRecord.FontSize, inputRecord.FontFamily, inputRecord.BorderWidth, !isActive, inputRecord.Class));
            return [new Model(model.Shared, model.Hubb, newHtmlElement, model.MenuAlt, model.CurrPage), Cmd_none()];
        }
        case 2: {
            const clientMessage = msg.fields[0];
            switch (clientMessage.tag) {
                case 1: {
                    const res_2 = clientMessage.fields[0];
                    if (res_2.tag === 1) {
                        const errType_1 = res_2.fields[0];
                        const newSharedModel_3 = new Deferred$1(2, new FSharpResult$2(1, errType_1));
                        return [new Model(newSharedModel_3, model.Hubb, model.MenuButton, model.MenuAlt, model.CurrPage), Cmd_none()];
                    }
                    else {
                        const link_1 = res_2.fields[0];
                        const newSharedModel_2 = new Deferred$1(2, new FSharpResult$2(0, new Model_1(link_1)));
                        return [new Model(newSharedModel_2, model.Hubb, model.MenuButton, model.MenuAlt, model.CurrPage), Cmd_none()];
                    }
                }
                case 2: {
                    return [model, Cmd_none()];
                }
                default: {
                    const res_1 = clientMessage.fields[0];
                    if (res_1.tag === 1) {
                        const errType = res_1.fields[0];
                        const newSharedModel_1 = new Deferred$1(2, new FSharpResult$2(1, errType));
                        return [new Model(newSharedModel_1, model.Hubb, model.MenuButton, model.MenuAlt, model.CurrPage), Cmd_none()];
                    }
                    else {
                        const link = res_1.fields[0];
                        const newSharedModel = new Deferred$1(2, new FSharpResult$2(0, new Model_1(link)));
                        return [new Model(newSharedModel, model.Hubb, model.MenuButton, model.MenuAlt, model.CurrPage), Cmd_none()];
                    }
                }
            }
        }
        case 5: {
            const page = msg.fields[0];
            const newPage = (toString(page) === toString(model.CurrPage)) ? (new Page(0)) : page;
            return [new Model(model.Shared, model.Hubb, model.MenuButton, model.MenuAlt, newPage), Cmd_none()];
        }
        case 7: {
            const color = msg.fields[0];
            let newEl;
            const inputRecord_1 = model.MenuButton;
            newEl = (new HtmlElement(inputRecord_1.BackgroundColor, inputRecord_1.FontColor, inputRecord_1.FontWeight, inputRecord_1.FontSize, inputRecord_1.FontFamily, inputRecord_1.BorderWidth, inputRecord_1.IsActive, color));
            return [new Model(model.Shared, model.Hubb, newEl, model.MenuAlt, model.CurrPage), Cmd_none()];
        }
        case 6: {
            const menuAltName = msg.fields[1];
            const className = msg.fields[0];
            let newEl_1;
            const inputRecord_2 = model.MenuButton;
            newEl_1 = (new HtmlElement(inputRecord_2.BackgroundColor, inputRecord_2.FontColor, inputRecord_2.FontWeight, inputRecord_2.FontSize, inputRecord_2.FontFamily, inputRecord_2.BorderWidth, inputRecord_2.IsActive, className));
            return [new Model(model.Shared, model.Hubb, model.MenuButton, [newEl_1, menuAltName], model.CurrPage), Cmd_none()];
        }
        default: {
            throw (new Error("Match failure: Main.Types.Msg"));
        }
    }
}

