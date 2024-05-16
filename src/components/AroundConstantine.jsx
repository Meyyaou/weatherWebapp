import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import "./AroundConstantine.css";

import Weather from "./Weather";
//TODO find a way to display with this only one place:
export default function AroundConstantine() {
  let icon = "";
 
  return (
    <>
      <p className="title-around">Around Constantine weather:</p>

      <div className="grid-container">
        <div className="grid-item">
          
          <Weather city="Setif" />
        </div>
        <div className="grid-item">
          <Weather city="Annaba" />
        </div>
        <div className="grid-item">
          <Weather city="Skikda" />
        </div>
        <div className="grid-item">
          <Weather city="Batna" />
        </div>
      </div>
    </>
  );
}