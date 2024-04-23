// pages/api/robots.js

export default async function handler(req: any, res: any) {
    if (req.method === 'POST') {
        let { url } = req.body;
        url = url.startsWith('http') ? url : `https://${url}`;
        try {
            const response = await fetch(`${url}/robots.txt`);
            const text = await response.text();
            res.status(200).json({ data: text });
        } catch (error) {
            res.status(500).json({ error: "無法連線到該網址或該網址無robots.txt文件" });
        }
    } else if (req.method === 'GET') {
        res.send('Get robots.txt API')
    }

    else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
