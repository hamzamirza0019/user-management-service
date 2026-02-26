import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";

import {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
} from "../controllers/user.controller.js"

const router = Router();

/**
 * POST      /api/v1/users 
 * GET       /api/v1/users
 */

import { validateCreateUser } from "../middlewares/validateUser.middleware.js";
import { validateObjectId } from "../middlewares/validateObjectById.middleware.js";



router.route("/")
.post(
    validateCreateUser,
    asyncHandler(createUser))
.get(asyncHandler(getUsers));

/**
 * GET     /api/v1/users/:id
 * PUT     /api/v1/users/:id
 * DELETE  /api/v1/users/:id
 */

router.route("/:id")
.get(validateObjectId,asyncHandler(getUserById))
.put(validateObjectId, asyncHandler(updateUser))
.delete(validateObjectId, asyncHandler(deleteUser));

export default router;