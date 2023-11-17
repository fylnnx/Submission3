import CONFIG from '../globals/config';

const CacheHelper = {
  async cachingAppShell(requests) {
    const cache = await this._openCache();
    cache.addAll(requests);
  },

  async deleteOldCache() {
    const cacheNames = await caches.keys();
    cacheNames
      .filter((name) => name !== CONFIG.CACHE_NAME)
      .map((filteredName) => caches.delete(filteredName));
  },

  async revalidateCache(request) {
    const response = await caches.match(request);

    if (response) {
      this._fetchRequest(request);
      return response;
    }
    return this._fetchRequest(request);
  },

  async _openCache() {
    try {
      const cache = await caches.open(CONFIG.CACHE_NAME);
      return cache;
    } catch (error) {
      console.error('Error opening cache:', error);
      return null;
    }
  },

  async _fetchRequest(request) {
    try {
      const networkResponse = await fetch(request);

      if (!networkResponse || networkResponse.status !== 200) {
        return networkResponse;
      }
      const clonedResponse = networkResponse.clone();

      await this._addCache(request, clonedResponse);

      return networkResponse;
    } catch (error) {
      console.error('Error fetching request:', error);
      return new Response(null, { status: 500, statusText: 'Internal Server Error' });
    }
  },

  async _addCache(request, response) {
    const cache = await this._openCache();
    if (cache) {
      await cache.put(request, response);
    }
  },

};

export default CacheHelper;
