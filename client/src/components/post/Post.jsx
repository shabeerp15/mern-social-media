import './post.css'
import {MoreVert} from '@mui/icons-material'
import {useContext, useEffect, useState} from 'react'
import axios from 'axios'
import {format} from 'timeago.js'
import {Link} from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

const Post = ({post}) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const [like, setLike] = useState(post.likes.length)
    const [isLiked, setIsLiked] = useState(false)
    const [user, setUser] = useState({})
    const {user:currentUser} = useContext(AuthContext)

    useEffect(()=>{
        setIsLiked(post.likes.includes(currentUser._id))
    },[currentUser._id, post.likes])

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await axios.get(`/users/?userId=${post.userId}`)
            setUser(res.data)
        }
        fetchUsers()
    }, [post.userId])

    const likeHandler = () => {
        try {
            axios.put(`/posts/${post._id}/like`,{userId:currentUser._id})
        } catch (error) {
            
        }
        setLike(isLiked ? like - 1 : like + 1)
        setIsLiked(!isLiked)
    }

    return (
        <div className='post'>
            <div className='postWrapper'>
                <div className='postTop'>
                    <div className='postTopLeft'>
                        <Link to={`/profile/${user.username}`}>
                            <input
                                type='image'
                                className='postProfileImg'
                                src={user.profilePicture ? PF+user.profilePicture : PF + 'noAvatar.png'}
                                alt=''
                            />
                        </Link>
                        <span className='postUsername'>{user.username}</span>
                        <span className='postDate'>
                            {format(post.createdAt)}
                        </span>
                    </div>
                    <div className='postTopRight'>
                        <MoreVert />
                    </div>
                </div>
                <div className='postCenter'>
                    <span className='postText'>{post?.desc}</span>
                    {post.image && (
                        <input
                            type='image'
                            className='postImg'
                            src={PF + post.image}
                            alt='Posts'
                        />
                    )}
                </div>
                <div className='postBottom'>
                    <div className='postBottomLeft'>
                        <input
                            type='image'
                            className='likeIcon'
                            src={`${PF}like.png`}
                            alt='Like Icon'
                            onClick={likeHandler}
                        />
                        <input
                            type='image'
                            className='likeIcon'
                            src={`${PF}heart.png`}
                            alt='Heart Icon'
                            onClick={likeHandler}
                        />
                        <span className='postLikeCounter'>
                            {like} people like it
                        </span>
                    </div>
                    <div className='postBottomRight'>
                        <span className='postCommentText'>
                            {post.comment} comments
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post
