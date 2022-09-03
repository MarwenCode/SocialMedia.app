import React from "react";
// import { MdSpaceBar } from "react-icons/md";
import { Link } from "react-router-dom";

import "./news.scss";

const News = ({ data }) => {
  return (
    <div className="news">
      <a href={data.url} className="link">
        <span className="title">
          {data.title.length <= 100 ? data.title : data.title.slice(0, 10)}
        </span>
      </a>

      <span className="createdAt">
        {new Date(data.publishedAt).toDateString()}
      </span>

      <img className="image" src={data.urlToImage} />
    </div>
  );
};

export default News;
