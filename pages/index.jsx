import React  from 'react';
import { createClient } from "contentful"
import RecipeCard from '../components/Recipe';

export async function getStaticProps() {

  //This gives us access to contentful.
  const client = createClient({
    space: process.env.CONTENTFUL_API_KEY,
    accessToken: process.env.ACCESS_TOKEN
  })

  const res = await client.getEntries({content_type : 'recipe'})


  //This creates a prop where you can store data and pass it on to Recipes.
  return { props : {recipes : res.items},
           revalidate: 1        
}
}

export default function Recipes({recipes}) {
  return (
    <div className="recipe-list">
      {recipes.map(a => (
        <RecipeCard key={a.sys.id} recipes={a} />
      ))}

      <style jsx>{`

     .recipe-list {
    display: grid;
    grid-template-columns: 0.5fr 0.5fr 0.5fr 0.5fr;
    grid-gap: 1em;
   justify-items: center;
}

`}</style>
    </div>
  )

  

}

