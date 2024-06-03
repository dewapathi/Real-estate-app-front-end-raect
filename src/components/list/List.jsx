import React from 'react';
import "../list/list.scss";
import { listData } from "../../lib/dummyData";
import Card from "../card/Card";

export default function List({data}) {
    return (
        <div className="list">
            {data?.map(item => (
                <Card key={item.id} item={item} />
            ))}
        </div>
    )
};
