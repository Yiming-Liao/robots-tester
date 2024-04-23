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
        <div>
            <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="輸入 URL (e.g., https://example.com)"
            />
            <button onClick={fetchRobots} disabled={loading}>
                {loading ? 'Loading...' : 'Fetch Robots.txt'}
            </button>
            {robotsContent && <pre className='text-sm'>{robotsContent}</pre>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default RobotsFetcher;
