import { createContext, useState, useEffect, useRef } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = ({...props}) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompt, setPrevPrompt] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");
    const resultContainerRef = useRef(null);

    const scrollToBottom = () => {
        resultContainerRef.current?.scrollIntoView({ behavior:'smooth'});
    };
    
    useEffect(()=>{
        scrollToBottom();
    }, [resultData]);

    const delayPara = (index,nextWord) => {
        setTimeout(function name(params){
            setResultData(prev=>prev+nextWord);
        },75*index)

    }

    const onSent = async (prompt) => {
        setResultData("")
        setLoading(true)
        setShowResult(true)
        setRecentPrompt(input)
        setPrevPrompt(prev=>[...prev, input])
        const response = await run(input)
        let responseArray = response.split("*");
        // const result = responseArray.filter(res => res).join("").replace("\n", "<br />");
        const result = responseArray.filter(res => res).map(res => res.replaceAll("\n", "<br />")).join("");
        // setResultData(result);
        console.log('result', result)
        console.log();
        for(let i=0; i<result.length; i++)
            {
                const nextWord = result[i]
                delayPara(i,nextWord+"")
    
               
            }
        let newResponse ;
        setLoading(false)
        setInput("")
        return;  
     }

    const contextValue = {
        prevPrompt,
        setPrevPrompt,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
    }
    return (
        <Context.Provider value={contextValue}>
            {props.children}
            <div ref={resultContainerRef}></div>
        </Context.Provider>
    )
}
export default ContextProvider;