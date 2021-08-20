import React, { useState } from 'react';

export default function AddCredential(): JSX.Element {
    
        const [masterpassword, setMasterpassword] = useState("");

async function addCredential() {

    const response = await fetch("/api/credentials"), {
        headers: {
            Authorization: masterpassword,
        }
    }
    
}
    
}


  return (
    <>
      <div>
        <p>Add a service</p>
        <label>
          <input type="text" />
        </label>
        <p>Add a username</p>
        <label>
          <input type="text" />
        </label>
        <p>Add a password</p>
        <label>
          <input type="text" />
        </label>
        <p>Please enter master password</p>
        <label>
          <input type="password" />
        </label>
      </div>
    </>
  );
}
