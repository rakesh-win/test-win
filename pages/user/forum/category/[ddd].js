import { useRouter } from "next/router";
import axios from "axios";
import React, { useEffect, useState } from "react";
import PageBanner from '@/components/Common/PageBanner';
import Link from "next/link";
import style from "./forummm.module.css";

const Twoone = () => {
  const router = useRouter();
  const { ddd } = router.query;
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [cat, setCat] = useState([]);

  useEffect(() => {
    axios
      .get("https://winupskill.in/api/api/forumqs")
      .then((res) => {
        setData(res.data.data.filter((q) => q.categoryid == ddd));
      })
      .catch((err) => {
        console.log(err);
      });

      axios
      .get("https://winupskill.in/api/api/forumcats")
      .then((res2) => {
        setCat(res2.data.data.filter((q1) => q1.id == ddd));
        console.log("res2",res2,cat[0].categoryname);
      })
      .catch((err) => {
        console.log(err);
      });


  }, [ddd]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={currentPage === i ? style.active : ""}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <>
    <React.Fragment>
            <PageBanner 
                homePageUrl="/user/forum" 
                homePageText="Forum" 
                activePageText={cat.length ? `All Posts: ${cat[0].categoryname}` : "All posts"}
            />  
      <div className={style.spacertop}>
      </div>
      <div className={style.forumContainer}>
       <h2 className={style.heading}>{cat.length ? cat[0].categoryname : "All posts"}</h2>
        {currentItems.map((q) => (
          <div className={style.questionContainer} key={q.id}>
            <Link
              href={{ pathname: "/user/forum/topic", query: { id: q.id } }}
              passHref
            >
              <a className={style.questionLink}>{q.question}</a>
            </Link>
            <p className={style.answer}>{q.askedbyuid}</p>
         
          </div>
        ))}
      </div>

      <div className={style.bak}>
        <div className={style.pagination}>
          {renderPageNumbers()}
        </div>
      </div>
      </React.Fragment>
    </>
  );
};

export default Twoone;
