module Login.Types

open Shared
open Sutil
open Fable.SignalR
open Fable.SignalR

type Msg =
    | TestMsg of string

type Model =  {
    Shared: Shared.Model
    Hubb: Fable.SignalR.Elmish.Elmish.Hub<Server.ServerMsg,Client.ClientMsg> option
    CurrName: string
    Color: string
}

