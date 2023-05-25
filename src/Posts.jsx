import React, { useEffect, useState } from 'react'
import './Posts.css'
import he from 'he';
import htmlReactParser from 'html-react-parser';

function Posts() {
    const [myData, setmyData] = useState([]);
    const [decoded , setDecoded] = useState();
    useEffect(()=>{
        async function fetchData() {
             await fetch('https://www.reddit.com/r/reactjs.json')
            .then(response => response.json())
            .then(data =>{
                const post = data.data.children;
                setmyData(post)
            })

        };
        fetchData();
    },[])

  return (
    <>

<div className="container">
        <div className="container__wrapper">
            <div className="cards">
                {
                   myData.map((item, id) => {
                    // Decode the selftext_html
                    // const decodedSelfText = item.data.selftext_html ? he.decode(item.data.selftext_html) : '';
                    const decodedSelfText = item.data.selftext_html ? htmlReactParser(item.data.selftext_html) : '';
                  
                    return (
                      <div className="card" key={id}>
                        <div className="title">{item.data.title}</div>
                        <div className="selftText" dangerouslySetInnerHTML={{ __html: decodedSelfText }}></div>
                        <div className="url">Checkout Post: <a href={item.data.url}>Click me</a></div>
                        <div className="score">Score: {item.data.score}</div>
                      </div>
                    );
                  })

                  
                }
              
            </div>
        </div>
    </div>
    </>
  )
}

export default Posts


