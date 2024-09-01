"use client";
import {useParams} from "next/navigation";

const Page = () => {
    const params = useParams();

    console.log("params", params?.id);

    return (
        <div>
            <h1>Chat Page {params?.id}</h1>
        </div>
    );
};

export default Page;