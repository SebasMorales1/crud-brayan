const { error } = require("console")
const model = require("../models/model-db.js")


const getData = async (_, res) => {
    try {
        const data = await model.find({})
        res.status(200).json({ docs: data })
    } catch (error) {
        res.status(400).json({ message: "error al obetener todos los datos" })
    }
}

const getDataOne = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await model.findById(id)
        console.log(data);
        if (data != null) {
            res.status(200).json({ docs: data })
        } else {
            res.status(400).json({ message: " error buscando el id" })
        }
    } catch (error) {
        console.log("error al encontrar por id");
    }
}
const inserData = async (req, res) => {
    try {
        const data = req.body;
        const newData = await model.create(data)
        res.status(200).json({docs:newData})
    } catch (error) {
        res.status(400).json({ message: "error al insertar datos" + error })
    }
}
const updateData = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await model.findByIdAndUpdate(id, req.body)
        res.status(200).json({ message: "updated" })

    } catch (error) {
        res.status(400).json({ message: "error al actualizar datos" })
    }
}
const deleteData = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await model.findByIdAndDelete(id)
        res.status(200).json({ message: "delete" })

    } catch (error) {
        res.status(400).json({ message: "error al eliminar datos" })
    }
}
module.exports = { getData, getDataOne, inserData, updateData, deleteData }