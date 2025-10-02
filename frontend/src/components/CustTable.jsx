const CustTable = ({data}) => {
    const columns = Object.keys(data[0]);
    return (
        <>
            <table className="table table-dark">
                <thead>
                    <tr>
                        {
                            columns.map((item, index)=>{
                                return(
                                    <th key={index}>{item}</th>
                                )
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((row, rowIndex) =>{
                            return(
                                <tr key={rowIndex}>
                                {
                                    columns.map((col)=>{
                                        return(
                                            <td>{row[col]}</td>
                                        )
                                    })
                                }
                            </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </>
    )
}
export default CustTable;