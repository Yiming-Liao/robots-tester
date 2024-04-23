'use client'

import React, { useState } from 'react';

function RobotsFetcher() {
    const [url, setUrl] = useState('');
    const [robotsContent, setRobotsContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchRobots = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch('/api/robots', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ url })
            });
            const data = await response.json();
            if (response.ok) {
                setRobotsContent(data.data);
            } else {
                throw new Error(data.error);
            }
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <input
                className='w-1/4 h-10 text-lg border-2 border-gray-600 rounded-xl mb-10 p-2'
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="輸入 URL (e.g., https://example.com)"

            />
            <button
                className='w-24 h-10 text-lg border-2 border-gray-600 rounded-xl mb-10 font-bold'
                onClick={fetchRobots}
                disabled={loading}
            >
                {loading ? 'Loading...' : '開始'}
            </button >
            <div className='w-1/4 min-w-fit min-h-96 rounded-lg bg-slate-200 p-3'>
                {robotsContent && <pre className='text-sm'>{robotsContent}</pre>
                }
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        </>
    );
}

export default RobotsFetcher;
