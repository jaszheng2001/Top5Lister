const Top5List = require("../models/top5list-model");
const User = require("../models/user-model");
const mongo = require("mongodb");

createTop5List = (req, res) => {
	const body = req.body;
	console.log(body);
	if (!body) {
		return res.status(400).json({
			success: false,
			error: "You must provide a Top 5 List",
		});
	}
	const top5List = new Top5List({
		...body,
		username: req.username,
		likes: 0,
		dislikes: 0,
		views: 0,
		// comments: [],  # Uncomment after testing
	});

	console.log("creating top5List: " + JSON.stringify(top5List));
	if (!top5List) {
		return res.status(400).json({ success: false, error: err });
	}

	top5List
		.save()
		.then(() => {
			return res.status(201).json({
				success: true,
				top5List: top5List,
				message: "Top 5 List Created!",
			});
		})
		.catch((error) => {
			console.log(error);
			return res.status(400).json({
				error,
				message: "Top 5 List Not Created!",
			});
		});
};

updateTop5List = async (req, res) => {
	let email;
	try {
		const user = await User.findById(req.userId);
		email = user.email;
	} catch (err) {
		return res.status(401).json({ success: false, error: "Unauthorized" });
	}

	const body = req.body;
	console.log("updateTop5List: " + JSON.stringify(body));
	if (!body) {
		return res.status(400).json({
			success: false,
			error: "You must provide a body to update",
		});
	}

	Top5List.findOne({ _id: req.params.id }, (err, top5List) => {
		console.log("top5List found: " + JSON.stringify(top5List));
		if (err) {
			return res.status(404).json({
				err,
				message: "Top 5 List not found!",
			});
		}

		if (top5List.ownerEmail !== email) {
			return res
				.status(401)
				.json({ success: false, error: "Unauthorized" });
		}
		top5List.name = body.name;
		top5List.items = body.items;
		top5List
			.save()
			.then(() => {
				console.log("SUCCESS!!!");
				return res.status(200).json({
					success: true,
					id: top5List._id,
					message: "Top 5 List updated!",
				});
			})
			.catch((error) => {
				console.log("FAILURE: " + JSON.stringify(error));
				return res.status(404).json({
					error,
					message: "Top 5 List not updated!",
				});
			});
	});
};

deleteTop5List = async (req, res) => {
	let email;
	try {
		const user = await User.findById(req.userId);
		email = user.email;
	} catch (err) {
		return res.status(403).json({ success: false, error: "Unauthorized" });
	}

	Top5List.findById({ _id: req.params.id }, (err, top5List) => {
		if (err) {
			return res.status(404).json({
				err,
				message: "Top 5 List not found!",
			});
		}
		// Check if email matches
		if (email !== top5List.ownerEmail) {
			return res
				.status(401)
				.json({ success: false, error: "Unauthorized" });
		}

		Top5List.findOneAndDelete({ _id: req.params.id }, () => {
			return res.status(200).json({ success: true, data: top5List });
		}).catch((err) => console.log(err));
	});
};

getTop5ListById = async (req, res) => {
	let email;
	try {
		const user = await User.findById(req.userId);
		email = user.email;
	} catch (err) {
		return res.status(403).json({ success: false, error: "Unauthorized" });
	}

	await Top5List.findById({ _id: req.params.id }, (err, list) => {
		if (err) {
			return res.status(400).json({ success: false, error: err });
		}
		// Check if email matches
		if (list) {
			if (email !== list.ownerEmail) {
				return res
					.status(401)
					.json({ success: false, error: "Unauthorized" });
			}

			return res.status(200).json({ success: true, top5List: list });
		} else {
			return res.status(404).json({ success: false, error: "Not found" });
		}
	}).catch((err) => console.log(err));
};
getTop5Lists = async (req, res) => {
	const sort = req.query.sort;
	let sortParam = {};
	sortParam[sort] = -1;
	if (sort === "publishAsc" || sort === "publishDec") {
		sortParam["publishDate"] = sort === "publishAsc" ? 1 : -1;
	}
	const filter = req.query.filter;
	const query = req.query.q;
	console.log(filter);
	console.log(query);
	await Top5List.aggregate([{ $sort: sortParam }], (err, top5Lists) => {
		if (err) {
			return res.status(400).json({ success: false, error: err });
		}
		if (!top5Lists.length) {
			return res
				.status(404)
				.json({ success: false, error: `Top 5 Lists not found` });
		}
		top5Lists = top5Lists.filter((top5list) => {
			if (filter && query) {
				let value = top5list[filter];
				if (!value) return true;
				value = value.toLowerCase();
				return value === query.toLowerCase();
			}
			return top5list[filter] === query;
		});
		return res.status(200).json({ success: true, data: top5Lists });
	}).catch((err) => console.log(err));
};

getTop5ListsUser = async (req, res) => {
	const sort = req.query.sort;
	let sortParam = {};
	sortParam[sort] = -1;
	if (sort === "publishAsc" || sort === "publishDec") {
		sortParam["publishDate"] = sort === "publishAsc" ? 1 : -1;
	}
	const filter = req.query.filter;
	const query = req.query.q;
	console.log(filter);
	console.log(query);
	await Top5List.aggregate([{ $sort: sortParam }], (err, top5Lists) => {
		if (err) {
			return res.status(400).json({ success: false, error: err });
		}
		if (!top5Lists.length) {
			return res
				.status(404)
				.json({ success: false, error: `Top 5 Lists not found` });
		}
		top5Lists = top5Lists.filter((top5list) => {
			if (!filter || !query) return top5list.username === req.username;

			if (filter && query) {
				let value = top5list[filter];
				if (!value) return true;
				value = value.toLowerCase();
				return (
					value.includes(query.toLowerCase()) &&
					top5list.username === req.username
				);
			}
			return (
				top5list[filter] === query && top5list.username === req.username
			);
		});
		return res.status(200).json({ success: true, data: top5Lists });
	}).catch((err) => console.log(err));
};

getTop5ListPairs = async (req, res) => {
	let email;
	try {
		const user = await User.findById(req.userId);
		email = user.email;
	} catch (err) {
		return res.status(403).json({ success: false, error: "Unauthorized" });
	}

	await Top5List.find({ ownerEmail: email }, (err, top5Lists) => {
		if (err) {
			return res.status(400).json({ success: false, error: err });
		}
		if (!top5Lists) {
			console.log("!top5Lists.length");
			return res
				.status(404)
				.json({ success: false, error: "Top 5 Lists not found" });
		} else {
			// PUT ALL THE LISTS INTO ID, NAME PAIRS
			let pairs = [];
			for (let key in top5Lists) {
				let list = top5Lists[key];
				let pair = {
					_id: list._id,
					name: list.name,
				};
				pairs.push(pair);
			}
			return res.status(200).json({ success: true, idNamePairs: pairs });
		}
	}).catch((err) => console.log(err));
};

createComment = async (req, res) => {
	const body = req.body;
	if (!body) {
		return res.status(400).json({
			success: false,
			error: "You must provide a body to update",
		});
	}

	Top5List.findOne({ _id: req.params.id }, (err, top5List) => {
		console.log("top5List found: " + JSON.stringify(top5List));
		if (err) {
			return res.status(404).json({
				err,
				message: "Top 5 List not found!",
			});
		}
		const newComment = {
			_id: new mongo.ObjectId().toString(),
			username: req.username,
			comment: req.body.comment,
		};

		top5List.comments.unshift(newComment);
		top5List
			.save()
			.then(() => {
				console.log("SUCCESS!!!");
				return res.status(200).json({
					success: true,
					id: top5List._id,
					message: "Comment Added",
				});
			})
			.catch((error) => {
				console.log("FAILURE: " + JSON.stringify(error));
				return res.status(404).json({
					error,
					message: "Unable to add comment",
				});
			});
	});
};

updateView = async (req, res) => {
	Top5List.findOne({ _id: req.params.id }, (err, top5List) => {
		if (err) {
			console.log("List not found");
			return res.status(404).json({
				err,
				message: "Top 5 List not found!",
			});
		}
		top5List.views = top5List.views + 1;
		top5List
			.save()
			.then(() => {
				console.log("SUCCESS!!!");
				return res.status(200).json({
					success: true,
					id: top5List._id,
					message: "Incremented view",
				});
			})
			.catch((error) => {
				console.log("FAILURE: " + JSON.stringify(error));
				return res.status(404).json({
					error,
					message: "Server Error",
				});
			});
	});
};
module.exports = {
	createTop5List,
	updateTop5List,
	deleteTop5List,
	getTop5Lists,
	getTop5ListPairs,
	getTop5ListById,
	getTop5ListsUser,
	createComment,
	updateView,
};
