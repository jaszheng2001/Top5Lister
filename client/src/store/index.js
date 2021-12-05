import { createContext, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import api from "../api";
import AuthContext from "../auth";
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THIS IS THE CONTEXT WE'LL USE TO SHARE OUR STORE
export const GlobalStoreContext = createContext({});

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
	CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
	CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
	CREATE_NEW_LIST: "CREATE_NEW_LIST",
	LOAD_LIST: "LOAD_LIST",
	LOAD_USER_LIST: "LOAD_USER_LIST",
	MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
	UNMARK_LIST_FOR_DELETION: "UNMARK_LIST_FOR_DELETION",
	SET_CURRENT_LIST: "SET_CURRENT_LIST",
	SET_ITEM_EDIT_ACTIVE: "SET_ITEM_EDIT_ACTIVE",
	UPDATE_LIST: "UPDATE_LIST",
	SHOW_ERR: "SHOW_ERR",
	HIDE_ERR: "HIDE_ERR",
};

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalStoreContextProvider(props) {
	// THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
	const [store, setStore] = useState({
		idNamePairs: [],
		currentList: null,
		listNameActive: false,
		itemActive: false,
		listMarkedForDeletion: null,
		err: null,
		tab: null,
		query: null,
		filter: null,
	});
	const history = useHistory();

	// SINCE WE'VE WRAPPED THE STORE IN THE AUTH CONTEXT WE CAN ACCESS THE USER HERE
	const { auth } = useContext(AuthContext);

	// HERE'S THE DATA STORE'S REDUCER, IT MUST
	// HANDLE EVERY TYPE OF STATE CHANGE
	const storeReducer = (action) => {
		const { type, payload } = action;
		switch (type) {
			// LIST UPDATE OF ITS NAME
			case GlobalStoreActionType.CHANGE_LIST_NAME: {
				return setStore({
					idNamePairs: payload.idNamePairs,
					currentList: payload.top5List,
					isItemEditActive: false,
					listMarkedForDeletion: null,
					err: store.err,
				});
			}
			// STOP EDITING THE CURRENT LIST
			case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
				return setStore({
					idNamePairs: store.idNamePairs,
					currentList: null,
					isItemEditActive: false,
					listMarkedForDeletion: null,
					err: store.err,
				});
			}
			// CREATE A NEW LIST
			case GlobalStoreActionType.CREATE_NEW_LIST: {
				return setStore({
					idNamePairs: store.idNamePairs,
					currentList: payload,
					isItemEditActive: false,
					listMarkedForDeletion: null,
					err: store.err,
				});
			}
			// GET ALL THE LISTS SO WE CAN PRESENT THEM
			case GlobalStoreActionType.LOAD_LIST: {
				console.log("Load ID pair Reducer");
				return setStore({
					idNamePairs: payload,
					currentList: null,
					isItemEditActive: false,
					listMarkedForDeletion: null,
					err: store.err,
				});
			}
			case GlobalStoreActionType.LOAD_USER_LIST: {
				return setStore({
					idNamePairs: payload,
					currentList: null,
					isItemEditActive: false,
					listMarkedForDeletion: null,
					err: store.err,
				});
			}
			// PREPARE TO DELETE A LIST
			case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
				console.log("Reducer for Mark List for Deletion");
				console.log(payload);
				return setStore({
					idNamePairs: store.idNamePairs,
					currentList: null,
					isItemEditActive: false,
					listMarkedForDeletion: payload,
					err: store.err,
				});
			}
			// PREPARE TO DELETE A LIST
			case GlobalStoreActionType.UNMARK_LIST_FOR_DELETION: {
				return setStore({
					idNamePairs: store.idNamePairs,
					currentList: null,
					isItemEditActive: false,
					listMarkedForDeletion: null,
					err: store.err,
				});
			}
			// UPDATE A LIST
			case GlobalStoreActionType.SET_CURRENT_LIST: {
				return setStore({
					idNamePairs: store.idNamePairs,
					currentList: payload,
					isItemEditActive: false,
					listMarkedForDeletion: null,
					err: store.err,
				});
			}
			// START EDITING A LIST ITEM
			case GlobalStoreActionType.SET_ITEM_EDIT_ACTIVE: {
				return setStore({
					idNamePairs: store.idNamePairs,
					currentList: payload,
					listMarkedForDeletion: null,
					err: store.err,
				});
			}
			case GlobalStoreActionType.UPDATE_LIST: {
				return setStore({
					idNamePairs: store.idNamePairs,
					currentList: payload,
					listMarkedForDeletion: null,
					err: store.err,
				});
			}
			case GlobalStoreActionType.SHOW_ERR: {
				console.log(payload);
				return setStore({
					...store,
					err: payload,
				});
			}
			case GlobalStoreActionType.HIDE_ERR: {
				return setStore({
					...store,
					err: null,
				});
			}
			default:
				return store;
		}
	};

	// THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
	// DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN
	// RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

	// THIS FUNCTION PROCESSES CHANGING A LIST NAME
	store.changeListName = async function (id, newName) {
		let response = await api.getTop5ListById(id);
		if (response.data.success) {
			let top5List = response.data.top5List;
			top5List.name = newName;
			async function updateList(top5List) {
				response = await api.updateTop5ListById(top5List._id, top5List);
				if (response.data.success) {
					async function getListPairs(top5List) {
						response = await api.getTop5ListPairs();
						if (response.data.success) {
							let pairsArray = response.data.idNamePairs;
							storeReducer({
								type: GlobalStoreActionType.CHANGE_LIST_NAME,
								payload: {
									idNamePairs: pairsArray,
									top5List: top5List,
								},
							});
						}
					}
					getListPairs(top5List);
				}
			}
			updateList(top5List);
		}
	};

	// THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
	store.closeCurrentList = function () {
		storeReducer({
			type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
			payload: {},
		});
		history.push("/");
	};

	// THIS FUNCTION CREATES A NEW LIST
	store.createNewList = async function () {
		let newListName = "Untitled";
		let payload = {
			name: newListName,
			items: ["?", "?", "?", "?", "?"],
			ownerEmail: auth.user.email,
		};
		const response = await api.createTop5List(payload);
		if (response.data.success) {
			let newList = response.data.top5List;
			storeReducer({
				type: GlobalStoreActionType.CREATE_NEW_LIST,
				payload: newList,
			});
		} else {
			console.log("API FAILED TO CREATE A NEW LIST");
		}
	};

	// THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
	store.loadList = async function () {
		const response = await api.getAllTop5Lists();
		if (response.data.success) {
			let pairsArray = response.data.data;
			storeReducer({
				type: GlobalStoreActionType.LOAD_LIST,
				payload: pairsArray,
			});
		} else {
			console.log("API FAILED TO GET THE LIST PAIRS");
		}
	};

	store.loadListUsers = async function () {
		const response = await api.getAllTop5ListsUser();
		if (response.data.success) {
			let array = response.data.data;
			storeReducer({
				type: GlobalStoreActionType.LOAD_USER_LIST,
				payload: array,
			});
		}
	};

	// THE FOLLOWING 5 FUNCTIONS ARE FOR COORDINATING THE DELETION
	// OF A LIST, WHICH INCLUDES USING A VERIFICATION MODAL. THE
	// FUNCTIONS ARE markListForDeletion, deleteList, deleteMarkedList,
	// showDeleteListModal, and hideDeleteListModal
	store.markListForDeletion = function (list) {
		// GET THE LIST
		console.log("Mark List for Delete");
		storeReducer({
			type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
			payload: list,
		});
	};

	store.deleteList = async function (listToDelete) {
		let response = await api.deleteTop5ListById(listToDelete._id);
		if (response.data.success) {
			store.loadListUsers();
			// history.push("/");
		}
	};

	store.deleteMarkedList = function () {
		store.deleteList(store.listMarkedForDeletion);
	};

	store.unmarkListForDeletion = function () {
		console.log("Unmark List for Deletion");
		storeReducer({
			type: GlobalStoreActionType.UNMARK_LIST_FOR_DELETION,
			payload: null,
		});
	};

	// THE FOLLOWING 8 FUNCTIONS ARE FOR COORDINATING THE UPDATING
	// OF A LIST, WHICH INCLUDES DEALING WITH THE TRANSACTION STACK. THE
	// FUNCTIONS ARE setCurrentList, addMoveItemTransaction, addUpdateItemTransaction,
	// moveItem, updateItem, updateCurrentList, undo, and redo
	store.setCurrentList = async function (id) {
		try {
			let response = await api.getTop5ListById(id);
			if (response.data.success) {
				let top5List = response.data.top5List;

				response = await api.updateTop5ListById(top5List._id, top5List);
				if (response.data.success) {
					storeReducer({
						type: GlobalStoreActionType.SET_CURRENT_LIST,
						payload: top5List,
					});
					history.push("/top5list/" + top5List._id);
				}
			}
		} catch (err) {
			store.showErr(
				err.response.status,
				"Error Accessing List, Redirecting..."
			);
			setTimeout(() => {
				store.hideErr();
				history.push("/");
			}, 3000);
			console.log(err);
		}
	};

	store.updateCurrentList = async function () {
		const response = await api.updateTop5ListById(
			store.currentList._id,
			store.currentList
		);
		if (response.data.success) {
			storeReducer({
				type: GlobalStoreActionType.SET_CURRENT_LIST,
				payload: store.currentList,
			});
		}
	};

	store.updateList = async function (name, list) {
		const newList = { name, items: list };
		const response = await api.updateTop5ListById(
			store.currentList._id,
			newList
		);
		try {
			if (response.data.success) {
				store.loadListUsers();
			}
		} catch (err) {
			store.showErr(err.response.status, "Failed to Update List");
		}
	};
	// THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
	store.setIsListNameEditActive = function () {
		storeReducer({
			type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
			payload: null,
		});
	};

	// THIS FUNCTION ENABLES THE PROCESS OF EDITING AN ITEM
	store.setItemEditActive = function (list) {
		storeReducer({
			type: GlobalStoreActionType.SET_ITEM_EDIT_ACTIVE,
			payload: list,
		});
	};

	// New Functions

	store.showErr = function (statusCode, msg) {
		console.log(msg);
		storeReducer({
			type: GlobalStoreActionType.SHOW_ERR,
			payload: `Error ${statusCode}: ${msg}`,
		});
	};

	store.hideErr = function () {
		storeReducer({
			type: GlobalStoreActionType.HIDE_ERR,
			payload: null,
		});
	};
	return (
		<GlobalStoreContext.Provider
			value={{
				store,
			}}
		>
			{props.children}
		</GlobalStoreContext.Provider>
	);
}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };
