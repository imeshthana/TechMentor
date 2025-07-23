import * as SecureStore from "expo-secure-store";

const SecureStorage = {
  async save(key, value) {
    await SecureStore.setItemAsync(key, value);
  },

  async get(key) {
    return await SecureStore.getItemAsync(key);
  },

  async delete(key) {
    await SecureStore.deleteItemAsync(key);
  },

  async clearAll() {
    await Promise.all([
      this.delete("accessToken"),
      this.delete("refreshToken"),
      this.delete("userId"),
      this.delete("userRole"),
    ]);
  },
};

export default SecureStorage;
