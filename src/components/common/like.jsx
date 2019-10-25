import React from "react";

const Like = prop => {
  const { liked, onLiked } = prop;

  let classes = "fa-heart fa";
  classes += liked ? "s" : "r";

  return <i className={classes} onClick={onLiked}></i>;
};

export default Like;
