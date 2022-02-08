import React from "react";
import { useParams } from "react-router-dom";

export default function BuslineDetail() {
    const { name } =  useParams()
    return <>
        {name}
    </>;
}