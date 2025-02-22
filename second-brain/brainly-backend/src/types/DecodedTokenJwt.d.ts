// types/DecodedTokenJwt.d.ts
import mongoose from "mongoose";

export interface DecodedTokenJwt {
  _id: mongoose.Types.ObjectId | string;
}
