import "./eachTask.css";
const EachTaskCardEl=(props)=>{
    const{taskdata}=props;
    const{title,discription,status}=taskdata
    return(
        <>
        <div className="each-task-container">
            <h1 className="each-task-heading">{title}</h1>
            <p className="each-task-status">Status:<span style={{color:"green"}}>{status}</span></p>
            <p className="each-task-discription">{discription}</p>
        </div>
        </>
    )
}
export default EachTaskCardEl;