import { useEffect, useRef, useState } from 'react';

const useWebSocket = <T,>(url: string) => {
    const [messages, setMessages] = useState<T[]>([]);
    const socketRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        socketRef.current = new WebSocket(url);

        socketRef.current.onopen = () => {
            console.log('WebSocket connection opened');
        };

        socketRef.current.onmessage = (event) => {
            const parsedData: T = JSON.parse(event.data);
            setMessages((prevMessages) => [...prevMessages, parsedData]);
        };

        socketRef.current.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        socketRef.current.onclose = () => {
            console.log('WebSocket connection closed');
        };

        return () => {
            socketRef.current?.close();
        };
    }, [url]);

    const sendMessage = (message: T) => {
        if (socketRef.current?.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify(message));
            //send form data
            // socketRef.current.send(message as unknown as string);
        } else {
            console.error('WebSocket is not open');
        }
    };

    return { messages, sendMessage };
};

export default useWebSocket;