import './closeFriend.css'

const CloseFriend = ({user}) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    return (
        <li className='sidebarFriend'>
            <input
                type='image'
                src={PF+user.profilePicture}
                alt='sidebar image'
                className='sidebarFriendImg'
            />
            <span className='sidebarFriendName'>{user.username}</span>
        </li>
    )
}

export default CloseFriend
