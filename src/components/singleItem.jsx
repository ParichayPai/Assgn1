import { Button, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import Comment from "./comment";
import Header from "./header";

const useStyles = makeStyles(() => ({
    singleItem: {
        marginLeft: 50,
        marginRight: 50,
    },
    header: {
        display: "flex",
        justifyContent: "space-between"
    },
    body:{
        display: "flex",
        flexDirection: "row",
        // justifyContent: "space-between"
    },
    image: {
        height: 300,
        width: 300,
        border: "2px solid black",
        // border: 2,
        // borderColor: "black"
    },
    description: {
        marginLeft: 20,
    },
    commentSection: {
        marginTop: 20,
        paddingLeft: 50,
        paddingRight: 50,
        paddingBlockEnd: 20,
    },
    newComment: {
        // border: "2px solid black",
        height: 200,
        marginTop: 20,
        marginBlockEnd: 20
    }
  }));

export default function SingleItem(props){
    const style = useStyles();
    const history = useHistory();
    // console.log(props.location.state);
    let {name, pic, description, comments} = props.location.state;

    const backFunction = () => {
        history.push("/assets");
    }

    return(
    <>
        <Header />
        <hr />
        <div className={style.singleItem}> 
            <div className={style.header}> 
                <Typography variant={"h4"}>{name}</Typography>
                <Button variant="contained" onClick={backFunction}>Back</Button>
            </div>
            <hr />
            <div className={style.body}>
                <div className={style.image}> 
                    {pic}
                </div>
                <div className={style.description}> 
                    {description}
                </div>
            </div>
            <hr />
            <div className={style.commentSection}>
                {comments.map(
                    comment => <Comment key={Object.values(comment)} data={comment} />
                )}
                <div className={style.newComment}>
                    <textarea name="newComment" id="" cols="70" rows="13"></textarea>
                </div>
                <Button variant="contained">Post Comment</Button>
            </div>
        </div>
    </>)
}
