import React from 'react'
import BrandsElement from './BrandsElement';
import { brandInfo } from '@/interfaces/brandInfo';
import GradientHeading from './GradientHeading';

const brandsData: brandInfo[] = [
  {
    brandName: 'Audi',
    resultsCount: 7689,
    models: ['Audi A1', 'Audi A1', 'Audi A1', 'Audi A1', 'Audi A1']
  },
  {
    brandName: 'BMW',
    resultsCount: 6578,
    models: ['BMW 1er', 'BMW 2er', 'BMW 3er', 'BMW 4er', 'BMW X1']
  },
  {
    brandName: 'Ford',
    resultsCount: 9832,
    models: ['Ford Ecosport', 'Ford Fiesta', 'Ford Focus', 'Ford Ka', 'Ford Mondeo']
  },
  {
    brandName: 'Mercedes-Benz',
    resultsCount: 3476,
    models: ['Mercedes B-Class', 'Mercedes C-Class', 'Mercedes CLA', 'Mercedes E-Class', 'Mercedes GLA']
  },
  {
    brandName: 'Opel',
    resultsCount: 5623,
    models: ['Opel Adam', 'Opel Astra', 'Opel Corsa', 'Opel Insignia', 'Opel Mokka']
  },
  {
    brandName: 'Volkswagen',
    resultsCount: 9834,
    models: ['Volkswagen Golf', 'Volkswagen Polo', 'Volkswagen Passat', 'Volkswagen Touran', 'Volkswagen up!']
  },
  {
    brandName: 'Porsche',
    resultsCount: 9023,
    models: ['Porsche Taycan', 'Porsche Cayenne', 'Porsche Panamera', 'Porche Caymen', 'Porsche Boxster']
  }
];

const BrandsBlock = () => {
  return (
    <section className='flex flex-col items-center'>
      <GradientHeading title='Popular Brands'/>     
      <div className='grid grid-cols-5 gap-y-4 gap-x-5'>
        {brandsData.map(brandsDataEl => (
          <BrandsElement key={brandsDataEl.brandName} brandInfo={brandsDataEl} />
        ))}
      </div>
    </section>
  )
}

export default BrandsBlock