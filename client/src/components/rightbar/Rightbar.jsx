import './rightbar.css'
import {Users} from '../../dummyData'
import Online from '../online/Online'
import {useContext, useEffect, useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {AuthContext} from '../../context/AuthContext'
import {Add, Remove} from '@mui/icons-material'
import { CircularProgress } from '@mui/material'

const Rightbar = ({user}) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const [friends, setFriends] = useState([])
    const {user: currentUser, dispatch} = useContext(AuthContext)
    const [followed, setFollowed] = useState(false)
    const [loading, setLoading] = useState(false)  

    // useEffect(() => {
    //     setFollowed(currentUser.followings.includes(user?._id))
    // },[])

    useEffect(() => {
        const getFriends = async () => {
            try {
                const friendList = await axios.get(`/users/friends/${user._id}`)
                setFriends(friendList.data)
            } catch (error) {
                console.log(error)
            }
        }
        getFriends()
    }, [user])

    const followHandler = async () => {
        setLoading(true)
        try {
            if (followed) {
                await axios.put('/users/' + user._id + '/unfollow', {
                    userId: currentUser._id,
                })
                dispatch({type: 'UNFOLLOW', payload: user._id})
            } else {
                await axios.put('/users/' + user._id + '/follow', {
                    userId: currentUser._id,
                })
                dispatch({type: 'UNFOLLOW', payload: user._id})
            }
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
        setFollowed(!followed)
    }

    const HomeRightbar = () => {
        return (
            <>
                <div className='birthdayContainer'>
                    <input
                        type='image'
                        className='birthdayImg'
                        src='assets/gift.png'
                        alt='Birthday Notification'
                    />
                    <span className='birthdayText'>
                        <b>Pola Foster</b> and <b>3 other friends</b> have a
                        birhday today.
                    </span>
                </div>
                <input
                    type='image'
                    className='rightbarAd'
                    src='assets/ad.png'
                    alt='advertise'
                />
                <h4 className='rightbarTitle'>Online Friends</h4>
                <ul className='rightbarFriendList'>
                    {Users.map((u) => (
                        <Online key={u.id} user={u} />
                    ))}
                </ul>
            </>
        )
    }

    const ProfileRightbar = () => {
        return (
            <>
                {user.username !== currentUser.username && (
                    <button
                        className='rigthbarFollowButton'
                        onClick={followHandler}
                        
                    >
                        {followed ? 'Unfollow' : 'Follow'}
                        {followed ? <Remove /> : <Add />}
                        {loading && <CircularProgress color='inherit' size='20px'/>} 
                    </button>
                )}
                <h4 className='rightbarTitle'>User information</h4>
                <div className='rightbarInfo'>
                    <div className='rightbarInfoItem'>
                        <span className='rightbarInfoKey'>City:</span>
                        <span className='rightbarInfoValue'>{user.city}</span>
                    </div>
                    <div className='rightbarInfoItem'>
                        <span className='rightbarInfoKey'>From:</span>
                        <span className='rightbarInfoValue'>{user.from}</span>
                    </div>
                    <div className='rightbarInfoItem'>
                        <span className='rightbarInfoKey'>Relationship:</span>
                        <span className='rightbarInfoValue'>
                            {user.relationship === 1
                                ? 'Single'
                                : user.relationship === 2
                                ? 'Married'
                                : ''}
                        </span>
                    </div>
                </div>
                <h4 className='rightbarTitle'>User friends</h4>
                <div className='rightbarFollowings'>
                    {friends.map((friend) => (
                        <Link
                            to={'/profile/' + friend.username}
                            style={{textDecoration: 'none'}}
                        >
                            <div className='rightbarFollowing'>
                                <input
                                    type='image'
                                    src={
                                        friend.profilePicture
                                            ? PF + friend.profilePicture
                                            : `${PF}noAvatar.png`
                                    }
                                    alt='Friends Profile Picture'
                                    className='rightbarFollowingImg'
                                />
                                <span className='rightbarFollowingName'>
                                    {friend.username}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </>
        )
    }
    return (
        <div className='rightbar'>
            <div className='rightbarWrapper'>
                {user ? <ProfileRightbar /> : <HomeRightbar />}
            </div>
        </div>
    )
}

export default Rightbar
