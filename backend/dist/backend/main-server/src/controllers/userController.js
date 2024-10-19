"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.checkUserName = exports.remove = exports.login = exports.getUsers = exports.getUser = exports.ForgotPasswordLink = exports.ResendActivationLink = exports.ActiveUser = exports.ReactivateUser = exports.updateUser = void 0;
const Userservice_1 = __importDefault(require("../services/Userservice"));
// #endregion
// #region functions
const service = new Userservice_1.default();
const updateUser = async (req, res) => {
    debugger;
    try {
        const { data } = req.body;
        data.id = req.params["id"];
        const user = await service.update(data);
        res.status(201).json(user);
    }
    catch (error) {
        console.log("Error updating user", error);
    }
};
exports.updateUser = updateUser;
const ReactivateUser = async (req, res) => {
    debugger;
    try {
        const { id } = req.body;
        const Id = parseInt(id);
        const result = await service.ReactivateUser(Id);
        if (result instanceof Error) {
            res.status(404).json({
                message: result.message,
            });
        }
        else {
            res.status(201).json({
                message: "User Rectivated Successfully",
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.ReactivateUser = ReactivateUser;
const ActiveUser = async (req, res) => {
    debugger;
    try {
        const { id, isReactivation } = req.body;
        const Id = parseInt(id);
        const reactivation = Boolean(isReactivation);
        const result = await service.ActiveUser(Id, reactivation);
        if (result instanceof Error) {
            res.status(400).json({
                message: result.message,
            });
        }
        else {
            res.status(200).json({
                message: "User account activated successfully!",
                user: result,
            });
        }
    }
    catch (error) {
        console.error("Error in activateUserController:", error);
        res.status(500).json({
            message: "Internal server error. Please try again later.",
        });
    }
};
exports.ActiveUser = ActiveUser;
const ResendActivationLink = async (req, res) => {
    debugger;
    try {
        const { id } = req.body;
        const Id = parseInt(id);
        const result = await service.ResendActivationLink(Id);
        if (result) {
            res.status(200).json({
                message: "Activation link was already sent!",
            });
        }
        else {
            res.status(400).json({
                message: "There was an error sending the activation link. Please try again later.",
                user: result,
            });
        }
    }
    catch (error) {
        console.error("Error in ResendActivationLink:", error);
        res.status(500).json({
            message: "Internal server error. Please try again later.",
        });
    }
};
exports.ResendActivationLink = ResendActivationLink;
const ForgotPasswordLink = async (req, res) => {
    debugger;
    try {
        const { email } = req.body;
        const result = await service.ForgotPasswordLink(email);
        if (result) {
            res.status(200).json({
                message: "Password reset link was sent successfully!",
                user: result,
            });
        }
        else {
            res.status(400).json({
                message: "There was an error sending the password reset link. Please try again later.",
                user: result,
            });
        }
    }
    catch (error) {
        console.error("Error in ResetPasswordLink:", error);
        res.status(500).json({
            message: "Internal server error. Please try again later.",
        });
    }
};
exports.ForgotPasswordLink = ForgotPasswordLink;
const getUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await service.getById(userId);
        res.status(200).json(user);
    }
    catch (error) {
        console.error("Error fetching user:", error);
        res
            .status(500)
            .json({ error: "An error occurred while fetching the user..." });
    }
};
exports.getUser = getUser;
const getUsers = async (_req, res) => {
    try {
        const users = await service.getAll();
        res.status(200).json(users);
    }
    catch (error) {
        console.error("Error fetching users:", error);
        res
            .status(500)
            .json({ error: "An error occurred while fetching the users." });
    }
};
exports.getUsers = getUsers;
const login = async (req, res) => {
    debugger;
    const { username, password } = req.body;
    try {
        const user = await service.getByUsername(username, password);
        user.password = null;
        res.status(200).json(user);
    }
    catch (error) {
        console.error("Error fetching users:", error);
        res
            .status(500)
            .json({ error: "An error occurred while fetching the users..." });
    }
};
exports.login = login;
const remove = async (req, res) => {
    try {
        const id = req.params.id;
        const userId = await service.delete(id);
        userId !== undefined
            ? res
                .status(201)
                .json({
                done: true,
                value: { userId, message: "succesfuly deleted" },
            })
            : res
                .status(501)
                .json({ done: false, value: { message: "failed to delete" } });
    }
    catch (error) {
        console.log("Error deleting user", error);
        res
            .status(500)
            .json({ error: "An Error ocurred while trying to delete the user" });
    }
};
exports.remove = remove;
const checkUserName = async (req, res) => {
    try {
        const { username } = req.body;
        const data = await service.checkUserName(username);
        res.status(200).json({ data });
    }
    catch (error) {
        console.log("Error checking username", error);
        res
            .status(500)
            .json({ error: "An error occurred while checking the username..." });
    }
};
exports.checkUserName = checkUserName;
const changePassword = async (req, res) => {
    debugger;
    try {
        const { id, newPassword } = req.body;
        const data = await service.ChangePassword(id, newPassword);
        res.status(200).json({ data });
    }
    catch (error) {
        console.log("Error changing password", error);
        res
            .status(500);
    }
};
exports.changePassword = changePassword;
exports.default = {
    getUsers: exports.getUsers,
    getUser: exports.getUser,
    updateUser: exports.updateUser,
    login: exports.login,
    checkUserName: exports.checkUserName,
    ActiveUser: exports.ActiveUser,
    ReactivateUser: exports.ReactivateUser,
    ResendActivationLink: exports.ResendActivationLink,
    ForgotPasswordLink: exports.ForgotPasswordLink,
};
// #endregion
//# sourceMappingURL=userController.js.map