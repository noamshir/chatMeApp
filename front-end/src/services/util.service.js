export const utilService = {
  getUnreadMsgCount,
  markAllAsRead,
  checkIfClickWasInContainer,
}

function getUnreadMsgCount(msgs, userId) {
  if (!msgs) return null
  let count = 0
  msgs.forEach((msg) => {
    if (!msg.viewers || !msg.viewers.length) {
      count++
    } else {
      const ans = msg.viewers.find((viewer) => {
        return viewer === userId
      })
      if (ans) return
      count++
    }
  })
  return count
}

function markAllAsRead(msgs, userId) {
  return msgs.map((msg) => {
    const isViewer = msg.viewers.find((viewer) => viewer === userId)
    if (isViewer) return msg
    return { ...msg, viewers: [...msg.viewers, userId] }
  })
}

function checkIfClickWasInContainer(target, item) {
  if (item !== target && !item.contains(target)) {
    return false
  }
  return true
}
