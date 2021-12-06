const CommunityList = require("../models/communitylist-model");

getCommunityLists = async (req, res) => {
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
	await CommunityList.aggregate(
		[{ $sort: sortParam }],
		(err, communityLists) => {
			if (err) {
				return res.status(400).json({ success: false, error: err });
			}
			communityLists = communityLists.filter((communityList) => {
				if (filter && query) {
					let value = communityList[filter];
					if (!value) return true;
					value = value.toLowerCase();
					return value === query.toLowerCase();
				}
				return communityList[filter] === query;
			});
			return res
				.status(200)
				.json({ success: true, data: communityLists });
		}
	).catch((err) => console.log(err));
};

module.exports = {
	getCommunityLists,
};
