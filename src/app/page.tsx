"use client";
import React, { useEffect, useState } from "react";
import "../styles/home.css";
import { redirect } from "next/navigation";
import { useAuth } from "~/context/authContext";
import { getSession } from "~/lib/lib";
import axios from "axios";

const Home = () => {
  const [page, setPage] = useState(1);
  const [perPageData, setPerPageData] = useState(page * 6);
  const [userInterests, setUserInterests] = useState([]);
  const [interestLoading, setInterestLoading] = useState(false);
  const { user } = useAuth();
  useEffect(() => {
    if (!user) {
      redirect("/auth");
    }
  }, []);
  useEffect(() => {
    const fetchUserInterests = async () => {
      // setInterestLoading(true);
      try {
        const res = await axios.get(`/api/interests?user_id=${user.id}`);
        setUserInterests(res.data.interests);
      } catch (error) {
        console.error(error);
      } finally {
        // setInterestLoading(false);
      }
    };
    fetchUserInterests();
  }, []);
  let startingIndex = page * 6 - 6;
  let endingIndex = page * 6;

  const pageLimit = Math.ceil(userInterests?.length / 6);

  const handleCheckedInterest = async (category_id, is_interest) => {
    setInterestLoading(true);
    try {
      const res = await axios.post(`api/change-interests`, {
        user_id: user.id,
        category_id,
        is_interest: !is_interest,
      });
      setUserInterests(res.data.interests);
    } catch (error) {
      console.error(error.message);
    } finally {
      setInterestLoading(false);
    }
  };

  const handleNextPage = (e, page = 1) => {
    const value = e.target?.value;
    if (value === "10inc") {
      if (page + 10 <= pageLimit) {
        setPage((p) => p + 10);
        // setPage(pageLimit);
        return;
      } else {
        return;
      }
    }
    if (value === "10dec") {
      if (page >= 10) {
        setPage(page - 10);
        return;
      }
    }
    setPage(page);
  };

  return (
    <div className="home">
      <h4>Please Mark your interests</h4>
      <h5>We will keep you notified</h5>
      <div className="checkboxes">
        {userInterests?.slice(startingIndex, endingIndex).map((interest) => (
          <label key={interest.name}>
            <input
              type="checkbox"
              checked={interest.is_interest}
              disabled={interestLoading}
              onChange={() =>
                handleCheckedInterest(
                  interest.category_id,
                  interest.is_interest
                )
              }
            />
            {interest.name}
          </label>
        ))}
      </div>

      <div className="page__controllers">
        <button value="10dec" onClick={(e) => handleNextPage(e)}>
          {"<"}
        </button>
        {new Array(6).fill(0).map((_, i) => {
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
        })}
        <button value="10inc" onClick={(e) => handleNextPage(e)}>
          {">"}
        </button>
      </div>
    </div>
  );
};

export default Home;
