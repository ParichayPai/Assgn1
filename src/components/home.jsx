import '../App.css';
import React from "react";
import Header from "./header"
import {Button} from "@material-ui/core";
import AddButton from "./addButton"
import Posts from "./postsToRender"
import data from "../listOfImgs"
let arrayForHoldingPosts = [];

function Home() {
    const postsPerPage = 3;
    // const [startSize, setStartSize] = React.useState(true);
    // const [baseSize, setBaseSize] = React.useState(9);
    let baseSize = 9;
    const [imageList, setImageList] = React.useState([]);
    const [next, setNext] = React.useState(9);

    const loopWithSlice = (start, end) => {
        const slicedPosts = data.slice(start, end);
        arrayForHoldingPosts = [...arrayForHoldingPosts, ...slicedPosts];
        setImageList(arrayForHoldingPosts);
    };

    React.useEffect(() => {
        //   if(startSize){
            loopWithSlice(0, baseSize);
        //       setStartSize(false);
        //   }
    }, []);

    const handleShowMorePosts = () => {
        if(next > data.length){
            return;
        }
        loopWithSlice(next, next + postsPerPage);
        setNext(next + postsPerPage);
    };

    const handleDelete = (index) => {
        const listOfPosts = [...arrayForHoldingPosts];
        listOfPosts.splice(index, 1);
        setImageList(listOfPosts);
    };

    const onDragOver = (e) => {
        e.preventDefault();
    }

    const onDragStart = (e, id) => {
        e.dataTransfer.setData("id", id);
    }

    const onDrop = (ev, cat) => {         
        let id = ev.dataTransfer.getData("id");  
        let tasks = imageList.filter((task) => {      
            if (task.name === id) {               
                task.category = cat;                 
            }                     
            return task;          
        });           
        setImageList([                 
            ...imageList,                 
            tasks          
        ]);    
    }

    const saveData = (title, desc, keywords, pic) => {
        // console.log(title);
        // console.log(desc["_immutable"]["currentContent"]["blockMap"]["_list"]["_tail"]["array"][0][1]["text"]);
        // console.log(keywords);
        // console.log(pic);

        let description = desc["_immutable"]["currentContent"]["blockMap"]["_list"]["_tail"]["array"][0][1]["text"];

        let post = {
            title,
            description,
            keywords,
            pic
        }
        console.log(post);
        setImageList([
            post,
            ...imageList
        ])
    }

    return (
        <>
        <Header />
        <hr />
        <div className={"appBody"}>
            <AddButton saveData={saveData}/>
            <hr />
            <div className="home"> 
            {(imageList.length === 0) ? 
            <div className={"center"}>{"No Documents Added!"}</div> 
            : <Posts 
                postsToRender={imageList} 
                delete={handleDelete} 
                onDragOver={onDragOver}
                onDragStart={onDragStart}
                onDrop={onDrop}
                />
            }
            
            </div>
            <Button 
                onClick={handleShowMorePosts} 
                disabled={next>=data.length}
                variant={"contained"}
            >Load more</Button>
        </div>
        </>
    );
}

export default Home;
