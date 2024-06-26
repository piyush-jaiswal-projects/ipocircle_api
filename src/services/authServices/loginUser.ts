import { ServiceResponse } from "../../types/services.types";
import generateTokens from "./generateTokens";
import saveRefreshToken from "./saveRefreshToken";
import { PrismaClient } from "@prisma/client";
import { LogError } from "../../utils";

const prisma = new PrismaClient();

const response: ServiceResponse = {
  success: false,
  data: {},
  errorMsg: "Something went wrong!",
};

type LoginUserType = {
  email: string;
  password: string;
};

const loginUser = async ({
  email,
  password,
}: LoginUserType): Promise<ServiceResponse> => {
  try {
    if (!email || !password) {
      response.errorMsg = "Invalid inputs passed!";
    }

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      response.errorMsg = "User does not exists!";
      return response;
    }

    if (user.password !== password) {
      response.errorMsg = "Invalid email/password!";
      return response;
    }

    const res = await generateTokens(user);
    if (!res.success) {
      response.errorMsg = res.errorMsg;
      return response;
    }

    const isTokenSaved = await saveRefreshToken(user.id, res.data.refreshToken);
    if (!isTokenSaved.success) {
      response.errorMsg = isTokenSaved.errorMsg;
      return response;
    }

    response.success = true;
    response.data = { accessToken: res.data.accessToken };

    return response;
  } catch (error) {
    LogError(error);
    return response;
  }
};

export default loginUser;
