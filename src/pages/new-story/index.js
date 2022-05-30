import Marked from '@utils/markdown';
import {useEffect,useState} from 'react';

const onClick=(data)=>{
    console.log(data)
}
export default function (){

    return(
        <Marked onClickCallBack={onClick} />
    )
}