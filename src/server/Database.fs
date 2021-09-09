module Database

open System.Text
open System.IO
open System.Linq

let createPassword length =
    let valid = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
    let res = StringBuilder()
    let rand = System.Random()
    
    let result =
        [0..length - 1]
        |> List.fold (fun currRes _ -> (currRes : StringBuilder).Append(valid.ElementAt(rand.Next(valid.Length)))) res 

    result.ToString()

let randomizeLink links =
    let result =
        links
        |> List.sortBy (fun c -> System.Guid.NewGuid())
        |> List.item 0
    
    result

let getDBRocreateFiftyTableRowsws =
    try
        let info =
            [0..49]
            |> List.map (fun pos ->
                    {
                        Shared.UserName = createPassword 5
                        Shared.Password = createPassword 5
                        Shared.IsFirstLink = (pos % 2) = 0
                    }
                )
            |> List.map (fun usr ->
                    $"INSERT INTO PsyToolUser (UserName, Password, IsFirstLink)
VALUES ('{usr.UserName}', '{usr.Password}', {usr.IsFirstLink});"
                )

        info
        |> String.concat "\n\n"
        |> fun x ->
            File.WriteAllText("PsyToolKitSql.txt", x)

        Ok()
    with
    | (ex: System.Exception) ->
        ex.Message
        |> Shared.ErrorType.Single
        |> Error
        
    


        

