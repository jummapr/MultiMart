"use client";


import {useParams} from "next/navigation";


const Chat = () => {

    const params = useParams<{id: string}>();

    console.log(params);

    const chatId: string = params.id;

    return (
        <div>
            <h1>Chat {chatId}</h1>
        </div>
    )
}

export default Chat