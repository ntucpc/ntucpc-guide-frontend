/*
types: success, info, warning, danger
*/

import { Alert, Box } from "@mui/material";

type DirectiveInfoType = "success" | "info" | "warning" | "danger" | "error";
type DirectiveInfoParamType = {
  type: DirectiveInfoType;
  children: string;
}

export function DirectiveInfo({type, children}: DirectiveInfoParamType) {
  if(type == "danger") type = "error";
  return (
    <Box padding={2}>
      <Alert severity={type}>{children}</Alert>
    </Box>
  )
}
