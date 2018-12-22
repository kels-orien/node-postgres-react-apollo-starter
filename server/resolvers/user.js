import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { combineResolvers } from "graphql-resolvers";
import "dotenv/config";

const createToken = (user, secret, expiresIn) => {
  const { userName, email } = user;

  return jwt.sign(
    {
      userName,
      email
    },
    secret,
    { expiresIn }
  );
};

export default {
  Query: {
    user: async (parent, { id }, { models }) => await models.User.findById(id),
    currentUser: async (parent, args, { models, currentUser }) => {
      if (!currentUser) {
        return null;
      }

      return await models.User.findById(currentUser.id);
    },
    users: combineResolvers(
      isAdmin,
      async (parent, args, { models }) => await models.User.findAll()
    ),
    updateUser: combineResolvers(
      isAuthenticated,
      async (parent, { username }, { models, currentUser }) => {
        const user = await models.User.findById(currentUser.id);
        return await user.update({ username });
      }
    ),

    deleteUser: combineResolvers(
      isAdmin,
      async (parent, { id }, { models }) =>
        await models.User.destroy({
          where: { id }
        })
    )
  },
  Mutation: {
    signupUser: async (
      parent,
      { firstName, lastName, email, userName, password },
      { models, secret }
    ) => {
      const newUser = await models.User.create({
        firstName,
        lastName,
        email,
        userName,
        password
      });

      return { token: createToken(newUser, process.env.SECRET, "1hr") };
    },
    signinUser: async (root, { email, password }, { models }) => {
      const user = await models.User.findOne({ email });

      if (!user) {
        throw new Error("User Not Found");
      }

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        throw new Error("inValid password");
      }

      return { token: createToken(user, process.env.SECRET, "1hr") };
    },

    editProfile: async (root, { email, bio }, { User }) => {
      const user = await User.findOneAndUpdate(
        { email },
        { $set: { bio } },
        { new: true }
      );

      if (!user) {
        throw new Error("User Not Found");
      }

      return user;
    }
  }
};
