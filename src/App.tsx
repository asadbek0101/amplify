import React , {useState, useMemo} from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RootContainer from './containers/RootContainer';

export  default function App(){
  const i: any = useMemo( ()=> localStorage.getItem('Image'),[localStorage]);

  return (
    <>
    <RootContainer/>
    <ToastContainer />
    </>
  );
}
