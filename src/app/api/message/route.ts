import { chatbotPrompt } from '@/app/helpers/constants/chatbot-prompts'
import {
  ChatGPTMessage,
  OpenAIStream,
  OpenAIStreamPayload,
} from '@/lib/openai-stream'
import { MessageArraySchema } from '@/lib/validators/message'

export async function POST(req: Request) {
  const { messages } = await req.json()

  const parsedMessages = MessageArraySchema.parse(messages)

  const outboundMessages: ChatGPTMessage[] = parsedMessages.map((message) => {
    return {
      role: message.isUserMessage ? 'user' : 'system',
      content: message.text,
    }
  })

  outboundMessages.unshift({
    role: 'system',
    content: chatbotPrompt,
  })

  {/* Payload festlegen, die an die OPENAI-API gesendet wird */}
  const payload: OpenAIStreamPayload = {
    model: 'gpt-3.5-turbo',
    messages: outboundMessages,
    temperature: 0.4,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 150,
    stream: true,
    n: 1,
  }

  {/* Funktion definieren, die die Payload nimmt und uns einen Stream mit den Antworten zurückgibt */}
  const stream = await OpenAIStream(payload)

  {/* Stream als Response zurückgeben */}
  return new Response(stream)
}