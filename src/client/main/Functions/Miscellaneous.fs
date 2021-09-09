module Main.Functions.Miscellaneous

open Main.Types
open Sutil
open Shared
open Fable.SignalR
open Fable.SignalR.Elmish
open Microsoft.AspNetCore.SignalR.Client
open App.GlobalTypes

let credentialIsValid (credential: string) =
    let stringsAllowed = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"

    let isRightLen = credential.Length = 5
    let allRightChars =
        credential
        |> String.forall (fun charVal ->
                stringsAllowed.Contains(charVal)
            )

    [
        isRightLen, $"code must consist of exactly 5 characters"
        allRightChars, $"code can only consist of letters and numbers"
    ]
    |> List.choose (fun (res,x) -> 
        if res |> not
        then Some(res,x) 
        else
            None )
    |> function 
        | faultList when faultList |> List.length <> 0 ->
            faultList
            |> List.map (fun (_,fault) -> fault)
            |> ErrorType.Multiple
            |> Result.Error
        | _ ->
            Ok()

