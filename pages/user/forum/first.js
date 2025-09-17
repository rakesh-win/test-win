import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import style from "./forumm.module.css";

  const First = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    axios
      .get("https://winupskill.in/api/api/forumqs")
      .then((response) => {
        setData(response.data.data);
      });
  }, []);

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <div className={style.commentSection}>
        <h2>Questions</h2>
        {currentItems.map((x) => {
          return (
            <div key={x.id} className={style.commentContainer}>
              <div className={style.commentFooter}>
                <Link href={{ pathname: "/Forum/second", query: { id: x.id } }} passHref>
                  <a className={style.commentLink}> {x.question}</a>
                </Link>
              </div>
            </div>
          );
        })}
        <section className={style.paginationn}>
        <ul className="pagination" >
          {pageNumbers.map((number) => (
            <li key={number} className="page-item">
              <a href="#" className="page-link red" onClick={() => setCurrentPage(number)}>
                <div>
                  <span>{number}</span>
                </div>
              </a>
            </li>
          ))}
        </ul>
        </section>
      </div>
    </>
  );
};

export default First;

