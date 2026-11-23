export const BOOTED_KEY = 'portfolio:booted';

export function readStorage(storage, key) {
    try {
        return storage.getItem(key);
    } catch (error) {
        console.warn(`No se pudo leer "${key}" del almacenamiento:`, error);
        return null;
    }
}

export function writeStorage(storage, key, value) {
    try {
        storage.setItem(key, value);
    } catch (error) {
        console.warn(`No se pudo guardar "${key}" en el almacenamiento:`, error);
    }
}

export function removeStorage(storage, key) {
    try {
        storage.removeItem(key);
    } catch (error) {
        console.warn(`No se pudo borrar "${key}" del almacenamiento:`, error);
    }
}
