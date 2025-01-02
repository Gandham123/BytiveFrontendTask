import "./index.css";
import { Component } from "react";
import HeaderEl from "../Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { ThreeDots } from 'react-loader-spinner';
import { v4 as uuidv4 } from 'uuid';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Cookies from 'js-cookie';

class AddTasksEl extends Component{
    state={titleInput:"",descriptionInput:"",titleErrorShow:false,
        decriptionErrorShow:false,inProgress:false,showAlert:false}
    titleInputHandeling=(event)=>{
        this.setState({titleInput:event.target.value})
    }
    decriptionInputHandeling=(event)=>{
        this.setState({descriptionInput:event.target.value})
    }
    addData=async()=>{
        const{titleInput,descriptionInput}=this.state;
        const token=Cookies.get("AccessToken");
        if(titleInput.length===0){
          this.setState({titleErrorShow:true})
        }
        if(descriptionInput.length===0){
          this.setState({decriptionErrorShow:true})
        }
        if(descriptionInput.length!==0 && titleInput.length!==0){ 
          this.setState({titleErrorShow:false,decriptionErrorShow:false,inProgress:true})
          const finalDataToPost={
            id:uuidv4(),
            title:titleInput,
            discription:descriptionInput,
          }
          console.log(finalDataToPost);
          const option={
            method:'POST',
            headers:{
              'Content-Type':'application/json',
               Authorization:`Bearer ${token}`
            },
            body:JSON.stringify(finalDataToPost)
          }
          const response=await fetch('http://localhost:3000/tasks',option);
          const data=await response.json();
          if(response.ok===true){
            console.log(data);
            this.setState({titleInput:'',descriptionInput:'',showAlert:true})
            setTimeout(() => {
              this.setState({showAlert:false}) // Hide success alert after 6 seconds
            }, 6000);
          }
          else{
            alert(data.message)
          }
        }
    }
    render(){
        const{titleInput,descriptionInput,titleErrorShow,
            decriptionErrorShow,showAlert}=this.state;
        const loader=<ThreeDots color='#ffffff' height={30} width={30}/>
        return(
            <>
            <HeaderEl/>
            {showAlert===true?<div className='d-flex flex-row justify-content-center Shadow'>
    <Stack sx={{ width: '20%',marginTop:"30px"}}  spacing={2}>
     <Alert severity="success" className='text-center' style={{ backgroundColor:"rgb(80, 224, 166)"}}>Your Task is added.</Alert>
    </Stack>
    </div>:''}
            <div style={{marginTop:"70px"}}>
          <h1 className='to-do-heading'>Add Your Own Tasks</h1>
          <div className='d-flex flex-row justify-content-center'>
            <div className='to-do-input-main-container'>
              <div className='mb-4'>
                <label className='input-label-styling'>Title</label>
                <br/>
                <input type='text' className='title-input-styling' onChange={this.titleInputHandeling} value={titleInput} placeholder='Enter Your Title'/>
                <p className='error-message-styling'>{titleErrorShow?"*Required":''}</p>
              </div>
              <div className='mb-4'>
                <label className='input-label-styling'>Description</label>
                <br/>
                <textarea rows={4} cols={30} className='title-input-styling' onChange={this.decriptionInputHandeling}
                 value={descriptionInput} placeholder='Enter Your Description Text..' style={{height:'100%',paddingTop:"15px"}}></textarea>
                 <p className='error-message-styling'>{decriptionErrorShow?"*Required":''}</p>
              </div>
              <button className='btn btn-primary' onClick={this.addData}>Add</button>
            </div>
          </div>
        </div>
            </>
        )
    }
}
export default AddTasksEl;