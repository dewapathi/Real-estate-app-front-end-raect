import React, { useState } from 'react';
import "../filter/filter.scss";
import { useSearchParams } from "react-router-dom";

export default function Filter() {
    const [searchParam, setSearchParam] = useSearchParams();
    const [query, setQuery] = useState({
        type: searchParam.get("type") || "",
        city: searchParam.get("city") || "",
        property: searchParam.get("property") || "",
        minPrice: searchParam.get("minPrice") || 0,
        maxPrice: searchParam.get("maxPrice") || 10000000000,
        bedroom: searchParam.get("bedroom") || 1
    });
    // console.log('searchParam', searchParam.get("city"));
    const handleChange = (e) => {
        setQuery({
            ...query,
            [e.target.name]: e.target.value
        })
    };
    console.log('333', query);
    const handleFilter = () => {
        setSearchParam(query)
    }

    return (
        <div className="filter">
            <h1>Search Results for <b>{searchParam.get("city")}</b></h1>
            <div className="top">
                <div className="item">
                    <label htmlFor="city">Location</label>
                    <input
                        type="text"
                        id='city'
                        name='city'
                        placeholder='City Location'
                        onChange={handleChange}
                        defaultValue={query.city}
                    />
                </div>
            </div>
            <div className="bottom">
                <div className="item">
                    <label htmlFor="type">Type</label>
                    <select name="type" id="type" onChange={handleChange} defaultValue={query.type}>
                        <option value="">any</option>
                        <option value="buy">Buy</option>
                        <option value="rent">Rent</option>
                    </select>
                </div>
                <div className="item">
                    <label htmlFor="property">Property</label>
                    <select name="property" id="property" onChange={handleChange} defaultValue={query.property}>
                        <option value="">any</option>
                        <option value="apartment">Apartment</option>
                        <option value="house">House</option>
                        <option value="condo">Condo</option>
                        <option value="land">Land</option>
                    </select>
                </div>
                <div className="item">
                    <label htmlFor="minPrice">Min Price</label>
                    <input
                        type="number"
                        id='minPrice'
                        name='minPrice'
                        placeholder='any'
                        onChange={handleChange}
                        defaultValue={query.minPrice}
                    />
                </div>
                <div className="item">
                    <label htmlFor="maxPrice">Max Price</label>
                    <input
                        type="number"
                        id='maxPrice'
                        name='maxPrice'
                        placeholder='any'
                        onChange={handleChange}
                        defaultValue={query.maxPrice}
                    />
                </div>
                <div className="item">
                    <label htmlFor="bedroom">Bedroom</label>
                    <input
                        type="number"
                        id='bedroom'
                        name='bedroom'
                        placeholder='any'
                        onChange={handleChange}
                        defaultValue={query.bedroom}
                    />
                </div>
                <button onClick={handleFilter}>
                    <img src="/images/search.png" alt="" />
                </button>
            </div>
        </div>
    )
};
