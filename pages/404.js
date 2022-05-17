import Link from 'next/link';
import React from 'react';
import {useEffect} from 'react';
import {useRouter} from 'next/router';

const  NotFound = () => {

    const router = useRouter();

    useEffect(() => {
     setTimeout(() => {
        router.push("/");
     }, 4000);
    } , []); //[] is a dependency, since we are passing an empty error it will run once it renders.

    return ( <><div className='not-found'>
        <h1>404</h1>
        <h2>Ooops! That page cannot be found :(</h2>
        <p>Redirecting to <Link href="/">Homepage</Link> for more marmite goodness ...... </p>
    </div><style jsx>{`
    .not-found {
          background: #fff;
          padding: 30px;
          box-shadow: 1px 3px 5px rgba(0,0,0,0.1);
          transform: rotateZ(-1deg);
        }
        h1 {
          font-size: 3em;
        }
    `}</style></>
    );
}
 
export default NotFound;