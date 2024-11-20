   import React, { useContext } from 'react';
   import MyContext from '../context/Mycontext.js'; 

   const MyComponent = () => {
     const contextValue = useContext(MyContext);

     if (!contextValue) {
       throw new Error('MyComponent must be used within a MyContext.Provider');
     }

     return <div>{contextValue.someValue}</div>;
   };

   export default MyComponent;