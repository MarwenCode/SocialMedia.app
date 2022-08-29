import React from "react";
import "./news.scss"

const News = ({ data }) => {
  return (
    <div className="news">
      <span className="title">
        {data.title.length <= 100 ? data.title : data.title.slice(0, 10)}
      </span>
      <span className="createdAt">{new Date(data.publishedAt).toDateString()}   </span>
      <img className="image" 
      src={data.urlToImage}
      
      
      />
    </div>
  );
};

export default News;
