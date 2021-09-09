module Server.Main

open System
open Giraffe
open Microsoft.AspNetCore.Builder
open Microsoft.Extensions.DependencyInjection
open Microsoft.AspNetCore.Hosting
open System.Collections.Generic
open Fable.SignalR
open FSharp.Control.Tasks.V2
open Shared
open Database

module ChatHub =
    let invoke (msg: Server.ServerMsg) (hubContext: FableHub) =
        task {
            return Client.ClientMsg.Invoke
        }

    let send (msg: Server.ServerMsg) (hubContext: FableHub<Server.ServerMsg,Client.ClientMsg>) =
        let participants = hubContext.Services.GetService<Dictionary<string, string>>()

        match msg with
        | Server.ServerMsg.ExercizeButtonClicked ->
            let msgAsync = async {
                do! Async.Sleep 2000

                let chosenLink =
                    ["https://www.psytoolkit.org/c/3.3.2/survey?s=9YYcL";"https://www.psytoolkit.org/c/3.3.2/survey?s=YCHKK"]
                    |> randomizeLink
                
                return (
                    chosenLink
                    |> Ok
                    |> Client.ClientMsg.ExercizeButtonClickedResult 
                    |> hubContext.Clients.All.Send
                )
            }

            msgAsync
            |> Async.RunSynchronously
        | Server.ServerMsg.CreateDBVals ->
            let msgAsync =
                async {
                    let res =
                        match getDBRocreateFiftyTableRowsws with
                        | Ok() ->
                            "Creating database strings succeeded"
                            |> Ok
                        | Error errType ->
                            errType
                            |> Error

                    return (
                        res
                        |> Client.ClientMsg.ExercizeButtonClickedResult
                        |> hubContext.Clients.All.Send
                    )
                }

            msgAsync
            |> Async.RunSynchronously

    let config =
        { SignalR.Settings.EndpointPattern = Shared.Endpoints.Root
          SignalR.Settings.Send = send
          SignalR.Settings.Invoke = invoke 
          SignalR.Settings.Config = None }
    
module Server =
    let webApp : HttpHandler =
        choose [
            GET >=> route "/" >=> text "hello"
        ]

    let configureApp (app : IApplicationBuilder) =
        app.UseSignalR(ChatHub.config) |> ignore
        app.UseGiraffe webApp

    let configureServices (services : IServiceCollection) =
        services.AddSingleton<Dictionary<string, string>>() |> ignore

        services.AddGiraffe() |> ignore
        services.AddSignalR(ChatHub.config) |> ignore

    [<EntryPoint>]
    let main _ =
        WebHostBuilder()
            .UseKestrel()
            .UseUrls("http://localhost:8086")
            .Configure(Action<IApplicationBuilder> configureApp)
            .ConfigureServices(configureServices)
            .Build()
            .Run()
        0
