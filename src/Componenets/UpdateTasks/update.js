import "./update.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from "js-cookie";
//by clicking on the complete button it will update status from pending to complete
//by clicking on the delete button it will the task permenatly from database
const UpdateTasksCardEl=(props)=>{
    const{taskdata}=props;
    const{title,discription,status,id}=taskdata;
    const updateStatus=async()=>{
        const token=Cookies.get('AccessToken');
         const option={
            method:"PUT",
            headers:{
                'Content-Type':"application/json",
                Authorization:`Bearer ${token}`
            },
            body:JSON.stringify({status:'Completed'}) 
            }
            /* it will sends an request to backend server and it will update status of that particular
            task to completed*/ 
            const response=await fetch(`http://localhost:3000/tasks/${id}`,option);
            if(response.ok){
                window.location.reload();
            }
            else{
                alert('Please Login and Try Again');
            }
    }
    const deleteTask=async()=>{
         const token=Cookies.get('AccessToken');
         const option={
            method:"DELETE",
            headers:{
                'Content-Type':"application/json",
                Authorization:`Bearer ${token}`
            }  
            }
            //it sends an request to backend server and delete the task successfully from database
            const response=await fetch(`http://localhost:3000/tasks/${id}`,option);
            if(response.ok){
                window.location.reload();
            }
            else{
                alert('Please Login and Try Again');
            }
           console.log(id)
    }
    return(
        <>
        <div className="each-task-container">
            <h1 className="each-task-heading">{title}</h1>
            <p className="each-task-status">Status:<span style={{color:"green"}}>{status}</span></p>
            <p className="each-task-discription">{discription}</p>
            <div className="d-flex flex-row justify-content-between">
                {status==='pending'?<button className="compete-button-styling" onClick={updateStatus}>Complete</button>:''}
                <button className="compete-button-styling"style={{backgroundColor:"rgb(182, 25, 7)"}} onClick={deleteTask}>Delete</button>
            </div>

        </div>
        </>
    )
}
export default UpdateTasksCardEl;