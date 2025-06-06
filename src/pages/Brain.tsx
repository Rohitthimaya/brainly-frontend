import { useEffect, useState } from "react";
import { Card2 } from "../components/Card2";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Loader } from "../components/Loader";

export function Brain() {
    const [contents, setContents] = useState([])

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/brain/${localStorage.getItem("hash")}`, {
            headers: {
              "Authorization": "Bearer " + localStorage.getItem("token")
            }
          })
          .then((response) => {
            console.log(response)
            setContents(response.data.content);
          });
    }, [])

    if(contents.length == 0){
        return <Loader />
    }

    return <div className='flex gap-4 flex-wrap'>
        {contents.map(({ type, link, title }) => (
            <Card2 key={link} type={type} link={link} title={title} />
        ))}
    </div>
}