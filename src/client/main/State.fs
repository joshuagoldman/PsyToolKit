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
        MenuButton = initELement
        MenuAlt = initELement, ""
        CurrPage = Home
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
    | MenuButtonClicked isActive ->
        let newHtmlElement = 
            {model.MenuButton with IsActive = isActive |> not |> Some}
        {model with MenuButton = newHtmlElement} , Cmd.none
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
    | PageChanged page ->
        let newPage =
            match ((page |> string) = (model.CurrPage |> string)) with
            | true -> Home
            | false -> page
        {model with CurrPage = newPage}, Cmd.none
    | ChangeMenuButtonColor color ->
        let newEl =
            {model.MenuButton with Class = Some color}
        
        {model with MenuButton = newEl}, Cmd.none
    | ChangeMenuAltColor(className, menuAltName) ->
        let newEl = {model.MenuButton with Class = Some className}
        {model with MenuAlt = (newEl, menuAltName)}, Cmd.none