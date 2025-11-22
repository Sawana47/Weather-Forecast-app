module.exports = async (req, res) => {
  if (!global._reports) global._reports = [];
  if (req.method === 'GET') return res.json(global._reports.slice().reverse());
  if (req.method === 'POST') {
    const { location, type, note } = req.body || {};
    const item = { id: Date.now(), location, type, note, ts: new Date().toISOString() };
    global._reports.push(item);
    return res.json(item);
  }
  res.setHeader('Allow','GET,POST'); res.status(405).end('Method Not Allowed');
};
