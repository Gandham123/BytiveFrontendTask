import "./index.css";
import HeaderEl from "../Header";
import { Component } from "react";
import Cookies from "js-cookie";
import EachTaskCardEl from "./eachTask.js";

class HomeEl extends Component{
    state={tasksList:[]}
    componentDidMount(){
        this.getData();
    }
    getData=async()=>{
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
        this.setState({tasksList:availbletasks.data})
       }
       else{
         alert('Please Login and Try Again');
       }
    }
    render(){
        const{tasksList}=this.state;
        console.log(tasksList);
        return(
            <>
            <HeaderEl/>
            <h1 className="home-tasks-heading">All Posted Tasks</h1>
            <div className="each-tasks-main-container">
                {tasksList.map((eachItem)=>(<EachTaskCardEl key={eachItem.id} taskdata={eachItem}/>))}
            </div>
            </>
        )
    }
}
export default HomeEl;