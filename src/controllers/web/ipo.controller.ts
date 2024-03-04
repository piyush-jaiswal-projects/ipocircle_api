import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { asyncHandler, ApiError, ApiResponse } from "../../utils";

const prisma = new PrismaClient();

// GET REQUEST
const getIpoData = asyncHandler(async (req: Request, res: Response) => {
  const { concise, type, count, start, end } = req.query;

  const ipoType = type === "main" ? "main" : "sme";
  var ipoData;

  if (concise) {
    ipoData = await prisma.ipo.findMany({
      where: {
        series: ipoType,
      },
      select: {
        id: true,
        name: true,
        ipoDates: {
          select: {
            opening_date: true,
            closing_date: true,
          },
        },
      },
      orderBy: {
        ipoDates: {
          opening_date: "desc",
        },
      },
    });
  } else {
    ipoData = await prisma.ipo.findMany({
      where: {
        series: ipoType,
      },
      select: {
        id: true,
        name: true,
        ipoDates: {
          select: {
            opening_date: true,
            closing_date: true,
          },
        },
      },
      orderBy: {
        ipoDates: {
          opening_date: "desc",
        },
      },
    });
  }

  if (!ipoData) {
    throw new ApiError(404, "Data not found!");
  }

  const chunkStart = start === undefined ? 0 : Number(start);
  const chunkEnd =
    end === undefined
      ? count === undefined
        ? 150
        : Number(count)
      : Number(end);

  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        ipoData.slice(chunkStart, chunkEnd),
        "Ipo Data Fetched Successfully!"
      )
    );
});

// GET FROM ID REQUEST
const getIpoDataFromId = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.query;

  var ipoData = await prisma.ipo.findMany({
    where: {
      id: Number(id),
    },
    select: {
      ipoPrices: true,
      ipoContactDetails: true,
      ipoLots: true,
      ipoOtherDetails: true,
      ipoReview: true,
      ipoReservations: true,
      ipoAnchor: true,
      ipoDates: true,
      ipoShares: true,
      ipoFinances: true,
      ipoSubscriptions: true,
      ipoFinProgress: true,
    },
  });

  if (!ipoData) throw new ApiError(404, "Data not found!");

  res
    .status(200)
    .json(new ApiResponse(200, ipoData, "Data fetched successfully!"));
});

// GET REQUEST: IPO LIST
const getIpoList = asyncHandler(async (req: Request, res: Response) => {
  const { series, segregated } = req.query;

  var ipoList = await prisma.ipo.findMany({
    select: {
      id: true,
      name: true,
      series: true,
    },
    orderBy: {
      ipoDates: {
        opening_date: "desc",
      },
    },
  });

  if (!ipoList) throw new ApiError(404, "Data not found!");
  const mainIpoList = ipoList.filter((item) => item.series === "main");
  const smeIpoList = ipoList.filter((item) => item.series === "sme");
  const segregatedIpoList = {
    mainIpoList,
    smeIpoList,
  };

  var resData =
    Boolean(segregated) === true
      ? segregatedIpoList
      : series === "MAIN"
        ? mainIpoList
        : smeIpoList;

  res
    .status(200)
    .json(new ApiResponse(200, resData, "Data fetched successfully!"));
});

// GET REQUEST : NO OF IPOS
const getIpoCount = asyncHandler(async (req: Request, res: Response) => {
  const count = await prisma.ipo.count();
  if (count < 0) throw new ApiError(404, "Data not found!");
  res
    .status(200)
    .json(new ApiResponse(200, { count }, "Data fetched successfully!"));
});

// POST REQUEST
const createIpoEntry = asyncHandler(async (req: Request, res: Response) => {
  const ipoData = req.body;
  let ipoId: number;

  try {
    const result = await prisma.ipo.create({ data: ipoData.ipo });
    ipoId = result.id;

    const transaction = await prisma.$transaction([
      prisma.ipo_Anchor.create({
        data: { ipo_id: ipoId, ...ipoData.anchor },
      }),
      prisma.ipo_ContactDetails.create({
        data: { ipo_id: ipoId, ...ipoData.contact },
      }),
      prisma.ipo_Dates.create({
        data: { ipo_id: ipoId, ...ipoData.dates },
      }),
      prisma.ipo_FinProgress.create({
        data: { ipo_id: ipoId },
      }),
      prisma.ipo_Finances.create({
        data: { ipo_id: ipoId, ...ipoData.finance },
      }),
      prisma.ipo_Gmp.create({ data: { ipo_id: ipoId } }),
      prisma.ipo_Lots.create({ data: { ipo_id: ipoId, ...ipoData.lots } }),
      prisma.ipo_OtherDetails.create({
        data: { ipo_id: ipoId, ...ipoData.otherDetails },
      }),
      prisma.ipo_Prices.create({
        data: { ipo_id: ipoId, ...ipoData.prices },
      }),
      prisma.ipo_Reservations.create({
        data: { ipo_id: ipoId, ...ipoData.reservations },
      }),
      prisma.ipo_Review.create({
        data: { ipo_id: ipoId, ...ipoData.review },
      }),
      prisma.ipo_Shares.create({
        data: { ipo_id: ipoId, ...ipoData.shares },
      }),
      prisma.ipo_Subscriptions.create({
        data: { ipo_id: ipoId, ...ipoData.subscription },
      }),
      prisma.ipo_Tracker.create({
        data: { ipo_id: ipoId, ...ipoData.tracker },
      }),
    ]);

    res
      .status(200)
      .json(new ApiResponse(200, { ipoId: ipoId }, "Ipo added successfully!"));
  } catch (err: any) {
    console.log(err);
    throw new ApiError(422, "data not added!", err);
  }
});

// PATCH REQUEST
const updateIpoEntry = asyncHandler(async (req: Request, res: Response) => {
  const ipoData = req.body;
  const { ipoId } = req.query;

  const updateIpo = await prisma.ipo.update({
    where: {
      id: Number(ipoId),
    },
    data: ipoData,
  });
  if (!updateIpo) throw new ApiError(422, "Failed to update Ipo!");

  res
    .status(200)
    .json(new ApiResponse(200, updateIpo, "Ipo updated successfully!"));
});

export {
  getIpoData,
  getIpoDataFromId,
  createIpoEntry,
  updateIpoEntry,
  getIpoList,
  getIpoCount,
};
