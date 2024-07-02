import React, { useRef } from 'react';
import { useDocument } from 'react-firebase-hooks/firestore';
import { db } from '../../config/config';
import {  doc, updateDoc } from 'firebase/firestore';


const Address = ({user, stringid ,edit_adderss}) => {
  
  const [value, loading, error] = useDocument(doc(db, user.uid,stringid ));
  const input=useRef(null)
  if(loading){
  return(
    <>
    <main><loading/></main>
    </>
  )
}
  if(value){
    
  return (

  
    <div>

        <div className="address-task">
              <input style={{ textDecoration: value.data().completed=== true ?      "line-through wavy red": null}} ref={input} type="text" defaultValue={value.data().title} onChange={ (eo) => {
              edit_adderss(eo)
              }} />
              <i onClick={() => {
                input.current.focus()
              }} class="fa-regular fa-pen-to-square"></i>
            </div>
      
    </div>
  )};
}

export default Address;
