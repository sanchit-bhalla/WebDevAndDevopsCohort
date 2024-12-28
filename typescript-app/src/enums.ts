// Detect key pressed in a game
// By default, enums get values as 0 , 1, 2...
enum Direction {
  Up = 1,
  Down, // becomes 2 by default
  Left = "LEFT",
  Right = "RIGHT",
}

function changePosition(keyPressed: Direction) {
  console.log("Key pressed: ", keyPressed);
}

changePosition(Direction.Up);
changePosition(Direction.Down);
changePosition(Direction.Left);
changePosition(Direction.Right);

/*
    // Common usecase in express
    enum ResponseStatus {
        Success = 200,
        NotFound = 404,
        Error = 500
    }

    app.get("/', (req, res) => {
        if (!req.query.userId) {
                res.status(ResponseStatus.Error).json({})
        }
        
        return res.status(ResponseStatus.Success).json({});
    })
*/
