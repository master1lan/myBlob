import ReactMarkDown from "react-markdown";

export default function Article({author='saber',writeDay='May 7',content=''}){

    return(
        <article>
            <ReactMarkDown 
            children={markdown}
            
            />
        </article>
    )
}