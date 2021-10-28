import './Topbar.css'
import { Chat, Notifications, Person, Search } from '@mui/icons-material'
import { Badge } from '@mui/material'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

const Topbar = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const { user } = useContext(AuthContext)

    return (
        <div className='topbarContainer'>
            <div className='topbarLeft'>
                <Link to='/' style={{ textDecoration: 'none' }}>
                    <span className='logo'>Facebook</span>
                </Link>
            </div>
            <div className='topbarCenter'>
                <div className='searchBar'>
                    <Search className='searchIcon' />
                    <input
                        placeholder='search for friend, posts or video'
                        className='searchInput'
                    />
                </div>
            </div>
            <div className='topbarRight'>
                <div className='topbarLinks'>
                    <div className='topbarLink'>Home</div>
                    <div className='topbarLink'>Timeline</div>
                </div>
                <div className='topbarIcons'>
                    <div className='topbarIconItem'>
                        <Badge badgeContent={2} color='secondary'>
                            <Person />
                        </Badge>
                    </div>
                    <Link to='/messenger' style={{color:'white'}}>
                        <div className='topbarIconItem'>
                            <Badge badgeContent={2} color='secondary'>
                                <Chat />
                            </Badge>
                        </div>
                    </Link>
                    <div className='topbarIconItem'>
                        <Badge badgeContent={2} color='secondary'>
                            <Notifications />
                        </Badge>
                    </div>
                </div>
                <Link to={`/profile/${user.username}`}>
                    <input
                        type='image'
                        src={
                            user.profilePicture
                                ? PF + user.profilePicture
                                : PF + 'noAvatar.png'
                        }
                        alt='profile picture'
                        className='topbarImg'
                    />
                </Link>
            </div>
        </div>
    )
}

export default Topbar
