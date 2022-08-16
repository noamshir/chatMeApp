export const getReceiver = (chatMembers, user) => {
    if(!chatMembers || !user) return null
    return chatMembers.find((chatMember) => chatMember._id !== user._id)
   }