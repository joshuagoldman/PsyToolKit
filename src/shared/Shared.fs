module Shared

module Endpoints =   
    let [<Literal>] Root = "/SignalR"

type ErrorType = 
    | Single of string
    | Multiple of string list

type Validation<'a> = 
    | ValidationNotStarted
    | ValidationResolved of 'a

type PsyToolUser = {
    UserName: string
    Password: string
    IsFirstLink: bool
}

type Model = 
    {
        CurrLink : string
    }

let init = { 
                CurrLink = ""
            }

module Client =
    [<RequireQualifiedAccess>]
    type ClientMsg =
        | ExercizeButtonClickedResult of Result<string,ErrorType>
        | CreateDBValsResult of Result<string,ErrorType>
        | Invoke

module Server  =
    [<RequireQualifiedAccess>]
    type ServerMsg =
        | ExercizeButtonClicked
        | CreateDBVals
