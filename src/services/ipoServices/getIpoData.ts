import { PrismaClient } from "@prisma/client";
import logError from "../../utils/logError";
import { ServiceResponse } from "../../types/services.types";
import { withAccelerate } from "@prisma/extension-accelerate";

const prisma = new PrismaClient().$extends(withAccelerate());

type GetQueryType = {
  where?: {};
  take?: number;
  select?: {};
};

const getIpoData = async (
  concise?: boolean,
  type?: string,
  count?: number
): Promise<ServiceResponse> => {
  try {
    const queryOptions: GetQueryType = {
      where: {},
      take: count ? count : undefined,
      select: {},
    };

    if (type && (type === "sme" || type === "main")) {
      queryOptions.where = {
        series: type,
      };
    }

    if (concise) {
      queryOptions.select = {
        ipo_id: true,
        name: true,
        series: true,
        opening_date: true,
        closing_date: true,
      };
    } else {
      delete queryOptions.select;
    }

    const data = await prisma.ipo.findMany(queryOptions);
    if (!data)
      return {
        success: false,
        errorMsg: "Data not found!",
      };

    return {
      success: true,
      data,
    };
  } catch (error) {
    logError(error);
    return {
      success: false,
    };
  }
};

export default getIpoData;
