import { useState } from "react"
import toast from "react-hot-toast"
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore"

// Files
import { db } from "../utils/firebase"
import { useAuth } from "../context/authContext"
import { useChatContext } from "../context/chatContext"

const useSendMessage = () => {
    const [loading, setLoading] = useState(false)
    const { selectedChat, user } = useChatContext()
    const { userInfo } = useAuth()

    const sendMessage = async (message) => {
        setLoading(true)
        try {
            await updateDoc(doc(db, "chats", selectedChat), {
                messages: arrayUnion({
                    senderId: userInfo.id,
                    text: message,
                    createdAt: new Date(),
                }),
            })

            const userIDs = [userInfo.id, user.id]

            const updateUserChatsPromises = userIDs.map(async (id) => {
                const userChatsRef = doc(db, "userchats", id);
                const userChatsSnapshot = await getDoc(userChatsRef);

                if (userChatsSnapshot.exists()) {
                    const userChatsData = userChatsSnapshot.data();
                    const chatIndex = userChatsData.chats.findIndex(
                        (c) => c.chatId === selectedChat
                    );

                    if (chatIndex !== -1) {
                        userChatsData.chats[chatIndex] = {
                            ...userChatsData.chats[chatIndex],
                            lastMessage: message,
                            isSeen: id === userInfo.id,
                            updatedAt: Date.now(),
                        };

                        await updateDoc(userChatsRef, {
                            chats: userChatsData.chats,
                        });
                    }
                }
            });

            // Execute all update operations concurrently
            await Promise.all(updateUserChatsPromises);
        } catch (e) {
            console.error("Error sending message:", e);
            toast.error(e.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, sendMessage }
}

export default useSendMessage
