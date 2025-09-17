import Link from "next/link";
import style from "./forum.module.css";
import axios from "axios";
import { useEffect, useState } from "react";

const Zero = () => {
  const [cat, setCat] = useState([]);
  const [qu, setQu] = useState([]);
  const [date, setDate] = useState([]);
  const [categoryIds, setcategoryIds] = useState([]);

  useEffect(() => {
    axios.get("https://winupskill.in/api/api/forumqs")
      .then((res) => {
        setQu(res.data.data.filter((q) => q.answer !== null));
      })
      .catch((err) => {
        console.log(err);
      });

    axios.get("https://winupskill.in/api/api/forumcats")
      .then((res) => {
        setCat(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios.get("https://winupskill.in/api/api/forumqs")
      .then((res) => {
        setDate(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  
  const latestDate = date.length > 0 ? [...date].sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))[0].updated_at : "";

  const currentItems = cat.map((c) => ({
    ...c,
    items: qu.filter((q) => q.categoryid === c.id).slice(0, 8),
  }));

  return (
    <>
  


  <div className={style.forumContainer}>
    <div className={style.forumContainernewtopic}>
             <Link href="/user/forum/post" passHref>
                  <button className={style.buttonnn}>New Topic</button>
                </Link>
    </div>
  <div className={style.radiustop2}>
      Forum
  </div>
      <div className={style.radiustop}>
      {cat.map(category => {
      const categoryData = date
        .filter(item => item.categoryid === category.id)
        .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
        .slice(0, 5);
      
      return (
        <div key={category.id} className={style.categoryContainer}>
          
          <div className={style.inlineitems}>
              <h1 className={style.categoryTitle}>{category.categoryname}</h1>
              
          </div>




           <div className={style.questionList}>
              {categoryData.map(item => (
              

                <Link key={item.id} href={{ pathname: "/user/forum/topic", query: { id: item.id.toString() } }}>
                   
                <div className={style.questionContainer}>
                  <h4 className={style.questionTitle}>
                      <a>{item.question}</a>
                    
                  </h4>
                 
                </div>
                </Link>
            ))}
          </div>
        </div>
      );
    })}
  </div>
  <div className={style.forumContainernewtopic} style={{marginTop:"10px"}}>
             <Link href="/user/forum/post" passHref>
                  <button className={style.buttonnn}>New Topic</button>
                </Link>
    </div>
  </div>


   
      <div className={style.spacer}>
      </div>
    </>
  );
};

export default Zero;


 // <p className={style.questionAnswer}>{item.askedbyuid}</p>
 /*

<div className={style.buttonSection}>
                 <Link href={`/user/forum/category/${category.id}`} passHref>
                  <button className={style.buttonnn}>View All</button>
                </Link>
                <Link href="/user/forum/post" passHref>
                  <button className={style.buttonnn}>New Topic</button>
                </Link>
              </div>


 */
