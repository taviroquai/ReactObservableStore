import Store from '../../../src/ReactObservableStore';

export const updateSync = (newTitle) => {
    Store.update('namespace', { title: { nested: newTitle }, loading: false});
};

export const updateAsync = async (newTitle) => {
    Store.update('namespace', {loading: true});
    return new Promise(resolve => {
        setTimeout(() => {
            Store.update('namespace', {loading: false, title: {nested: newTitle}});
            resolve();
        }, 1000);
    });
};
