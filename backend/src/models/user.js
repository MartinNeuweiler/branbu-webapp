const bcrypt = require('bcryptjs');
const { db } = require('../config/database');
const { AppError } = require('../middleware/errorHandler');

class User {
  static async create({ email, password, role = 'user' }) {
    const hashedPassword = await bcrypt.hash(password, 12);
    
    const [user] = await db('users')
      .insert({
        email,
        password: hashedPassword,
        role
      })
      .returning(['id', 'email', 'role', 'created_at']);

    return user;
  }

  static async findByEmail(email) {
    return db('users')
      .where({ email })
      .first();
  }

  static async findById(id) {
    return db('users')
      .where({ id })
      .first();
  }

  static async findByIdWithProfile(id) {
    const user = await db('users')
      .select('users.*', 'profiles.*')
      .leftJoin('profiles', 'users.id', 'profiles.user_id')
      .where('users.id', id)
      .first();

    if (!user) {
      throw new AppError(404, 'User not found');
    }

    return user;
  }

  static async updateProfile(userId, profileData) {
    const [profile] = await db('profiles')
      .insert({
        user_id: userId,
        ...profileData
      })
      .onConflict('user_id')
      .merge()
      .returning('*');

    return profile;
  }

  static async comparePasswords(candidatePassword, hashedPassword) {
    return bcrypt.compare(candidatePassword, hashedPassword);
  }

  static async updatePassword(userId, newPassword) {
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    
    await db('users')
      .where({ id: userId })
      .update({
        password: hashedPassword,
        updated_at: db.fn.now()
      });
  }

  static async changedPasswordAfter(user, timestamp) {
    if (!user.password_changed_at) return false;
    const changedTimestamp = parseInt(
      user.password_changed_at.getTime() / 1000,
      10
    );
    return timestamp < changedTimestamp;
  }
}

module.exports = User; 