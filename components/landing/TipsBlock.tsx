import React from 'react'
import GradientHeading from './GradientHeading'
import ArticleCard from './ArticleCard'
import { tipsInfo } from '@/interfaces/tipsInfo';

const tipsData: tipsInfo[] = [
  {
    tipType: 'Tips',
    title: 'How to Sell Your Car Safely Online',
    description: 'Learn practical steps to protect yourself from online car scams when buying or selling.',
  },
  {
    tipType: 'Explore',
    title: 'Where to Find Your Dream Car',
    description: 'Explore how to find the perfect car using easy categories and subcategories.',
  },
  {
    tipType: 'Tips',
    title: 'Benefits of registering to Autoheven',
    description: 'Understand the considerations of registering on our platform versus using it as a guest.',
  },
  {
    tipType: 'Tips',
    title: 'Using Filters Effectively',
    description: 'Discover how filters help you find your ideal car. Learn to narrow down options by price, year, mileage, type, and fuel to find the perfect match.',
  },
  {
    tipType: 'Explore',
    title: 'Exploring Electric Cars',
    description: 'Learn why electric cars are gaining popularity. Explore benefits, charging options, and how our platform supports the electric car movement.',
  },
  {
    tipType: 'Explore',
    title: 'Unique Vehicles: Trucks',
    description: 'Dive into special vehicles like tractors and motorhomes. Discover unique options in the \'Special Vehicles\' category to meet specific needs.',
  },
];

const TipsBlock = () => {
  return (
    <section className='flex flex-col items-center'>
        <GradientHeading title='Learn our platform'/>
        <div className='grid grid-cols-3 gap-y-2 gap-x-5'>
            {tipsData.map(tipsElement => <ArticleCard tipsInfo = {tipsElement} key={tipsElement.title}></ArticleCard>)}
        </div>
        
        
    </section>
    

  )
}

export default TipsBlock