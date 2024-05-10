import { ApiError, ApiResponse, asyncHandler } from "../utils";
import { Request, Response } from "express";
import { getIpoData } from "../services";
import {
  IpoStatsResponse,
  IpoStatsType,
  getIpoQueries,
} from "../types/ipo.types";
import { getIpoStats } from "../services/ipo.services";

const getRequest = asyncHandler(async (req: Request, res: Response) => {
  const { concise, type, count, page } = req.query as getIpoQueries;

  var ipoData = await getIpoData(Boolean(concise), type, Number(count));

  if (!ipoData) {
    throw new ApiError(404, "Data not found!");
  }

  if (page) {
    //pagination
    const pageNo = Number(page);
    ipoData = ipoData.slice(20 * (pageNo - 1), 20 * pageNo);
  }

  return res
    .status(201)
    .json(new ApiResponse(201, ipoData, "Ipo Data Fetched Successfully!"));
});

const getStatsRequest = asyncHandler(async (req: Request, res: Response) => {
  const { type } = req.query as { type?: string };
  var reqData;

  if (type && (type === "main" || type === "sme")) {
    reqData = await getIpoStats(type);
  } else if (!type) {
    const smeIpoStats = await getIpoStats("sme");
    const mainIpoStats = await getIpoStats("main");
    if (!mainIpoStats || !smeIpoStats) {
      throw new ApiError(404, "Data not found!");
    }
    reqData = {
      main: mainIpoStats,
      sme: smeIpoStats,
    };
  } else {
    throw new ApiError(400, "Invalid query parameters!");
  }

  if (!reqData) {
    throw new ApiError(404, "Data not found!");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, reqData, "Ipo Stats Fetched Successfully!"));
});

export default { getRequest, getStatsRequest };