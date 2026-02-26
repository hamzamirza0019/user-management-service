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

router.route("/")
.post(asyncHandler(createUser))
.get(asyncHandler(getUsers));

/**
 * GET     /api/v1/users/:id
 * PUT     /api/v1/users/:id
 * DELETE  /api/v1/users/:id
 */

router.route("/:id")
.get(asyncHandler(getUserById))
.put(asyncHandler(updateUser))
.delete(asyncHandler(deleteUser));

export default router;