const { default: axios } = require("axios");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const url = "https://www.amazon.com/s?k=";

async function getSearchPage(searchQuery) {
  searchQuery = searchQuery.trim();
  searchQuery = searchQuery.replace(" ", "+");

  const searchUrl = url + searchQuery;
  console.log(searchUrl);
  const response = await axios.get(searchUrl, {
    headers: {
      Accept: "text/html, application/xhtml+xml",
      Host: "www.amazon.com",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
    },
  });

  let products = [];
  const dom = new JSDOM(response.data);
  dom.window.document
    .querySelectorAll("#search div[cel_widget_id^=MAIN-SEARCH]")
    .forEach((product) => {
      let nameEl = product.querySelector("h2 a span");
      let ratingEl = product.querySelector(
        "div.a-row.a-size-small span.a-icon-alt"
      );
      let ReviewsEl = product.querySelector(
        "span[data-component-type=s-client-side-analytics] span a span.a-size-base"
      );
      let imgUrl = product.querySelector("img").src;
      products.push({
        name: nameEl.textContent,
        rating: ratingEl != null ? ratingEl.textContent : "No Ratings yet",
        reviewsTotal: ReviewsEl != null ? ReviewsEl.textContent : "",
        imgUrl: imgUrl,
      });
    });

  console.log(products);
}

getSearchPage("creatine");
