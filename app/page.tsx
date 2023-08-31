import Image from 'next/image'
import {Navbar} from '../components/Navbar'
import Footer from '@/components/Footer'
import BrandsBlock from '@/components/landing/BrandsBlock'



export default function Home() {
  return <div>
    <Navbar/>
    <BrandsBlock/>
    <Footer/>
  </div>
}
