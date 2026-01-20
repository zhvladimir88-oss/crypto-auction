import { Schema, model, Document } from 'mongoose';
export interface IUser extends Document {
  username: string;
  balance: number;
  frozenBalance: number;
}
const UserSchema = new Schema<IUser>({
  username: { type: String, required: true },
  balance: { type: Number, default: 1000 },
  frozenBalance: { type: Number, default: 0 }
});
export const User = model<IUser>('User', UserSchema);
