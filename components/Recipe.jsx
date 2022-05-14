import React  from 'react';
import Link from 'next/link';
import Image from 'next/image';

const RecipeCard = ({recipes}) => {
    const {title , slug , thumbnail, cookingTime} = recipes.fields;
   
    return ( <div className="card">
       <div className ="featured">
    <Image src={'https:' + thumbnail.fields.file.url}  
    width={350}
    height={250}
     />
       </div>
       <div className="content">
           <div className="info">
               <h4>{title}</h4>
               <p>Takes approximately {cookingTime} mins to make</p>
           </div>
           <div className="action">
           <Link href={'/recipes/' + slug} ><a>Cook This</a></Link>
           </div>
       </div>
       <style jsx>{`

       .card {
           display: flex;
           flex-direction: column;
           justify-content: center;
           margin:0px;
       }

       .content {
        max-width: 350px;
        min-height: 150px;
        background: white; 
        margin:0px;
       }

       a {
           padding: 0.2em;
           background: orange;
           color: white;
           font-weight: bold;
       }
      
      `}</style>
    </div> );
}
 
export default RecipeCard;