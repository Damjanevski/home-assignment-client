import "./card.css";

export type ItemType = {
    id: string,
    author: string,
    url: string,
    title: string,
    selftext: string,
    thumbnail?: string,
}

function Card({ item }: { item: ItemType }) {
    console.log(item)
    return (
        <div className="card"  >
            {/* TOKEN IS NEEDED FOR THE THUMBNAIL IMAGE - RETURNING 403 */}
            {item.thumbnail && <img src={item.thumbnail} />}
            <h3>{item.title}</h3>
            <span>-{item.author}-</span>
            <p>{item.selftext}</p>
            <button
                className="link"
                type="button"
                onClick={(e) => {
                    e.preventDefault();
                    window.open(item.url, '_blank', 'noreferrer');
                }}
            >Source:  {item.url}</button>
        </div>

    )
}


export default Card