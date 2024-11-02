"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSolarPanel = exports.updateSolarPanel = exports.getSolarPanels = exports.getSolarPanel = exports.createSolarPanel = void 0;
const productService_js_1 = require("../services/productService.js");
const service = new productService_js_1.ProductService();
/**
 * Creates a new solar panel.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the solar panel is created.
 */
const createSolarPanel = async (req, res) => {
    try {
        const { data } = req.body;
        const solarPanel = await service.create(data);
        res.status(201).json(solarPanel);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error trying to create the Solar Panel" });
    }
};
exports.createSolarPanel = createSolarPanel;
const getSolarPanel = async (req, res) => {
    try {
        const Id = parseInt(req.params.id);
        const solarPanel = await service.getById(Id);
        res.status(201).json(solarPanel);
    }
    catch (error) {
        console.log(error);
        res
            .status(500)
            .json({
            error: "An error ocurred while trying to fecth the solar panel",
        });
    }
};
exports.getSolarPanel = getSolarPanel;
const getSolarPanels = async (_req, res) => {
    try {
        const solarPanels = await service.getAll();
        res.status(201).json(solarPanels);
    }
    catch (error) {
        console.log(error);
        res
            .status(500)
            .json({
            error: "An error ocurred while trying to  fecth the solar panels",
        });
    }
};
exports.getSolarPanels = getSolarPanels;
const updateSolarPanel = async (req, res) => {
    try {
        const { data } = req.body;
        data.id = parseInt(req.params.id);
        const solarPanel = await service.update(data);
        res.status(201).json(solarPanel);
    }
    catch (error) {
        console.log(error);
        res
            .status(500)
            .json({
            error: "An error ocurred while trying to update the solarPanel",
        });
    }
};
exports.updateSolarPanel = updateSolarPanel;
const deleteSolarPanel = async (req, res) => {
    try {
        const Id = parseInt(req.params.id);
        const solarPanelId = await service.delete(Id);
        res.status(200).json(solarPanelId);
    }
    catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ error: "An error while trying to delete the solar panel" });
    }
};
exports.deleteSolarPanel = deleteSolarPanel;
exports.default = {
    getSolarPanel: exports.getSolarPanel,
    getSolarPanels: exports.getSolarPanels,
    updateSolarPanel: exports.updateSolarPanel,
    deleteSolarPanel: exports.deleteSolarPanel
};
//# sourceMappingURL=solarPanelController.js.map