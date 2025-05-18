import React, { useEffect } from 'react'
import Card from '../Card/Card'
import { isLoggedIn } from '../../Network/auth.api'
import { useNavigate } from 'react-router-dom'

export default function Home() {
    const navigate = useNavigate()
   

    async function isLogged(){
        await isLoggedIn()
        .then((res) => {
          console.log("llogin???",res)
        })
        .catch((res) => {
          console.log("llogin???",res)
            navigate("/auth/login");
        })
    }

  useEffect(() => {
    isLogged()
  }, []);


  return (
    <>
    <Card />
    </>

  )
}
