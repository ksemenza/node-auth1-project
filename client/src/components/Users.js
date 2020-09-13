import React, { useState, useEffect } from 'react';
import axios from 'axios';




const Users = props => {
    const [users, setUsers] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:9000/api/users', {
            headers: {
                username: props.user.username,
                password: props.user.password
            }
        })
        .then(response => {
            console.log(response);
            setUsers(response.data)
        })
        .catch(err => {
            console.log(err);
        });
    }, [props.user.password, props.user.username]);

    return (
        <div>
            {!props.isLoggedIn && <h2 className='welcome'>Log in to See Friends</h2>}
            
            {props.isLoggedIn && users &&
            <div className='users-box'>{users.map((user, index) => {
                return (
                    <div key={user.id} className='user-box'>
                        <h2>{user.username}</h2>
                        <div className='img-container'>
                     
                        </div>
                    </div>
                )
            })}
                </div>
            }
        </div>
    )
}

export default Users;