import React from "react";
import Card, { ItemType } from "./card/Card";
import "./style.css";

function App() {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("")


  console.log(data)

  function handleSearch(e: { preventDefault: () => void; }) {
    setLoading(true)
    e.preventDefault();
    fetch(`http://localhost:3003/api?q=${searchValue}`)
      .then((res) => res.json())
      .then((data) => {
        const newArr = data.data.children.map((obj: any) => {
          const { data } = obj
          return {
            id: data.id,
            author: data.author || '',
            url: data.url || "",
            title: data.title || "",
            selftext: data.selftext || "",
            thumbnail: (data
              && data.preview
              && data.preview.images
              && !!data.preview.images[0]
              && data.preview.images[0]) ? data.preview.images[0].source.url
              : "no-thumbnail"
          }
        })
        setLoading(false)
        setData(newArr)
      });
  }

  return (
    <div className="app">
      <div className="main">
        <div className="search-form">
          <form className="form" onSubmit={handleSearch}>
            <h1>Search top posts on <span style={{ textDecoration: 'underline' }}>reddit</span> by title:</h1>
            <input className="input" type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
          </form>
          <button className="button" type="submit"  >
            Search
          </button>
        </div>
        <div className="cards">
          {loading ?
            "Loading Data " : data.length > 0 ? data.map((item: ItemType) => <Card key={item.id} item={item} />)
              : "No search result"}
        </div>
      </div>
    </div>

  );
}

export default App;