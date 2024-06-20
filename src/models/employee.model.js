import mongoose from "mongoose";
const Schema = mongoose.Schema;
const collection = "Empleados";

const EmpleadosSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  app: {
    type: String,
    required: true,
    trim: true
  },
  apm: {
    type: String,
    required: true,
    trim: true
  },
  nacimiento: {
    type: Date,
    required: true,
  },
  nacionalidad: {
    type: String,
    required: true,
    trim: true
  },
  funciones: [],

}, {
  timestamps: true,
  versionKey: false,
  retainKeyOrder: true
});

const emp = mongoose.model(collection, EmpleadosSchema, collection);
export default emp;