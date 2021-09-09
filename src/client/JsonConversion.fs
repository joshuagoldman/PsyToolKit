module JsonConversion

open Thoth.Json
open Shared

type Decode =
    static member SharedModel =
        let decoder =
            Decode.object (fun get ->
                {
                    StingMsg = get.Required.Field "StingMsg" Decode.string
                    AmountChangedStr = get.Required.Field "AmountChangedStr" Decode.int
                }
            )
        let sharedModel =
            Decode.field "Model" decoder

        sharedModel

type Encode =
    static member SharedModel recordObj =
        let encoder =
            Encode.object
                [ "StingMsg", Encode.string recordObj.StingMsg
                  "AmountChangedStr", Encode.int recordObj.AmountChangedStr
                ]

        encoder

let clientMsgEncoder (msgObj : Client.ClientMsg) =
    let enocdedMsg =
        match msgObj with
        | Client.Response str ->
            Encode.object [
                "Response", Encode.string str
            ]
        | Client.NewInfo newInf ->
            Encode.object [
                "NewInfo", Encode.SharedModel newInf
            ]

    Encode.object [ "ClientMsg", enocdedMsg]

let clientMsgDecoder : Decoder<Client.ClientMsg> =
    Decode.field "ClientMsg" (Decode.oneOf
                                [ Decode.field "Response" (Decode.string |> Decode.map Client.Response)
                                  Decode.field "NewInfo" Decode.SharedModel |> Decode.map Client.NewInfo
                                ])

let serverMsgEncoder (msgObj : Server.ServerMsg) =
    let enocdedMsg =
        match msgObj with
        | Server.SendMsg str ->
            Encode.object [
                "Response", Encode.string str
            ]

    Encode.object [ "ServerMsg", enocdedMsg]

let serverMsgDecoder : Decoder<Server.ServerMsg> =
    Decode.field "ServerMsg" (Decode.oneOf
                                [ Decode.field "SendMsg" (Decode.string |> Decode.map Server.SendMsg)
                                ])

