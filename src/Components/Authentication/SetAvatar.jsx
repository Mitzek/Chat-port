// import React, { useState, useEffect } from "react";
// import authStyles from "./authStyles.module.css";
// import axios from 'axios';
// import {useNavigate} from 'react-router-dom';
// import {avatarRoute} from './API/APIRoutes'
// import {Buffer} from 'buffer';
// import Chat from '../Chat/Chat'

// function SetAvatar() {
//   const [avatar, setAvatar] = useState([]);
//   const [selectedAvatar, setSelectedAvatar] = useState(undefined)
// const [currentUser, setCurrentUser] = useState()
// const [avtIndex, setAvtIndex] = useState()

//   useEffect( ()=>{
//     const getCurrentUser = async () => {
              
//         if(!localStorage.getItem("chat-app-user")){
//             navigate("/login");
//         }
//         else {
//             setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
//         }
//     }
//     getCurrentUser();
    
    
//     },[])
    


//   useEffect(() => {
    
//     const images = [{
//         key: "1",
//         link: "https://avatars.dicebear.com/api/adventurer/.svg?b=%23545454",
//       },
//       {
//         key: "2",
//         link: "https://avatars.dicebear.com/api/adventurer/33456.svg?b=%23545454",
//       },
//       {
//         key: "3",
//         link: "https://avatars.dicebear.com/api/adventurer/57.svg?b=%23545454",
//       },
//       {
//         key: "4",
//         link: "https://avatars.dicebear.com/api/adventurer/51456.svg?b=%23545454",
//       },
//       {
//         key: "5",
//         link: "https://avatars.dicebear.com/api/adventurer/12.svg?b=%23545454",
//       },
      
//     ]
    

//     setAvatar(images);
    
//   }, [])
//   const navigate = useNavigate();
//   const setProfilePicture = async () => {  

//     const {_id} = currentUser;
//     const {data} = await axios.post(avatarRoute,{
//       _id,selectedAvatar
//     });
//     if(data.status===false) {
//         console.log("Error" + data.msg)
//     }
//     else {
//       localStorage.setItem("chat-app-user", JSON.stringify(data.user));
//      // <Chat selectedAvatar={selectedAvatar}/>
//      navigate("/chat")
//     }
//   };

//   return (
//     <>
//     <h2 className={authStyles.avatarTitle}>Pick your avatar.</h2>
//     <div className={authStyles.avatarContainer }>
    
//       {
        
   
//             avatar.map((avt, index) => {
//               return (
//                 <div 
//                 key={index}
//                 className={`${authStyles.avatar} ${avtIndex === index ? authStyles.selectedAvatar : ""}` }>
//                   <img  src={avt.link} alt="avatar" onClick={()=>{setSelectedAvatar(avt.link); setAvtIndex(index)}}/>
//                 </div>
//               )
//                } )
               
//              }
//              <button onClick={setProfilePicture}>Set Avatar</button>
//     </div>
    
                
//     </>
    
//   )
// }

// export default SetAvatar