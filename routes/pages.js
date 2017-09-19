const router = require("express").Router();
const axios = require("axios");

const pages = ["news-article", "going-out-article"];
const rootUrl = "http://www.brightsites.co.uk/resources/";

pages.forEach(page => {
  router.get(`/${page}`, (req, res) => {
    (async () => {
      const url = rootUrl + page + ".json";
      const response = await axios.get(url);
      const { data } = response;
      const paragraphs = data.body
        .filter(item => item.type === "markup")
        .map(item => item.markup)
        .join("");

      const galleryItem = data.body.filter(item => item.type === "gallery")[0];
      const hasGallery = !!galleryItem;

      res.render("page", {
        ...data,
        paragraphs,
        hasGallery,
        galleryItem,
        images: hasGallery ? galleryItem.images : []
      });
      //   res.send(data);
    })();
  });
});

module.exports = router;
