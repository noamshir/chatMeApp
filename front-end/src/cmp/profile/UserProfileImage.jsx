import React, { useEffect, useState } from 'react'
import {
  socketService,
  SOCKET_EMIT_CHECK_USER_CONNECTED,
  SOCKET_ON_USER_OFFLINE,
  SOCKET_ON_USER_ONLINE,
} from '../../services/socket.service'
export default function UserProfileImage({
  user,
  isLarge = false,
  withDot = true,
}) {
  const [isOnline, setIsOnline] = useState(false)

  useEffect(() => {
    setSockets()
    return () => {
      disableSockets()
    }
  }, [user])

  const setSockets = () => {
    socketService.emit(SOCKET_EMIT_CHECK_USER_CONNECTED, user._id)
    socketService.on(SOCKET_ON_USER_ONLINE, (userId) => {
      console.log(user._id === userId)
      if (user._id === userId) setIsOnline(true)
    })
    socketService.on(SOCKET_ON_USER_OFFLINE, (userId) => {
      if (user._id === userId) setIsOnline(false)
    })
  }
  const disableSockets = () => {
    socketService.off(SOCKET_ON_USER_ONLINE)
    socketService.off(SOCKET_ON_USER_OFFLINE)
  }

  const onlineClass = isOnline ? 'online' : 'offline'
  const sizeClass = isLarge ? 'large' : ''
  const border = withDot ? '' : 'border'
  return (
    <div className={`user-profile-image ${sizeClass} ${border}`}>
      {user.imgUrl ? (
        <img src={user.imgUrl} />
      ) : (
        <h1>{user.username.charAt(0)}</h1>
      )}
      {withDot && (
        <i className={`online-status ${sizeClass} ${onlineClass}`}></i>
      )}
    </div>
  )
}
