
import React, { useState, useEffect } from "react";
import Link from 'next/link';
import axios from 'axios';
import {useRouter} from "next/router";
import { useForm } from "react-hook-form";
import cookie from 'js-cookie';
import Alert from 'react-popup-alert';

const Externalpages = () => { 

	const [configurables, setConfigurables] = React.useState([]);
	const [url, setUrl] = React.useState('');

     useEffect(() => {
     getStatic();
     },[]);

     const router = useRouter();
     const {id} = router.query;
   

    const getStatic = async() => {
       const conf = await axios.get(`https://winupskill.in/api/api/configurables?type=embedurl`);
       const filteredData = conf.data.data.filter(item => item.typeid.includes(id));
       setUrl(filteredData[0].name);

    }  

    return (
        

			    <div style={{ width: '100%', height: '100vh' }}>
			      <iframe
			        src={url}
			        title="Embedded Content"
			        style={{ width: '100%', height: '100%', border: 'none' }}
			      ></iframe>
			    </div>
       
         
    )
}




export default Externalpages;




 