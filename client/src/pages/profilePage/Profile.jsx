import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams} from 'react-router-dom';
import Navigation from 'components/Navigation';
import UserPanel from 'components/UserPanel';
import CreatePost from 'components/CreatePost';
import { Box, useMediaQuery } from '@mui/material';
import api from 'utils/API';
import Timeline from 'components/Timeline';

const Profile = ({isAuth, setIsAuth, profileId, setProfileId}) => {
  // Make fetch call here via the home component level, will do first thing tomorrow
  const [user, setUser] = useState(null) 
  // const [loggedInId, setLoggedInId] = useState(null)
  const [image, setImage] = useState('')
  const [location, setLocation] = useState('')
  const [followers, setFollowers] = useState(0)
  const [following, setFollowing] = useState(0)
  const [posts, setPosts] = useState([]);
  const [postState, setPostState ] = useState(false)
  const [loggedInUserDataLoaded, setLoggedInUserDataLoaded] = useState(false);

  // const [profileId, setProfileId] = useState("");
  
  const isNonMobileScreen = useMediaQuery("(min-width: 1000px)")
  const navigate = useNavigate();
  const param = useLocation();
  let loggedInId = ''
  let friendData = {}
  let { userId } = useParams();

  const activeUserStorage = localStorage.getItem("activeUser");// Retrieves activerUsers data from local storage
  const activeUser = JSON.parse(activeUserStorage); // parses the string into a JS object

  if (!activeUser || activeUser[1] !== true) {
    navigate('/')
  } else if (activeUser[1] === true) {
    loggedInId = activeUser[0] // if logged in, setUserId
  }

  // change this to profileId
  const getUser = async (profileId) => {
    const friend = await api.getUserById(profileId);
    friendData = friend.data;
    setUser(friendData)
    setImage(friendData.userImage)
   
  }
  
  const updatePosts = async () => {
    const posts = await api.getPosts();
    setPosts(posts.data);
  };

  useEffect( () => {
    getUser(userId)
    setProfileId(userId)

  }, [param]);

  useEffect( () => {
    if ( user?._id === loggedInId){
      setLoggedInUserDataLoaded(true); 
    }
  }, [user]);

  if (!user) { 
    return null
  }
  
  return (
    <Box>
      <Navigation setIsAuth={setIsAuth} userId={loggedInId} />
      <Box 
      width="100%" 
      padding="2rem 6%" 
      display={isNonMobileScreen ? "flex" : "block"}
      gap="0.5rem"
      justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreen ? "26%" : undefined}>
          <UserPanel user={user} following={following}/>
        </Box>
        <Box 
          flexBasis={isNonMobileScreen ? "42%" : undefined}
          marginTop={isNonMobileScreen ? undefined : "2rem"}
        >
          {loggedInUserDataLoaded && <CreatePost user={user} setPostState={setPostState} />}
          <Timeline 
            user={user} 
            posts={posts} 
            setPosts={setPosts} 
            setPostState={setPostState} 
            updatePosts={updatePosts} 
            postState={postState} 
            following={following} 
            setFollowing={setFollowing} 
            profileId={profileId} 
            setProfileId={setProfileId}
            />
        </Box>
        {isNonMobileScreen && (
          <Box flexBasis={"26%"}></Box>
        )}
      </Box>
    </Box>
  );
};

export default Profile;
