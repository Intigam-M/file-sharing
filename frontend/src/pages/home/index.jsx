import iaxios from '~/utils/axios'
import { useEffect } from 'react'

function Home() {


useEffect(() => {
    iaxios.get('file/list/').then(res => {
        console.log(res)
    })
},[])


  return (
    <div>Home</div>
  )
}

export default Home