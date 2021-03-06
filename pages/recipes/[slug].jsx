import React  from 'react';
import { createClient } from "contentful";
import Image from 'next/image';
import Skeleton from '../../components/Skeleton';
 import {documentToReactComponents}  from '@contentful/rich-text-react-renderer';
// var documentToReactComponents = require('@contentful/rich-text-react-renderer');


//This gives us access to contentful.
const client = createClient({
  space: process.env.CONTENTFUL_API_KEY,
  accessToken: process.env.ACCESS_TOKEN
})

export const getStaticPaths = async () => {
  const res = await client.getEntries({
    //Which content type do you want?
    content_type: 'recipe'
  })

  const paths = res.items.map(item => {
    return {
      params : {slug : item.fields.slug}
    }
  })

  return {
    paths: paths,
    fallback : true
  }
}

export async function getStaticProps({params}) {

 const {items} = await client.getEntries({
   content_type: 'recipe',
  'fields.slug' : params.slug
 });

 if (!items.length) {
   return {
     redirect : {
       destination : `/`,
       permanent : false
     }
   }
 }

 return {
   props: {recipe : items[0]},
   revalidate : 1 
   //If change is made in the content, it needs to be refreshed and revalidate does that for us 1 meand it does that within 1 second.
 }

}



export default function RecipeDetails({recipe}) {

  if (!recipe) return <Skeleton />

  const {featuredImage, title, cookingTime, ingredients, method} = recipe.fields;
  return (
    <div>
     <div className="banner">
       <Image 
       src={"https:" + featuredImage.fields.file.url}
       width={featuredImage.fields.file.details.image.width}
       height={featuredImage.fields.file.details.image.height}
       />
       <h2>{title}</h2>
     </div>
     <div className="info">
       <p>Takes about {cookingTime} mins to cook</p>
       {ingredients.map(img => (
         <span key={img}>{img}<br></br></span>
       ))}
     </div>
     <div className="method">
       <h3>Method</h3>
       <div>{documentToReactComponents(method)}</div>
     </div>
    </div>
  )
}