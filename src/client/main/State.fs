module Main.State

open Types
open Sutil
open Shared
open Fable.SignalR
open Fable.SignalR.Elmish
open Microsoft.AspNetCore.SignalR.Client
open App.GlobalTypes

let init () =
    {
        Shared = HasNotStarteYet
        Hubb = None
        GoToExercizeButton = initELement
        CurrCode = Validation.ValidationNotStarted
    }, Cmd.none

let update msg model =
    match msg with 
    | Types.Msg.RegisterHub hub ->
        Browser.Dom.console.log(hub)
        { model with Hubb = Some hub }, Cmd.none
    | Types.Msg.ConnectToServer dispatch ->
        let cmd =
            Cmd.SignalR.connect RegisterHub (fun hub ->
                hub.withUrl(sprintf "http://%s%s" Browser.Dom.window.location.host Shared.Endpoints.Root)
                    .withAutomaticReconnect()
                    .onMessage SignalRMessage)

        Browser.Dom.console.log(sprintf "http://%s%s" Browser.Dom.window.location.host Shared.Endpoints.Root)
        model, cmd
    | SignalRMessage clientMessage ->
        match clientMessage with
        | Shared.Client.ClientMsg.ExercizeButtonClickedResult res ->
            match res with
            | Ok link ->
                let newSharedModel = 
                    { CurrLink = link }
                    |> Ok
                    |> Deferred.Resolved

                { model with Shared = newSharedModel }, Cmd.none
            | Result.Error errType ->
                let newSharedModel = 
                    errType
                    |> Result.Error
                    |> Deferred.Resolved

                { model with Shared = newSharedModel }, Cmd.none
        | Shared.Client.ClientMsg.CreateDBValsResult res ->
            match res with
            | Ok link ->
                let newSharedModel = 
                    { CurrLink = link }
                    |> Ok
                    |> Deferred.Resolved

                { model with Shared = newSharedModel }, Cmd.none
            | Result.Error errType ->
                let newSharedModel = 
                    errType
                    |> Result.Error
                    |> Deferred.Resolved

                { model with Shared = newSharedModel }, Cmd.none
                
        | Shared.Client.ClientMsg.Invoke ->
            model, Cmd.none
    | ExercizeButtonClicked ->
        let cmdMsg =
            Server.ServerMsg.ExercizeButtonClicked 
            |> Cmd.SignalR.send model.Hubb 

        { model with Shared = Deferred.Ongoing}, cmdMsg
    | Types.Msg.TestCredential(strVal) ->
        
        match (Main.Functions.Miscellaneous.credentialIsValid strVal) with
        | Ok() ->
            let newModel =
                {model with CurrCode =
                                strVal
                                |> Ok
                                |> Validation.ValidationResolved}
            newModel, Cmd.none
        | Result.Error errType ->
            let newModel =
                {model with CurrCode =
                                (strVal,errType)
                                |> Result.Error
                                |> Validation.ValidationResolved}
            newModel, Cmd.none
                
    | Changeinput(keyType) ->
        match(keyType, model.CurrCode) with
        | (KeyType.BackSpace, Validation.ValidationNotStarted) ->
            model, Cmd.none
        | (KeyType.BackSpace, Validation.ValidationResolved(Ok code)) ->
            let cmdMsg =
                code.Substring(0,(code.Length - 1))
                |> Types.Msg.TestCredential
                |> Cmd.ofMsg

            model, cmdMsg
        | (KeyType.OtherKey strVal, Validation.ValidationResolved(Ok code)) ->
            let cmdMsg =
                code + strVal
                |> Types.Msg.TestCredential
                |> Cmd.ofMsg

            model, cmdMsg
        | (KeyType.OtherKey strVal, Validation.ValidationResolved(Result.Error(code,errType))) ->
            let cmdMsg =
                code + strVal
                |> Types.Msg.TestCredential
                |> Cmd.ofMsg

            model, cmdMsg
        | (KeyType.BackSpace, Validation.ValidationResolved(Result.Error(code,errType))) ->
            let cmdMsg =
                code.Substring(0,(code.Length - 1))
                |> Types.Msg.TestCredential
                |> Cmd.ofMsg

            model, cmdMsg
        | (KeyType.OtherKey strVal, Validation.ValidationNotStarted) ->
            let cmdMsg =
                strVal
                |> Types.Msg.TestCredential
                |> Cmd.ofMsg

            model, cmdMsg
        
