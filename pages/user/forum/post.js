import axios from "axios"
import React, { useEffect, useState } from "react";
import PageBanner from '@/components/Common/PageBanner';
import Link from "next/link"
import style from "./forum.module.css";
import { parseCookies } from "nookies"; 
import Router from 'next/router';

const Post = () => {                                   
  const [question, setQuestion] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [ categoryid,setCategoryid]=useState();
  const [answeredbyuid, setAnsweredbyuid] = useState(null);
  const [cats, setCats] = useState([]);
                                                       
  
  useEffect(() => {
    const cookies = parseCookies();
    setAnsweredbyuid(cookies.name);
    axios.get("https://winupskill.in/api/api/forumcats").then((e) => {
      setCats(e.data.data);
    });
  }, []);       

  const handleChange = (e) => {
    setQuestion(e.target.value)
                                                   
  }

  const handleChange2 = (e) => {
    setDescription(e.target.value)
                                                   
  }

  const handleCategoryChange = (e) => {
    setCategoryid(e.target.value);
  };
                            
  const handleSubmit = () => {
    console.log("answeredbyuid",answeredbyuid);
    const payload = {question,description,categoryid,askedbyuid:answeredbyuid}
    axios.post("https://winupskill.in/api/api/forumqs", payload)
      .then((response) => {
            Router.push('/user/forum');
      })
      .catch((error) => {
        console.error(error)
      })
  }
           
  let pchy=(e)=>{
    setCategoryid(1)
    console.log("q")
  }
       
  let fashionn=(e)=>{
    setCategoryid(2)
    console.log("a")
      }
  
      let Businesss=(e)=>{
        setCategoryid(3)
        console.log("f")
          }
                                   
          let lifestylee=(e)=>{
            setCategoryid(4)
            console.log("g")
              }

              let educationn=(e)=>{
                setCategoryid(5)
                console.log("h")
                  }
                            
  return (         
    <React.Fragment>
            <PageBanner 
                homePageUrl="/user/forum" 
                homePageText="Forum" 
                activePageText="Post a Topic"
            />  
      <div className={style.spacertop}>
      </div>
    <div className={style.container}>
      <h1 className={style.title}>Start a new topic!</h1>
      <input className={style.input} type="text" onChange={handleChange} value={question} placeholder="Type the topic here" />
      
      <textarea className={style.input} type="text" onChange={handleChange2} value={description} placeholder="Type the topic description here" >
      </textarea>
      <div className={style.radiocontainer}>
     Select Post category:
        <select className={style.dropdown} onChange={handleCategoryChange} value={categoryid}>
        <option value="">Select Category</option>
        {cats.map((category) => (
          <option className={style.containerdropdown} key={category.id} value={category.id}>
            {category.categoryname}
          </option>
        ))}
      </select>
      </div>
      <Link href="/user/forum"><button className={style.button} onClick={handleSubmit}>Post your topic</button></Link>

      <div className={style.spacer}>
      </div>
    </div>
    </React.Fragment>
  )
}

export default Post
