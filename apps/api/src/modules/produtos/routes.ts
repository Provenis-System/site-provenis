import { Router } from 'express';

const DIRECTUS = process.env.DIRECTUS_URL ?? 'http://directus:8055';

export const produtosRouter = Router();

produtosRouter.get('/api/produtos', async (_req, res) => {
  try {
    const r = await fetch(
      `${DIRECTUS}/items/produtos?sort=ordem&filter[ativo][_eq]=true`,
      { headers: { Accept: 'application/json' } }
    );
    if (!r.ok) {
      res.status(502).json({ error: 'directus_error', status: r.status });
      return;
    }
    const data = await r.json();
    res.json(data);
  } catch (err) {
    console.error('[produtos proxy]', err);
    res.status(502).json({ error: 'directus_unavailable' });
  }
});
