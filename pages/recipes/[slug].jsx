import React  from 'react';
import { createClient } from "contentful"
import Image from 'next/image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

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
    fallback : false
  }
}

export async function getStaticProps({params}) {

 const {items} = await client.getEntries({
   content_type: 'recipe',
  'fields.slug' : params.slug
 });

 return {
   props: {recipe : items[0]}
 }

}



export default function RecipeDetails({recipe}) {

  const {featuredImage, title, cookingTime, ingredients, method} = recipe.fields;

  console.log(recipe);
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