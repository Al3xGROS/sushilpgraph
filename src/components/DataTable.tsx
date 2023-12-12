'use client'

import React, { useState } from 'react'

const DataTable = () => {
    const [data, setData] = useState<any>()
    const [id, setId] = useState<String>("")

    function queryData() {
        let url = "https://api.thegraph.com/subgraphs/name/sushiswap/exchange"
        let query = `
        query getPair($_id: ID!) {
            pair(id: $_id) {
              id
              name
              token0 {
                id
                symbol
              }
              token1 {
                id
                symbol
              }
              liquidityPositions(first: 3, orderBy: liquidityTokenBalance, orderDirection: desc) {
                user {
                  id
                }
                liquidityTokenBalance
              }
            }
        }`;

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: query,
                variables: { _id: id },
            }),
        })
        .then(response => response.json())
        .then(result => {
            setData(result.data.pair);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    return (
        <div>
            <div className='w-1/2 mx-auto flex justify-center'>
                <input
                    type="text"
                    placeholder="Sushiswap lp id"
                    onChange={(e) => setId(e.target.value)}
                    className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500"
                />
                <button
                    type="button"
                    onClick={queryData}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2 hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
                >
                    Let's go
                </button>
            </div>
            {data?.liquidityPositions && (
                <div className="w-full max-w-2xl mx-auto mt-8">
                    <h2 className="text-2xl font-bold mb-4">{data.name} Liquidity Top Wallets</h2>
                    <table className="min-w-full bg-white border border-gray-300 shadow-md">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b">User ID</th>
                                <th className="py-2 px-4 border-b">Liquidity Token Balance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.liquidityPositions.map((position: any, index: any) => (
                                <tr key={index}>
                                    <td className="py-2 px-4 border-b">{position.user.id}</td>
                                    <td className="py-2 px-4 border-b">{position.liquidityTokenBalance}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default DataTable
