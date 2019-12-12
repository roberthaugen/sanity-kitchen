import React from "react";
import YouTube from "react-youtube";
import getYouTubeId from "get-youtube-id";

const YouTubeRender = ({ node }) => {
  if (!node.url) {
    return null;
  }

  const id = getYouTubeId(node.url);
  if (!id) {
    return null;
  }

  return <YouTube videoId={id} />;
};

export default YouTubeRender;
