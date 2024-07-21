"use client"
import React, { useState } from "react";
import "../styles/home.css";

const Home = () => {
  const [page, setPage] = useState(1);
  const [perPageData, setPerPageData] = useState(page * 6);
//   const { user, updateInterests } = useEcommerceData();

  let startingIndex = page * 6 - 6;
  let endingIndex = page * 6;

//   const pageLimit = Math.ceil(user?.interests?.length / 6);

//   const handleCheckedInteres = (name) => {
//     updateInterests(name);
//   };

//   const handleNextPage = (e, page = 1) => {
//     const value = e.target?.value;
//     console.log(value);
//     if (value === "10inc") {
//       if (page + 10 <= pageLimit) {
//         setPage((p) => p + 10);
//         // setPage(pageLimit);
//         return;
//       } else {
//         return;
//       }
//     }
//     if (value === "10dec") {
//       if (page >= 10) {
//         setPage(page - 10);
//         return;
//       }
//     }
//     setPage(page);
//   };

  return (
    <div className="home">
      <h4>Please Mark your interests</h4>
      <h5>We will keep you notified</h5>
      <div className="checkboxes">
        {/* {user?.interests?.slice(startingIndex, endingIndex).map((interest) => (
          <label key={interest.name}>
            <input
              type="checkbox"
              checked={interest.isChecked}
              onChange={()=>handleCheckedInteres(interest.name)}
            />
            {interest.name}
          </label>
        ))} */}
      </div>

      <div className="page__controllers">
        {/* <button value="10dec" onClick={(e) => handleNextPage(e)}>
          {"<"}
        </button> */}
        {/* {new Array(6).fill(0).map((_, i) => {
          if (page + i <= pageLimit) {
            return (
              <button
                className={i + page === page && "active"}
                key={i + 1}
                onClick={(e) => handleNextPage(e, i + page)}
              >
                {i + page}
              </button>
            );
          }
        })} */}
        {/* <button value="10inc" onClick={(e) => handleNextPage(e)}>
          {">"}
        </button> */}
      </div>
    </div>
  );
};

export default Home;