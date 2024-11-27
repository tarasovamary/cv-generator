import { createReducer, on } from '@ngrx/store';
import {
  createCvSuccess,
  deleteCvByIdSuccess,
  getAllCvEmployeesSuccess,
  getAllCvForEmployeeSuccess,
  getAllCvsSuccess,
  getAllProjectsSuccess,
  getCvByIdSuccess,
  resetCurrentCv,
  setSelectedEmployee,
} from './cv.actions';
import { CvState, initialState } from './cv.state';

export const cvReducer = createReducer<CvState>(
  initialState,

  on(
    getAllCvsSuccess,
    (state, { cvs }): CvState => ({
      ...state,
      cvs,
    }),
  ),

  on(
    getAllCvForEmployeeSuccess,
    (state, { cvs }): CvState => ({
      ...state,
      cvs,
    }),
  ),

  on(
    getCvByIdSuccess,
    (state, { cv }): CvState => ({
      ...state,
      currentCv: cv,
    }),
  ),

  on(
    createCvSuccess,
    (state, { cv }): CvState => ({
      ...state,
      cvs: [...state.cvs, cv],
    }),
  ),

  on(
    resetCurrentCv,
    (state): CvState => ({
      ...state,
      currentCv: null,
    }),
  ),

  on(
    getAllCvEmployeesSuccess,
    (state, { employees }): CvState => ({
      ...state,
      employees,
    }),
  ),

  on(
    setSelectedEmployee,
    (state, { id }): CvState => ({
      ...state,
      selectedEmployee: state.employees.find((employee) => employee._id == id),
    }),
  ),

  on(
    getAllProjectsSuccess,
    (state, { projects }): CvState => ({
      ...state,
      projects,
    }),
  ),
);
