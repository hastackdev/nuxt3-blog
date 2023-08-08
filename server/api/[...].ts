import { useBase, createRouter, defineEventHandler } from 'h3';

import * as blogCtrl from '~~/server/controller/blog';

const router = createRouter();

router.get('/blog', defineEventHandler(blogCtrl.read));
router.post('/blog', defineEventHandler(blogCtrl.create));
router.get('/blog/:id', defineEventHandler(blogCtrl.detail));
router.put('/blog/:id', defineEventHandler(blogCtrl.update));
router.delete('/blog/:id', defineEventHandler(blogCtrl.remove));

export default useBase('/api', router.handler);
