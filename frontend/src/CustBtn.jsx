
const CustBtn = ({label, color, btnClickHander, design}) =>{
    return(
        <button className={design} onClick={btnClickHander} style={{color: color}}>{label}</button>
    );
}

export default CustBtn;