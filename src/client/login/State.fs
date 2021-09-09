module Login.State

open Types
open Sutil
open Shared
open Fable.SignalR
open Fable.SignalR.Elmish
open Microsoft.AspNetCore.SignalR.Client

let init () =
    {
        Shared = Shared.init
        Hubb = None
        CurrName = ""
        Color = ""
    }, Cmd.none

let update msg model =
    match msg with 
    | TestMsg s ->
        model, Cmd.none
        