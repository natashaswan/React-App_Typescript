import React, { useRef } from "react";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    });
const openai = new OpenAIApi(configuration);

//
//
//

const Input = ({setImageURL} : {setImageURL: React.Dispatch<React.SetStateAction<string | undefined>>}) => {
    const inputValueRef = useRef<HTMLInputElement>(null);

    //
    //
    //

    const onClickHandler = () => {
        const enteredText: string | undefined = inputValueRef?.current?.value;
        //
        const generateImage = async () =>{
            if(enteredText){
                const imageParameters: {prompt: string} = {
                    prompt: enteredText,
                }
                const response = await openai.createImage(imageParameters);
                console.log(response);
                const urlData: string | undefined = response.data.data[0].url;
                setImageURL(urlData);
            }

        }
        generateImage();
    }

    return(
            <div className="input">
                <label htmlFor="input-text">Image Description</label>
                <input type='text' id='input-text' placeholder="image description" ref={inputValueRef}></input>
                <button onClick={onClickHandler}>
                    Generate image
                </button>
            </div> 
        )
}

export default Input;