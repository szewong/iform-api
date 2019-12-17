import React, {useState, useEffect} from "react";
import { API } from 'aws-amplify';


const IFormPages = () =>{
    const [pages, setPages] = useState([])

    useEffect(() => {
        const access_token = window.localStorage.getItem('access_token')

        let myInit = { 
            headers: {
                'Authorization': 'Bearer '+access_token
            }, 
            queryStringParameters: { 
                limit: 5
            }
        }
        API.get('iformapi', '/api/v60/profiles/1/pages', myInit).then (response => {
            console.log(response)
            setPages(response.data)
        }).catch(error => {
            console.log(error)
        })
    }, [])

    return (
        <div><h1>iFormPages</h1>
        {pages.map((p) => (
            <div key={p.id}>
                <h3> {p.id} </h3>
                <p> {p.name} </p>
            </div>
        ))
        }
        </div>
    )

}

export default IFormPages