import { useEffect, useState } from "react"

const  WS_URL = "ws://localhost:8080"

export const useSocket = () => {
    const [socket, setSocket] = useState<WebSocket | null>(null)
    const [message, setMessage] = useState<any>(null)
    useEffect((() => {
        const ws = new WebSocket(WS_URL)
        ws.onopen = () =>{
            console.log("connected");
            setSocket(ws)
        }
        ws.onmessage = (event : MessageEvent) => {
            setMessage(JSON.parse(event.data))
        }
        ws.onclose = () => {
            setSocket(null)
        }

        return () => {
            ws.close()
        }
    }),[])
    return {socket, message};
}