import axios from "axios";

export const getAuthenticatedRequest = () =>
  axios.create({
    baseURL: "http://localhost:8080/api",

    headers: {
      Authorization: "Bearer " + (localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken")),
    },
  });

export * from "./auth/authActions";
export * from "./inventory/inventoryActions";
export * from "./transaction/transactionActions";
export * from "./manageTeam/manageTeamActions";
export * from "./contacts/contactActions";