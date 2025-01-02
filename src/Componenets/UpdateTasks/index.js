import "./index.css";
import { Component } from "react";
import HeaderEl from "../Header";
import UpdateTasksCardEl from "./update.js";
import Cookies from "js-cookie";

class UpdateTasksEl extends Component{
    state={updateTaskList:[]}
    componentDidMount(){
        this.getData();
    }
    getData=async ()=>{
       const token=Cookies.get('AccessToken');
       const option={
        method:"GET",
        headers:{
            'Content-Type':"application/json",
            Authorization:`Bearer ${token}`
        }
       }
       const response=await fetch("http://localhost:3000/tasks",option);
       if(response.ok){
        const availbletasks=await response.json();
        this.setState({updateTaskList:availbletasks.data})
       }
       else{
         alert('Please Login and Try Again');
       }
    }
    render(){
        const{updateTaskList}=this.state;
        return(
            <>
            <HeaderEl/>
            <h1 className="update-status-heading">Update Your Task Status</h1>
            <div className="each-tasks-main-container">
                {updateTaskList.map((eachItem)=>(<UpdateTasksCardEl key={eachItem.id} taskdata={eachItem}/>))}
            </div>
            </>
        )
    }
}
export default UpdateTasksEl;