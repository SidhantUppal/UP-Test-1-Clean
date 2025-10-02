import express from 'express';
import ContractorService from '../services/contractor.service.js';

const router = express.Router();
const service = new ContractorService();

// Middleware to extract user context
const extractUserContext = (req, res, next) => {
  req.userAreaId = parseInt(req.headers['x-userarea-id'] || '1');
  req.userId = parseInt(req.headers['x-user-id'] || '1');
  next();
};

router.use(extractUserContext);

// GET /api/contractor - List all with pagination
router.get('/', async (req, res, next) => {
  try {
    const { page = 1, limit = 20, search = '', sortBy = 'CreatedDate', sortOrder = 'DESC' } = req.query;
    
    const result = await service.getAll(req.userAreaId, {
      page: parseInt(page),
      limit: parseInt(limit),
      search,
      sortBy,
      sortOrder
    });

    res.json({
      success: true,
      data: result.data,
      pagination: result.pagination
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/contractor/:id - Get by ID
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await service.getById(req.userAreaId, parseInt(id));
    
    if (!result) {
      return res.status(404).json({
        success: false,
        error: 'Contractor not found'
      });
    }

    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/contractor - Create new
router.post('/', async (req, res, next) => {
  try {
    const data = req.body;
    const result = await service.create(req.userAreaId, req.userId, data);

    res.status(201).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
});

// PUT /api/contractor/:id - Update
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    
    const result = await service.update(req.userAreaId, req.userId, parseInt(id), data);
    
    if (!result) {
      return res.status(404).json({
        success: false,
        error: 'Contractor not found'
      });
    }

    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/contractor/:id - Soft delete
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const result = await service.delete(req.userAreaId, req.userId, parseInt(id));
    
    if (!result) {
      return res.status(404).json({
        success: false,
        error: 'Contractor not found'
      });
    }

    res.json({
      success: true,
      message: 'Contractor deleted successfully'
    });
  } catch (error) {
    next(error);
  }
});

export default router;