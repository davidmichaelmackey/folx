import React, {useState, useEffect} from 'react';
import api from 'utils/API';

import {
    AttachFileOutlined,
    ImageOutlined,
    MicOutlined,
    EditOutlined,
    GifBoxOutlined,
    MoreHorizOutlined,
    DeleteOutlined
} from '@mui/icons-material';

import { 
    Box, 
    Divider, 
    Typography, 
    InputBase, 
    useTheme, 
    Button, 
    IconButton, 
    useMediaQuery 
} from '@mui/material';

import Dropzone from 'react-dropzone';
import FlexBetween from './style-components/FlexBetween';
import ProfilePic from './style-components/ProfilePic';
import { useDispatch, useSelector } from 'react-redux';
import {setPosts} from "state";
import WidgeWrap from './style-components/WidgeWrap';

function CreatePost({image}) {
    const dispatch = useDispatch();
    // State to represent if the user clicks the 'image button' to open up a place to drop an image
    const [isImage, setIsImage] = useState(false);
    // State to store the actuall image if the decide to dropit/upload it
    const [uploadImage, isUploadImage] = useState(null)
    // State to represent post content
    const [post, setPost] = useState("");

    const {palette} = useTheme();
    // const {_id} = useSelector((state) => state.user);
    // const token = useSelector((state) => state.token);
    const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");
    const mediumMain = palette.neutral.mediumMain;
    const medium = palette.neutral.medium; 

    const createPost = async (data) => {
        const newPost = await api.createPost(data);
    };

  return (
    <WidgeWrap>
       <FlexBetween gap="1.5rem">
        <ProfilePic image={image} />
        <InputBase
            placeholder='Tell us about your meal?' 

        
        />
        </FlexBetween> 
    </WidgeWrap>
  )
}

export default CreatePost