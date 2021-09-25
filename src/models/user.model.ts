import { compare, hash } from "bcryptjs";
import { Schema, Document, model } from "mongoose";

export interface UserDocument extends Document {
  email: string;
  name: string;
  password: string;
  active: Boolean;
  matchesPassword: (password: string) => Promise<boolean>;
}

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "email is required"]
    },
    name: {
      type: String,
      required: [true, "name is required"]
    },
    password: {
      type: String,
      required: [true, "password is required"]
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

userSchema.pre<UserDocument>("save", async function () {
  this.password = await hash(this.password, 10);
});

userSchema.methods.matchesPassword = function (password: string) {
  return compare(password, this.password);
};

export const User = model<UserDocument>("User", userSchema);
