const title = 'ChatMe'
const icon =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Google_Chat_icon_%282020%29.svg/1024px-Google_Chat_icon_%282020%29.svg.png?20201126121046'

function notifyUser(msg, sender) {
  if (!document.hidden) return

  const body = `${sender}: ${msg}`

  if (!('Notification' in window)) {
    // Check if the browser supports notifications
    alert('This browser does not support desktop notification')
  } else if (Notification.permission === 'granted') {
    // Check whether notification permissions have already been granted;
    // if so, create a notification
    const notification = new Notification(title, {
      body,
      icon,
    })
    notification.onclick = () => {
      window.focus()
    }
    // …
  } else if (Notification.permission !== 'denied') {
    // We need to ask the user for permission
    Notification.requestPermission().then((permission) => {
      // If the user accepts, let's create a notification
      if (permission === 'granted') {
        const notification = new Notification(title, {
          body,
          icon,
        })
        notification.onclick = () => {
          window.focus()
        }
      }
    })
  } else {
    console.log(Notification.permission)
  }
}

export default notifyUser
