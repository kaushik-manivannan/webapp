import express from 'express';
import logger from '../utils/logger.js';
import { methodNotAllowed } from '../middleware/methodNotAllowed.js';
import { createUser, getUser, updateUser } from '../controllers/userController.js';
import { validatePayload } from '../middleware/validatePayload.js';
import { createUserSchema, updateUserSchema } from '../schemas/userSchemas.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .post(
    (req, res, next) => {
    logger.info("User creation request received");
    next();
    },
    validatePayload(createUserSchema),
    createUser
  )
  .all(
    methodNotAllowed(['POST'])
  );

router.route('/self')
  .all(
    methodNotAllowed(['GET', 'PUT'])
  )
  .get(
    (req, res, next) => {
      logger.info("Fetch user request received");
      next();
    },
    auth,
    getUser
  )
  .put(
    (req, res, next) => {
      logger.info("User update request received");
      next();
      },
    validatePayload(updateUserSchema),
    auth,
    updateUser
  )

export default router;