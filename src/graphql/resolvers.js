const User = require('../models/user');
const Book = require('../models/Book');
const { NotFoundError, ValidationError } = require('../utils/errors');

const resolvers = {
  Query: {
    // Convertimos los resultados a objetos planos (evita el error "query was already executed")
    users: async () => {
      return await User.find({}).lean();
    },

    user: async (_, { id }) => {
      const user = await User.findById(id).lean();
      if (!user) throw new NotFoundError('Usuario no encontrado');
      return user;
    },

    booksByUser: async (_, { userId }) => {
      const user = await User.findById(userId).lean();
      if (!user) throw new NotFoundError('Usuario no encontrado');
      return await Book.find({ user: userId }).lean();
    },
    books: async (_,  { search, genre, sortByYear = "desc", limit = 10, skip = 0 }) => {
      const filter = {};

      if (search) {
        filter.$or = [
          { title: { $regex: search, $options: 'i' } },
          { author: { $regex: search, $options: 'i' } }
        ];
      }

      if (genre) {
        filter.genre = genre;
      }

      const sort = sortByYear === "asc" ? { year: 1 } : { year: -1 };

      return await Book.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .populate('user', 'name email')
        .lean();
    },

    bookStatsByGenre: async () => {
    return await Book.aggregate([
      {
        $group: {
          _id: "$genre",
          total: { $sum: 1 },
          latestYear: { $max: "$year" },
        }
      },
      { $sort: { total: -1 } }
    ]);
    },

    book: async (_, { id }) => {
      const book = await Book.findById(id).lean();
      if (!book) throw new NotFoundError('Libro no encontrado');
      return book;
    }
  },

  Mutation: {
    createUser: async (_, { input }) => {
      try {
        const user = new User(input);
        await user.save();
        return user.toObject(); // Devolución de objeto plano
      } catch (err) {
        if (err.code === 11000) throw new ValidationError('Email ya registrado');
        throw new ValidationError(err.message);
      }
    },

    updateUser: async (_, { id, input }) => {
      try {
        const user = await User.findByIdAndUpdate(id, input, {
          new: true,
          runValidators: true,
          lean: true // Para devolver objeto simple
        });
        if (!user) throw new NotFoundError('Usuario no encontrado');
        return user;
      } catch (err) {
        if (err.code === 11000) throw new ValidationError('Email ya registrado');
        throw new ValidationError(err.message);
      }
    },

    deleteUser: async (_, { id }) => {
      const user = await User.findById(id);
      if (!user) throw new NotFoundError('Usuario no encontrado');

      // eliminar libros del usuario también (cascade)
      await Book.deleteMany({ user: id });
      await user.deleteOne();
      return true;
    },

    createBook: async (_, { userId, input }) => {
      const user = await User.findById(userId);
      if (!user) throw new NotFoundError('Usuario no encontrado');
      try {
        const book = new Book({ user: userId, ...input });
        await book.save();
        return book.toObject();
      } catch (err) {
        if (err.code === 11000)
          throw new ValidationError('El libro ya existe para este usuario');
        throw new ValidationError(err.message);
      }
    },

    updateBook: async (_, { id, input }) => {
      try {
        const book = await Book.findByIdAndUpdate(id, input, {
          new: true,
          runValidators: true,
          lean: true
        });
        if (!book) throw new NotFoundError('Libro no encontrado');
        return book;
      } catch (err) {
        if (err.code === 11000)
          throw new ValidationError('Actualización provoca duplicado de libro para usuario');
        throw new ValidationError(err.message);
      }
    },

    deleteBook: async (_, { id }) => {
      const book = await Book.findById(id);
      if (!book) throw new NotFoundError('Libro no encontrado');
      await book.deleteOne();
      return true;
    }
  },

  // Resolvers de relaciones
  User: {
    books: async (parent) => {
      return await Book.find({ user: parent._id }).lean();
    }
  },

  Book: {
    user: async (parent) => {
      return await User.findById(parent.user).lean();
    }
  }
};

module.exports = resolvers;
