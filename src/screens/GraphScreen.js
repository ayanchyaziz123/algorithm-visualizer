const GraphScreen = () =>{
    let board = Array(2).fill(0).map(row => new Array(3).fill(1))

    return(
        <>
        <h1>This is graph screen!!!</h1>
        {
            board.map((row, ind)=>{
                return(<>
                {
                    row.map((col, ind)=>{
                        return(
                            <>
                            <span>Data {col}</span>
                            </>
                        )
                    })                        
                }

                </>)
            })
        }
        </>
    )
}

export default GraphScreen;
