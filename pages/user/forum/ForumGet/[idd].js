import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./forumm.module.css";
import Link from "next/link";

const Category = () => {
  const [data, setData] = useState([]);
  const router = useRouter();
  const [cat, setCat] = useState([]);
  const [question, setQuestion] = useState([]);
  const [description, setDescription] = useState("");
  const [categoryid, setCategoryid] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const { idd } = router.query;

  useEffect(() => {
    axios
      .get("https://winupskill.in/api/api/forumqs")
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://winupskill.in/api/api/forumcats")
      .then((res) => {
        setQuestion(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let btn1 = () => {
    let payload = { question, description, categoryid };
    axios
      .post("https://winupskill.in/api/api/forumqs", payload)
      .then(() => {
        console.log("f");
        window.location.reload(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  let btn2 = (e) => {
    setQuestion(e.target.value);
    setDescription("ee");
    setCategoryid(idd);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data
    .filter((x) => x.categoryid == idd)
    .slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(data.filter((x) => x.categoryid == idd).length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (number) => {
    setCurrentPage(number);
  };
  
  return (
    <section className={styles.mainn}>
      <div className={styles.container}>
        {currentItems.map((x) => {
          return (
            <div key={x.id} className={styles.question}>
              <h4>
                <Link href={{ pathname: "/Forum/second", query: { id: x.id.toString() },}} >
                  <span>{x.question}</span>
                </Link>
              </h4>
              <>{x.answer}</>
            </div>
          );
        })}
      </div>
      <section className={styles.postInput}>
        <input type="text" onChange={btn2}></input>
        <button onClick={btn1}>post</button>
      </section>
      <div className={styles.pagination}>
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => handlePageChange(number)}
            className={currentPage === number ? styles.active : ""}
          >
            {number}
          </button>
        ))}
      </div>
    </section>
  );
};

export default Category;
