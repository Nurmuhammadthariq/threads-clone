"use server"

import { revalidatePath } from "next/cache";
import { connectToDb } from "../monggose";

import User from "../models/user.model";
import Thread from "../models/thread.model";
import Community from "../models/communityModel";

interface Params {
	text: string,
	author: string,
	communityId: string | null,
	path: string
}

export async function createThread({ text, author, communityId, path }: Params) {
	try {
		connectToDb()

		const communityIdObject = await Community.findOne(
			{ id: communityId },
			{ _id: 1 }
		)

		const createThread = await Thread.create({
			text,
			author,
			community: communityIdObject
		})

		// Update user model
		await User.findByIdAndUpdate(author, {
			$push: { threads: createThread._id }
		})

		if (communityIdObject) {
			// Update community model
			await Community.findByIdAndUpdate(communityIdObject, {
				$push: { threads: createThread._id }
			})
		}

		revalidatePath(path)

	} catch (error: any) {
		throw new Error(`Failed to create thread: ${error.message}`)
	}
}