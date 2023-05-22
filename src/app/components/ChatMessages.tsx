

import { FC, HTMLAttributes } from "react"

interface ChatMessagesProps extends HTMLAttributes<HTMLDivElement> {}

const ChatMessages: FC<ChatMessagesProps> = ({ className, ...props }) => {
    return <div {...props}>ChatMessage</div>
}

export default ChatMessages